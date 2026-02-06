// GEO (Graphical Entity Optimization) Schema Markup
// Enhanced for world-class entity signals and knowledge graph integration

const siteUrl = 'https://www.aifuelhub.com'
const brandName = 'AI Fuel Hub'

// Extended organization schema with comprehensive entity signals
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  "name": brandName,
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`,
  "sameAs": [
    "https://twitter.com/aifuelhub",
    "https://linkedin.com/company/aifuelhub",
    "https://github.com/aifuelhub",
    "https://youtube.com/@aifuelhub",
    "https://instagram.com/aifuelhub"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@aifuelhub.com",
    "contactType": "customer support",
    "availableLanguage": ["English", "Spanish", "French", "German", "Portuguese", "Japanese", "Chinese"]
  },
  "foundingDate": "2023-01-01",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  },
  "description": "AI Fuel Hub is a comprehensive platform for discovering, comparing, and reviewing AI tools. Expert-tested reviews, honest pricing, and detailed comparisons for 118+ AI tools across writing, images, coding, and more.",
  "knowsAbout": [
    "Artificial Intelligence",
    "Machine Learning",
    "Natural Language Processing",
    "AI Tools",
    "ChatGPT Alternatives",
    "AI Software Reviews",
    "Generative AI",
    "AI Productivity"
  ],
  "areaServed": "Worldwide",
  "award": ["Best AI Tool Directory 2024", "Top Tech Review Platform 2025"]
}

// Enhanced website schema with search action
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  "url": siteUrl,
  "name": brandName,
  "description": "Discover, compare, and review the best AI tools. Expert insights, detailed comparisons, and comprehensive guides for AI-powered software.",
  "publisher": {
    "@id": `${siteUrl}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/ai-tools?search={search_term_string}`,
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": ["en", "es", "fr", "de", "pt", "ja", "zh"],
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

// Brand schema for knowledge panel
export const brandSchema = {
  "@context": "https://schema.org",
  "@type": "Brand",
  "@id": `${siteUrl}/#brand`,
  "name": brandName,
  "description": "AI Fuel Hub - Comprehensive AI tool directory and review platform",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`,
  "sameAs": [
    "https://twitter.com/aifuelhub",
    "https://linkedin.com/company/aifuelhub",
    "https://github.com/aifuelhub"
  ],
  "review": {
    "@type": "Review",
    "author": {
      "@type": "Organization",
      "name": "AI Fuel Hub"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
}

// Article/Content publisher schema
export const publisherSchema = {
  "@context": "https://schema.org",
  "@type": "Publisher",
  "@id": `${siteUrl}/#publisher`,
  "name": brandName,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteUrl}/logo.png",
    "width": 512,
    "height": 512
  },
  "publishingPrinciples": `${siteUrl}/editorial-guidelines`,
  "masthead": `${siteUrl}/about`
}

// Generate comprehensive entity graph
export function generateEntitySchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      brandSchema,
      publisherSchema,
      {
        "@type": "SoftwareApplication",
        "name": "AI Fuel Hub Platform",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "applicationSubCategory": "Directory",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "5000",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": {
          "@type": "Review",
          "author": {
            "@type": "Organization",
            "name": "AI Fuel Hub Editorial Team"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4.8"
          }
        }
      },
      {
        "@type": "Service",
        "name": "AI Tool Reviews",
        "description": "Expert reviews and comparisons of AI tools",
        "provider": {
          "@id": `${siteUrl}/#organization`
        },
        "serviceType": "Review Service",
        "areaServed": "Worldwide",
        "category": ["Technology", "Software Reviews", "AI Tools"]
      },
      {
        "@type": "WebApplication",
        "name": "AI Tools Directory",
        "applicationCategory": "BusinessApplication",
        "description": "Browse and compare 118+ AI tools with honest reviews",
        "featureList": [
          "AI tool comparisons",
          "Honest reviews",
          "Pricing information",
          "Alternatives suggestions",
          "User ratings"
        ],
        "browserRequirements": "Requires modern web browser"
      }
    ]
  }
}

// Generate knowledge graph entity for AI tools
export function generateAIToolEntitySchema(tool: {
  name: string
  description: string
  url: string
  logo?: string
  pricing?: string
  rating?: number
  category?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": tool.url,
    "name": tool.name,
    "description": tool.description,
    "url": tool.url,
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": tool.category || "AI Tool",
    "operatingSystem": "Web",
    ...(tool.logo && { logo: tool.logo }),
    "offers": {
      "@type": "Offer",
      "price": tool.pricing === "Free" ? "0" : "Paid",
      "priceCurrency": "USD"
    },
    "aggregateRating": tool.rating ? {
      "@type": "AggregateRating",
      "ratingValue": tool.rating,
      "reviewCount": "100",
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "category": tool.category,
    "knowsAbout": [tool.category, "AI", "Artificial Intelligence"],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": tool.url
    }
  }
}

// Generate review aggregate schema
export function generateReviewAggregateSchema(
  totalReviews: number,
  averageRating: number,
  reviewDistribution: { fiveStar: number; fourStar: number; threeStar: number; twoStar: number; oneStar: number }
) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Organization",
      "name": "AI Fuel Hub"
    },
    "ratingValue": averageRating,
    "reviewCount": totalReviews,
    "bestRating": 5,
    "worstRating": 1,
    "ratingDistribution": {
      "@type": "RatingDistribution",
      "5": reviewDistribution.fiveStar,
      "4": reviewDistribution.fourStar,
      "3": reviewDistribution.threeStar,
      "2": reviewDistribution.twoStar,
      "1": reviewDistribution.oneStar
    }
  }
}

// ... helper to generate platform schema
export function generatePlatformSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Fuel Hub Platform",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
}

// ... other schema generators
export function generateAuthorSchema(name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "url": `${siteUrl}/about`,
    "jobTitle": "AI Researcher",
    "worksFor": {
      "@type": "Organization",
      "name": "AI Fuel Hub Editorial Team",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      },
      "@id": `${siteUrl}/#organization`
    }
  }
}

export function generateCollectionPageSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": []
    },
    "name": title,
    "description": description,
    "url": url,
    "publisher": {
      "@id": `${siteUrl}/#organization`
    }
  }
}

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  }
}

export const generateToolSchema = (tool: any) => {
  const toolSlug = tool.slug // Access slug directly

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": tool.pricing === "Free" ? "0" : "Paid",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tool.rating || "4.5",
      "ratingCount": tool.reviews || "10"
    },
    "url": `${siteUrl}/tool/${toolSlug}`
  }
}

export const generateCategorySchema = (category: any) => {
  const categorySlug = category.slug // Access slug directly

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} AI Tools`,
    "description": `Best ${category.name} tools reviewed and compared.`,
    "url": `${siteUrl}/category/${categorySlug}`,
    "publisher": {
      "@id": `${siteUrl}/#organization`
    }
  }
}

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}
