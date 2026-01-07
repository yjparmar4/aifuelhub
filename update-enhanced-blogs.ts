
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
    console.log('Updating blog posts with enhanced content...')

    const blogFiles = [
        'enhanced_blog_1.json',
        'enhanced_blog_2.json',
        'enhanced_blog_3.json',
        'enhanced_blog_4.json',
        'enhanced_blog_5.json'
    ]

    for (const file of blogFiles) {
        const filePath = path.join(__dirname, file)

        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${file}, skipping...`)
            continue
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

        try {
            const result = await prisma.blogPost.update({
                where: { slug: data.slug },
                data: { content: data.content }
            })
            console.log(`Updated: ${result.title}`)
        } catch (error) {
            console.error(`Failed to update ${data.slug}:`, (error as Error).message)
        }
    }

    console.log('Done updating blog content.')
}

main()
    .catch((e) => {
        console.error('Error updating blogs:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
