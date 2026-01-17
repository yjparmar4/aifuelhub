/**
 * Update Blog Posts with Images
 * Adds cover images and inline images to the 5 new blog posts
 * Run with: npx ts-node prisma/update-blog-images.ts
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Image updates for each blog post
const blogImageUpdates = [
    {
        slug: 'free-ahrefs-alternatives-2026',
        coverImage: '/blog/images/free-ahrefs-alternatives-hero.png',
        // Add second image inline in content
        inlineImageMarkdown: `

![Free vs Paid SEO Tools Comparison](/blog/images/free-ahrefs-alternatives-comparison.png)

`,
        insertAfter: '## Why Look for Ahrefs Alternatives?',
    },
    {
        slug: 'moz-pro-vs-semrush-vs-ahrefs-2026',
        coverImage: '/blog/images/moz-vs-semrush-vs-ahrefs-hero.png',
        inlineImageMarkdown: `

![Moz vs Semrush vs Ahrefs Features Comparison](/blog/images/moz-vs-semrush-vs-ahrefs-features.png)

`,
        insertAfter: '## Side-by-Side Comparison',
    },
    {
        slug: 'how-to-use-ahrefs-keyword-research-2026',
        coverImage: '/blog/images/ahrefs-keyword-research-guide-hero.png',
        inlineImageMarkdown: `

![Ahrefs Keyword Research Step-by-Step Process](/blog/images/ahrefs-keyword-research-steps.png)

`,
        insertAfter: '## Step 3: Find Easy-to-Rank Keywords',
    },
    {
        slug: 'how-to-use-moz-pro-seo-tutorial-2026',
        coverImage: '/blog/images/moz-pro-tutorial-hero.png',
        inlineImageMarkdown: `

![Moz Pro Features Overview](/blog/images/moz-pro-features-overview.png)

`,
        insertAfter: '## Using Keyword Explorer',
    },
    {
        slug: 'openai-sora-vs-runway-vs-pika-2026',
        coverImage: '/blog/images/sora-vs-runway-vs-pika-hero.png',
        inlineImageMarkdown: `

![Sora vs Runway vs Pika Quality Comparison](/blog/images/sora-vs-runway-vs-pika-quality.png)

`,
        insertAfter: '## The Test: Same Prompt, 3 Tools',
    },
]

async function main() {
    console.log('🖼️  Updating Blog Posts with Images...\n')

    for (const update of blogImageUpdates) {
        try {
            // Get current post
            const post = await prisma.blogPost.findUnique({
                where: { slug: update.slug },
                select: { id: true, content: true, coverImage: true }
            })

            if (!post) {
                console.log(`  ⚠️  Not found: ${update.slug}`)
                continue
            }

            let content = post.content

            // Add inline image if not already present
            if (update.inlineImageMarkdown && !content.includes(update.inlineImageMarkdown.trim())) {
                // Find the insert position
                const insertIndex = content.indexOf(update.insertAfter)
                if (insertIndex !== -1) {
                    // Find the end of that line
                    const lineEndIndex = content.indexOf('\n', insertIndex + update.insertAfter.length)
                    if (lineEndIndex !== -1) {
                        content = content.slice(0, lineEndIndex + 1) + update.inlineImageMarkdown + content.slice(lineEndIndex + 1)
                    }
                }
            }

            // Update the post
            await prisma.blogPost.update({
                where: { slug: update.slug },
                data: {
                    coverImage: update.coverImage,
                    content: content,
                    updatedAt: new Date(), // Signal freshness
                }
            })

            console.log(`  ✅ Updated: ${update.slug}`)
            console.log(`      Cover: ${update.coverImage}`)
        } catch (error: any) {
            console.log(`  ❌ Error: ${update.slug} - ${error.message}`)
        }
    }

    console.log('\n✨ Image Updates Complete!')
    console.log('\n📊 Next Steps:')
    console.log('  1. Rebuild: npm run build')
    console.log('  2. Verify images render correctly')
    console.log('  3. Submit to Google Search Console')
}

main()
    .catch((e) => {
        console.error('Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
