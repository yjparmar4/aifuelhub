import { Tool, FAQ, BlogPost, Category } from '@/types'
import { SITE_URL } from '@/lib/seo'

// Product/Review Schema for tools
// Product/Review Schema for tools
export function generateToolSchema(tool: Tool) {
  const features = JSON.parse(tool.features || '[]')
  // Parse Pros and Cons for Schema
  const pros = tool.pros ? JSON.parse(tool.pros) : []
  const cons = tool.cons ? JSON.parse(tool.cons) : []

  const toolImageUrl = `${SITE_URL}/logo.svg`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    image: toolImageUrl,
    url: `${SITE_URL}/tool/${tool.slug}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    brand: {
      '@type': 'Brand',
      name: tool.name,
    },
    offers: {
      '@type': 'Offer',
      url: tool.affiliateLink || tool.websiteUrl,
      price: tool.startingPrice || '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      ...(tool.pricingType === 'Free' && {
        price: '0',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '0',
          priceCurrency: 'USD',
        },
      }),
    },
    aggregateRating: tool.rating
      ? {
        '@type': 'AggregateRating',
        ratingValue: tool.rating,
        reviewCount: tool.reviewCount,
        bestRating: '5',
        worstRating: '1',
      }
      : undefined,
    featureList: features,

    // Editorial Review with Pros/Cons
    review: {
      '@type': 'Review',
      author: {
        '@type': 'Organization',
        name: 'AI Fuel Hub',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: tool.rating || '4.5',
        bestRating: '5',
      },
      ...(pros.length > 0 && {
        positiveNotes: {
          '@type': 'ItemList',
          itemListElement: pros.map((pro: string, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: pro,
          })),
        },
      }),
      ...(cons.length > 0 && {
        negativeNotes: {
          '@type': 'ItemList',
          itemListElement: cons.map((con: string, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: con,
          })),
        },
      }),
    }
  }

  return JSON.stringify(schema)
}

// Article Schema for blog posts
export function generateBlogPostSchema(blogPost: BlogPost) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blogPost.title,
    description: blogPost.excerpt || blogPost.metaDescription || '',
    image: blogPost.coverImage,
    url: `${SITE_URL}/blog/${blogPost.slug}`,
    datePublished: blogPost.publishedAt?.toISOString(),
    dateModified: blogPost.updatedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      logo: {
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${blogPost.slug}`,
    },
  }

  return JSON.stringify(schema)
}

// FAQ Schema
export function generateFAQSchema(faqs: FAQ[]) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return JSON.stringify(schema)
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
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

// WebSite Schema
export function generateWebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Fuel Hub',
    url: SITE_URL,
    description: 'Discover, compare, and review the best AI tools',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return JSON.stringify(schema)
}

// Organization Schema
export function generateOrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Fuel Hub',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: 'The leading directory for AI tools and software reviews',
    sameAs: [],
  }

  return JSON.stringify(schema)
}

// Category Schema
export function generateCategorySchema(category: Category, tools: Tool[]) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} - AI Tools`,
    description: category.description,
    url: `${SITE_URL}/ai-tools/${category.slug}`,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: tool.name,
        url: `${SITE_URL}/tool/${tool.slug}`,
      },
    })),
  }

  return JSON.stringify(schema)
}
