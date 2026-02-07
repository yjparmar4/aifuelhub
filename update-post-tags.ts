const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateTags() {
    const slug = "ai-transforming-small-business-operations-2026"

    // 1. Create/Get Tags
    const tagsToLink = [
        "Small Business",
        "Business Operations",
        "AI Agents",
        "Automation",
        "Cost Reduction",
        "Efficiency"
    ]

    console.log(`Updating tags for: ${slug}`)

    try {
        const post = await prisma.blogPost.findUnique({ where: { slug } })
        if (!post) throw new Error("Post not found")

        for (const tagName of tagsToLink) {
            let tag = await prisma.tag.findUnique({ where: { name: tagName } })
            if (!tag) {
                console.log(`Creating tag: ${tagName}`)
                tag = await prisma.tag.create({
                    data: {
                        name: tagName,
                        slug: tagName.toLowerCase().replace(/ /g, '-')
                    }
                })
            }

            await prisma.blogPost.update({
                where: { id: post.id },
                data: {
                    tags: {
                        connect: { id: tag.id }
                    }
                }
            })
            console.log(`Connected tag: ${tagName}`)
        }

    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

updateTags()
