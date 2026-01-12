// GEO (Graphical Entity Optimization) Schema Markup
// This helps Google understand entities, relationships, and knowledge graph signals

const siteUrl = 'https://www.aifuelhub.com'
const brandName = 'AI Fuel Hub'

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
    "https://github.com/aifuelhub"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@aifuelhub.com",
    "contactType": "customer support"
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  "url": siteUrl,
  "name": brandName,
  "publisher": {
    "@id": `${siteUrl}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/ai-tools?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
}

export function generateEntitySchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      {
        "@type": "SoftwareApplication",
        "name": "AI Fuel Hub Platform",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
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
        "areaServed": "Worldwide"
      }
    ]
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
