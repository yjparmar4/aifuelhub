const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Updating blog post with correct image paths...')

    const post = await prisma.blogPost.findUnique({
        where: { slug: 'how-to-create-faceless-youtube-channel-ai' }
    })

    if (!post) {
        console.log('Blog post not found!')
        return
    }

    // Add the workflow image after Step 5
    const updatedContent = post.content.replace(
        '## Step 6: Create Click-Worthy Thumbnails',
        `![AI video creation workflow showing the complete process from script to publish](/blog/images/ai-video-creation-workflow.png)

---

## Step 6: Create Click-Worthy Thumbnails`
    )

    await prisma.blogPost.update({
        where: { slug: 'how-to-create-faceless-youtube-channel-ai' },
        data: {
            coverImage: '/blog/images/faceless-youtube-ai-guide.png',
            content: updatedContent,
            updatedAt: new Date()
        }
    })

    console.log('Blog post updated with images successfully!')
}

main()
    .catch((e) => {
        console.error('Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
