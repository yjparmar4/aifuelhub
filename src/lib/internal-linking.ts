import { db } from './db'
import { Tool, BlogPost, Category, Tag } from '@/types'

interface RelatedContent {
  type: 'tool' | 'blog' | 'category'
  slug: string
  title: string
  description?: string
  score: number
}

/**
 * Get related content for internal linking
 * Uses semantic matching to find related tools, blogs, and categories
 */
export async function getRelatedContent(
  currentType: 'tool' | 'blog' | 'category',
  currentSlug: string,
  currentTags: string[] = [],
  currentCategory?: string
): Promise<RelatedContent[]> {
  const related: RelatedContent[] = []

  // Get related tools (exclude current)
  if (currentType !== 'tool') {
    const relatedTools = await db.tool.findMany({
      where: {
        published: true,
        NOT: { slug: currentSlug },
        ...(currentCategory && { categoryId: currentCategory }),
      },
      take: 5,
      select: {
        slug: true,
        name: true,
        description: true,
        tags: true,
        category: true,
      },
    })

    relatedTools.forEach(tool => {
      const score = calculateRelevanceScore(
        currentTags,
        tool.tags?.map(t => t.name) || [],
        tool.category?.name || '',
        currentCategory || ''
      )

      if (score > 0.3) {
        related.push({
          type: 'tool',
          slug: tool.slug,
          title: tool.name,
          description: tool.description,
          score,
        })
      }
    })
  }

  // Get related blog posts
  if (currentType !== 'blog') {
    const relatedBlogs = await db.blogPost.findMany({
      where: {
        published: true,
        NOT: { slug: currentSlug },
      },
      take: 5,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        tags: true,
        category: true,
      },
    })

    relatedBlogs.forEach(blog => {
      const score = calculateRelevanceScore(
        currentTags,
        blog.tags?.map(t => t.name) || [],
        blog.category?.name || '',
        currentCategory || ''
      )

      if (score > 0.3) {
        related.push({
          type: 'blog',
          slug: blog.slug,
          title: blog.title,
          description: blog.excerpt || undefined,
          score,
        })
      }
    })
  }

  // Get related categories
  if (currentType !== 'category') {
    const relatedCategories = await db.category.findMany({
      where: {
        published: true,
        NOT: { slug: currentSlug },
        tools: { some: { published: true } },
      },
      take: 3,
      select: {
        slug: true,
        name: true,
        description: true,
      },
    })

    relatedCategories.forEach(category => {
      const score = currentCategory === category.name ? 1 : 0.5

      related.push({
        type: 'category',
        slug: category.slug,
        title: category.name,
        description: category.description,
        score,
      })
    })
  }

  // Sort by score and return top results
  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
}

/**
 * Calculate relevance score based on tag overlap and category matching
 */
function calculateRelevanceScore(
  currentTags: string[],
  targetTags: string[],
  targetCategory: string,
  currentCategory: string
): number {
  let score = 0

  // Tag overlap scoring
  const commonTags = currentTags.filter(tag =>
    targetTags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  )
  score += commonTags.length * 0.3

  // Category match bonus
  if (targetCategory.toLowerCase() === currentCategory.toLowerCase()) {
    score += 0.4
  }

  // Partial category match
  if (
    targetCategory.toLowerCase().includes(currentCategory.toLowerCase()) ||
    currentCategory.toLowerCase().includes(targetCategory.toLowerCase())
  ) {
    score += 0.2
  }

  return Math.min(score, 1)
}

/**
 * Generate internal links HTML for SEO
 * Creates contextual internal links within content
 */
