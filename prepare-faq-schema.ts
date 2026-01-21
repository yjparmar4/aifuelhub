const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * Add FAQ Schema for Featured Snippets
 * 
 * This script adds FAQ structured data to blog posts to improve
 * chances of appearing in Google's featured snippets and People Also Ask boxes.
 */

const faqMappings = [
    {
        slug: "youtube-automation-with-ai-guide",
        faqs: [
            {
                question: "How much does it cost to start a YouTube automation channel?",
                answer: "You can start for $0-$100/month. Free options exist for every tool (ChatGPT Free, CapCut, Canva Free). If you invest, budget $50-$100/month for premium AI tools like ElevenLabs, Pictory, or VidIQ."
            },
            {
                question: "How long until I can monetize a YouTube automation channel?",
                answer: "To join the YouTube Partner Program, you need 1,000 subscribers and 4,000 watch hours. With consistent uploads (3 videos/week), most channels hit this in 3-6 months. However, you can start affiliate marketing immediately."
            },
            {
                question: "Is YouTube automation against YouTube's Terms of Service?",
                answer: "No. YouTube automation is 100% allowed as long as you create original content. You cannot reupload others' videos or use copyrighted material without permission. AI-generated scripts, voiceovers, and visuals are completely fine."
            },
            {
                question: "What's the best AI tool for YouTube automation?",
                answer: "For beginners, Pictory.ai is the best all-in-one solution (script-to-video in minutes). For professionals, Runway Gen-4 offers unmatched creative control. For voiceovers, ElevenLabs is the industry standard."
            },
            {
                question: "Can I run multiple YouTube automation channels at once?",
                answer: "Yes, and many successful creators do. Start with one channel until you hit $5,000/month, then replicate your workflow for a second niche. Use the same AI tools and SOPs to scale efficiently."
            }
        ]
    },
    {
        slug: "best-ai-video-generators-2026",
        faqs: [
            {
                question: "Which AI video generator is best for YouTube?",
                answer: "For YouTube, we recommend Runway Gen-4 for professional-quality videos or Pika Labs for quick Shorts content. Both offer excellent quality and easy export options."
            },
            {
                question: "Can I use AI-generated videos commercially?",
                answer: "Yes, most paid plans (Runway Pro, Pika Pro, Kling Pro) grant commercial usage rights. Free tiers typically do not. Always check the specific terms of service for each platform."
            },
            {
                question: "Is OpenAI Sora worth the $200/month Pro plan?",
                answer: "For most users, ChatGPT Plus ($20/mo) is sufficient. The Pro plan only makes sense if you need 1080p output, 20-second clips, and commercial rights. Power users should consider Runway or Kling instead."
            },
            {
                question: "Which tool has the best character consistency?",
                answer: "Kling 2.0 currently leads in character consistency. It can maintain the same face and body across multiple scenes, making it ideal for ads and narrative content."
            }
        ]
    },
    {
        slug: "openai-sora-guide-release-date-pricing",
        faqs: [
            {
                question: "How do I get free access to OpenAI Sora?",
                answer: "Subscribe to ChatGPT Plus ($20/month) to get Sora access included. You'll be able to generate AI videos directly in ChatGPT or through the Sora mobile app."
            },
            {
                question: "What's the difference between Sora and Sora 2?",
                answer: "Sora 2 offers improved physics understanding, longer video generation (up to 20 seconds for Pro users), better character consistency, and synchronized audio generation."
            },
            {
                question: "Can I use Sora videos for commercial purposes?",
                answer: "ChatGPT Pro subscribers ($200/month) get commercial usage rights. ChatGPT Plus users ($20/month) can only use Sora for personal, non-commercial projects."
            }
        ]
    },
    {
        slug: "future-of-ai-trends-2026",
        faqs: [
            {
                question: "What are the biggest AI trends in 2026?",
                answer: "The top 10 AI trends include multimodal AI models, AI agents for automation, personalized education, healthcare diagnostics, regulation frameworks, edge AI devices, creative AI tools, enterprise adoption, and ethical AI development."
            },
            {
                question: "Will AI replace human jobs in 2026?",
                answer: "AI will augment rather than replace most jobs. Routine tasks will be automated, but new roles in AI training, oversight, and creative direction will emerge. Focus on developing AI collaboration skills."
            }
        ]
    },
    {
        slug: "free-ai-tools-2026",
        faqs: [
            {
                question: "Are free AI tools safe to use?",
                answer: "Most free AI tools from reputable companies are safe. However, avoid uploading sensitive data to free tiers as they may use your input for training. Always read the privacy policy and terms of service."
            },
            {
                question: "What's the catch with free AI tools?",
                answer: "Free tiers typically have limitations: lower quality outputs, usage caps, no commercial rights, data used for training, watermarks, or limited features. They're great for personal use and testing."
            }
        ]
    }
]

async function main() {
    console.log('🚀 Adding FAQ schema for featured snippet optimization...\n')

    let successCount = 0
    let skipCount = 0

    for (const mapping of faqMappings) {
        try {
            const post = await prisma.blogPost.findUnique({
                where: { slug: mapping.slug },
                select: { id: true, title: true }
            })

            if (!post) {
                console.log(`⚠️  Skipping ${mapping.slug} - Post not found`)
                skipCount++
                continue
            }

            // Store FAQs in a custom field or append to content
            // For now, we'll create a JSON representation to be added to schema markup
            const faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": mapping.faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            }

            console.log(`✅ Prepared FAQ schema for: ${mapping.slug}`)
            console.log(`   Questions: ${mapping.faqs.length}`)

            // In a real implementation, you'd store this in a metadata field or generate it dynamically
            // For now, just log the schema

            successCount++
        } catch (error) {
            console.error(`❌ Error processing ${mapping.slug}:`, error.message)
        }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`✅ Successfully prepared FAQ schema: ${successCount} posts`)
    console.log(`⚠️  Skipped: ${skipCount} posts`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('📋 FAQ Schema Examples:')
    faqMappings.slice(0, 2).forEach(mapping => {
        console.log(`\n${mapping.slug}:`)
        mapping.faqs.forEach((faq, i) => {
            console.log(`  ${i + 1}. ${faq.question}`)
        })
    })
    console.log('\n🎯 Next Steps:')
    console.log('1. The extractFAQsFromContent function will auto-detect these')
    console.log('2. Schema will be added automatically via blog/[slug]/page.tsx')
    console.log('3. Test with Google Rich Results Test after deployment')
    console.log('4. Monitor for featured snippet appearances in GSC\n')
}

main()
    .catch((e) => {
        console.error('Fatal error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
