const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function verifySEO() {
    console.log("Verifying Advanced SEO Implementation...\n")

    // 1. Verify Tags
    const slug = "ai-transforming-small-business-operations-2026"
    const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: { tags: true }
    })

    console.log(`[Tags] Post: ${post.title}`)
    if (post.tags.length > 0) {
        console.log(`[PASS] Tags found: ${post.tags.map(t => t.name).join(', ')}`)
    } else {
        console.error(`[FAIL] No tags found!`)
    }

    // 2. Verify Reciprocal Links
    const enterpriseSlug = "best-enterprise-ai-software-2026"
    const enterprisePost = await prisma.blogPost.findUnique({ where: { slug: enterpriseSlug } })
    const ecommerceSlug = "scale-shopify-ai-agents-2026"
    const ecommercePost = await prisma.blogPost.findUnique({ where: { slug: ecommerceSlug } })

    const targetLink = `/blog/${slug}`

    console.log("\n[Reciprocal Links]")

    if (enterprisePost && enterprisePost.content.includes(targetLink)) {
        console.log(`[PASS] Link found in 'Enterprise AI Software'`)
    } else {
        console.error(`[FAIL] Link NOT found in 'Enterprise AI Software'`)
    }

    if (ecommercePost && ecommercePost.content.includes(targetLink)) {
        console.log(`[PASS] Link found in 'Shopify AI Agents'`)
    } else {
        console.error(`[FAIL] Link NOT found in 'Shopify AI Agents'`)
    }

    // 3. Verify FAQ Structure
    console.log("\n[FAQ Schema]")
    const faqRegex = /### Q:.*?\n\*\*A:\*\*/s
    if (faqRegex.test(post.content)) {
        console.log(`[PASS] FAQ structure detected for automated Schema generation.`)
    } else {
        console.warn(`[WARN] FAQ structure might not match standard extractor.`)
    }

    await prisma.$disconnect()
}

verifySEO()
