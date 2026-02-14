import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// Regex patterns to match and remove
const PATTERNS = [
    // 1. Markdown Paragraph: **Quick Answer:** ... until double newline
    // Matches "**Quick Answer:** The best..."
    /\*\*Quick Answer:\*\*[\s\S]*?(?=\n\n|$)/gi,

    // 2. Markdown Paragraph: **Quick answer**: ... until double newline
    /\*\*Quick answer\*\*[\s\S]*?(?=\n\n|$)/gi,

    // 3. HTML Callout Divs containing "Quick Answer" or "Executive Summary" in h3
    // Matches <div class="blog-callout..."> ... <h3>...Quick Answer...</h3> ... </div>
    /<div class="blog-callout[^"]*">[\s\S]*?<h3>.*?(Quick Answer|Executive Summary).*?<\/h3>[\s\S]*?<\/div>/gi,

    // 4. Specific Header format: ## The Quick Answer: ...
    /## The Quick Answer:[\s\S]*?(?=\n\n|$)/gi,

    // 5. Specific header format: 💡 Quick Answer
    /💡 Quick Answer[\s\S]*?(?=\n\n|$)/gi
]

const TARGET_DIR = process.cwd()

async function cleanDatabase() {
    console.log('--- Cleaning Database Content ---')
    const posts = await prisma.blogPost.findMany()
    let count = 0

    for (const post of posts) {
        let content = post.content
        let originalContent = content
        let modified = false

        for (const pattern of PATTERNS) {
            if (pattern.test(content)) {
                // Check what we are matching for logging
                const match = content.match(pattern)
                if (match) {
                    // console.log(`[DB] Found match in ${post.slug}: ${match[0].substring(0, 50)}...`)
                }
                content = content.replace(pattern, '')
                modified = true
            }
        }

        if (modified) {
            // Cleanup extra newlines
            content = content.replace(/\n{3,}/g, '\n\n').trim()

            await prisma.blogPost.update({
                where: { id: post.id },
                data: { content }
            })
            console.log(`✅ Updated DB Post: ${post.slug}`)
            count++
        }
    }
    console.log(`Database cleanup complete. Updated ${count} posts.`)
}

async function cleanSourceFiles() {
    console.log('\n--- Cleaning Source Files ---')
    // Find all .ts and .js files in root and subfolders that might contain blog content
    // Limiting to root and scripts/ mostly
    const rootDir = process.cwd()

    // Helper to recursively find files
    function getFiles(dir: string, fileList: string[] = []) {
        const files = fs.readdirSync(dir)
        for (const file of files) {
            const filePath = path.join(dir, file)
            const stat = fs.statSync(filePath)
            if (stat.isDirectory()) {
                if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                    getFiles(filePath, fileList)
                }
            } else {
                if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.json')) {
                    fileList.push(filePath)
                }
            }
        }
        return fileList
    }

    const files = getFiles(rootDir)
    let count = 0

    for (const file of files) {
        // Skip this script itself and generated files
        if (file.includes('remove-quick-answers.ts')) continue
        if (file.includes('package-lock.json')) continue

        try {
            let content = fs.readFileSync(file, 'utf8')
            let modified = false

            for (const pattern of PATTERNS) {
                if (pattern.test(content)) {
                    // Check what we are matching
                    const match = content.match(pattern)
                    if (match) {
                        // console.log(`[File] Found match in ${path.basename(file)}: ${match[0].substring(0, 50)}...`)
                    }
                    content = content.replace(pattern, '')
                    modified = true
                }
            }

            if (modified) {
                fs.writeFileSync(file, content, 'utf8')
                console.log(`✅ Updated File: ${path.relative(rootDir, file)}`)
                count++
            }
        } catch (err) {
            console.error(`Error processing file ${file}:`, err)
        }
    }
    console.log(`Source file cleanup complete. Updated ${count} files.`)
}

async function main() {
    await cleanDatabase()
    await cleanSourceFiles()
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
