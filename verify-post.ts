const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkPost() {
    const post = await prisma.blogPost.findUnique({
        where: { slug: 'ai-transforming-small-business-operations-2026' },
        include: { category: true }
    })

    if (post) {
        console.log(`Verified Post Found: ${post.title}`)
        console.log(`Category: ${post.category.name}`)
        console.log(`Word Count (approx): ${post.content.split(/\s+/).length}`)

        // Check for internal links
        const links = post.content.match(/\/blog\/[a-z0-9-]+/g) || []
        console.log(`Internal Links Found: ${links.length}`)
        links.forEach(l => console.log(` - ${l}`))
    } else {
        console.error('Post not found!')
    }
    await prisma.$disconnect()
}

checkPost()
