import { db } from './src/lib/db'

async function main() {
    // Update Best AI Tools
    await db.blogPost.update({
        where: { slug: 'best-ai-tools-2024' },
        data: { coverImage: '/blog/best-ai-tools-2024.svg' }
    })
    console.log('Updated best-ai-tools-2024')

    // Update ChatGPT vs Claude
    await db.blogPost.update({
        where: { slug: 'chatgpt-vs-claude-comparison' },
        data: { coverImage: '/blog/chatgpt-vs-claude-comparison.svg' }
    })
    console.log('Updated chatgpt-vs-claude-comparison')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        // await db.$disconnect()
    })
