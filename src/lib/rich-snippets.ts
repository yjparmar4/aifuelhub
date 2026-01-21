import { SITE_URL } from './seo'

/**
 * Rich Snippets Structured Data
 * Implements comprehensive schema markup for enhanced search result appearance
 */

export interface VideoRichSnippet {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  embedUrl?: string
  contentUrl?: string
  author?: string
  viewCount?: number
  publication?: {
    name: string
    logo: string
  }
}

export interface ReviewRichSnippet {
  itemReviewed: {
    name: string
    image?: string
    type: 'SoftwareApplication' | 'Product' | 'Service'
  }
  reviewBody: string
  author: string
  rating: number
  bestRating?: number
  worstRating?: number
  datePublished?: string
  verified?: boolean
}

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Generate VideoObject schema for video rich snippets
 * Helps with video search results and video previews
 */
export function generateVideoRichSnippet(video: VideoRichSnippet): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    ...(video.duration && { duration: video.duration }),
    ...(video.embedUrl && { embedUrl: video.embedUrl }),
    ...(video.contentUrl && { contentUrl: video.contentUrl }),
    ...(video.author && {
      author: {
        '@type': 'Organization',
        name: video.author
      }
    }),
    ...(video.viewCount && { interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'WatchAction' },
      userInteractionCount: video.viewCount
    }}),
    ...(video.publication && {
      publisher: {
        '@type': 'Organization',
        name: video.publication.name,
        logo: {
          '@type': 'ImageObject',
          url: video.publication.logo
        }
      }
    })
  }

  return JSON.stringify(schema)
}

/**
 * Generate Review schema for review rich snippets
 * Displays star ratings in search results
 */
export function generateReviewRichSnippet(review: ReviewRichSnippet): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': review.itemReviewed.type,
      name: review.itemReviewed.name,
      ...(review.itemReviewed.image && { image: review.itemReviewed.image })
    },
    reviewBody: review.reviewBody,
    author: {
      '@type': 'Person',
      name: review.author
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: review.bestRating || 5,
      worstRating: review.worstRating || 1
    },
    ...(review.datePublished && { datePublished: review.datePublished }),
    ...(review.verified && { reviewAspect: 'verifiedPurchase' })
  }

  return JSON.stringify(schema)
}

/**
 * Generate BreadcrumbList schema for breadcrumb rich snippets
 * Shows navigation path in search results
 */
export function generateBreadcrumbRichSnippet(items: BreadcrumbItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return JSON.stringify(schema)
}

/**
 * Generate AggregateRating schema for star ratings
 * Shows overall rating in search results
 */
export function generateAggregateRatingSchema({
  itemReviewed,
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1
}: {
  itemReviewed: {
    name: string
    type: 'SoftwareApplication' | 'Product' | 'Service'
    image?: string
  }
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name,
      ...(itemReviewed.image && { image: itemReviewed.image })
    },
    ratingValue,
    reviewCount,
    bestRating,
    worstRating
  }

  return JSON.stringify(schema)
}

/**
 * Generate Product schema with rich snippets
 * Shows price, availability, and reviews in search results
 */
export function generateProductRichSnippet({
  name,
  description,
  image,
  url,
  brand,
  price,
  priceCurrency,
  availability,
  rating,
  reviewCount,
  reviews
}: {
  name: string
  description: string
  image: string
  url: string
  brand: string
  price: string
  priceCurrency: string
  availability: 'InStock' | 'OutOfStock' | 'PreOrder'
  rating?: number
  reviewCount?: number
  reviews?: Array<{ author: string; rating: number; text: string }>
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
    brand: {
      '@type': 'Brand',
      name: brand
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: `https://schema.org/${availability}`,
      url
    },
    ...(rating && reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount,
        bestRating: 5,
        worstRating: 1
      }
    }),
    ...(reviews && reviews.length > 0 && {
      review: reviews.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1
        },
        reviewBody: review.text
      }))
    })
  }

  return JSON.stringify(schema)
}

/**
 * Generate FAQPage schema for FAQ rich snippets
 * Shows questions and answers in search results
 */
export function generateFAQRichSnippet(
  faqs: Array<{ question: string; answer: string }>
): string {
  const schema = {
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

  return JSON.stringify(schema)
}

/**
 * Generate HowTo schema for how-to rich snippets
 * Shows step-by-step instructions in search results
 */
export function generateHowToRichSnippet({
  name,
  description,
  steps,
  totalTime,
  tools,
  supplies
}: {
  name: string
  description: string
  steps: Array<{ name: string; text: string; image?: string }>
  totalTime?: string
  tools?: string[]
  supplies?: string[]
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(tools && tools.length > 0 && {
      tool: tools.map(tool => ({
        '@type': 'HowToTool',
        name: tool
      }))
    }),
    ...(supplies && supplies.length > 0 && {
      supply: supplies.map(supply => ({
        '@type': 'HowToSupply',
        name: supply
      }))
    }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image })
    }))
  }

  return JSON.stringify(schema)
}

/**
 * Generate Article schema for article rich snippets
 * Shows author, date, and publisher information
 */
export function generateArticleRichSnippet({
  headline,
  description,
  image,
  author,
  datePublished,
  dateModified,
  publisher
}: {
  headline: string
  description: string
  image: string
  author: string
  datePublished: string
  dateModified: string
  publisher: {
    name: string
    logo: string
  }
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo
      }
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_URL
    }
  }

  return JSON.stringify(schema)
}

/**
 * Generate Recipe schema for recipe rich snippets
 * Shows ingredients, cooking time, and nutrition info
 */
