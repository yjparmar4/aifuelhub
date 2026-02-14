import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addAIChatbotsBusinessBlog() {
    console.log('Adding Blog: Best AI Chatbots for Business - Ultimate Comparison Guide...')

    // Find or create the business category
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
                name: 'Business & Finance',
                slug: 'business',
                description: 'AI tools and solutions for business operations and finance',
                published: true
            }
        })
    }

    const blog = await prisma.blogPost.upsert({
        where: { slug: 'best-ai-chatbots-for-business-comparison-guide' },
        update: {
            title: 'Best AI Chatbots for Business: Ultimate Comparison Guide (2026)',
            excerpt: 'We tested 10+ AI chatbots for business across customer support, sales, and internal operations. See real pricing, feature comparisons, and which chatbot delivers the best ROI for enterprises in the US, UK, Canada, and beyond.',
            coverImage: '/blog/images/ai_chatbots_business_hero.png',
            content: getContent(),
            categoryId: blogCategory.id,
            published: true,
            publishedAt: new Date('2026-02-12'),
            featured: false,
            views: 0,
            metaTitle: 'Best AI Chatbots for Business 2026 (Compared & Tested)',
            metaDescription: 'Compare the 10 best AI chatbots for business in 2026. Enterprise pricing, features, integrations, and ROI data to help you choose the right AI chatbot solution.',
            focusKeyword: 'AI chatbots for business',
        },
        create: {
            title: 'Best AI Chatbots for Business: Ultimate Comparison Guide (2026)',
            slug: 'best-ai-chatbots-for-business-comparison-guide',
            excerpt: 'We tested 10+ AI chatbots for business across customer support, sales, and internal operations. See real pricing, feature comparisons, and which chatbot delivers the best ROI for enterprises in the US, UK, Canada, and beyond.',
            coverImage: '/blog/images/ai_chatbots_business_hero.png',
            content: getContent(),
            categoryId: blogCategory.id,
            published: true,
            publishedAt: new Date('2026-02-12'),
            featured: false,
            views: 0,
            metaTitle: 'Best AI Chatbots for Business 2026 (Compared & Tested)',
            metaDescription: 'Compare the 10 best AI chatbots for business in 2026. Enterprise pricing, features, integrations, and ROI data to help you choose the right AI chatbot solution.',
            focusKeyword: 'AI chatbots for business',
        },
    })

    console.log('Created blog post:', blog.title)
    console.log('Blog slug:', blog.slug)
    console.log('Blog ID:', blog.id)
}

function getContent(): string {
    return `
# Best AI Chatbots for Business: Ultimate Comparison Guide (2026)

**Last Updated: February 12, 2026**

The global AI chatbot market is exploding—projected to reach $42 billion by 2028, according to [Statista](https://www.statista.com/). For businesses in the United States, United Kingdom, Canada, Germany, and Australia, choosing the right **AI chatbot for business** is no longer optional. It's a competitive necessity that directly impacts customer satisfaction, revenue, and operational costs.

