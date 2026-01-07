import { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { SITE_URL } from '@/lib/seo'

export async function GET(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL

  const [tools, categories, blogPosts, comparisons] = await Promise.all([
    db.tool.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    db.category.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    db.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
    }),
    db.comparison.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ])

  const urls: MetadataRoute.Sitemap = [
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
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Tools
    ...tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: tool.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Categories
    ...categories.map((category) => ({
      url: `${baseUrl}/ai-tools/${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    // Blog posts
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt || post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // Comparisons
    ...comparisons.map((comparison) => ({
      url: `${baseUrl}/compare/${comparison.slug}`,
      lastModified: comparison.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return urls
}