export function generateRecipeRichSnippet({
  name,
  description,
  image,
  recipeYield,
  prepTime,
  cookTime,
  totalTime,
  ingredients,
  instructions,
  nutrition
}: {
  name: string
  description: string
  image: string
  recipeYield: string
  prepTime: string
  cookTime: string
  totalTime: string
  ingredients: string[]
  instructions: string[]
  nutrition?: {
    calories: string
    fatContent: string
    carbohydrateContent: string
    proteinContent: string
  }
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name,
    description,
    image,
    recipeYield,
    prepTime,
    cookTime,
    totalTime,
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map((instruction, index) => ({
      '@type': 'HowToStep',
      text: instruction,
      position: index + 1
    })),
    ...(nutrition && {
      nutrition: {
        '@type': 'NutritionInformation',
        calories: nutrition.calories,
        fatContent: nutrition.fatContent,
        carbohydrateContent: nutrition.carbohydrateContent,
        proteinContent: nutrition.proteinContent
      }
    })
  }

  return JSON.stringify(schema)
}

/**
 * Generate Event schema for event rich snippets
 * Shows event dates, location, and ticket info
 */
export function generateEventRichSnippet({
  name,
  description,
  startDate,
  endDate,
  location,
  url,
  offers,
  organizer
}: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location: string
  url: string
  offers?: {
    price: string
    priceCurrency: string
    availability: string
  }
  organizer: string
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    ...(endDate && { endDate }),
    location: {
      '@type': 'VirtualLocation',
      url: location
    },
    url,
    organizer: {
      '@type': 'Organization',
      name: organizer,
      url: SITE_URL
    },
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        availability: offers.availability,
        url
      }
    })
  }

  return JSON.stringify(schema)
}

/**
 * Generate Organization schema for knowledge panel
 * Helps Google understand your organization for knowledge panels
 */
export function generateOrganizationRichSnippet({
  name,
  url,
  logo,
  description,
  sameAs,
  contactPoint,
  foundingDate
}: {
  name: string
  url: string
  logo: string
  description: string
  sameAs?: string[]
  contactPoint?: {
    email: string
    contactType: string
  }
  foundingDate?: string
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    ...(sameAs && sameAs.length > 0 && { sameAs }),
    ...(contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        email: contactPoint.email,
        contactType: contactPoint.contactType
      }
    }),
    ...(foundingDate && { foundingDate })
  }

  return JSON.stringify(schema)
}

/**
 * Generate WebSite schema for site links search box
 * Enables search box in Google search results
 */
export function generateWebSiteRichSnippet({
  name,
  url,
  description
}: {
  name: string
  url: string
  description: string
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return JSON.stringify(schema)
}

/**
 * Generate LocalBusiness schema for local SEO
 * Shows business info in local search results
 */
export function generateLocalBusinessRichSnippet({
  name,
  description,
  image,
  address,
  telephone,
  email,
  url,
  priceRange,
  openingHours
}: {
  name: string
  description: string
  image: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  telephone?: string
  email?: string
  url: string
  priceRange?: string
  openingHours?: string
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    image,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    ...(telephone && { telephone }),
    ...(email && { email }),
    url,
    ...(priceRange && { priceRange }),
    ...(openingHours && { openingHours })
  }

  return JSON.stringify(schema)
}

/**
 * Generate Course schema for course rich snippets
 * Shows course details and provider information
 */
export function generateCourseRichSnippet({
  name,
  description,
  provider,
  offers
}: {
  name: string
  description: string
  provider: {
    name: string
    url: string
  }
  offers?: {
    price: string
    priceCurrency: string
    availability: string
  }
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider.name,
      url: provider.url
    },
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        availability: offers.availability
      }
    })
  }

  return JSON.stringify(schema)
}

/**
 * Generate JobPosting schema for job rich snippets
 * Shows job details in search results
 */
export function generateJobPostingRichSnippet({
  title,
  description,
  datePosted,
  validThrough,
  employmentType,
  hiringOrganization,
  jobLocation,
  salary
}: {
  title: string
  description: string
  datePosted: string
  validThrough: string
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN'
  hiringOrganization: {
    name: string
    url: string
  }
  jobLocation: {
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  salary?: {
    currency: string
    value: {
      minValue: number
      maxValue: number
      unit: 'HOUR' | 'YEAR' | 'MONTH'
    }
  }
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: hiringOrganization.name,
      url: hiringOrganization.url
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: jobLocation.addressLocality,
        addressRegion: jobLocation.addressRegion,
        addressCountry: jobLocation.addressCountry
      }
    },
    ...(salary && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: salary.currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: salary.value.minValue,
          maxValue: salary.value.maxValue,
          unitText: salary.value.unit
        }
      }
    })
  }

  return JSON.stringify(schema)
}

/**
 * Generate SoftwareApplication schema for app rich snippets
 * Shows app details, ratings, and download info
 */
export function generateSoftwareApplicationRichSnippet({
  name,
  description,
  image,
  url,
  applicationCategory,
  operatingSystem,
  offers,
  aggregateRating
}: {
  name: string
  description: string
  image: string
  url: string
  applicationCategory: string
  operatingSystem: string
  offers?: {
    price: string
    priceCurrency: string
  }
  aggregateRating?: {
    ratingValue: number
    ratingCount: number
  }
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    image,
    url,
    applicationCategory,
    operatingSystem,
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency
      }
    }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
        bestRating: 5,
        worstRating: 1
      }
    })
  }

  return JSON.stringify(schema)
}
