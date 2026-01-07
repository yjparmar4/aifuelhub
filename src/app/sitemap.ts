import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  // Get all tools
  const tools = await db.tool.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })
  
  // Get all categories
  const categories = await db.category.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
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
  
  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = comparisons.map(comp => ({
    url: `${baseUrl}/vs/${comp.slug}`,
    lastModified: comp.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [
    ...staticPages,
    ...toolPages,
    ...categoryPages,
    ...blogPages,
    ...comparisonPages,
  ]
}
