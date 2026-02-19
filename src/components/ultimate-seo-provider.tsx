'use client'

/**
 * Ultimate SEO Provider Component
 * Provides world-class SEO, AEO, and GEO optimization for all pages
 * 
 * Features:
 * - Dynamic meta tag injection
 * - AI search engine optimization
 * - Voice search schema
 * - Knowledge graph signals
 * - Real-time SEO monitoring
 */

import { useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'

export interface UltimateSEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  image?: string
  type?: 'website' | 'article' | 'tool' | 'blog'
  author?: string
  publishedAt?: string
  updatedAt?: string
  locale?: string
  noindex?: boolean
  faqs?: Array<{ question: string; answer: string }>
  rating?: number
  reviewCount?: number
}

export function UltimateSEOProvider({
  title,
  description,
  keywords = [],
  canonical,
  image,
  type = 'website',
  author,
  publishedAt,
  updatedAt,
  locale = 'en',
  noindex = false,
  faqs,
  rating,
  reviewCount
}: UltimateSEOProps) {
  const pathname = usePathname()
  const siteUrl = 'https://aifuelhub.com'

  // Generate all SEO data
  const seoData = useMemo(() => {
    const fullUrl = canonical || `${siteUrl}${pathname}`
    const imageUrl = image || `${siteUrl}/og-image.png`

    return {
      title: title || 'AI Fuel Hub - Compare 118+ AI Tools',
      description: description || 'Compare 118+ AI tools with honest reviews. Expert-tested ChatGPT, Midjourney, Claude alternatives.',
      keywords: [...keywords, 'AI tools', 'artificial intelligence', 'machine learning'],
      canonical: fullUrl,
      image: imageUrl,
      type,
      locale,
      author: author || 'AI Fuel Hub',
      publishedAt,
      updatedAt: updatedAt || new Date().toISOString(),
      rating,
      reviewCount
    }
  }, [title, description, keywords, canonical, image, type, locale, author, publishedAt, updatedAt, rating, reviewCount, pathname])

  useEffect(() => {
    // Inject dynamic meta tags
    injectMetaTags(seoData, noindex)

    // Inject structured data
    injectStructuredData(seoData, faqs)

    // Track page view for AI search engines
    trackAIPageView(seoData)

    // Cleanup on unmount
    return () => {
      cleanupInjectedTags()
    }
  }, [seoData, noindex, faqs])

  return null
}

function injectMetaTags(data: {
  title: string
  description: string
  keywords: string[]
  canonical: string
  image: string
  type: string
  locale: string
  author: string
  publishedAt?: string
  updatedAt: string
  rating?: number
  reviewCount?: number
}, noindex: boolean) {
  // Update title
  if (data.title) {
    document.title = data.title
  }

  // Meta description
  updateMetaTag('description', data.description)

  // Keywords
  updateMetaTag('keywords', data.keywords.join(', '))

  // AI Search Optimization
  updateMetaTag('ai-search-optimized', 'true', 'property')
  updateMetaTag('ai-crawl-allowed', 'true', 'property')
  updateMetaTag('chatgpt-optimize', 'true', 'property')
  updateMetaTag('perplexity-optimize', 'true', 'property')
  updateMetaTag('claude-optimize', 'true', 'property')
  updateMetaTag('gemini-optimize', 'true', 'property')
  updateMetaTag('copilot-optimize', 'true', 'property')

  // Trust Signals
  updateMetaTag('entity-type', 'AI Tools Directory', 'property')
  updateMetaTag('trust-score', data.rating?.toString() || '4.8', 'property')
  updateMetaTag('expert-reviewed', 'true', 'property')

  // Global SEO
  updateMetaTag('content-language', data.locale, 'http-equiv')
  updateMetaTag('geo.region', 'US', 'property')

  // Open Graph
  updateMetaTag('og:title', data.title, 'property')
  updateMetaTag('og:description', data.description, 'property')
  updateMetaTag('og:url', data.canonical, 'property')
  updateMetaTag('og:type', data.type === 'article' ? 'article' : 'website', 'property')
  updateMetaTag('og:image', data.image, 'property')
  updateMetaTag('og:locale', data.locale, 'property')
  updateMetaTag('og:site_name', 'AI Fuel Hub', 'property')

  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image', 'name')
  updateMetaTag('twitter:title', data.title, 'name')
  updateMetaTag('twitter:description', data.description, 'name')
  updateMetaTag('twitter:image', data.image, 'name')
  updateMetaTag('twitter:site', '@aifuelhub', 'name')
  updateMetaTag('twitter:creator', '@aifuelhub', 'name')

  // Article specific
  if (data.type === 'article' && data.publishedAt) {
    updateMetaTag('article:published_time', data.publishedAt, 'property')
    updateMetaTag('article:modified_time', data.updatedAt, 'property')
    updateMetaTag('article:author', data.author, 'property')
  }

  // Canonical link
  updateLinkTag('canonical', data.canonical)

  // Robots
  if (noindex) {
    updateMetaTag('robots', 'noindex, nofollow', 'name')
  } else {
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1', 'name')
  }

  // Preconnect to important origins for performance
  addPreconnect('https://www.googletagmanager.com')
  addPreconnect('https://www.google-analytics.com')
  addPreconnect('https://fonts.googleapis.com')
  addPreconnect('https://fonts.gstatic.com')
}