export function generateInternalLinks(
  content: string,
  relatedContent: RelatedContent[],
  maxLinks: number = 5
): string {
  let modifiedContent = content
  let linkCount = 0

  // Get top related items
  const topItems = relatedContent.slice(0, maxLinks)

  topItems.forEach(item => {
    if (linkCount >= maxLinks) return

    // Find natural places to insert links
    const keywords = extractKeywords(item.title)
    const keywordRegex = new RegExp(
      `\\b(${keywords.join('|')})\\b`,
      'gi'
    )

    // Replace first occurrence
    modifiedContent = modifiedContent.replace(keywordRegex, (match) => {
      if (linkCount >= maxLinks) return match

      linkCount++
      const url = `/${item.type === 'tool' ? 'tool' : item.type === 'blog' ? 'blog' : 'categories'}/${item.slug}`

      return `<a href="${url}" class="text-blue-600 hover:text-blue-800 underline" title="${item.title}">${match}</a>`
    })
  })

  return modifiedContent
}

/**
 * Extract keywords from title for matching
 */
function extractKeywords(title: string): string[] {
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'for', 'with', 'best', 'top', 'ai']

  return title
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 3)
}

/**
 * Generate breadcrumb schema for better navigation
 */
export function generateBreadcrumbs(
  items: { name: string; url: string }[]
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return JSON.stringify(schema)
}

/**
 * Get topic clusters for content strategy
 * Groups related content into topical clusters
 */
export async function getTopicClusters(
  mainCategory: string
): Promise<{
  pillar: string
  cluster: Array<{ type: string; slug: string; title: string }>
}> {
  const pillarContent = await db.tool.findMany({
    where: {
      published: true,
      category: { name: mainCategory },
    },
    take: 1,
    select: {
      slug: true,
      name: true,
    },
  })

  if (!pillarContent[0]) {
    return { pillar: mainCategory, cluster: [] }
  }

  const clusterContent = await db.tool.findMany({
    where: {
      published: true,
      category: { name: mainCategory },
      NOT: { slug: pillarContent[0].slug },
    },
    take: 10,
    select: {
      slug: true,
      name: true,
    },
  })

  return {
    pillar: pillarContent[0].name,
    cluster: clusterContent.map(tool => ({
      type: 'tool',
      slug: tool.slug,
      title: tool.name,
    })),
  }
}

/**
 * Generate internal linking suggestions for content optimization
 */
export async function getLinkingSuggestions(
  content: string,
  currentSlug: string
): Promise<Array<{ anchorText: string; targetUrl: string; relevance: number }>> {
  const suggestions: Array<{ anchorText: string; targetUrl: string; relevance: number }> = []

  // Get all published tools and blogs
  const [tools, blogs] = await Promise.all([
    db.tool.findMany({
      where: { published: true, NOT: { slug: currentSlug } },
      take: 20,
      select: { slug: true, name: true, description: true, tags: true },
    }),
    db.blogPost.findMany({
      where: { published: true, NOT: { slug: currentSlug } },
      take: 20,
      select: { slug: true, title: true, excerpt: true, tags: true },
    }),
  ])

  // Analyze content for linking opportunities
  const contentLower = content.toLowerCase()

  // Check tools
  tools.forEach(tool => {
    const toolName = tool.name.toLowerCase()
    if (contentLower.includes(toolName)) {
      suggestions.push({
        anchorText: tool.name,
        targetUrl: `/tool/${tool.slug}`,
        relevance: 0.8,
      })
    }

    // Check tags
    tool.tags?.forEach(tag => {
      if (contentLower.includes(tag.name.toLowerCase())) {
        suggestions.push({
          anchorText: tag.name,
          targetUrl: `/tool/${tool.slug}`,
          relevance: 0.6,
        })
      }
    })
  })

  // Check blogs
  blogs.forEach(blog => {
    const blogTitle = blog.title.toLowerCase()
    if (contentLower.includes(blogTitle)) {
      suggestions.push({
        anchorText: blog.title,
        targetUrl: `/blog/${blog.slug}`,
        relevance: 0.85,
      })
    }

    blog.tags?.forEach(tag => {
      if (contentLower.includes(tag.name.toLowerCase())) {
        suggestions.push({
          anchorText: tag.name,
          targetUrl: `/blog/${blog.slug}`,
          relevance: 0.65,
        })
      }
    })
  })

  // Sort by relevance and return top suggestions
  return suggestions
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 10)
}
