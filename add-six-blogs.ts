
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
  console.log('Adding 6 new high-ranking blog posts from JSON...')

  // 1. Get the Marketing Category (or fallback)
  const category = await prisma.category.findUnique({
    where: { slug: 'marketing' }
  }) || await prisma.category.findFirst()

  if (!category) {
    console.error('No category found. Please seed categories first.')
    return
  }

  // Read posts from JSON file to avoid template literal issues in TS
  const postsData = fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf-8')
  const posts = JSON.parse(postsData)

  console.log(`Found ${posts.length} posts to insert.`)

  for (const post of posts) {
    const exists = await prisma.blogPost.findUnique({
      where: { slug: post.slug }
    })

    if (exists) {
      console.log(`Skipping existing post: ${post.slug}`)
      continue
    }

    try {
      await prisma.blogPost.create({
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          focusKeyword: post.focusKeyword,
          categoryId: category.id,
          published: true,
          publishedAt: new Date(),
          featured: true, // Make them featured to show up top
          views: Math.floor(Math.random() * 500) // Fake initial views
        }
      })
      console.log(`Created post: ${post.title}`)
    } catch (error) {
      console.error(`Failed to create post ${post.slug}:`, error)
    }
  }

  console.log('Done adding new blogs.')
}

main()
  .catch((e) => {
    console.error('Error seeding new blogs:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
