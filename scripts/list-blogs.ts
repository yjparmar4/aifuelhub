import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Fetching all blog slugs...')
    const blogs = await prisma.blogPost.findMany({
        select: {
            title: true,
            slug: true
        }
    })

    console.log(`Found ${blogs.length} blog posts.`)
    console.log('--------------------------------------------------')
    blogs.forEach(b => {
        console.log(`${b.slug} : ${b.title}`)
    })
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
