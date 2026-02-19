/**
 * Knowledge Graph Optimization Module
 * Enhanced schema markup for Google Knowledge Graph dominance
 * Optimizes entity signals for better search visibility and rich results
 */

import { SITE_URL } from '@/lib/seo'

// Knowledge Graph entity types for AI Fuel Hub
export const KNOWLEDGE_GRAPH_ENTITIES = {
  organization: {
    '@type': 'Organization',
    name: 'AI Fuel Hub',
    description: 'The leading AI tools directory with comprehensive reviews, comparisons, and recommendations',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/og-image.png`,
    foundingDate: '2024',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 5,
      maxValue: 20,
      value: 10
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    },
    serviceType: ['AI Tools Reviews', 'Software Comparisons', 'Technology Recommendations'],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Natural Language Processing',
      'AI Tools',
      'Software Reviews',
      'Technology Comparison'
    ],
    sameAs: [
      'https://twitter.com/aifuelhub',
      'https://linkedin.com/company/aifuelhub',
      'https://facebook.com/aifuelhub',
      'https://instagram.com/aifuelhub',
      'https://youtube.com/@aifuelhub'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@aifuelhub.com',
      availableLanguage: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean']
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'BrowseAction',
        target: `${SITE_URL}/ai-tools`,
        name: 'Browse AI Tools'
      },
      {
        '@type': 'ReviewAction',
        target: `${SITE_URL}/blog`,
        name: 'Read AI Tool Reviews'
      }
    ]
  },

  website: {
    '@type': 'WebSite',
    name: 'AI Fuel Hub',
    url: SITE_URL,
    description: 'Comprehensive directory of AI tools with expert reviews and comparisons',
    publisher: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'en-US',
    audience: {
      '@type': 'Audience',
      audienceType: 'Technology professionals, businesses, students, and AI enthusiasts'
    }
  },

  about: {
    '@type': 'AboutPage',
    name: 'About AI Fuel Hub',
    description: 'Learn about AI Fuel Hub - your trusted source for AI tools reviews and comparisons',
    url: `${SITE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL
    }
  }
}

// Generate comprehensive Knowledge Graph schema
export function generateKnowledgeGraphSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      KNOWLEDGE_GRAPH_ENTITIES.organization,
      KNOWLEDGE_GRAPH_ENTITIES.website,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'AI Tools',
            item: `${SITE_URL}/ai-tools`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Blog',
            item: `${SITE_URL}/blog`
          }
        ]
      }
    ]
  }
}

// Generate Q&A Knowledge Graph schema
export function generateQAKnowledgeGraph(questions: Array<{
  question: string
  acceptedAnswer: string
  upvotedCount?: number
}>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      text: q.question,
      answerCount: 1,
      upvoteCount: q.upvotedCount || 0,
      dateCreated: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'AI Fuel Hub'
      },
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.acceptedAnswer,
        dateCreated: new Date().toISOString(),
        upvoteCount: 0,
        url: `${SITE_URL}/faq#${q.question.toLowerCase().replace(/\s+/g, '-')}`,
        author: {
          '@type': 'Organization',
          name: 'AI Fuel Hub',
          url: SITE_URL
        }
      }
    }))
  }
}

// Generate HowTo Knowledge Graph schema
export function generateHowToKnowledgeGraph(howTo: {
  title: string
  description: string
  steps: Array<{ name: string; text: string; url?: string }>
  totalTime?: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.title,
    description: howTo.description,
    totalTime: howTo.totalTime || 'PT30M',
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url || `${SITE_URL}/how-to#step-${index + 1}`,
      image: `${SITE_URL}/og-image.png`
    })),
    provider: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL
    }
  }
}

// Generate Course Knowledge Graph schema
export function generateCourseKnowledgeGraph(course: {
  title: string
  description: string
  provider: string
  offers: Array<{ price: string; priceCurrency: string }>
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.provider,
      url: SITE_URL
    },
    offers: course.offers.map(offer => ({
      '@type': 'Offer',
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      availability: 'https://schema.org/InStock'
    })),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'P1H',
      offers: course.offers[0]
    }
  }
}

// Generate Article Knowledge Graph with enhanced signals
export function generateArticleKnowledgeGraph(article: {
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  url?: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image || `${SITE_URL}/og-image.png`,
    url: article.url || SITE_URL,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url || SITE_URL
    },
    articleSection: 'Technology',
    wordCount: 1500,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    spokenByTheme: {
      '@type': 'BackgroundSound',
      name: 'AI Fuel Hub Audio',
      description: 'Audio version of the article'
    }
  }
}

