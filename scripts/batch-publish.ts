/**
 * Batch Blog Publisher
 * Publishes multiple blog posts at once
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface PublishOptions {
    slugs?: string[]
    startDay?: number
    endDay?: number
    publishAll?: boolean
}

async function publishBlogs(options: PublishOptions): Promise<void> {
    let blogs

    if (options.slugs && options.slugs.length > 0) {
        // Publish specific slugs
        blogs = await prisma.blogPost.findMany({
            where: {
                slug: { in: options.slugs },
                published: false
            }
        })
    } else if (options.startDay && options.endDay) {
        // Publish by day range (based on publishedAt date)
        blogs = await prisma.blogPost.findMany({
            where: {
                published: false
            },
            orderBy: {
                createdAt: 'asc'
            },
            skip: options.startDay - 1,
            take: options.endDay - options.startDay + 1
        })
    } else if (options.publishAll) {
        // Publish all unpublished
        blogs = await prisma.blogPost.findMany({
            where: { published: false }
        })
    } else {
        console.log('❌ No valid publish options provided')
        return
    }

    if (blogs.length === 0) {
        console.log('ℹ️  No unpublished blogs found matching criteria')
        return
    }

    console.log(`\n📤 Publishing ${blogs.length} blog posts...\n`)

    for (const blog of blogs) {
        await prisma.blogPost.update({
            where: { id: blog.id },
            data: {
                published: true,
                publishedAt: new Date()
            }
        })
        console.log(`✅ Published: ${blog.title}`)
    }

    console.log(`\n🎉 Successfully published ${blogs.length} blog posts!`)
}

// CLI execution
const args = process.argv.slice(2)

if (args.includes('--help') || args.length === 0) {
    console.log(`
╔════════════════════════════════════════════╗
║     Batch Blog Publisher - Usage          ║
╚════════════════════════════════════════════╝

Examples:
  
  # Publish specific blog posts by slug
  npm run batch-publish -- --slugs slug1,slug2,slug3
  
  # Publish a range of posts (e.g., Week 1: Days 1-7)
  npm run batch-publish -- --start 1 --end 7
  
  # Publish all unpublished posts
  npm run batch-publish -- --all
  
  # Publish a specific month (e.g., Month 1: Days 1-30)
  npm run batch-publish -- --start 1 --end 30
`)
    process.exit(0)
}

const options: PublishOptions = {}

// Parse arguments
for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case '--slugs':
            options.slugs = args[i + 1]?.split(',')
            i++
            break
        case '--start':
            options.startDay = parseInt(args[i + 1])
            i++
            break
        case '--end':
            options.endDay = parseInt(args[i + 1])
            i++
            break
        case '--all':
            options.publishAll = true
            break
    }
}

publishBlogs(options)
    .catch(console.error)
    .finally(() => prisma.$disconnect())