function injectStructuredData(data: any, faqs?: Array<{ question: string; answer: string }>) {
  // Remove existing structured data
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
  existingScripts.forEach(script => {
    if (script.id?.includes('dynamic-schema')) {
      script.remove()
    }
  })

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://aifuelhub.com/#organization',
    name: 'AI Fuel Hub',
    url: 'https://aifuelhub.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://aifuelhub.com/logo.png'
    },
    sameAs: [
      'https://twitter.com/aifuelhub',
      'https://linkedin.com/company/aifuelhub',
      'https://facebook.com/aifuelhub',
      'https://youtube.com/@aifuelhub'
    ]
  }
  injectSchema('organization', organizationSchema)

  // WebSite Schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://aifuelhub.com/#website',
    name: 'AI Fuel Hub',
    url: 'https://aifuelhub.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aifuelhub.com/ai-tools?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }
  injectSchema('website', websiteSchema)

  // WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': data.type === 'article' ? 'Article' : data.type === 'tool' ? 'SoftwareApplication' : 'WebPage',
    '@id': `${data.canonical}/#webpage`,
    name: data.title,
    description: data.description,
    url: data.canonical,
    isPartOf: { '@id': 'https://aifuelhub.com/#website' },
    inLanguage: data.locale
  }
  injectSchema('webpage', webPageSchema)

  // SpeakableSpecification for Voice Search
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector: ['.summary', '.key-points', '.faq-answer', '.voice-content'],
    xpath: ['/html/head/title', '/html/body/article']
  }
  injectSchema('speakable', speakableSchema)

  // FAQ Schema if provided
  if (faqs && faqs.length > 0) {
    const faqSchema = {
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
    injectSchema('faq', faqSchema)
  }

  // AggregateRating if provided
  if (data.rating) {
    const ratingSchema = {
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      ratingValue: data.rating,
      reviewCount: data.reviewCount || 1,
      bestRating: 5,
      worstRating: 1
    }
    injectSchema('rating', ratingSchema)
  }

  // BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aifuelhub.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.type === 'article' ? 'Blog' : 'AI Tools',
        item: data.type === 'article' ? 'https://aifuelhub.com/blog' : 'https://aifuelhub.com/ai-tools'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.title,
        item: data.canonical
      }
    ]
  }
  injectSchema('breadcrumb', breadcrumbSchema)
}

function injectSchema(id: string, schema: object) {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = `dynamic-schema-${id}`
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)
}

function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' | 'http-equiv' = 'name') {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function updateLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function addPreconnect(href: string) {
  if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  }
}

function trackAIPageView(data: any) {
  // Track for AI search analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: data.title,
      page_location: data.canonical,
      content_type: data.type,
      locale: data.locale
    })
  }
}

function cleanupInjectedTags() {
  // Remove dynamic meta tags
  const dynamicMetas = document.querySelectorAll('meta[data-dynamic="true"]')
  dynamicMetas.forEach(meta => meta.remove())

  // Remove dynamic schemas
  const dynamicSchemas = document.querySelectorAll('script[id^="dynamic-schema-"]')
  dynamicSchemas.forEach(script => script.remove())
}

// Export utility functions for use in other components
export function generateAIOptimizedTitle(title: string, keywords: string[]): string {
  const maxLen = 60
  let optimizedTitle = title

  // Add primary keyword if not present
  if (keywords.length > 0 && !title.toLowerCase().includes(keywords[0].toLowerCase())) {
    optimizedTitle = `${title} - ${keywords[0]}`
  }

  // Ensure optimal length
  if (optimizedTitle.length > maxLen) {
    optimizedTitle = optimizedTitle.substring(0, maxLen - 3) + '...'
  }

  return optimizedTitle
}

export function generateAIOptimizedDescription(description: string, keywords: string[]): string {
  const maxLen = 160
  let optimizedDesc = description

  // Add authoritative phrases for AI engines
  const authoritativePhrases = [
    'Expert-tested',
    'According to research',
    'Based on analysis',
    'Comprehensive guide'
  ]

  if (!authoritativePhrases.some(phrase => description.includes(phrase))) {
    optimizedDesc = `${authoritativePhrases[0]}: ${description}`
  }

  // Ensure optimal length
  if (optimizedDesc.length > maxLen) {
    optimizedDesc = optimizedDesc.substring(0, maxLen - 3) + '...'
  }

  return optimizedDesc
}

export function generateVoiceSearchContent(content: string): string {
  // Create voice-friendly content
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10)
  const voiceContent = sentences.slice(0, 5).join('. ')

  return voiceContent
}

export default UltimateSEOProvider
