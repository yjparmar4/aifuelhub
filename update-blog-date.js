const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function updateBlogDate() {
    console.log('Updating blog post date to current IST time...\n')

    const now = new Date()
    console.log('Current time (UTC):', now.toISOString())
    console.log('Current time (IST):', now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))

    const updated = await prisma.blogPost.update({
        where: { slug: 'best-enterprise-ai-software-2026' },
        data: {
            publishedAt: now,
            updatedAt: now
        },
        select: {
            title: true,
            publishedAt: true,
            updatedAt: true
        }
    })

    console.log('\n✅ Updated blog post:')
    console.log('   Title:', updated.title)
    console.log('   Published At (UTC):', updated.publishedAt)
    console.log('   Published At (IST):', new Date(updated.publishedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))
    console.log('   Updated At (UTC):', updated.updatedAt)
    console.log('   Updated At (IST):', new Date(updated.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))

    await prisma.$disconnect()

    console.log('\n✨ Blog post timestamp updated! Hard refresh your browser to see changes.')
}

updateBlogDate().catch(console.error)
