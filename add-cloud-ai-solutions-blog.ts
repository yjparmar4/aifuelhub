import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addCloudAISolutionsBlog() {
    console.log('Adding Blog: Cloud AI Solutions - AWS vs Azure vs Google Cloud AI Compared...')

    // Find or create the business/cloud category
    let blogCategory = await prisma.category.findFirst({
        where: { slug: 'business' }
    })

    if (!blogCategory) {
        blogCategory = await prisma.category.findFirst({
            where: { slug: 'ai-business-tools' }
        })
    }

    if (!blogCategory) {
        console.error('Business category not found, creating one...')
        blogCategory = await prisma.category.create({
            data: {
                name: 'Business',
                slug: 'business',
                description: 'AI tools and solutions for business operations',
                published: true
            }
        })
    }

    const blog = await prisma.blogPost.upsert({
        where: { slug: 'cloud-ai-solutions-aws-azure-google-cloud-compared' },
        update: {
            title: 'Cloud AI Solutions: AWS vs Azure vs Google Cloud AI Compared',
            excerpt: 'Comprehensive 2026 comparison of the top 3 cloud AI platforms. Discover which cloud AI solution—AWS, Azure, or Google Cloud—best fits your enterprise needs, budget, and technical requirements.',
            coverImage: '/blog/images/cloud_ai_comparison_hero.png',
            content: `
# Cloud AI Solutions: AWS vs Azure vs Google Cloud AI Compared

**Last Updated: February 9, 2026**

Choosing the right cloud AI platform can make or break your AI strategy. With AWS, Azure, and Google Cloud all offering compelling AI services, the decision isn't straightforward—and getting it wrong means wasted budgets, integration headaches, and missed opportunities.

