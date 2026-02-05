const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkBlog() {
    console.log('Checking for Day 1 blog post...\n')

    const blog = await prisma.blogPost.findUnique({
        where: { slug: 'best-enterprise-ai-software-2026' },
        select: {
            title: true,
            slug: true,
            publishedAt: true,
            published: true,
            featured: true
        }
    })

    if (blog) {
        console.log('✅ Blog post found in database:')
        console.log('   Title:', blog.title)
        console.log('   Slug:', blog.slug)
        console.log('   Published:', blog.published)
        console.log('   Featured:', blog.featured)
        console.log('   Published At:', blog.publishedAt)
        console.log('   IST Date:', blog.publishedAt ? new Date(blog.publishedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'Not set')
    } else {
        console.log('❌ Blog post NOT found in database')
    }

    console.log('\n\nAll published blogs (last 5):')
    const allBlogs = await prisma.blogPost.findMany({
        where: { published: true },
        select: {
            title: true,
            publishedAt: true
        },
        orderBy: { publishedAt: 'desc' },
        take: 5
    })

    allBlogs.forEach((b, i) => {
        console.log(`${i + 1}. ${b.title}`)
        console.log(`   Date: ${b.publishedAt ? new Date(b.publishedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'Not set'}\n`)
    })

    prisma.$disconnect()
}

checkBlog().catch(console.error)
