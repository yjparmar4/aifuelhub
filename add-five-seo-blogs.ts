
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
    console.log('Adding 5 new SEO/AEO/GEO optimized blog posts...')

    // 1. Get the Category (fallback to first found if marketing doesn't exist)
    // Ideally we might want different categories, but for now we put them in 'marketing'
    // or a relevant tech category if available.
    let category = await prisma.category.findUnique({
        where: { slug: 'marketing' } // Target category
    })

    if (!category) {
        console.log('Marketing category not found, trying "ai-tools"...')
        category = await prisma.category.findUnique({ where: { slug: 'ai-tools' } })
    }

    if (!category) {
        console.log('AI Tools category not found, using first available category.')
        category = await prisma.category.findFirst()
    }

    if (!category) {
        console.error('No category found. Please seed categories first.')
        return
    }

    console.log(`Using category: ${category.name} (${category.slug})`)

    // Read posts from JSON file
    const postsPath = path.join(__dirname, 'new_posts.json')
    if (!fs.existsSync(postsPath)) {
        console.error(`File not found: ${postsPath}`)
        return
    }

    const postsData = fs.readFileSync(postsPath, 'utf-8')
    const posts = JSON.parse(postsData)

    console.log(`Found ${posts.length} posts to insert.`)

    for (const post of posts) {
        const exists = await prisma.blogPost.findUnique({
            where: { slug: post.slug }
        })

        if (exists) {
            console.log(`Skipping existing post: ${post.slug}`)
            // Optional: Update content if it exists to ensure latest version
            // await prisma.blogPost.update({ where: { slug: post.slug }, data: { content: post.content, ... } })
            continue
        }

        try {
            await prisma.blogPost.create({
                data: {
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    coverImage: post.coverImage,
                    focusKeyword: post.focusKeyword,
                    categoryId: category.id,
                    published: true,
                    publishedAt: new Date(),
                    featured: true,
                    views: Math.floor(Math.random() * 1000) + 100 // Higher initial views for these
                }
            })
            console.log(`Created post: ${post.title}`)
        } catch (error) {
            console.error(`Failed to create post ${post.slug}:`, error)
        }
    }

    console.log('Done adding new blogs.')
}

main()
    .catch((e) => {
        console.error('Error seeding new blogs:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
