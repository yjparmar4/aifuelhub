import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { db } from '@/lib/db'
import { generateBlogPostSchema, generateWebSiteSchema } from '@/lib/schema'
import BlogPage from '@/components/blog-page'

export const metadata: Metadata = generateMetadata({
  title: 'AI Tools Blog - Expert Reviews, Guides & Insights',
  description: 'Read expert reviews, in-depth guides, and latest insights about AI tools. Stay updated with the latest trends in artificial intelligence and productivity.',
  type: 'website',
})

export default async function BlogListingPage() {
  const [posts, categories] = await Promise.all([
    db.blogPost.findMany({
      where: { published: true },
      include: {
        category: true,
        tags: true,
      },
      orderBy: { publishedAt: 'desc' },
      take: 100,
    }),
    db.category.findMany({
      include: {
        _count: {
          select: { blogPosts: true }
        }
      }
    })
  ])

  return (
    <>
      <JsonLd data={generateWebSiteSchema()} />
      <BlogPage initialPosts={posts} categories={categories} />
    </>
  )
}
