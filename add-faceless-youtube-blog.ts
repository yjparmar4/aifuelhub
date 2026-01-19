const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
    console.log('Adding faceless YouTube channel blog post...')

    // Get the AI category or create fallback
    let category = await prisma.category.findUnique({
        where: { slug: 'ai-tools' }
    })

    if (!category) {
        category = await prisma.category.findFirst()
    }

    if (!category) {
        console.error('No category found. Please seed categories first.')
        return
    }

    // Read the blog post from JSON
    const postData = fs.readFileSync(path.join(__dirname, 'faceless-youtube-blog.json'), 'utf-8')
    const post = JSON.parse(postData)

    // Check if already exists
    const exists = await prisma.blogPost.findUnique({
        where: { slug: post.slug }
    })

    if (exists) {
        console.log(`Post already exists: ${post.slug}. Updating instead...`)
        await prisma.blogPost.update({
            where: { slug: post.slug },
            data: {
                title: post.title,
                content: post.content,
                excerpt: post.excerpt,
                metaTitle: post.metaTitle,
                metaDescription: post.metaDescription,
                updatedAt: new Date()
            }
        })
        console.log('Post updated successfully!')
        return
    }

    // Create the blog post
    await prisma.blogPost.create({
        data: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: '/images/blog/faceless-youtube-ai-guide.jpg',
            focusKeyword: 'faceless youtube channel ai',
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
            category: {
                connect: { id: category.id }
            },
            published: true,
            publishedAt: new Date(),
            featured: true,
            views: 0
        }
    })

    console.log(`Successfully created: ${post.title}`)
    console.log('Blog post added to database!')
}

main()
    .catch((e) => {
        console.error('Error adding blog post:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
