/**
 * Single Blog Post Publisher
 * Publishes or unpublishes a single blog post
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function publishBlog(slug: string, unpublish: boolean = false): Promise<void> {
    const blog = await prisma.blogPost.findUnique({
        where: { slug }
    })

    if (!blog) {
        console.log(`❌ Blog post not found: ${slug}`)
        return
    }

    await prisma.blogPost.update({
        where: { slug },
        data: {
            published: !unpublish,
            publishedAt: !unpublish ? new Date() : blog.publishedAt
        }
    })

    if (unpublish) {
        console.log(`✅ Unpublished: ${blog.title}`)
    } else {
        console.log(`✅ Published: ${blog.title}`)
        console.log(`   URL: /blog/${blog.slug}`)
    }
}

// CLI execution
const args = process.argv.slice(2)

if (args.includes('--help') || args.length === 0) {
    console.log(`
╔════════════════════════════════════════════╗
║     Single Blog Publisher - Usage         ║
╚════════════════════════════════════════════╝

Examples:

  # Publish a blog post
  npm run publish-blog -- my-blog-slug

  # Unpublish a blog post
  npm run publish-blog -- my-blog-slug --unpublish
`)
    process.exit(0)
}

const slug = args[0]
const unpublish = args.includes('--unpublish')

publishBlog(slug, unpublish)
    .catch(console.error)
    .finally(() => prisma.$disconnect())
