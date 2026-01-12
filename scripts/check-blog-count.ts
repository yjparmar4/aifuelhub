
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const publishedCount = await prisma.blogPost.count({
        where: { published: true }
    })

    const totalCount = await prisma.blogPost.count()

    console.log(`Total Blog Posts: ${totalCount}`)
    console.log(`Published Blog Posts: ${publishedCount}`)

    const posts = await prisma.blogPost.findMany({
        select: { title: true, published: true, slug: true }
    })
    console.log('--- Posts ---')
    posts.forEach(p => console.log(`${p.published ? '[PUBLISHED]' : '[DRAFT]'} ${p.title} (${p.slug})`))
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
