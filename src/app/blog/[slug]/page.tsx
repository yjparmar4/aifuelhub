import { Metadata } from 'next'
import { generateWorldClassMetadata } from '@/lib/world-class-seo'
import { JsonLd } from '@/components/json-ld'
import { db } from '@/lib/db'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  extractFAQsFromContent,
  generateHowToSchema,
  extractHowToSteps,
  generateClaimReviewSchema,
  extractClaimsFromContent
} from '@/lib/schema'
import { generateArticleWithGraph } from '@/lib/entity-graph'
import { getAuthorForTopic } from '@/lib/authors'
import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/blog-post-page'
import { SITE_URL } from '@/lib/seo'
import { BlogPost, Tool } from '@/types'
import { GoogleSEOOptimizedContent } from '@/components/google-seo-optimized-content'
import { AISearchOptimizedContent } from '@/components/ai-search-optimized-content'

import { getRelatedContent, generateInternalLinks as injectInternalLinks } from '@/lib/internal-linking'
import { analyzeSEOContent } from '@/lib/google-seo-optimization'

/**
 * Enhance title for higher CTR
 * - Adds year if not present
 * - Ensures title is optimized length (50-60 chars ideal)
 */
function enhanceTitle(title: string): string {
  let enhanced = title

  // Add year if not present
  if (!enhanced.includes('2026') && !enhanced.includes('2025')) {
    // Check if it ends with parentheses, insert before them
    if (enhanced.includes('(') && enhanced.endsWith(')')) {
      enhanced = enhanced.replace(/\)$/, ' 2026)')
    } else {
      enhanced = `${enhanced} (2026)`
    }
  }

  // Ensure optimal length for display (max ~60 chars for Google)
  if (enhanced.length > 65) {
    enhanced = enhanced.substring(0, 62).trim() + '...'
  }

  return enhanced
}

/**
 * Enhance description for higher CTR
 * - Adds trust signals
 * - Adds CTA
 * - Optimal length (120-155 chars)
 */
function enhanceDescription(description: string, title: string): string {
  let enhanced = description

  // Add trust/action signals if not present
  const trustSignals = ['✓', '★', '⚡', 'Expert', 'Tested', 'Complete', 'Guide']
  const hasTrustSignal = trustSignals.some(signal => enhanced.includes(signal))

  if (!hasTrustSignal && enhanced.length < 130) {
    // Add contextual prefix based on content type
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes('how to') || lowerTitle.includes('guide')) {
      enhanced = `✓ Step-by-step: ${enhanced}`
    } else if (lowerTitle.includes('best') || lowerTitle.includes('top')) {
      enhanced = `★ Expert picks: ${enhanced}`
    } else if (lowerTitle.includes('vs') || lowerTitle.includes('compare')) {
      enhanced = `⚔️ Honest comparison: ${enhanced}`
    } else if (lowerTitle.includes('review')) {
      enhanced = `✓ Hands-on tested: ${enhanced}`
    } else {
      enhanced = `⚡ ${enhanced}`
    }
  }

  // Add CTA if not present and room allows
  if (!enhanced.includes('→') && !enhanced.includes('...') && enhanced.length < 145) {
    enhanced = `${enhanced} →`
  }

  // Optimize length (155 char max for Google)
  if (enhanced.length > 155) {
    enhanced = enhanced.substring(0, 152).trim() + '...'
  }

  return enhanced
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await db.blogPost.findUnique({
    where: { slug, published: true },
    include: { tags: true },
  })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // Get base title and description
  const baseTitle = post.metaTitle || post.title
  const baseDescription = post.metaDescription || post.excerpt || post.content.substring(0, 160).replace(/[#*]/g, '').trim()

  // Enhance for CTR
  const optimizedTitle = enhanceTitle(baseTitle)
  const optimizedDescription = enhanceDescription(baseDescription, baseTitle)

  return generateWorldClassMetadata({
    title: optimizedTitle,
    description: optimizedDescription,
    path: `/blog/${post.slug}`,
    contentType: 'article',
    publishedAt: post.publishedAt?.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    keywords: post.tags?.map(t => t.name),
    imageUrl: post.coverImage || undefined,
    author: 'AI Fuel Hub Team', // Or specific author if available
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

  // Get related content using the advanced library
  const relatedContent = await getRelatedContent(
    'blog',
    post.slug,
    post.tags?.map(t => t.name) || [],
    post.categoryId || undefined
  )

  // Sort related posts by score
  const relatedPosts = relatedContent
    .filter(item => item.type === 'blog')
    .slice(0, 6)
    .map(item => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.description,
    }))

  // Fetch all tools for auto-linking and schema
  const allTools = await db.tool.findMany({
    where: { published: true },
    select: { name: true, slug: true, tagline: true, pricingType: true, rating: true }
  })

  // Find tools mentioned in this post (for contextual tools section)
  const mentionedTools = allTools.filter(tool => post.content.includes(tool.name))

  // Calculate mentions for schema (for auto-linking, just need name/slug)
  const mentions = mentionedTools.map(tool => ({
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

  // Get author for E-E-A-T
  const author = getAuthorForTopic(post.title)

  // Analyze SEO content
  const seoAnalysis = analyzeSEOContent(post.content)

  // Generate internal links within content
  const optimizedContent = injectInternalLinks(post.content, relatedContent, 5)



  // Generate interconnected Entity Graph Schema (AEO)
  const postSchema = generateArticleWithGraph({
    title: post.title,
    description: post.excerpt || post.metaDescription || '',
    url: `${SITE_URL}/blog/${post.slug}`,
    author: author,
    publishedAt: post.publishedAt?.toISOString() || new Date().toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    wordCount: post.content.split(/\s+/).length,
    category: post.category ? { name: post.category.name, slug: post.category.slug } : undefined,
    tags: post.tags?.map(t => t.name),
    toolsMentioned: mentions.map(m => ({ name: m.name, slug: m.url.split('/').pop() || '' }))
  })

  // const postSchema = generateBlogPostSchema(post as unknown as BlogPost, mentions) // Replaced by Entity Graph
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
      <GoogleSEOOptimizedContent
        type="blog"
        data={post as unknown as BlogPost}
        availableContent={allTools.map(t => ({ type: 'tool', slug: t.slug, title: t.name }))}
      >
        <AISearchOptimizedContent type="blog" data={post as unknown as BlogPost}>
          <BlogPostPage
            post={{ ...post, content: optimizedContent } as unknown as BlogPost}
            relatedPosts={relatedPosts as unknown as BlogPost[]}
            tools={allTools}
            mentionedTools={mentionedTools}
          />
        </AISearchOptimizedContent>
      </GoogleSEOOptimizedContent>
    </>
  )
}
