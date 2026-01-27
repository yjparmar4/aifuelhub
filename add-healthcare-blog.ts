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

async function addHealthcareBlog() {
    console.log('Adding AI Healthcare blog post...')

    const filePath = path.join(process.cwd(), 'ai_healthcare_blog.json')

    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`)
        return
    }

    const data: BlogPostData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    // Find or create category
    let category = await prisma.category.findFirst({
        where: { slug: 'business' }
    })

    if (!category) {
        category = await prisma.category.findFirst()
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
    console.log('\nHealthcare blog post added successfully!')
}

addHealthcareBlog()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
