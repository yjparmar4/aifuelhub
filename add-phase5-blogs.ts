import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface BlogPostData {
    title: string
    slug: string
    excerpt: string
    metaTitle: string
    metaDescription: string
    focusKeyword: string
    category: string
    tags: string[]
    content: string
}

async function addPhase5BlogPosts() {
    console.log('Adding Phase 5 blog posts...')

    // Read the JSON files
    const blogFiles = [
        'phase5_blog_1_comparison.json',
        'phase5_blog_2_best_freelancers.json',
        'phase5_blog_3_tutorial.json'
    ]

    for (const file of blogFiles) {
        const filePath = path.join(process.cwd(), file)

        if (!fs.existsSync(filePath)) {
            console.log(`File ${file} not found, skipping...`)
            continue
        }

        const data: BlogPostData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

        // Find or create category
        let category = await prisma.category.findFirst({
            where: { name: { contains: data.category, mode: 'insensitive' } }
        })

        if (!category) {
            // Default to writing category
            category = await prisma.category.findFirst({
                where: { slug: 'writing' }
            })
        }

        // Find or create tags
        const tagRecords = await Promise.all(
            data.tags.map(async (tagName) => {
                const slug = tagName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                return prisma.tag.upsert({
                    where: { slug },
                    update: {},
                    create: { name: tagName, slug }
                })
            })
        )

        // Create or update blog post
        const existingPost = await prisma.blogPost.findUnique({
            where: { slug: data.slug }
        })

        // Determine cover image based on slug
        let coverImage = '/placeholder-blog.png'
        if (data.slug.includes('chatgpt-vs-claude')) {
            coverImage = '/blog/images/chatgpt-vs-claude-vs-gemini-hero.png'
        } else if (data.slug.includes('freelancers')) {
            coverImage = '/blog/images/freelancer-ai-productivity-hero.png'
        } else if (data.slug.includes('how-to-use-ai')) {
            coverImage = '/blog/images/ai-blog-writing-blueprint-hero.png'
        }

        if (existingPost) {
            console.log(`Post "${data.slug}" already exists, updating...`)
            await prisma.blogPost.update({
                where: { slug: data.slug },
                data: {
                    title: data.title,
                    content: data.content,
                    excerpt: data.excerpt,
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    focusKeyword: data.focusKeyword,
                    coverImage: coverImage,
                    categoryId: category?.id,
                    updatedAt: new Date(),
                    tags: {
                        set: tagRecords.map(tag => ({ id: tag.id }))
                    }
                }
            })
        } else {
            console.log(`Creating new post: "${data.title}"`)
            await prisma.blogPost.create({
                data: {
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    excerpt: data.excerpt,
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    focusKeyword: data.focusKeyword,
                    coverImage: coverImage,
                    categoryId: category?.id,
                    published: true,
                    publishedAt: new Date(),
                    tags: {
                        connect: tagRecords.map(tag => ({ id: tag.id }))
                    }
                }
            })
        }

        console.log(`✓ Added: ${data.title}`)
    }

    console.log('\nPhase 5 blog posts added successfully!')
}

addPhase5BlogPosts()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
