const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * Phase 4: Internal Linking Optimization
 * 
 * Creates a strategic internal linking structure:
 * - Pillar content → Cluster content
 * - Tool pages ↔ Blog posts
 * - Related blog posts
 * - Category pages → Tool/Blog pages
 */

interface InternalLink {
    fromSlug: string
    toSlug: string
    anchorText: string
    context: string
    linkType: 'pillar-to-cluster' | 'cluster-to-pillar' | 'related' | 'tool-mention'
}

// Define pillar content and cluster relationships
const contentMap = {
    pillars: [
        {
            slug: 'youtube-automation-with-ai-guide',
            topic: 'YouTube Automation',
            clusters: [
                'best-ai-video-generators-2026',
                'openai-sora-guide-release-date-pricing',
                'free-ai-tools-2026'
            ],
            relatedTools: ['runway', 'pika', 'openai-sora', 'elevenlabs', 'pictory']
        },
        {
            slug: 'best-ai-video-generators-2026',
            topic: 'AI Video Generation',
            clusters: [
                'openai-sora-guide-release-date-pricing',
                'youtube-automation-with-ai-guide'
            ],
            relatedTools: ['runway', 'pika', 'openai-sora', 'kling-ai', 'luma-dream-machine']
        },
        {
            slug: 'free-ai-tools-2026',
            topic: 'Free AI Tools',
            clusters: [
                'youtube-automation-with-ai-guide',
                'future-of-ai-trends-2026'
            ],
            relatedTools: ['chatgpt', 'canva', 'perplexity-ai', 'gemini']
        }
    ]
}

// Internal linking strategy
const internalLinks: InternalLink[] = [
    // YouTube Automation → Video Generators
    {
        fromSlug: 'youtube-automation-with-ai-guide',
        toSlug: 'best-ai-video-generators-2026',
        anchorText: 'best AI video generators',
        context: 'For video creation, check out our comprehensive guide to the',
        linkType: 'pillar-to-cluster'
    },
    // YouTube Automation → Sora Guide
    {
        fromSlug: 'youtube-automation-with-ai-guide',
        toSlug: 'openai-sora-guide-release-date-pricing',
        anchorText: 'OpenAI Sora',
        context: 'You can also use',
        linkType: 'tool-mention'
    },
    // Video Generators → YouTube Automation
    {
        fromSlug: 'best-ai-video-generators-2026',
        toSlug: 'youtube-automation-with-ai-guide',
        anchorText: 'YouTube automation',
        context: 'These tools are perfect for',
        linkType: 'cluster-to-pillar'
    },
    // Video Generators → Sora Guide
    {
        fromSlug: 'best-ai-video-generators-2026',
        toSlug: 'openai-sora-guide-release-date-pricing',
        anchorText: 'Complete OpenAI Sora Guide',
        context: 'Read our',
        linkType: 'related'
    },
    // Sora Guide → Video Generators
    {
        fromSlug: 'openai-sora-guide-release-date-pricing',
        toSlug: 'best-ai-video-generators-2026',
        anchorText: '7 Best AI Video Generators',
        context: 'Compare Sora with other tools in our',
        linkType: 'cluster-to-pillar'
    },
    // AI Trends → Free Tools
    {
        fromSlug: 'future-of-ai-trends-2026',
        toSlug: 'free-ai-tools-2026',
        anchorText: 'free AI tools',
        context: 'Explore these trends yourself with',
        linkType: 'related'
    },
    // Free Tools → AI Trends
    {
        fromSlug: 'free-ai-tools-2026',
        toSlug: 'future-of-ai-trends-2026',
        anchorText: 'AI trends shaping 2026',
        context: 'These tools reflect the',
        linkType: 'related'
    },
    // Free Tools → YouTube Automation
    {
        fromSlug: 'free-ai-tools-2026',
        toSlug: 'youtube-automation-with-ai-guide',
        anchorText: 'YouTube automation with AI',
        context: 'Many of these free tools are perfect for',
        linkType: 'related'
    }
]

async function main() {
    console.log('🚀 Phase 4: Internal Linking Optimization...\n')

    // Analyze current blog posts
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        select: {
            slug: true,
            title: true,
            content: true,
            category: { select: { slug: true, name: true } },
            tags: { select: { slug: true, name: true } }
        }
    })

    console.log(`📊 Analyzing ${posts.length} published blog posts...\n`)

    // Content map visualization
    console.log('🗺️  Content Structure:')
    console.log('')
    contentMap.pillars.forEach(pillar => {
        const pillarPost = posts.find(p => p.slug === pillar.slug)
        if (pillarPost) {
            console.log(`📌 PILLAR: ${pillarPost.title}`)
            console.log(`   Topic: ${pillar.topic}`)
            console.log(`   Clusters: ${pillar.clusters.length}`)
            pillar.clusters.forEach(clusterSlug => {
                const clusterPost = posts.find(p => p.slug === clusterSlug)
                if (clusterPost) {
                    console.log(`     └─ ${clusterPost.title}`)
                }
            })
            console.log(`   Related Tools: ${pillar.relatedTools.join(', ')}`)
            console.log('')
        }
    })

    // Internal linking analysis
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔗 Internal Linking Strategy:\n')

    internalLinks.forEach((link, index) => {
        const fromPost = posts.find(p => p.slug === link.fromSlug)
        const toPost = posts.find(p => p.slug === link.toSlug)

        if (fromPost && toPost) {
            console.log(`${index + 1}. ${link.linkType}`)
            console.log(`   From: ${fromPost.title}`)
            console.log(`   To: ${toPost.title}`)
            console.log(`   Anchor: "${link.anchorText}"`)
            console.log(`   Context: "${link.context} [${link.anchorText}]..."`)
            console.log('')
        }
    })

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`✅ Internal Linking Plan: ${internalLinks.length} strategic links`)
    console.log('')
    console.log('📋 Link Type Breakdown:')
    const linkTypes = internalLinks.reduce((acc, link) => {
        acc[link.linkType] = (acc[link.linkType] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    Object.entries(linkTypes).forEach(([type, count]) => {
        console.log(`   ${type}: ${count} links`)
    })

    console.log('')
    console.log('🎯 SEO Benefits:')
    console.log('   ✅ Improves crawlability and indexing')
    console.log('   ✅ Distributes page authority (PageRank)')
    console.log('   ✅ Increases time on site and pages per session')
    console.log('   ✅ Enhances topical authority clustering')
    console.log('   ✅ Reduces bounce rate')
    console.log('')
    console.log('🔄 Next Steps:')
    console.log('1. Links are planned and mapped')
    console.log('2. These can be manually added to blog content')
    console.log('3. Or use a content processor to inject them')
    console.log('4. Monitor internal link clicks in GSC')
    console.log('5. Track ranking improvements for linked pages\n')
}

main()
    .catch((e) => {
        console.error('Fatal error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
