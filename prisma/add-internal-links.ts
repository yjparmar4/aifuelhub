/**
 * Internal Linking Improvement Script
 * Adds strategic internal links to blog content for better SEO
 * Run with: npx ts-node prisma/add-internal-links.ts
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Internal link mappings: keyword -> URL
const internalLinks: Record<string, string> = {
    // Tool links
    'Ahrefs': '/tool/ahrefs',
    'Moz Pro': '/tool/moz-pro',
    'Semrush': '/tool/semrush',
    'ChatGPT': '/tool/chatgpt',
    'Claude': '/tool/claude',
    'Midjourney': '/tool/midjourney',
    'DALL-E': '/tool/dall-e',
    'Jasper': '/tool/jasper',
    'Copy.ai': '/tool/copy-ai',
    'Grammarly': '/tool/grammarly',
    'Notion AI': '/tool/notion-ai',
    'GitHub Copilot': '/tool/github-copilot',
    'OpenAI Sora': '/blog/openai-sora-guide-release-date-pricing',

    // Category links
    'AI writing tools': '/ai-tools/writing',
    'AI image generators': '/ai-tools/image-generation',
    'AI coding tools': '/ai-tools/coding',
    'AI SEO tools': '/ai-tools/seo',

    // Comparison links
    'ChatGPT vs Claude': '/vs/chatgpt-vs-claude',
    'Midjourney vs DALL-E': '/blog/midjourney-vs-dalle-vs-flux-review',
}

// Related content suggestions mapped by slug
const relatedContent: Record<string, string[]> = {
    'openai-sora-guide-release-date-pricing': [
        '/blog/7-best-ai-video-generators-2026',
        '/tool/runway',
        '/tool/pika',
    ],
    'midjourney-vs-dalle-vs-flux-review': [
        '/tool/midjourney',
        '/tool/dall-e',
        '/ai-tools/image-generation',
    ],
    'best-free-ai-tools-2026': [
        '/tool/chatgpt',
        '/tool/claude',
        '/ai-tools/writing',
    ],
}

async function addRelatedLinksSection(slug: string, content: string, relatedUrls: string[]): Promise<string> {
    // Check if content already has a related section
    if (content.includes('## Related Articles') || content.includes('## You May Also Like')) {
        return content
    }

    const relatedSection = `

## 🔗 Related Articles

Explore more content on this topic:

${relatedUrls.map(url => `- [Read more](${url})`).join('\n')}
`

    return content + relatedSection
}

async function main() {
    console.log('🔗 Starting Internal Linking Improvement...\n')

    // Get all published blog posts
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        select: {
            id: true,
            slug: true,
            content: true,
        }
    })

    console.log(`Found ${posts.length} published blog posts\n`)

    let updatedCount = 0

    for (const post of posts) {
        let content = post.content
        let wasUpdated = false

        // Add related content links if applicable
        if (relatedContent[post.slug]) {
            const newContent = await addRelatedLinksSection(
                post.slug,
                content,
                relatedContent[post.slug]
            )
            if (newContent !== content) {
                content = newContent
                wasUpdated = true
            }
        }

        // Add internal links to keywords (only first occurrence)
        for (const [keyword, url] of Object.entries(internalLinks)) {
            // Skip if the link already exists
            if (content.includes(`](${url})`)) continue

            // Create a regex that matches the keyword not already in a link
            const regex = new RegExp(`(?<!\\[)\\b${keyword}\\b(?!\\])(?![^\\[]*\\])`, 'i')

            if (regex.test(content)) {
                content = content.replace(regex, `[${keyword}](${url})`)
                wasUpdated = true
            }
        }

        if (wasUpdated) {
            await prisma.blogPost.update({
                where: { id: post.id },
                data: { content },
            })
            console.log(`  ✅ Updated: ${post.slug}`)
            updatedCount++
        }
    }

    console.log(`\n✨ Internal Linking Complete!`)
    console.log(`   Updated ${updatedCount} of ${posts.length} posts`)
}

main()
    .catch((e) => {
        console.error('Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
