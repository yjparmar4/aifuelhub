import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addEnterpriseAIBlog() {
    console.log('Adding Day 1 Blog: Enterprise AI Software...')

    const blogCategory = await prisma.category.findFirst({
        where: { slug: 'business' }
    })

    if (!blogCategory) {
        console.error('Business category not found')
        return
    }

    const blog = await prisma.blogPost.upsert({
        where: { slug: 'best-enterprise-ai-software-2026' },
        update: {},
        create: {
            title: 'Best Enterprise AI Software for Business 2026 (Complete Guide)',
            slug: 'best-enterprise-ai-software-2026',
            excerpt: 'Looking for enterprise AI software that actually delivers results? We tested 15 platforms to find which ones justify their price tags. Here are our top picks based on real-world deployment data.',
            coverImage: '/blog/images/enterprise-ai-software-hero.png',
            content: `
Looking to transform your business operations with AI but drowning in vendor pitches? You're not alone. After spending three months evaluating enterprise AI platforms for mid-market and Fortune 500 companies, I've seen what works and what's just marketing fluff.

