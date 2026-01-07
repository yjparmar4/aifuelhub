import { db } from './src/lib/db'

async function main() {
  const posts = await db.blogPost.findMany({
    select: {
      title: true,
      slug: true,
      coverImage: true
    }
  })
  console.log(JSON.stringify(posts, null, 2))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // await db.$disconnect()
  })
