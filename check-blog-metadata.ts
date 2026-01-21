const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        const posts = await prisma.blogPost.findMany({
            select: {
                slug: true,
                title: true,
                metaTitle: true,
                metaDescription: true,
                focusKeyword: true,
                publishedAt: true,
            },
            orderBy: { publishedAt: 'desc' },
            take: 10
        })

        console.log(JSON.stringify(posts, null, 2))
    } catch (error) {
        console.error('Error:', error.message)
    }
}

main().finally(() => prisma.$disconnect())
