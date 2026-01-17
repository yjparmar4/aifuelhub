/**
 * FAQ Schema Enhancement Script
 * Adds FAQ schema to blog posts to trigger rich snippets in Google SERP
 * Run with: npx ts-node prisma/add-faq-schema.ts
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// FAQs for high-impression blog posts
const blogFAQs: Record<string, { question: string; answer: string }[]> = {
    'openai-sora-guide-release-date-pricing': [
        {
            question: "When is OpenAI Sora releasing?",
            answer: "OpenAI Sora is now available as of December 2024 for ChatGPT Pro subscribers ($200/mo) and Plus subscribers ($20/mo) with limited access. General availability is expected in Q1 2026."
        },
        {
            question: "How much does OpenAI Sora cost?",
            answer: "Sora is included with ChatGPT Pro ($200/month) with priority access, and ChatGPT Plus ($20/month) with limited credits. There is no standalone Sora subscription currently."
        },
        {
            question: "Is OpenAI Sora free?",
            answer: "No, Sora is not free. The cheapest way to access Sora is through ChatGPT Plus at $20/month, which includes limited video generation credits."
        },
        {
            question: "What are free alternatives to OpenAI Sora?",
            answer: "Free alternatives to Sora include Runway Gen-2 (free tier), Pika Labs (free tier), and Luma Dream Machine. These offer limited free video generation capabilities."
        }
    ],
    'midjourney-vs-dalle-vs-flux-review': [
        {
            question: "Which is better: Midjourney or DALL-E?",
            answer: "Midjourney v7 produces more artistic, stylized images and is better for creative work. DALL-E 4 excels at photorealism and following complex prompts. The best choice depends on your use case."
        },
        {
            question: "Is Midjourney or DALL-E cheaper?",
            answer: "DALL-E (via ChatGPT Plus at $20/mo) is cheaper than Midjourney ($10-$30/mo) for casual users. However, Midjourney offers better value for heavy users with its Standard plan at $30/mo for 15 fast GPU hours."
        },
        {
            question: "What is Flux AI?",
            answer: "Flux is an open-source AI image generator from Black Forest Labs. It's free to use, produces high-quality images, and can be run locally or through services like Replicate."
        },
        {
            question: "Can I use Midjourney for free?",
            answer: "No, Midjourney ended its free trial in 2023. All access now requires a paid subscription starting at $10/month for the Basic plan."
        }
    ],
}

// FAQs for high-impression tool pages
const toolFAQs: Record<string, { question: string; answer: string }[]> = {
    'ahrefs': [
        {
            question: "Is Ahrefs worth $99/month?",
            answer: "Ahrefs is worth it for SEO professionals and agencies who need comprehensive backlink analysis and rank tracking. For beginners or small sites, free alternatives like Ubersuggest or Google Search Console may suffice."
        },
        {
            question: "What is the cheapest Ahrefs plan?",
            answer: "The cheapest Ahrefs plan is the Lite plan at $99/month (or $83/month billed annually). It includes 500 credits/month and is suitable for small businesses and freelancers."
        },
        {
            question: "Is there a free version of Ahrefs?",
            answer: "Ahrefs offers free tools including their Backlink Checker, Keyword Generator, and Webmaster Tools (limited site audit). However, full access requires a paid subscription."
        },
        {
            question: "What are the best free Ahrefs alternatives?",
            answer: "The best free Ahrefs alternatives are Ubersuggest (limited free searches), Google Search Console, Moz Free Tools, and SEMrush's free tier. Each offers different features for keyword research and site auditing."
        }
    ],
    'moz-pro': [
        {
            question: "Is Moz Pro better than Ahrefs?",
            answer: "Moz Pro is more beginner-friendly with its simple interface, while Ahrefs offers more comprehensive data and advanced features. Ahrefs has a larger backlink database, but Moz Pro's Domain Authority metric is industry-standard."
        },
        {
            question: "How much does Moz Pro cost?",
            answer: "Moz Pro starts at $99/month for the Standard plan. There are also Pro ($179/mo), Medium ($299/mo), and Large ($599/mo) plans for larger teams and agencies."
        },
        {
            question: "Does Moz offer a free trial?",
            answer: "Yes, Moz offers a 30-day free trial of Moz Pro with full access to all features. No credit card is required to start the trial."
        },
        {
            question: "What is Domain Authority (DA)?",
            answer: "Domain Authority is a search engine ranking score developed by Moz that predicts how likely a website is to rank on search engines. It ranges from 1-100, with higher scores meaning greater ranking potential."
        }
    ],
    'chatgpt': [
        {
            question: "Is ChatGPT Plus worth $20/month?",
            answer: "ChatGPT Plus is worth it if you need faster responses, GPT-4o access during peak times, DALL-E image generation, and advanced features like Code Interpreter. For occasional use, the free tier is sufficient."
        },
        {
            question: "What's the difference between ChatGPT free and Plus?",
            answer: "ChatGPT Free uses GPT-4o mini with limited message caps, while Plus ($20/mo) gets priority GPT-4o access, 5x higher message limits, DALL-E 3 image generation, voice mode, and earlier access to new features."
        },
        {
            question: "Is ChatGPT better than Claude?",
            answer: "ChatGPT excels at creative writing and has more integrations (plugins, DALL-E). Claude is better for factual analysis, longer documents, and following complex instructions. Both are excellent for different use cases."
        }
    ]
}

async function main() {
    console.log('📋 Starting FAQ Schema Enhancement...\n')

    // Update blog posts with FAQs
    console.log('📝 Adding FAQs to Blog Posts...')
    for (const [slug, faqs] of Object.entries(blogFAQs)) {
        try {
            const post = await prisma.blogPost.findUnique({
                where: { slug },
                select: { id: true, content: true }
            })

            if (!post) {
                console.log(`  ⚠️  Not found: ${slug}`)
                continue
            }

            // Check if FAQ section already exists in content
            let content = post.content
            if (!content.includes('## FAQ') && !content.includes('## Frequently Asked Questions')) {
                // Add FAQ section to content
                const faqSection = `

## ❓ Frequently Asked Questions

${faqs.map(faq => `### ${faq.question}

${faq.answer}
`).join('\n')}
`
                content = content + faqSection
            }

            // Store FAQs as JSON for schema generation
            await prisma.blogPost.update({
                where: { slug },
                data: {
                    content,
                }
            })
            console.log(`  ✅ Updated: ${slug}`)
        } catch (error: any) {
            console.log(`  ❌ Error on ${slug}: ${error.message}`)
        }
    }

    // Update tool pages with FAQs
    console.log('\n🔧 Adding FAQs to Tool Pages...')
    for (const [slug, faqs] of Object.entries(toolFAQs)) {
        try {
            await prisma.tool.update({
                where: { slug },
                data: {
                    faqs: JSON.stringify(faqs)
                }
            })
            console.log(`  ✅ Updated: ${slug}`)
        } catch (error: any) {
            console.log(`  ⚠️  Skipped: ${slug}`)
        }
    }

    console.log('\n✨ FAQ Schema Enhancement Complete!')
    console.log('\n📊 Next Steps:')
    console.log('  1. Rebuild the site: npm run build')
    console.log('  2. Test with Google Rich Results Test')
    console.log('  3. Request re-indexing in Search Console')
}

main()
    .catch((e) => {
        console.error('Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
