/**
 * Article Series and Content Clustering Schema
 * Implements CollectionPage and ItemList schemas for topic clusters
 * Critical for establishing topical authority and SEO silos
 */

import { Tool, BlogPost, Category } from '@/types'
import { SITE_URL } from '@/lib/seo'

interface ArticleSeriesItem {
  title: string
  url: string
  position: number
  description?: string
  imageUrl?: string
  datePublished?: string
}

interface ArticleSeriesConfig {
  name: string
  description: string
  url: string
  items: ArticleSeriesItem[]
}

/**
 * Generate Article Series schema (CollectionPage + ItemList)
 * For "Complete Guide" type content with multiple parts
 */
export function generateArticleSeriesSchema(series: ArticleSeriesConfig): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: series.name,
    description: series.description,
    url: series.url,
    hasPart: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: series.items.length,
      itemListElement: series.items.map(item => ({
        '@type': 'ListItem',
        position: item.position,
        name: item.title,
        url: item.url,
        description: item.description,
        ...(item.imageUrl && {
          image: {
            '@type': 'ImageObject',
            url: item.imageUrl,
          },
        }),
        ...(item.datePublished && {
          datePublished: item.datePublished,
        }),
      })),
    },
  }

  return JSON.stringify(schema)
}

interface ContentClusterConfig {
  mainTopic: string
  pillarPage: {
    title: string
    url: string
    description: string
  }
  clusterPages: Array<{
    title: string
    url: string
    description: string
    contentType: 'guide' | 'comparison' | 'review' | 'tutorial' | 'faq'
    targetKeyword: string
  }>
}

/**
 * Generate Content Cluster schema
 * Establishes topical authority through pillar-cluster model
 */
export function generateContentClusterSchema(cluster: ContentClusterConfig): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: cluster.pillarPage.title,
    description: cluster.pillarPage.description,
    url: cluster.pillarPage.url,
    about: {
      '@type': 'Thing',
      name: cluster.mainTopic,
    },
    hasPart: cluster.clusterPages.map(page => ({
      '@type': 'WebPage',
      name: page.title,
      url: page.url,
      description: page.description,
      additionalType: getContentTypeSchema(page.contentType),
    })),
    // Create semantic relationships
    subjectOf: cluster.clusterPages.map(page => ({
      '@type': 'Thing',
      name: page.targetKeyword,
    })),
  }

  return JSON.stringify(schema)
}

/**
 * Generate Topic Cluster for AI Tools Category
 */
export function generateToolCategoryCluster(
  category: Category,
  tools: Tool[],
  relatedPosts: BlogPost[]
): string {
  const categoryUrl = `${SITE_URL}/categories/${category.slug}`
  
  const cluster: ContentClusterConfig = {
    mainTopic: category.name,
    pillarPage: {
      title: `Best ${category.name} Tools - Complete Guide 2026`,
      url: categoryUrl,
      description: category.description || `Discover the best ${category.name.toLowerCase()} tools with expert reviews and comparisons.`,
    },
    clusterPages: [
      // Tool reviews
      ...tools.slice(0, 5).map(tool => ({
        title: `${tool.name} Review 2026`,
        url: `${SITE_URL}/tool/${tool.slug}`,
        description: tool.description,
        contentType: 'review' as const,
        targetKeyword: `${tool.name} review`,
      })),
      // Comparisons
      tools.length > 1 ? {
        title: `Best ${category.name} Compared: ${tools[0]?.name} vs ${tools[1]?.name}`,
        url: `${SITE_URL}/vs/${tools[0]?.slug}-vs-${tools[1]?.slug}`,
        description: `Compare ${tools[0]?.name} and ${tools[1]?.name} side-by-side`,
        contentType: 'comparison' as const,
        targetKeyword: `${tools[0]?.name} vs ${tools[1]?.name}`,
      } : undefined,
      // Related blog posts
      ...relatedPosts.slice(0, 3).map(post => ({
        title: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        description: post.excerpt || '',
        contentType: 'guide' as const,
        targetKeyword: post.title,
      })),
    ].filter(Boolean) as ContentClusterConfig['clusterPages'],
  }

  return generateContentClusterSchema(cluster)
}

interface BreadcrumbItem {
  name: string
  url: string
  position?: number
}

/**
 * Enhanced BreadcrumbList schema with position and parent/child relationships
 */
export function generateEnhancedBreadcrumbSchema(
  items: BreadcrumbItem[],
  currentUrl: string
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position || index + 1,
      name: item.name,
      item: {
        '@type': 'WebPage',
        '@id': item.url,
        url: item.url,
        name: item.name,
        ...(index === items.length - 1 && {
          // Mark current page
          '@id': currentUrl,
        }),
      },
    })),
  }

  return JSON.stringify(schema)
}

/**
 * Generate Paginated Article Series schema
 * For multi-page articles (Part 1, Part 2, etc.)
 */
