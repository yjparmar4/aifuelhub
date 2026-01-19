import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { db } from '@/lib/db'
import { generateBlogPostSchema, generateBreadcrumbSchema, generateFAQSchema, extractFAQsFromContent } from '@/lib/schema'
import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/blog-post-page'
import { SITE_URL } from '@/lib/seo'
import { BlogPost } from '@/types'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await db.blogPost.findUnique({
    where: { slug, published: true },
  })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return generateSEOMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || post.content.substring(0, 160),
    type: 'article',
    publishedTime: post.publishedAt?.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    canonical: `${SITE_URL}/blog/${post.slug}`,
  })
}

export async function generateStaticParams() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = await db.blogPost.findUnique({
    where: { slug, published: true },
    include: {
      category: true,
      tags: true,
    },
  })

  if (!post) {
    notFound()
  }

  // Fetch related posts based on category and tags
  const tagIds = post.tags?.map(t => t.id) || []
  const relatedPosts = await db.blogPost.findMany({
    where: {
      published: true,
      id: { not: post.id },
      OR: [
        { categoryId: post.categoryId },
        { tags: { some: { id: { in: tagIds } } } },
      ],
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: { publishedAt: 'desc' },
    take: 4,
  })

  // Extract FAQs from content for rich snippets
  const extractedFAQs = extractFAQsFromContent(post.content)

  const postSchema = generateBlogPostSchema(post as unknown as BlogPost)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ])

  // Generate FAQ schema if FAQs found
  const faqSchema = extractedFAQs.length > 0 ? generateFAQSchema(extractedFAQs) : null

  return (
    <>
      <JsonLd data={postSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <BlogPostPage post={post as unknown as BlogPost} relatedPosts={relatedPosts as unknown as BlogPost[]} />
    </>
  )
}
