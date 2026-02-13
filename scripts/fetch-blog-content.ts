import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const blog = await prisma.blogPost.findUnique({
        where: { slug: 'youtube-rpm-vs-cpm-explained' },
        select: {
            title: true,
            slug: true,
            excerpt: true,
            focusKeyword: true,
            metaTitle: true,
            metaDescription: true,
            content: true
        }
    })

    if (!blog) {
        console.log('Blog post not found!')
        return
    }

    console.log('=== METADATA ===')
    console.log('Title:', blog.title)
    console.log('Slug:', blog.slug)
    console.log('Excerpt:', blog.excerpt)
    console.log('Focus Keyword:', blog.focusKeyword)
    console.log('Meta Title:', blog.metaTitle)
    console.log('Meta Description:', blog.metaDescription)
    console.log('')
    console.log('=== CONTENT (first 5000 chars) ===')
    console.log(blog.content?.substring(0, 5000))
    console.log('')
    console.log('=== CONTENT LENGTH ===')
    console.log(blog.content?.length, 'characters')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
