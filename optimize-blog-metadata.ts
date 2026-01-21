const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Optimized metadata for each blog post with CTR-focused titles and descriptions
const optimizedMetadata = [
    {
        slug: "youtube-automation-with-ai-guide",
        metaTitle: "YouTube Automation with AI: $10K/Month Guide (2026)",
        metaDescription: "Start a faceless YouTube automation channel using AI. Step-by-step tutorial with tools, niches, and monetization secrets. Beginner-friendly!"
    },
    {
        slug: "best-ai-video-generators-2026",
        metaTitle: "7 Best AI Video Generators 2026 (Better Than Sora?)",
        metaDescription: "Tested all major AI video tools. Compare Runway, Kling, Sora, Pika. Find the perfect tool for your budget and needs. Free trials available!"
    },
    {
        slug: "openai-sora-guide-release-date-pricing",
        metaTitle: "OpenAI Sora Guide: Release Date, Pricing & Free Access 2026",
        metaDescription: "Everything about OpenAI Sora video AI. Get free access through ChatGPT Plus. Complete pricing breakdown, features, and how to use it effectively."
    },
    {
        slug: "future-of-ai-trends-2026",
        metaTitle: "10 AI Trends That Will Dominate 2026 (Expert Predictions)",
        metaDescription: "From AGI breakthroughs to AI regulation, discover the biggest AI trends shaping 2026. Industry insights, market analysis, and what to expect."
    },
    {
        slug: "free-ai-tools-2026",
        metaTitle: "15 Free AI Tools You Didn't Know Existed (2026 Hidden Gems)",
        metaDescription: "Discover powerful free AI tools for content creation, coding, design & more. No credit card required. Save $500+/month with these alternatives."
    },
    {
        slug: "ahrefs-keyword-research-guide",
        metaTitle: "Ahrefs Keyword Research Tutorial: Find Low-Competition Keywords",
        metaDescription: "Master Ahrefs for SEO. Step-by-step guide to finding profitable keywords with low competition. Beginner to advanced strategies included."
    },
    {
        slug: "moz-pro-complete-tutorial",
        metaTitle: "Moz Pro Tutorial 2026: Complete SEO Guide (Worth $99/Month?)",
        metaDescription: "Learn Moz Pro's full potential. Keyword research, rank tracking, site audits & more. Honest review with real results and alternatives."
    },
    {
        slug: "geo-vs-seo-complete-guide",
        metaTitle: "GEO vs SEO: The Future of Search Optimization Explained (2026)",
        metaDescription: "Generative Engine Optimization (GEO) is changing SEO forever. Learn how to optimize for ChatGPT, Perplexity & AI search engines."
    },
    {
        slug: "semantic-seo-masterclass",
        metaTitle: "Semantic SEO Masterclass: Rank Higher with Topic Clusters 2026",
        metaDescription: "Go beyond keywords. Master semantic SEO with topic clusters, entities & semantic search. Real examples and proven strategies."
    },
    {
        slug: "voice-search-seo-optimization",
        metaTitle: "Voice Search SEO: Optimize for Alexa, Siri & Google (2026 Guide)",
        metaDescription: "50% of searches are voice-based. Learn how to rank for voice search with conversational keywords, featured snippets & local SEO."
    }
]

async function main() {
    console.log('🚀 Starting metadata optimization for CTR improvement...\n')

    let successCount = 0
    let skipCount = 0

    for (const metadata of optimizedMetadata) {
        try {
            // Check if post exists
            const post = await prisma.blogPost.findUnique({
                where: { slug: metadata.slug },
                select: { id: true, title: true, metaTitle: true, metaDescription: true }
            })

            if (!post) {
                console.log(`⚠️  Skipping ${metadata.slug} - Post not found`)
                skipCount++
                continue
            }

            // Update metadata
            await prisma.blogPost.update({
                where: { slug: metadata.slug },
                data: {
                    metaTitle: metadata.metaTitle,
                    metaDescription: metadata.metaDescription,
                    updatedAt: new Date() // Freshen the update timestamp
                }
            })

            console.log(`✅ Updated: ${metadata.slug}`)
            console.log(`   Title: ${metadata.metaTitle} (${metadata.metaTitle.length} chars)`)
            console.log(`   Desc:  ${metadata.metaDescription} (${metadata.metaDescription.length} chars)\n`)

            successCount++
        } catch (error) {
            console.error(`❌ Error updating ${metadata.slug}:`, error.message)
        }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`✅ Successfully updated: ${successCount} posts`)
    console.log(`⚠️  Skipped: ${skipCount} posts`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('🎯 Next Steps:')
    console.log('1. Push changes to GitHub')
    console.log('2. Deploy to production')
    console.log('3. Submit sitemap to Google Search Console')
    console.log('4. Request indexing for updated posts')
    console.log('5. Monitor CTR in GSC after 3-7 days\n')
}

main()
    .catch((e) => {
        console.error('Fatal error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
