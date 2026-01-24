import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { db } from '@/lib/db'
import {
  generateBlogPostSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  extractFAQsFromContent,
  generateHowToSchema,
  extractHowToSteps,
  generateClaimReviewSchema,
  extractClaimsFromContent
} from '@/lib/schema'
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

  // Improved description fallback
  const description = post.metaDescription || post.excerpt || post.content.substring(0, 160).replace(/[#*]/g, '').trim() + '...'

  return generateSEOMetadata({
    title: post.metaTitle || post.title,
    description: description,
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

  // Fetch all tools for auto-linking and schema
  const allTools = await db.tool.findMany({
    where: { published: true },
    select: { name: true, slug: true }
  })

  // Calculate mentions for schema
  const mentions = allTools
    .filter(tool => post.content.includes(tool.name))
    .map(tool => ({
      name: tool.name,
      url: `${SITE_URL}/tool/${tool.slug}`,
      type: 'SoftwareApplication'
    }))

  // Extract FAQs from content for rich snippets
  const extractedFAQs = extractFAQsFromContent(post.content)

  // Extract HowTo steps
  const extractedHowTo = extractHowToSteps(post.content)

  // Extract Fact Checks / Claims
  const extractedClaims = extractClaimsFromContent(post.content)

  const postSchema = generateBlogPostSchema(post as unknown as BlogPost, mentions)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ])

  // Generate FAQ schema if FAQs found
  const faqSchema = extractedFAQs.length > 0 ? generateFAQSchema(extractedFAQs) : null

  // Generate HowTo Schema if steps found
  const howToSchema = extractedHowTo.length > 0 ? generateHowToSchema(
    post.title,
    post.excerpt || `How to guide for ${post.title}`,
    extractedHowTo
  ) : null

  // Generate ClaimReview schemas
  const claimSchemas = extractedClaims.map(claim => generateClaimReviewSchema(
    claim.claim,
    claim.verdict,
    'AI Fuel Hub', // Reviewer
    post.publishedAt?.toISOString() || new Date().toISOString()
  ))

  return (
    <>
      <JsonLd data={postSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      {howToSchema && <JsonLd data={howToSchema} />}
      {claimSchemas.map((schema, i) => (
        <JsonLd key={`claim-${i}`} data={schema} />
      ))}
      <BlogPostPage post={post as unknown as BlogPost} relatedPosts={relatedPosts as unknown as BlogPost[]} tools={allTools} />
    </>
  )
}