// Generate Product/Software Knowledge Graph
export function generateProductKnowledgeGraph(product: {
  name: string
  description: string
  brand: string
  rating?: number
  reviewCount?: number
  price?: string
  priceCurrency?: string
  availability?: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    sku: product.name.toLowerCase().replace(/\s+/g, '-'),
    mpn: product.name.toUpperCase().replace(/\s+/g, ''),
    gtin: '123456789012',
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 1,
        bestRating: 5,
        worstRating: 1
      }
    }),
    offers: {
      '@type': 'Offer',
      price: product.price || '0',
      priceCurrency: product.priceCurrency || 'USD',
      availability: product.availability || 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'AI Fuel Hub'
      }
    },
    category: 'Software',
    isRelatedTo: [],
    isSimilarTo: []
  }
}

// Generate Organization schema for knowledge panel
export function generateOrganizationKnowledgePanel(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Fuel Hub',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/og-image.png`,
    description: 'The leading AI tools directory providing honest reviews, comparisons, and recommendations for AI software and tools.',
    foundingDate: '2024',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 10
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    },
    serviceType: [
      'AI Tools Directory',
      'Software Reviews',
      'Technology Comparisons',
      'Product Recommendations'
    ],
    parentOrganization: null,
    subsidiaries: [],
    founders: [
      {
        '@type': 'Person',
        name: 'AI Fuel Hub Team'
      }
    ],
    sameAs: [
      'https://twitter.com/aifuelhub',
      'https://linkedin.com/company/aifuelhub',
      'https://facebook.com/aifuelhub',
      'https://instagram.com/aifuelhub',
      'https://youtube.com/@aifuelhub'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: 'customer service',
      email: 'hello@aifuelhub.com',
      availableLanguage: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean']
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'ViewAction',
        target: `${SITE_URL}/ai-tools`,
        name: 'View AI Tools'
      },
      {
        '@type': 'ReadAction',
        target: `${SITE_URL}/blog`,
        name: 'Read Reviews'
      }
    ],
    knowsAbout: [
      {
        '@type': 'Thing',
        name: 'Artificial Intelligence',
        description: 'AI technology and tools'
      },
      {
        '@type': 'Thing',
        name: 'Machine Learning',
        description: 'ML tools and software'
      },
      {
        '@type': 'Thing',
        name: 'Natural Language Processing',
        description: 'NLP tools and applications'
      },
      {
        '@type': 'Thing',
        name: 'AI Writing Tools',
        description: 'AI-powered writing assistants'
      },
      {
        '@type': 'Thing',
        name: 'AI Image Generators',
        description: 'AI art and image creation tools'
      }
    ]
  }
}

// Generate FAQ schema for rich results
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Generate Review schema for knowledge graph
export function generateReviewSchema(review: {
  itemReviewed: string
  reviewRating: number
  name: string
  author: string
  reviewBody: string
  datePublished: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Thing',
      name: review.itemReviewed,
      url: `${SITE_URL}/tool/${review.itemReviewed.toLowerCase().replace(/\s+/g, '-')}`
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.reviewRating,
      bestRating: 5,
      worstRating: 1
    },
    name: review.name,
    author: {
      '@type': 'Organization',
      name: review.author,
      url: SITE_URL
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
    publisher: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL
    }
  }
}

// Generate complete knowledge graph with all entities
export function generateCompleteKnowledgeGraph(): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateOrganizationKnowledgePanel(),
      KNOWLEDGE_GRAPH_ENTITIES.website,
      {
        '@type': 'WebPage',
        url: SITE_URL,
        name: 'AI Fuel Hub - AI Tools Directory',
        description: 'Discover, compare, and review the best AI tools',
        isPartOf: {
          '@type': 'WebSite',
          url: SITE_URL,
          name: 'AI Fuel Hub'
        },
        about: {
          '@type': 'Organization',
          name: 'AI Fuel Hub',
          url: SITE_URL
        },
        publisher: {
          '@type': 'Organization',
          name: 'AI Fuel Hub',
          url: SITE_URL
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'AI Tools',
            item: `${SITE_URL}/ai-tools`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Reviews',
            item: `${SITE_URL}/blog`
          }
        ]
      }
    ]
  }
}
