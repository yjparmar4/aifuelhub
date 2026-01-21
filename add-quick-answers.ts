const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * Enhanced Content Update Script - Phase 2
 * 
 * Adds QuickAnswer sections and optimizes headings for featured snippets
 */

const contentUpdates = [
    {
        slug: "youtube-automation-with-ai-guide",
        quickAnswer: {
            question: "What is YouTube automation and how does it work?",
            answer: "YouTube automation is the process of creating and uploading videos without doing manual work yourself by leveraging AI tools for scriptwriting, voiceovers, and video creation. Successful automation channels like TopFives (8M+ subscribers) generate $10K–$50K/month using tools like ChatGPT for scripts, ElevenLabs for voiceovers, and Runway for video creation, all without showing a host's face."
        },
        h2Updates: [
            { old: "What is YouTube Automation?", new: "What is YouTube Automation? (And How It Actually Works)" },
            { old: "Choose a Profitable Niche", new: "How Do You Choose a Profitable Niche for YouTube Automation?" },
            { old: "Create Your First Video", new: "How to Create Your First YouTube Video Using AI (No Filming Required)" }
        ]
    },
    {
        slug: "best-ai-video-generators-2026",
        quickAnswer: {
            question: "What is the best AI video generator in 2026?",
            answer: "Runway Gen-4 is the best overall AI video generator in 2026 for professional creators, offering industry-leading camera controls and keyframe precision. For beginners, Pika Labs 2.5 is ideal with fast generation and affordable pricing. Kling 2.0 leads in photorealistic character consistency, while OpenAI Sora offers the best value if you already have ChatGPT Plus ($20/month)."
        }
    },
    {
        slug: "openai-sora-guide-release-date-pricing",
        quickAnswer: {
            question: "How much does OpenAI Sora cost?",
            answer: "OpenAI Sora is included with ChatGPT Plus at $20/month (limited to 480p, 5-second videos) or ChatGPT Pro at $200/month (1080p, 20-second videos with commercial rights). There's no separate Sora subscription - you access it through your existing ChatGPT plan via the chat interface or the Sora mobile app."
        }
    },
    {
        slug: "future-of-ai-trends-2026",
        quickAnswer: {
            question: "What are the biggest AI trends in 2026?",
            answer: "The 10 dominant AI trends in 2026 include multimodal AI models that understand text, images, and video simultaneously; AI agents for workflow automation; personalized AI tutors revolutionizing education; AI-powered medical diagnostics; comprehensive AI regulation frameworks; edge AI devices processing data locally; generative AI for creative professionals; enterprise-wide AI adoption; and ethical AI development focusing on bias reduction and transparency."
        }
    },
    {
        slug: "free-ai-tools-2026",
        quickAnswer: {
            question: "What are the best free AI tools in 2026?",
            answer: "The top free AI tools in 2026 include ChatGPT Free (conversational AI), Canva Free (design with AI features), CapCut (video editing with AI auto-captions), Perplexity AI (AI-powered search), Gemini (Google's multimodal AI), Leonardo AI (image generation), and Descript (audio/video editing). These tools offer substantial free tiers with no credit card required, saving users $500+/month compared to paid alternatives."
        }
    }
]

async function main() {
    console.log('🚀 Phase 2: Adding QuickAnswer sections for featured snippets...\n')

    let successCount = 0
    let skipCount = 0

    for (const update of contentUpdates) {
        try {
            const post = await prisma.blogPost.findUnique({
                where: { slug: update.slug },
                select: { id: true, content: true, title: true }
            })

            if (!post) {
                console.log(`⚠️  Skipping ${update.slug} - Post not found`)
                skipCount++
                continue
            }

            let updatedContent = post.content

            // Check if QuickAnswer already exists (to avoid duplicates)
            if (!updatedContent.includes('<QuickAnswer')) {
                // Add QuickAnswer import comment at the very top
                const qaComment = `<!-- 
  SEO: QuickAnswer component for featured snippets
  Import: import { QuickAnswer } from '@/components/seo'
-->\n\n`

                // Find the first heading or paragraph and insert QuickAnswer before it
                const firstHeadingMatch = updatedContent.match(/^(#[^#].*$)/m)
                if (firstHeadingMatch) {
                    const insertPosition = updatedContent.indexOf(firstHeadingMatch[0])
                    updatedContent =
                        updatedContent.slice(0, insertPosition) +
                        qaComment +
                        `<QuickAnswer \n  question="${update.quickAnswer.question}"\n  answer="${update.quickAnswer.answer}"\n/>\n\n` +
                        updatedContent.slice(insertPosition)
                }
            }

            // Update H2 headings if specified
            if (update.h2Updates) {
                update.h2Updates.forEach(({ old: oldHeading, new: newHeading }) => {
                    updatedContent = updatedContent.replace(`## ${oldHeading}`, `## ${newHeading}`)
                })
            }

            // Save updates
            await prisma.blogPost.update({
                where: { slug: update.slug },
                data: {
                    content: updatedContent,
                    updatedAt: new Date()
                }
            })

            console.log(`✅ Updated: ${update.slug}`)
            console.log(`   QuickAnswer: "${update.quickAnswer.question}"`)
            if (update.h2Updates) {
                console.log(`   H2 Updates: ${update.h2Updates.length} headings optimized`)
            }
            console.log('')

            successCount++
        } catch (error) {
            console.error(`❌ Error updating ${update.slug}:`, error.message)
        }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`✅ Successfully updated: ${successCount} posts`)
    console.log(`⚠️  Skipped: ${skipCount} posts`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('🎯 Featured Snippet Optimization Complete!')
    console.log('📋 What was added:')
    console.log('   - QuickAnswer components at top of content')
    console.log('   - Question-format H2 headings')
    console.log('   - Concise, direct answers (40-60 words)')
    console.log('   - Schema.org Question/Answer markup\n')
    console.log('🔄 Next Steps:')
    console.log('1. The blog post renderer needs to support JSX components')
    console.log('2. Test with Google Rich Results Test')
    console.log('3. Monitor GSC for featured snippet appearances')
    console.log('4. Push changes to GitHub\n')
}

main()
    .catch((e) => {
        console.error('Fatal error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
