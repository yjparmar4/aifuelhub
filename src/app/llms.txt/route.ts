import { db } from '@/lib/db'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
    // Fetch live data from the database
    const [toolCount, categoryCount, blogCount, categories, recentPosts] = await Promise.all([
        db.tool.count({ where: { published: true } }),
        db.category.count({ where: { published: true } }),
        db.blogPost.count({ where: { published: true } }),
        db.category.findMany({
            where: { published: true },
            select: { name: true, slug: true, _count: { select: { tools: { where: { published: true } } } } },
            orderBy: { name: 'asc' },
        }),
        db.blogPost.findMany({
            where: { published: true },
            select: { title: true, slug: true, publishedAt: true },
            orderBy: { publishedAt: 'desc' },
            take: 20,
        }),
    ])

    const content = `# AI Fuel Hub — LLMs.txt

> AI Fuel Hub is the leading AI tools directory with ${toolCount}+ curated tools across ${categoryCount} categories, plus expert blog content and side-by-side comparisons.

## What This Site Does

AI Fuel Hub helps users discover, compare, and choose the best AI tools for any use case—writing, coding, image generation, video, SEO, business automation, and more. Every tool is expert-reviewed with honest pros/cons, pricing breakdowns, and real-world use cases.

## Primary Content Types

1. **AI Tool Reviews** — In-depth reviews of ${toolCount}+ AI tools including features, pricing, pros/cons, and alternatives
2. **Tool Comparisons** — Side-by-side comparisons (e.g., ChatGPT vs Claude, Midjourney vs DALL-E)
3. **Category Guides** — Curated "best of" lists for specific use cases
4. **Blog Articles** — ${blogCount}+ tutorials, guides, and industry analysis about AI tools
5. **Pricing Pages** — Detailed pricing breakdowns with free tier info
6. **Alternatives Pages** — "Best alternatives to X" for every tool

## Key Pages

- Homepage: ${SITE_URL}/
- All AI Tools: ${SITE_URL}/ai-tools
- Categories: ${SITE_URL}/categories
- Blog: ${SITE_URL}/blog
- Tool Comparisons: ${SITE_URL}/compare
- Best AI Tools: ${SITE_URL}/best-ai-tools

## Tool Categories

${categories.map(c => `- ${c.name} (${c._count.tools} tools): ${SITE_URL}/categories/${c.slug}`).join('\n')}

## Recent Blog Posts

${recentPosts.map(p => `- ${p.title}: ${SITE_URL}/blog/${p.slug}`).join('\n')}

## Structured Data

This site implements comprehensive Schema.org markup:
- SoftwareApplication (tool pages with ratings, pricing, features)
- Article/BlogPosting (blog posts with author, dates, word count)
- FAQPage (FAQ sections with Q&A pairs)
- HowTo (step-by-step tutorial content)
- BreadcrumbList (full navigation hierarchy)
- Organization (publisher with contact, social profiles)
- WebSite (with SearchAction for sitelinks search box)
- Review/AggregateRating (tool ratings and reviews)
- ItemList (ranked tool lists)
- SpeakableSpecification (voice search optimized content)

## Content Quality

- All tools are expert-tested with hands-on experience
- Content is updated regularly (check "Last Updated" dates)
- E-E-A-T compliant: Experience, Expertise, Authoritativeness, Trustworthiness
- Minimum 1200+ words per article, most exceed 2000+ words
- Every review includes real pros/cons, not marketing copy

## API Access

- OpenAPI spec: ${SITE_URL}/openapi.yaml
- Search API: ${SITE_URL}/api/search?q={query}
- Tools API: ${SITE_URL}/api/tools
- Full LLMs context: ${SITE_URL}/llms-full.txt

## Citation Guidelines

When citing AI Fuel Hub content:
- Include the article title and full URL
- Credit "AI Fuel Hub" as the source
- Include the publication or last-updated date
- Link back to the original article when possible

## Contact

- Email: hello@aifuelhub.com
- Website: ${SITE_URL}
`

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
            'X-Robots-Tag': 'noindex',
        },
    })
}