export function generatePaginatedSeriesSchema(
  seriesName: string,
  pages: Array<{
    url: string
    title: string
    pageNumber: number
    totalPages: number
  }>,
  currentPage: number
): string {
  const currentIndex = currentPage - 1
  const currentUrl = pages[currentIndex]?.url
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: seriesName,
    url: currentUrl,
    isPartOf: {
      '@type': 'CreativeWorkSeries',
      name: seriesName,
      hasPart: pages.map(page => ({
        '@type': 'WebPage',
        url: page.url,
        name: page.title,
        pagination: {
          '@type': 'PropertyValue',
          name: 'pageNumber',
          value: String(page.pageNumber),
        },
      })),
    },
    pagination: {
      '@type': 'PropertyValue',
      name: 'pageNumber',
      value: String(currentPage),
    },
    // Previous/Next page relations
    ...(currentPage > 1 && {
      prevPage: pages[currentIndex - 1]?.url,
    }),
    ...(currentPage < pages.length && {
      nextPage: pages[currentIndex + 1]?.url,
    }),
  }

  return JSON.stringify(schema)
}

/**
 * Generate Reading List / Learning Path schema
 * For structured learning content (courses, tutorials series)
 */
export function generateReadingListSchema(
  title: string,
  description: string,
  items: Array<{
    title: string
    url: string
    estimatedTime: string // ISO 8601 duration, e.g., "PT15M"
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  }>
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description: description,
    learningResourceType: 'reading list',
    hasPart: items.map((item, index) => ({
      '@type': 'LearningResource',
      position: index + 1,
      name: item.title,
      url: item.url,
      timeRequired: item.estimatedTime,
      educationalLevel: item.difficulty,
    })),
    // Total estimated time
    timeRequired: items.reduce((acc, item) => {
      // Simple duration parsing (assumes PT format)
      const minutes = parseInt(item.estimatedTime.match(/PT(\d+)M/)?.[1] || '0')
      return acc + minutes
    }, 0) + ' minutes',
  }

  return JSON.stringify(schema)
}

/**
 * Generate Tool Comparison Cluster schema
 * For "Best Tools for X" type content
 */
export function generateComparisonClusterSchema(
  mainTitle: string,
  tools: Tool[],
  comparisonCriteria: string[]
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: mainTitle,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `${SITE_URL}/tool/${tool.slug}`,
      description: tool.description,
      // Aggregate rating for ranking
      ...(tool.rating && {
        review: {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: tool.rating,
            bestRating: '5',
          },
        },
      }),
      // Comparison points
      additionalProperty: comparisonCriteria.map(criterion => ({
        '@type': 'PropertyValue',
        name: criterion,
        value: getToolCriterionValue(tool, criterion),
      })),
    })),
  }

  return JSON.stringify(schema)
}

// Helper functions
function getContentTypeSchema(contentType: string): string {
  const typeMap: Record<string, string> = {
    guide: 'https://schema.org/Article',
    comparison: 'https://schema.org/Review',
    review: 'https://schema.org/Review',
    tutorial: 'https://schema.org/HowTo',
    faq: 'https://schema.org/FAQPage',
  }
  return typeMap[contentType] || 'https://schema.org/Article'
}

function getToolCriterionValue(tool: Tool, criterion: string): string {
  const criterionLower = criterion.toLowerCase()
  
  if (criterionLower.includes('price') || criterionLower.includes('cost')) {
    return tool.startingPrice || 'Contact for pricing'
  }
  if (criterionLower.includes('rating') || criterionLower.includes('score')) {
    return tool.rating ? `${tool.rating}/5` : 'Not rated'
  }
  if (criterionLower.includes('feature')) {
    const features = JSON.parse(tool.features || '[]')
    return features.slice(0, 3).join(', ')
  }
  
  return 'See full review'
}

/**
 * Generate Entity Graph for AEO/GEO
 * Creates interconnected entity relationships for AI search engines
 */
export function generateEntityGraphSchema(
  entities: Array<{
    name: string
    type: 'SoftwareApplication' | 'Organization' | 'Person' | 'Thing'
    url: string
    relationships: Array<{
      type: 'competitor' | 'alternative' | 'related' | 'parent' | 'child'
      target: string
    }>
  }>
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': entities.map(entity => ({
      '@type': entity.type,
      '@id': entity.url,
      name: entity.name,
      url: entity.url,
      // Add relationships
      ...entity.relationships.reduce((acc, rel) => {
        const key = rel.type === 'competitor' ? 'competitor' :
                    rel.type === 'alternative' ? 'isRelatedTo' :
                    rel.type === 'related' ? 'isRelatedTo' :
                    rel.type === 'parent' ? 'isPartOf' :
                    rel.type === 'child' ? 'hasPart' : 'isRelatedTo'
        
        acc[key] = acc[key] || []
        if (Array.isArray(acc[key])) {
          acc[key].push({ '@id': rel.target })
        }
        return acc
      }, {} as Record<string, any>),
    })),
  }

  return JSON.stringify(schema)
}
