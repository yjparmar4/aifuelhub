import { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { SITE_URL } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL

  // Get all tools
  // Get all published tools
  const tools = await db.tool.findMany({
    where: { published: true },
    select: { id: true, slug: true, updatedAt: true, categoryId: true },
  })

  // Get categories that have at least one published tool
  const categories = await db.category.findMany({
    where: {
      published: true,
      tools: { some: { published: true } }
    },
    select: { slug: true, updatedAt: true },
  })

  // Get tags that have at least one published tool
  const tags = await db.tag.findMany({
    where: {
      tools: { some: { published: true } }
    },
    select: { slug: true },
  })

  // Get all blog posts
  const blogPosts = await db.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  // Get all comparisons
  const comparisons = await db.comparison.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  // Calculate category counts for alternatives filtering
  // A tool has alternatives if its category has > 1 tool
  const categoryCounts: Record<string, number> = {}
  tools.forEach(tool => {
    if (tool.categoryId) {
      categoryCounts[tool.categoryId] = (categoryCounts[tool.categoryId] || 0) + 1
    }
  })

  const toolsWithAlternatives = tools.filter(tool =>
    tool.categoryId && categoryCounts[tool.categoryId] > 1
  )

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/ai-tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/best-ai-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Tool pages (Priority 0.8)
  const toolPages: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Review pages (Priority 0.8)
  const reviewPages: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/review/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Pricing pages (Priority 0.7)
  // Assuming all tools have pricing or at least a pricing page structure
  const pricingPages: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/pricing/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Alternatives pages (Priority 0.7) - Filtered
  const alternativesPages: MetadataRoute.Sitemap = toolsWithAlternatives.map(tool => ({
    url: `${baseUrl}/alternatives/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Category pages (Priority 0.7) - Filtered
  const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Best-For pages (Priority 0.7) - Filtered
  const bestForPages: MetadataRoute.Sitemap = tags.map(tag => ({
    url: `${baseUrl}/best-ai-tools/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Blog post pages (Priority 0.6)
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Comparison pages (Priority 0.6)
  const comparisonPages: MetadataRoute.Sitemap = comparisons.map(comp => ({
    url: `${baseUrl}/vs/${comp.slug}`,
    lastModified: comp.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...toolPages,
    ...reviewPages,
    ...pricingPages,
    ...alternativesPages,
    ...categoryPages,
    ...bestForPages,
    ...blogPages,
    ...comparisonPages,
  ]
}
