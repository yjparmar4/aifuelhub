/**
 * CTR Optimization Script v2
 * Updates meta titles and descriptions for high-impression pages
 * Run with: npx ts-node prisma/update-metadata-ctr-v2.ts
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// CTR-optimized blog post updates
const blogPostUpdates = [
    {
        slug: 'openai-sora-guide-release-date-pricing',
        data: {
            title: "OpenAI Sora 2026: Release Date, Pricing & How to Access (Updated Jan 2026)",
            metaTitle: "OpenAI Sora 2026: Release Date Confirmed ✓ Pricing & Free Access",
            metaDescription: "UPDATED Jan 2026: OpenAI Sora is finally here! See exact pricing ($20-$200/mo), how to access Sora via ChatGPT Pro, and 3 free alternatives that work NOW.",
            publishedAt: new Date(), // Fresh date for recrawling
        }
    },
    {
        slug: 'midjourney-vs-dalle-vs-flux-review',
        data: {
            title: "Midjourney v7 vs DALL-E 4 vs Flux 2026: Same Prompt, 3 Results (Real Test)",
            metaTitle: "Midjourney v7 vs DALL-E 4 vs Flux 2026: We Tested All 3 (Screenshots)",
            metaDescription: "We ran the SAME prompt on Midjourney v7, DALL-E 4, and Flux 1.1. See real side-by-side results and which AI image generator wins in 2026.",
            publishedAt: new Date(),
        }
    },
    {
        slug: 'ai-tools-seo-ranking-guide',
        data: {
            metaTitle: "AI Tools for SEO 2026: Rank #1 Faster (Free & Paid Tools Tested)",
            metaDescription: "Stop wasting time on manual SEO. These 7 AI tools helped us rank 50+ pages. See our exact workflow + free alternatives inside.",
        }
    },
    {
        slug: 'best-ai-writing-tools-comparison',
        data: {
            metaTitle: "ChatGPT vs Jasper vs Copy.ai 2026: Best AI Writing Tool? (Real Test)",
            metaDescription: "We wrote the SAME article with 3 AI tools. See real output comparison, pricing breakdown, and which one writes like a human (spoiler: it's not ChatGPT).",
        }
    },
    {
        slug: 'best-free-ai-tools',
        data: {
            metaTitle: "15 Best FREE AI Tools 2026: No Signup, No Credit Card ✓",
            metaDescription: "These 15 AI tools are 100% free with no hidden limits. No email required. From writing to image generation - all tested and working in Jan 2026.",
        }
    },
]

// CTR-optimized tool page updates
const toolUpdates = [
    {
        slug: 'ahrefs',
        data: {
            metaTitle: "Ahrefs Review 2026: $99/mo vs FREE Alternatives (Which Wins?)",
            metaDescription: "Is Ahrefs still the best SEO tool in 2026? We compared it to 5 free alternatives. See which one actually ranks pages faster + honest pricing breakdown.",
            tagline: "The #1 SEO Tool (But Is It Worth $99/mo?)",
        }
    },
    {
        slug: 'moz-pro',
        data: {
            metaTitle: "Moz Pro Review 2026: Is $99/mo Worth It? (Honest Test + Alternatives)",
            metaDescription: "We tested Moz Pro for 3 months. See if it's worth $99/mo vs FREE alternatives. Detailed comparison with Ahrefs & Ubersuggest included.",
            tagline: "Beginner-Friendly SEO Suite (Updated 2026)",
        }
    },
    {
        slug: 'midjourney',
        data: {
            metaTitle: "Midjourney Review 2026: v7 Features, $10/mo Pricing & Alternatives",
            metaDescription: "Midjourney v7 is here! See new features, exact pricing ($10-$120/mo), how to start for FREE, and the best alternatives if you're on a budget.",
            tagline: "The Best AI Image Generator (v7 Just Dropped)",
        }
    },
    {
        slug: 'dall-e',
        data: {
            metaTitle: "DALL-E 4 Review 2026: Free Credits, Pricing & Midjourney Comparison",
            metaDescription: "DALL-E 4 vs Midjourney v7 - which is better? See real image comparisons, pricing (includes FREE credits), and which to choose for your needs.",
            tagline: "OpenAI's Image Generator (Now Even Better)",
        }
    },
    {
        slug: 'chatgpt',
        data: {
            metaTitle: "ChatGPT Review 2026: GPT-4o Features, Free vs Plus ($20/mo Worth It?)",
            metaDescription: "ChatGPT in 2026: Is the $20/mo Plus plan worth it? See GPT-4o features, FREE tier limits, and honest comparison with Claude and Gemini.",
            tagline: "The AI That Started It All (2026 Edition)",
        }
    },
    {
        slug: 'claude',
        data: {
            metaTitle: "Claude AI Review 2026: Better Than ChatGPT? (Honest Comparison)",
            metaDescription: "Claude 3.5 Sonnet vs ChatGPT GPT-4o: We tested both for writing, coding & analysis. See which AI is actually better + free tier comparison.",
            tagline: "The ChatGPT Killer? (Anthropic's Best AI)",
        }
    },
    {
        slug: 'semrush',
        data: {
            metaTitle: "Semrush Review 2026: $130/mo - Worth It vs Ahrefs? (Real Comparison)",
            metaDescription: "Semrush vs Ahrefs vs Moz: Which SEO tool is worth your money? We tested all 3 for keyword research, backlinks & rank tracking. See our honest verdict.",
            tagline: "All-in-One Marketing Suite (Premium Price)",
        }
    },
    {
        slug: 'jasper',
        data: {
            metaTitle: "Jasper AI Review 2026: $49/mo for AI Writing - Still Worth It?",
            metaDescription: "Jasper vs ChatGPT vs Copy.ai: Is Jasper's $49/mo price justified? See real output comparisons, SEO features, and whether free alternatives are just as good.",
            tagline: "AI Writing for Marketers (But At What Cost?)",
        }
    },
]

// Pricing page-specific updates (adding compelling meta for pricing searches)
const pricingUpdates = [
    {
        slug: 'adobe-firefly',
        data: {
            metaTitle: "Adobe Firefly Pricing 2026: Free Credits, Plans & Is It Worth It?",
            metaDescription: "Adobe Firefly pricing explained: FREE tier gets 25 credits/mo. See all plans ($4.99-$59/mo), what you get, and if it's worth upgrading from free.",
        }
    },
]

async function main() {
    console.log('🚀 Starting CTR Optimization Update v2...\n')

    // Update Blog Posts
    console.log('📝 Updating Blog Posts...')
    for (const update of blogPostUpdates) {
        try {
            await prisma.blogPost.update({
                where: { slug: update.slug },
                data: update.data,
            })
            console.log(`  ✅ Updated: ${update.slug}`)
        } catch (error: any) {
            console.log(`  ⚠️  Skipped (not found): ${update.slug}`)
        }
    }

    // Update Tools
    console.log('\n🔧 Updating Tool Pages...')
    for (const update of toolUpdates) {
        try {
            await prisma.tool.update({
                where: { slug: update.slug },
                data: update.data,
            })
            console.log(`  ✅ Updated: ${update.slug}`)
        } catch (error: any) {
            console.log(`  ⚠️  Skipped (not found): ${update.slug}`)
        }
    }

    // Update Pricing-specific tools
    console.log('\n💰 Updating Pricing Page Tools...')
    for (const update of pricingUpdates) {
        try {
            await prisma.tool.update({
                where: { slug: update.slug },
                data: update.data,
            })
            console.log(`  ✅ Updated: ${update.slug}`)
        } catch (error: any) {
            console.log(`  ⚠️  Skipped (not found): ${update.slug}`)
        }
    }

    console.log('\n✨ CTR Optimization Complete!')
    console.log('\n📊 Next Steps:')
    console.log('  1. Rebuild the site: npm run build')
    console.log('  2. Request re-indexing in Google Search Console')
    console.log('  3. Monitor CTR changes over 1-2 weeks')
}

main()
    .catch((e) => {
        console.error('Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
