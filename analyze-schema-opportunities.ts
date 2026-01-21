const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * Phase 3: Intelligent Schema Detection and Application
 * 
 * Analyzes blog content and automatically applies:
 * - HowTo schema for tutorial content
 * - FAQ schema for Q&A content (already done)
 * - ItemList schema for listicle content
 * - Speakable markup for voice search
 */

interface SchemaAnalysis {
    hasHowTo: boolean
    hasFAQ: boolean
    hasListicle: boolean
    hasSteps: boolean
    listCount: number
    stepCount: number
    faqCount: number
}

function analyzeContentForSchemas(content: string): SchemaAnalysis {
    const analysis: SchemaAnalysis = {
        hasHowTo: false,
        hasFAQ: false,
        hasListicle: false,
        hasSteps: false,
        listCount: 0,
        stepCount: 0,
        faqCount: 0
    }

    // Detect HowTo content
    const stepPatterns = [
        /(?:Step\s*\d+|###\s*Step\s*\d+)/gi,
        /(?:^\d+\.\s*[A-Z])/gm
    ]

    stepPatterns.forEach(pattern => {
        const matches = content.match(pattern)
        if (matches && matches.length >= 3) {
            analysis.hasHowTo = true
            analysis.hasSteps = true
            analysis.stepCount = Math.max(analysis.stepCount, matches.length)
        }
    })

    // Detect FAQ content
    const faqPatterns = [
        /##\s*(FAQ|Frequently Asked Questions|Common Questions)/i,
        /\*\*Q:|Question:/gi
    ]

    faqPatterns.forEach(pattern => {
        if (pattern.test(content)) {
            analysis.hasFAQ = true
            const questionMatches = content.match(/\?/g)
            if (questionMatches) {
                analysis.faqCount = Math.min(questionMatches.length, 10)
            }
        }
    })

    // Detect Listicle content
    const titleMatch = content.match(/^#\s*\d+\s+(?:Best|Top|Essential)/i)
    if (titleMatch) {
        analysis.hasListicle = true

        // Count numbered items in ## headings
        const numberedHeadings = content.match(/^##\s*\d+\./gm)
        if (numberedHeadings) {
            analysis.listCount = numberedHeadings.length
        }
    }

    return analysis
}

const blogSchemaUpdates = [
    {
        slug: "youtube-automation-with-ai-guide",
        expectedSchemas: ["HowTo", "FAQ", "ItemList"],
        rationale: "Tutorial with steps, FAQs, and list of tools"
    },
    {
        slug: "best-ai-video-generators-2026",
        expectedSchemas: ["ItemList", "FAQ"],
        rationale: "Listicle (7 tools) with FAQs and comparisons"
    },
    {
        slug: "openai-sora-guide-release-date-pricing",
        expectedSchemas: ["FAQ", "HowTo"],
        rationale: "Guide with FAQs and how-to sections"
    },
    {
        slug: "future-of-ai-trends-2026",
        expectedSchemas: ["ItemList", "FAQ"],
        rationale: "10 trends list with FAQs"
    },
    {
        slug: "free-ai-tools-2026",
        expectedSchemas: ["ItemList", "FAQ"],
        rationale: "15 tools list with FAQs"
    }
]

async function main() {
    console.log('🚀 Phase 3: Schema Detection and Enhancement...\n')

    let analyzed = 0
    let enhanced = 0

    for (const update of blogSchemaUpdates) {
        try {
            const post = await prisma.blogPost.findUnique({
                where: { slug: update.slug },
                select: { id: true, title: true, content: true }
            })

            if (!post) {
                console.log(`⚠️  Skipping ${update.slug} - Post not found\n`)
                continue
            }

            // Analyze content
            const analysis = analyzeContentForSchemas(post.content)

            console.log(`📊 ${post.title}`)
            console.log(`   Detected Schemas:`)
            if (analysis.hasHowTo) console.log(`     ✅ HowTo (${analysis.stepCount} steps)`)
            if (analysis.hasFAQ) console.log(`     ✅ FAQ (${analysis.faqCount} questions)`)
            if (analysis.hasListicle) console.log(`     ✅ ItemList (${analysis.listCount} items)`)
            console.log(`   Expected: ${update.expectedSchemas.join(', ')}`)
            console.log(`   Rationale: ${update.rationale}`)
            console.log('')

            analyzed++

            // In production, you would save schema metadata here
            // For now, we're just analyzing and reporting

        } catch (error) {
            console.error(`❌ Error analyzing ${update.slug}:`, error.message)
        }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`✅ Analyzed: ${analyzed} posts`)
    console.log(`📋 Ready for schema enhancement`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    console.log('🎯 Schema Implementation Summary:')
    console.log('')
    console.log('**Already Implemented in schema.ts:**')
    console.log('  ✅ generateFAQSchema - FAQ structured data')
    console.log('  ✅ generateHowToSchema - Tutorial/guide schema')
    console.log('  ✅ generateItemListSchema - Listicle schema')
    console.log('  ✅ generateClaimReviewSchema - Fact-checking schema')
    console.log('  ✅ extractFAQsFromContent - Auto-detect FAQs')
    console.log('  ✅ extractHowToSteps - Auto-detect steps')
    console.log('')
    console.log('**Speakable Markup (Voice Search):**')
    console.log('  ✅ Already in generateBlogPostSchema')
    console.log('  ✅ Targets h1 and .speakable-summary selectors')
    console.log('')
    console.log('**What\'s Missing:**')
    console.log('  - Auto-apply schemas in blog/[slug]/page.tsx')
    console.log('  - Detect content type and add HowTo/ItemList schemas')
    console.log('  - Add .speakable-summary class to content')
    console.log('')
    console.log('🔄 Next Steps:')
    console.log('1. Schema infrastructure is ready (schema.ts complete)')
    console.log('2. Blog posts already have FAQ extraction')
    console.log('3. Need to add HowTo/ItemList detection to blog page')
    console.log('4. Test all schemas with Google Rich Results Test')
    console.log('5. Monitor for rich snippet appearances\n')
}

main()
    .catch((e) => {
        console.error('Fatal error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
