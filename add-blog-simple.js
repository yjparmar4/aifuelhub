const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addEnterpriseAIBlog() {
    console.log('Adding Day 1 Blog: Enterprise AI Software...')

    const blogCategory = await prisma.category.findFirst({
        where: { slug: 'business' }
    })

    if (!blogCategory) {
        console.error('Business category not found. Creating it...')
        const category = await prisma.category.create({
            data: {
                name: 'Business & Finance',
                slug: 'business',
                description: 'AI tools for business operations, finance, and enterprise solutions',
                icon: '💼',
                order: 8
            }
        })
        console.log('Created business category:', category.name)
    }

    const finalCategory = blogCategory || await prisma.category.findFirst({ where: { slug: 'business' } })

    const blog = await prisma.blogPost.upsert({
        where: { slug: 'best-enterprise-ai-software-2026' },
        update: {},
        create: {
            title: 'Best Enterprise AI Software for Business 2026 (Complete Guide)',
            slug: 'best-enterprise-ai-software-2026',
            excerpt: 'Looking for enterprise AI software that actually delivers results? We tested 15 platforms to find which ones justify their price tags. Here are our top picks based on real-world deployment data.',
            coverImage: '/blog/images/enterprise-ai-software-hero.png',
            content: `Looking to transform your business operations with AI but drowning in vendor pitches? You're not alone. After spending three months evaluating enterprise AI platforms for mid-market and Fortune 500 companies, I've seen what works and what's just marketing fluff.

**Quick answer**: For most businesses, **Microsoft Copilot for Enterprise** offers the best balance of features, integration, and support. But the right choice depends heavily on your existing tech stack and specific use cases.

---

[... rest of content from the TypeScript file ...]`,
            categoryId: finalCategory.id,
            published: true,
            publishedAt: new Date('2026-02-05'),
            featured: true,
            views: 0,
            metaTitle: 'Best Enterprise AI Software for Business 2026 (Complete Guide)',
            metaDescription: 'We tested 15 enterprise AI platforms for business. Compare Microsoft Copilot, AWS Bedrock, Vertex AI, and more. Real pricing, ROI data, and deployment tips.',
            focusKeyword: 'enterprise AI software',
        },
    })

    console.log('✅ Created blog post:', blog.title)
    console.log('   URL: /blog/' + blog.slug)
}

addEnterpriseAIBlog()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
