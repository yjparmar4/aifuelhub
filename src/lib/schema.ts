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
      price: tool.startingPrice ? tool.startingPrice.replace(/[^0-9.]/g, '') || '0' : '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US'
        }
      }
    },
    aggregateRating: tool.rating && tool.rating > 0 && tool.reviewCount && tool.reviewCount > 0
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
  // Calculate word count for E-E-A-T signal
  const wordCount = blogPost.content ? blogPost.content.split(/\s+/).length : 0

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blogPost.title,
    description: blogPost.excerpt || blogPost.metaDescription || '',
    image: blogPost.coverImage?.startsWith('http') ? blogPost.coverImage : `${SITE_URL}${blogPost.coverImage}`,
    url: `${SITE_URL}/blog/${blogPost.slug}`,
    datePublished: blogPost.publishedAt?.toISOString(),
    dateModified: blogPost.updatedAt.toISOString(),
    // E-E-A-T: Author information
    author: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      // Could be enhanced with Person schema in future
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
    // AEO: Speakable content for voice search
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.speakable-summary']
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${blogPost.slug}`,
    },
    // E-E-A-T signals
    wordCount: wordCount,
    // Category as 'about' for entity relationship
    ...(blogPost.category && {
      about: {
        '@type': 'Thing',
        name: blogPost.category.name,
        url: `${SITE_URL}/categories/${blogPost.category.slug}`,
      },
    }),
    // Keywords for topic clustering
    ...(blogPost.tags && blogPost.tags.length > 0 && {
      keywords: blogPost.tags.map(tag => tag.name).join(', '),
    }),
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

// Extract FAQs from blog content for rich snippets
// Looks for common FAQ patterns like "## FAQ" sections or Q&A formatted content
export function extractFAQsFromContent(content: string): FAQ[] {
  const faqs: FAQ[] = []

  // Pattern 1: Look for FAQ section with question/answer format
  // Matches patterns like "**Q: Question?**" followed by answer or "### Question?" followed by answer
  const faqSectionMatch = content.match(/##\s*(FAQ|Frequently Asked Questions|Common Questions)[^\n]*\n([\s\S]*?)(?=##[^#]|$)/i)

  if (faqSectionMatch) {
    const faqContent = faqSectionMatch[2]

    // Pattern: ### Question? followed by answer paragraph
    const questionPattern = /###\s*([^\n?]+\??)\s*\n+([\s\S]*?)(?=###|\n##[^#]|$)/gi
    let match

    while ((match = questionPattern.exec(faqContent)) !== null) {
      const question = match[1].trim().replace(/^\*+|\*+$/g, '')
      let answer = match[2].trim()

      // Clean up the answer - remove markdown formatting
      answer = answer
        .replace(/\*\*/g, '')
        .replace(/^\s*[-*]\s*/gm, '')
        .split('\n\n')[0] // Take first paragraph
        .trim()

      if (question && answer && question.length > 10 && answer.length > 20) {
        faqs.push({ question, answer })
      }
    }

    // Pattern: **Q: Question?** or **Question?** followed by answer
    if (faqs.length === 0) {
      const boldQuestionPattern = /\*\*(?:Q:\s*)?([^*?]+\??)\*\*[:\s]*\n*([\s\S]*?)(?=\*\*(?:Q:|[A-Z])|\n##|$)/gi

      while ((match = boldQuestionPattern.exec(faqContent)) !== null) {
        const question = match[1].trim()
        let answer = match[2].trim()
          .replace(/\*\*/g, '')
          .replace(/^A:\s*/i, '')
          .split('\n\n')[0]
          .trim()

        if (question && answer && question.length > 10 && answer.length > 20) {
          faqs.push({ question, answer })
        }
      }
    }
  }

  // Pattern 2: Look for numbered questions throughout the content
  if (faqs.length === 0) {
    const numberedPattern = /(?:^|\n)\d+\.\s*\*\*([^*?]+\??)\*\*[:\s]*\n*([\s\S]*?)(?=\n\d+\.\s*\*\*|\n##|$)/gi
    let match

    while ((match = numberedPattern.exec(content)) !== null) {
      const question = match[1].trim()
      let answer = match[2].trim()
        .replace(/\*\*/g, '')
        .split('\n\n')[0]
        .trim()

      if (question && answer && question.includes('?') && question.length > 10 && answer.length > 20) {
        faqs.push({ question, answer })
      }
    }
  }

  // Limit to 10 FAQs maximum for schema
  return faqs.slice(0, 10)
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

// Contact Page Schema
export function generateContactPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact AI Fuel Hub',
    description: 'Get in touch with the AI Fuel Hub team for support, suggestions, or inquiries.',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL,
      email: 'hello@aifuelhub.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@aifuelhub.com',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'general inquiries',
          email: 'hello@aifuelhub.com',
        },
      ],
    },
  }

  return JSON.stringify(schema)
}

// HowTo Schema for tutorial content - AEO optimization for "how to" queries
interface HowToStep {
  name: string
  text: string
  image?: string
}

export function generateHowToSchema(
  title: string,
  description: string,
  steps: HowToStep[],
  totalTime?: string, // ISO 8601 duration format, e.g., "PT30M"
  tools?: string[],
  supplies?: string[]
) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    ...(totalTime && { totalTime }),
    ...(tools && tools.length > 0 && {
      tool: tools.map(tool => ({
        '@type': 'HowToTool',
        name: tool,
      })),
    }),
    ...(supplies && supplies.length > 0 && {
      supply: supplies.map(supply => ({
        '@type': 'HowToSupply',
        name: supply,
      })),
    }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  }

  return JSON.stringify(schema)
}

// Extract HowTo steps from content - for automatic schema generation
export function extractHowToSteps(content: string): HowToStep[] {
  const steps: HowToStep[] = []

  // Pattern: "Step 1:" or "### Step 1" followed by content
  const stepPattern = /(?:###?\s*)?(?:Step\s*)?(\d+)[:.]\s*([^\n]+)\n+([\s\S]*?)(?=(?:###?\s*)?(?:Step\s*)?\d+[:.]\s*|##[^#]|$)/gi

  let match
  while ((match = stepPattern.exec(content)) !== null) {
    const name = match[2].trim().replace(/\*\*/g, '')
    let text = match[3].trim()
      .replace(/\*\*/g, '')
      .split('\n\n')[0]
      .trim()

    if (name && text && name.length > 5 && text.length > 20) {
      steps.push({ name, text })
    }
  }

  return steps.slice(0, 15) // Limit to 15 steps
}

// ItemList Schema for listicle content - helps with rich snippets
export function generateItemListSchema(
  title: string,
  items: { name: string; url?: string; description?: string }[],
  listType: 'ordered' | 'unordered' = 'ordered'
) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListOrder: listType === 'ordered' ? 'https://schema.org/ItemListOrderAscending' : 'https://schema.org/ItemListUnordered',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { url: item.url }),
      ...(item.description && { description: item.description }),
    })),
  }

  return JSON.stringify(schema)
}

// VideoObject Schema for embedded videos - AEO for video content
export function generateVideoSchema(
  title: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration?: string, // ISO 8601 duration
  embedUrl?: string,
  contentUrl?: string
) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description,
    thumbnailUrl: thumbnailUrl,
    uploadDate: uploadDate,
    ...(duration && { duration }),
    ...(embedUrl && { embedUrl }),
    ...(contentUrl && { contentUrl }),
    publisher: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
  }

  return JSON.stringify(schema)
}

// WebPage Schema with speakable for AEO
export function generateWebPageSchema(
  title: string,
  description: string,
  url: string,
  speakableSelectors?: string[]
) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'AI Fuel Hub',
      url: SITE_URL,
    },
    ...(speakableSelectors && speakableSelectors.length > 0 && {
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: speakableSelectors,
      },
    }),
  }

  return JSON.stringify(schema)
}

// ClaimReview Schema for fact-checking - Critical for AEO
export function generateClaimReviewSchema(
  claim: string,
  verdict: 'True' | 'False' | 'Misleading',
  reviewedBy: string,
  datePublished: string,
  url?: string,
  source?: string
) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    claimReviewed: claim,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: verdict === 'True' ? 5 : verdict === 'False' ? 1 : 3,
      bestRating: 5,
      worstRating: 1,
      alternateName: verdict,
    },
    author: {
      '@type': 'Organization',
      name: reviewedBy,
      url: SITE_URL,
    },
    datePublished: datePublished,
    ...(url && { url: url }),
    ...(source && {
      itemReviewed: {
        '@type': 'Claim',
        author: {
          '@type': 'Organization',
          name: source,
        },
        datePublished: datePublished,
        appearance: {
          '@type': 'CreativeWork',
          url: source,
        },
      },
    }),
  }

  return JSON.stringify(schema)
}

// Entity mention helper - marks tools, companies, etc. for better NLP
export function generateEntityMention(
  name: string,
  type: 'SoftwareApplication' | 'Organization' | 'Product',
  url?: string
) {
  return {
    '@type': type,
    name: name,
    ...(url && { url: url }),
  }
}
