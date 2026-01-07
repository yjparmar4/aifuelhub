// GEO (Graphical Entity Optimization) Schema Markup
// This helps Google understand entities, relationships, and knowledge graph signals

export function generateEntitySchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://toolatlas.com/#organization",
        "name": "ToolAtlas",
        "url": "https://toolatlas.com",
        "logo": "https://toolatlas.com/logo.png",
        "description": "AI Tools Directory - Expert reviews and comparisons of 118+ AI tools",
        "sameAs": [
          "https://twitter.com/toolatlas",
          "https://linkedin.com/company/toolatlas",
          "https://github.com/toolatlas"
        ],
        "knowsAbout": [
          "Artificial Intelligence",
          "Machine Learning",
          "AI Tools",
          "ChatGPT",
          "Midjourney",
          "Claude",
          "AI Image Generation",
          "AI Writing",
          "AI Coding",
          "Natural Language Processing",
          "Computer Vision",
          "Large Language Models"
        ],
        "areaServed": "Worldwide"
      },
      {
        "@type": "WebSite",
        "@id": "https://toolatlas.com/#website",
        "url": "https://toolatlas.com",
        "name": "ToolAtlas",
        "description": "The ultimate AI tools directory with 118+ verified tools",
        "publisher": {
          "@id": "https://toolatlas.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://toolatlas.com/ai-tools?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "ToolAtlas Platform",
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
      // Entity relationships for knowledge graph
      {
        "@type": "Thing",
        "name": "AI Tools",
        "description": "Software applications powered by artificial intelligence",
        "sameAs": [
          "https://en.wikipedia.org/wiki/Artificial_intelligence",
          "https://www.wikidata.org/wiki/Q11660"
        ]
      },
      {
        "@type": "Thing",
        "name": "ChatGPT",
        "description": "AI chatbot by OpenAI",
        "sameAs": [
          "https://en.wikipedia.org/wiki/ChatGPT",
          "https://www.wikidata.org/Q115498451"
        ]
      },
      {
        "@type": "Thing",
        "name": "Midjourney",
        "description": "AI image generation tool",
        "sameAs": [
          "https://en.wikipedia.org/wiki/Midjourney"
        ]
      },
      {
        "@type": "Thing",
        "name": "Claude",
        "description": "AI assistant by Anthropic",
        "sameAs": [
          "https://en.wikipedia.org/wiki/Claude_(chatbot)"
        ]
      },
      {
        "@type": "Person",
        "name": "ToolAtlas Editorial Team",
        "jobTitle": "AI Tools Reviewers",
        "worksFor": {
          "@id": "https://toolatlas.com/#organization"
        },
        "knowsAbout": [
          "AI Technology",
          "Software Reviews",
          "Product Comparison",
          "User Experience Testing"
        ]
      },
      {
        "@type": "Service",
        "name": "AI Tool Reviews",
        "description": "Expert reviews and comparisons of AI tools",
        "provider": {
          "@id": "https://toolatlas.com/#organization"
        },
        "serviceType": "Review Service",
        "areaServed": "Worldwide"
      }
    ]
  };
}

export function generateToolEntitySchema(toolName: string, toolSlug: string, category: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolName,
    "applicationCategory": category,
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": `https://toolatlas.com/tool/${toolSlug}`
    },
    "sameAs": [
      `https://toolatlas.com/tool/${toolSlug}`
    ]
  };
}

export function generateCategoryEntitySchema(categoryName: string, categorySlug: string, toolCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} AI Tools`,
    "description": `Browse ${toolCount} AI tools in the ${categoryName} category`,
    "url": `https://toolatlas.com/category/${categorySlug}`,
    "numberOfItems": toolCount,
    "about": {
      "@type": "Thing",
      "name": categoryName,
      "description": `AI tools for ${categoryName.toLowerCase()}`
    }
  };
}
