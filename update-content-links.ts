const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function updateInternalLinks() {
    const targetSlug = "ai-transforming-small-business-operations-2026"
    const targetLink = `[AI for Small Business] (/blog/${targetSlug})`

    // 1. Update "Best Enterprise AI Software" post
    const enterpriseSlug = "best-enterprise-ai-software-2026"
    const enterprisePost = await prisma.blogPost.findUnique({ where: { slug: enterpriseSlug } })

    if (enterprisePost) {
        let content = enterprisePost.content
        const searchPhrase = "For small businesses (under 100 employees)"

        if (content.includes(searchPhrase) && !content.includes(targetSlug)) {
            // Inject link more naturally
            const replacement = `For small businesses (under 100 employees), as we detail in our guide on ${targetLink},`
            content = content.replace(searchPhrase, replacement)

            await prisma.blogPost.update({
                where: { slug: enterpriseSlug },
                data: { content }
            })
            console.log(`Updated link in: ${enterpriseSlug}`)
        }
    }

    // 2. Update "Ecommerce AI" post
    const ecommerceSlug = "scale-shopify-ai-agents-2026"
    const ecommercePost = await prisma.blogPost.findUnique({ where: { slug: ecommerceSlug } })

    if (ecommercePost) {
        let content = ecommercePost.content
        const searchPhrase = "The 300% growth we saw wasn't magic."

        if (content.includes(searchPhrase) && !content.includes(targetSlug)) {
            const replacement = `${searchPhrase} It was a specific application of ${targetLink} principles.`
            content = content.replace(searchPhrase, replacement)

            await prisma.blogPost.update({
                where: { slug: ecommerceSlug },
                data: { content }
            })
            console.log(`Updated link in: ${ecommerceSlug}`)
        }
    }
}

updateInternalLinks()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
