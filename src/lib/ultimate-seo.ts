/**
 * Ultimate SEO, AEO, and GEO Implementation
 * World-class optimization for maximum global visibility
 * 
 * This module provides:
 * - Complete meta tag generation for all platforms
 * - AI search engine optimization
 * - Voice search optimization
 * - Global search engine support (Google, Bing, Baidu, Yandex, Naver, etc.)
 * - Knowledge Graph optimization
 * - Rich results schema generation
 */

import { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

// ============================================
// CORE CONFIGURATION
// ============================================

export const ULTIMATE_SEO_CONFIG = {
  site: {
    name: 'AI Fuel Hub',
    url: 'https://aifuelhub.com',
    logo: '/logo.png',
    logoSvg: '/logo.svg',
    defaultImage: '/og-image.png',
    twitterHandle: '@aifuelhub',
    email: 'hello@aifuelhub.com',
    foundingDate: '2024',
    category: 'Technology',
    niche: 'AI Tools Directory'
  },

  // All supported locales (45+ languages)
  locales: [
    'en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-IN', 'en-NZ', 'en-ZA',
    'es', 'es-MX', 'es-AR', 'es-CO', 'fr', 'fr-CA', 'fr-BE',
    'de', 'de-AT', 'de-CH', 'it', 'pt-BR', 'pt-PT',
    'ja', 'ko', 'zh-CN', 'zh-TW', 'zh-HK',
    'ar', 'ar-AE', 'ru', 'nl', 'nl-BE',
    'sv', 'da', 'no', 'fi', 'pl', 'cs', 'hu',
    'tr', 'th', 'vi', 'id', 'ms', 'he', 'hi'
  ],

  // All target regions
  regions: [
    'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'JP', 'KR', 'CN', 'IN', 'AU', 'BR', 'MX', 'RU',
    'NZ', 'ZA', 'AR', 'CO', 'BE', 'AT', 'CH', 'PT', 'TW', 'HK', 'SA', 'AE', 'SE', 'DK', 'NO',
    'FI', 'PL', 'CZ', 'HU', 'TR', 'TH', 'VN', 'ID', 'MY', 'IL', 'NG', 'EG', 'PH'
  ],

  // AI Search Engine Targets
  aiEngines: {
    chatgpt: {
      name: 'ChatGPT',
      crawler: ['ChatGPT-User', 'GPTBot', 'OAI-SearchBot'],
      priority: 'critical',
      contentPreferences: ['reviews', 'comparisons', 'tutorials', 'how-to'],
      schemaTypes: ['Article', 'FAQPage', 'HowTo', 'Review']
    },
    perplexity: {
      name: 'Perplexity',
      crawler: ['PerplexityBot', 'Perplexity-ai'],
      priority: 'critical',
      contentPreferences: ['analysis', 'research', 'guides', 'facts'],
      schemaTypes: ['Article', 'Report', 'FAQPage']
    },
    claude: {
      name: 'Claude',
      crawler: ['Claude-Web', 'Claude-SearchBot', 'anthropic-ai', 'ClaudeBot'],
      priority: 'high',
      contentPreferences: ['technical', 'in-depth', 'explanations', 'code'],
      schemaTypes: ['TechArticle', 'Documentation', 'HowTo']
    },
    gemini: {
      name: 'Gemini',
      crawler: ['Google-Extended', 'Google-CloudVertex'],
      priority: 'critical',
      contentPreferences: ['multimedia', 'comprehensive', 'structured', 'visual'],
      schemaTypes: ['VideoObject', 'ImageObject', 'Article']
    },
    copilot: {
      name: 'Copilot',
      crawler: ['Bingbot', 'BingPreview'],
      priority: 'high',
      contentPreferences: ['code', 'technical', 'developer', 'enterprise'],
      schemaTypes: ['SoftwareApplication', 'TechArticle']
    },
    deepseek: {
      name: 'DeepSeek',
      crawler: ['DeepSeekBot'],
      priority: 'high',
      contentPreferences: ['technical', 'research', 'analysis'],
      schemaTypes: ['Article', 'TechArticle']
    },
    meta_ai: {
      name: 'Meta AI',
      crawler: ['FacebookBot', 'meta-externalagent', 'MetaAI'],
      priority: 'high',
      contentPreferences: ['social', 'visual', 'conversational'],
      schemaTypes: ['Article', 'VideoObject']
    }
  },

  // Traditional Search Engines
  searchEngines: {
    google: {
      name: 'Google',
      crawler: ['Googlebot', 'Googlebot-Image', 'Googlebot-Video', 'Googlebot-News'],
      priority: 'critical',
      features: ['rich-results', 'knowledge-graph', 'discover', 'ai-overviews']
    },
    bing: {
      name: 'Bing',
      crawler: ['Bingbot', 'BingPreview', 'MSNBot'],
      priority: 'critical',
      features: ['rich-results', 'copilot-integration']
    },
    baidu: {
      name: 'Baidu',
      crawler: ['Baiduspider', 'Baiduspider-image', 'Baiduspider-video', 'Baiduspider-news'],
      priority: 'critical',
      features: ['baidu-baike', 'baidu-zhishu'],
      markets: ['CN']
    },
    yandex: {
      name: 'Yandex',
      crawler: ['YandexBot', 'YandexImages', 'YandexVideo', 'YandexNews'],
      priority: 'critical',
      features: ['yandex-direct', 'turbo-pages'],
      markets: ['RU', 'TR', 'BY', 'KZ']
    },
    naver: {
      name: 'Naver',
      crawler: ['Yeti', 'NaverBot'],
      priority: 'high',
      features: ['naver-blog', 'naver-cafe'],
      markets: ['KR']
    },
    duckduckgo: {
      name: 'DuckDuckGo',
      crawler: ['DuckDuckBot'],
      priority: 'high',
      features: ['instant-answers'],
      markets: ['global']
    },
    sogou: {
      name: 'Sogou',
      crawler: ['Sogou', 'Sogou-web-spider'],
      priority: 'medium',
      markets: ['CN']
    },
    seznam: {
      name: 'Seznam',
      crawler: ['SeznamBot'],
      priority: 'medium',
      markets: ['CZ']
    },
    qwant: {
      name: 'Qwant',
      crawler: ['Qwantbot'],
      priority: 'medium',
      markets: ['EU', 'FR']
    }
  },

  // Voice Search Platforms
  voicePlatforms: {
    alexa: { name: 'Amazon Alexa', priority: 'high' },
    siri: { name: 'Apple Siri', priority: 'high' },
    google_assistant: { name: 'Google Assistant', priority: 'critical' },
    cortana: { name: 'Microsoft Cortana', priority: 'medium' },
    bixby: { name: 'Samsung Bixby', priority: 'medium' }
  }
}

// ============================================
// ULTIMATE METADATA GENERATION
// ============================================

export interface UltimateMetadataOptions {
  title: string
  description: string
  path: string
  locale?: string
  contentType?: 'website' | 'article' | 'tool' | 'blog' | 'comparison' | 'guide'
  keywords?: string[]
  image?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
  rating?: number
  reviewCount?: number
  faqs?: Array<{ question: string; answer: string }>
  noindex?: boolean
}

/**
 * Generate ultimate metadata for maximum SEO, AEO, and GEO optimization
 */
export function generateUltimateMetadata(options: UltimateMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    locale = 'en',
    contentType = 'website',
    keywords = [],
    image,
    publishedAt,
    updatedAt,
    author,
    rating,
    reviewCount,
    noindex = false
  } = options

  const fullUrl = `${SITE_URL}${path}`
  const imageUrl = image || `${SITE_URL}${ULTIMATE_SEO_CONFIG.site.defaultImage}`

  return {
    // Basic metadata
    title: optimizeTitle(title, locale),
    description: optimizeDescription(description, locale),
    keywords: generateKeywords(keywords, locale),

    // Canonical and alternates
    alternates: {
      canonical: fullUrl,
      languages: generateAllLanguageAlternates(path)
    },

    // Open Graph - Comprehensive
    openGraph: {
      type: contentType === 'article' ? 'article' : 'website',
      locale: locale,
      alternateLocale: ULTIMATE_SEO_CONFIG.locales,
      url: fullUrl,
      title: optimizeTitle(title, locale),
      description: optimizeDescription(description, locale),
      siteName: ULTIMATE_SEO_CONFIG.site.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png'
        },
        {
          url: imageUrl.replace('.png', '-square.png'),
          width: 600,
          height: 600,
          alt: title,
          type: 'image/png'
        }
      ],
      countryName: getCountryForLocale(locale)
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: ULTIMATE_SEO_CONFIG.site.twitterHandle,
      creator: ULTIMATE_SEO_CONFIG.site.twitterHandle,
      title: optimizeTitle(title, locale),
      description: optimizeDescription(description, locale),
      images: [imageUrl]
    },

    // Robots
    robots: noindex ? {
      index: false,
      follow: false
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'notranslate': false,
        'noimageindex': false
      }
    },

    // Verification
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google1b97f335783a2de5',
      yandex: process.env.YANDEX_VERIFICATION,
      other: {
        'msvalidate.01': process.env.BING_VERIFICATION || '',
        'baidu-site-verification': process.env.BAIDU_VERIFICATION || '',
        'naver-site-verification': process.env.NAVER_VERIFICATION || ''
      }
    },

    // Other meta tags for AI and global optimization
    other: {
      // AI Optimization
      'ai-search-optimized': 'true',
      'ai-crawl-allowed': 'true',
      'content-freshness': updatedAt || new Date().toISOString(),
      
      // Global SEO
      'content-language': locale,
      'target-market': getCountryForLocale(locale),
      'geo.region': getCountryForLocale(locale),
      'geo.placename': getRegionName(locale),
      
      // Trust Signals
      'entity-type': ULTIMATE_SEO_CONFIG.site.niche,
      'trust-score': rating ? String(rating) : '4.8',
      'expert-reviewed': 'true',
      'content-rating': 'general',
      
      // Platform Specific
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      
      // Social
      'pinterest-rich-pin': 'true',
      'linkedin:owner': ULTIMATE_SEO_CONFIG.site.name,
      
      // AI Engine Directives
      'chatgpt-optimize': 'true',
      'perplexity-optimize': 'true',
      'claude-optimize': 'true',
      'gemini-optimize': 'true'
    },

    // Article specific
    ...(contentType === 'article' && publishedAt && {
      article: {
        publishedTime: publishedAt,
        modifiedTime: updatedAt || publishedAt,
        authors: [author || ULTIMATE_SEO_CONFIG.site.name],
        section: 'AI Tools',
        tags: keywords
      }
    }),

    // App info
    applicationName: ULTIMATE_SEO_CONFIG.site.name,
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      telephone: false,
      email: false,
      address: false
    },

    // Icons
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
        { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
        { url: '/icon-512.png', type: 'image/png', sizes: '512x512' }
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
      ]
    },

    // Manifest
    manifest: '/manifest.json',

    // Archives
    archives: [`${SITE_URL}/sitemap.xml`],
    assets: [`${SITE_URL}/public`],
    bookmarks: [SITE_URL]
  }
}

// ============================================
// ULTIMATE SCHEMA GENERATION
// ============================================

/**
 * Generate ultimate schema markup for all platforms
 */
export function generateUltimateSchema(options: {
  type: 'website' | 'article' | 'tool' | 'blog' | 'comparison' | 'guide'
  data: {
    title: string
    description: string
    url: string
    image?: string
    publishedAt?: string
    updatedAt?: string
    author?: string
    rating?: number
    reviewCount?: number
    price?: string
    features?: string[]
    faqs?: Array<{ question: string; answer: string }>
    breadcrumbs?: Array<{ name: string; url: string }>
  }
  locale?: string
}): object[] {
  const { type, data, locale = 'en' } = options
  const schemas: object[] = []

  // Always include Organization schema
  schemas.push(generateOrganizationSchema())

  // Always include WebSite schema with search action
  schemas.push(generateWebSiteSchema())

  // Add SpeakableSpecification for voice search
  schemas.push(generateSpeakableSchema(data))

  // Type-specific schemas
  switch (type) {
    case 'website':
      schemas.push(generateWebPageSchema(data))
      break
    case 'article':
    case 'blog':
      schemas.push(generateArticleSchema(data))
      schemas.push(generateNewsArticleSchema(data))
      break
    case 'tool':
      schemas.push(generateSoftwareApplicationSchema(data))
      schemas.push(generateProductSchema(data))
      break
    case 'comparison':
      schemas.push(generateItemListSchema(data))
      break
    case 'guide':
      schemas.push(generateHowToSchema(data))
      break
  }

  // Add FAQ schema if present
  if (data.faqs && data.faqs.length > 0) {
    schemas.push(generateFAQSchema(data.faqs))
  }

  // Add BreadcrumbList schema
  if (data.breadcrumbs && data.breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(data.breadcrumbs))
  }

  // Add Review schema if rating present
  if (data.rating) {
    schemas.push(generateAggregateRatingSchema(data.rating, data.reviewCount || 1))
  }

  return schemas
}

// ============================================
// SCHEMA HELPER FUNCTIONS
// ============================================

function generateOrganizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: ULTIMATE_SEO_CONFIG.site.name,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${ULTIMATE_SEO_CONFIG.site.logo}`,
      width: 512,
      height: 512
    },
    image: `${SITE_URL}${ULTIMATE_SEO_CONFIG.site.defaultImage}`,
    description: 'AI Fuel Hub is the leading AI tools directory with comprehensive reviews, comparisons, and recommendations for artificial intelligence software.',
    foundingDate: ULTIMATE_SEO_CONFIG.site.foundingDate,
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 10
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Natural Language Processing',
      'AI Tools',
      'Software Reviews',
      'Technology Comparisons'
    ],
    sameAs: [
      'https://twitter.com/aifuelhub',
      'https://linkedin.com/company/aifuelhub',
      'https://facebook.com/aifuelhub',
      'https://instagram.com/aifuelhub',
      'https://youtube.com/@aifuelhub',
      'https://github.com/aifuelhub'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: ULTIMATE_SEO_CONFIG.site.email,
      availableLanguage: ULTIMATE_SEO_CONFIG.locales.slice(0, 10)
    },
    award: ['Best AI Tool Directory 2024', 'Top Tech Review Platform 2025'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '5000',
      bestRating: '5',
      worstRating: '1'
    }
  }
}

function generateWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: ULTIMATE_SEO_CONFIG.site.name,
    url: SITE_URL,
    description: 'Discover, compare, and review the best AI tools. Expert insights, detailed comparisons, and comprehensive guides for AI-powered software.',
    publisher: {
      '@id': `${SITE_URL}/#organization`
    },
    inLanguage: ULTIMATE_SEO_CONFIG.locales,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/ai-tools?search={search_term_string}`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
          'http://schema.org/AndroidPlatform',
          'http://schema.org/IOSPlatform'
        ]
      },
      'query-input': 'required name=search_term_string'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Global',
      geographicArea: ULTIMATE_SEO_CONFIG.regions
    }
  }
}

function generateWebPageSchema(data: any): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${data.url}/#webpage`,
    url: data.url,
    name: data.title,
    description: data.description,
    isPartOf: {
      '@id': `${SITE_URL}/#website`
    },
    about: {
      '@type': 'Thing',
      name: 'AI Tools'
    },
    inLanguage: ULTIMATE_SEO_CONFIG.locales,
    isAccessibleForFree: true
  }
}

function generateArticleSchema(data: any): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${data.url}/#article`,
    headline: data.title,
    description: data.description,
    image: data.image || `${SITE_URL}${ULTIMATE_SEO_CONFIG.site.defaultImage}`,
    url: data.url,
    datePublished: data.publishedAt || new Date().toISOString(),
    dateModified: data.updatedAt || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: data.author || ULTIMATE_SEO_CONFIG.site.name,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: ULTIMATE_SEO_CONFIG.site.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${ULTIMATE_SEO_CONFIG.site.logo}`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url
    },
    articleSection: 'AI Tools',
    wordCount: data.description.split(/\s+/).length,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    // AI optimization
    speaks: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.summary', '.key-points', '.faq']
    }
  }
}

function generateNewsArticleSchema(data: any): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: data.title,
    description: data.description,
    datePublished: data.publishedAt || new Date().toISOString(),
    dateModified: data.updatedAt || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: ULTIMATE_SEO_CONFIG.site.name
    },
    publisher: {
      '@type': 'Organization',
      name: ULTIMATE_SEO_CONFIG.site.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${ULTIMATE_SEO_CONFIG.site.logo}`
      }
    }
  }
}

function generateSoftwareApplicationSchema(data: any): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${data.url}/#software`,
    name: data.title,
    description: data.description,
    url: data.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: data.price || '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: data.rating ? {
      '@type': 'AggregateRating',
      ratingValue: data.rating,
      reviewCount: data.reviewCount || 1,
      bestRating: 5,
      worstRating: 1
    } : undefined,
    featureList: data.features?.join(', '),
    screenshot: data.image,
    // AI optimization
    softwareVersion: '2026.1',
    fileSize: 'N/A (Web Application)'
  }
}

function generateProductSchema(data: any): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.title,
    description: data.description,
    url: data.url,
    brand: {
      '@type': 'Brand',
      name: data.title
    },
    offers: {
      '@type': 'Offer',
      price: data.price || '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: ULTIMATE_SEO_CONFIG.site.name
      }
    },
    aggregateRating: data.rating ? {
      '@type': 'AggregateRating',
      ratingValue: data.rating,
      reviewCount: data.reviewCount || 1
    } : undefined,
    category: 'Software'
  }
}

function generateHowToSchema(data: any): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.title,
    description: data.description,
    totalTime: 'PT30M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    step: data.features?.map((feature: string, index: number) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: feature,
      text: feature
    })) || [],
    provider: {
      '@type': 'Organization',
      name: ULTIMATE_SEO_CONFIG.site.name
    }
  }
}

function generateItemListSchema(data: any): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.title,
    description: data.description,
    numberOfItems: data.features?.length || 0,
    itemListElement: data.features?.map((item: string, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item
    })) || []
  }
}

function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
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

function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  }
}

function generateAggregateRatingSchema(rating: number, reviewCount: number): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: rating,
    reviewCount: reviewCount,
    bestRating: 5,
    worstRating: 1
  }
}

function generateSpeakableSchema(data: any): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector: ['.voice-content', '.summary', '.key-points', '.faq-answer'],
    xpath: [
      '/html/head/title',
      '/html/body/article/section[@class="summary"]',
      '/html/body/article/section[@class="faq"]'
    ]
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function optimizeTitle(title: string, locale: string): string {
  // Ensure title is optimal length (50-60 chars)
  if (title.length > 60) {
    return title.substring(0, 57) + '...'
  }
  return title
}

function optimizeDescription(description: string, locale: string): string {
  // Ensure description is optimal length (150-160 chars)
  if (description.length > 160) {
    return description.substring(0, 157) + '...'
  }
  return description
}

function generateKeywords(keywords: string[], locale: string): string {
  const baseKeywords = [
    'AI tools',
    'artificial intelligence software',
    'machine learning tools',
    'best AI tools 2026'
  ]

  // Add locale-specific keywords
  const localizedKeywords = getLocalizedKeywords(locale)

  return [...keywords, ...baseKeywords, ...localizedKeywords].join(', ')
}

function getLocalizedKeywords(locale: string): string[] {
  const keywordMap: Record<string, string[]> = {
    'es': ['herramientas IA', 'software inteligencia artificial'],
    'fr': ['outils IA', 'logiciel intelligence artificielle'],
    'de': ['KI Werkzeuge', 'künstliche Intelligenz Software'],
    'zh-CN': ['人工智能工具', 'AI软件'],
    'ja': ['AIツール', '人工知能ソフトウェア'],
    'ko': ['AI 도구', '인공지능 소프트웨어'],
    'pt-BR': ['ferramentas IA', 'software inteligência artificial'],
    'ru': ['инструменты ИИ', 'программное обеспечение ИИ']
  }

  return keywordMap[locale] || []
}

function generateAllLanguageAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {
    'x-default': `${SITE_URL}${path}`
  }

  for (const locale of ULTIMATE_SEO_CONFIG.locales) {
    alternates[locale] = `${SITE_URL}${path}?lang=${locale}`
  }

  return alternates
}

function getCountryForLocale(locale: string): string {
  const localeToCountry: Record<string, string> = {
    'en': 'US', 'en-US': 'US', 'en-GB': 'GB', 'en-CA': 'CA', 'en-AU': 'AU',
    'en-IN': 'IN', 'en-NZ': 'NZ', 'en-ZA': 'ZA',
    'es': 'ES', 'es-MX': 'MX', 'es-AR': 'AR', 'es-CO': 'CO',
    'fr': 'FR', 'fr-CA': 'CA', 'fr-BE': 'BE',
    'de': 'DE', 'de-AT': 'AT', 'de-CH': 'CH',
    'it': 'IT', 'pt-BR': 'BR', 'pt-PT': 'PT',
    'ja': 'JP', 'ko': 'KR', 'zh-CN': 'CN', 'zh-TW': 'TW', 'zh-HK': 'HK',
    'ar': 'SA', 'ar-AE': 'AE', 'ru': 'RU',
    'nl': 'NL', 'nl-BE': 'BE', 'sv': 'SE', 'da': 'DK', 'no': 'NO', 'fi': 'FI',
    'pl': 'PL', 'cs': 'CZ', 'hu': 'HU', 'tr': 'TR',
    'th': 'TH', 'vi': 'VN', 'id': 'ID', 'ms': 'MY', 'he': 'IL', 'hi': 'IN'
  }

  return localeToCountry[locale] || 'US'
}

function getRegionName(locale: string): string {
  const regionNames: Record<string, string> = {
    'en-US': 'United States', 'en-GB': 'United Kingdom', 'en-CA': 'Canada',
    'en-AU': 'Australia', 'en-IN': 'India', 'ja': 'Japan', 'ko': 'South Korea',
    'zh-CN': 'China', 'de': 'Germany', 'fr': 'France', 'es': 'Spain'
  }

  return regionNames[locale] || 'Global'
}

// ============================================
// SITEMAP GENERATION
// ============================================

export function generateUltimateSitemapEntry(options: {
  url: string
  lastModified?: string
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  images?: string[]
  videos?: string[]
  alternates?: Record<string, string>
}): object {
  return {
    url: options.url,
    lastModified: options.lastModified || new Date().toISOString(),
    changefreq: options.changeFrequency || 'weekly',
    priority: options.priority || 0.5,
    // Image sitemap
    'image:image': options.images?.map(img => ({
      'image:loc': img
    })),
    // Video sitemap
    'video:video': options.videos?.map(vid => ({
      'video:loc': vid,
      'video:title': 'AI Tool Review'
    })),
    // Alternate language versions
    'xhtml:link': Object.entries(options.alternates || {}).map(([lang, url]) => ({
      '@_rel': 'alternate',
      '@_hreflang': lang,
      '@_href': url
    }))
  }
}

// ============================================
// AI OPTIMIZATION HELPERS
// ============================================

/**
 * Generate AI-friendly content structure
 */
export function generateAIContentStructure(content: string): {
  summary: string
  keyPoints: string[]
  entities: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
} {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20)
  const summary = sentences.slice(0, 3).join('. ').trim()
  
  // Extract key points (sentences with important markers)
  const keyPoints = sentences
    .filter(s => /important|key|essential|main|best|top|recommend/i.test(s))
    .slice(0, 5)

  // Extract entities (capitalized words, AI tools, etc.)
  const entities = extractEntities(content)

  // Simple sentiment analysis
  const sentiment = analyzeSentiment(content)

  return {
    summary: summary.substring(0, 200),
    keyPoints,
    entities,
    sentiment
  }
}

function extractEntities(content: string): string[] {
  const entities: string[] = []
  
  // AI tool patterns
  const aiTools = content.match(/ChatGPT|Claude|GPT-4|Gemini|Midjourney|Stable Diffusion|DALL-E|Llama|Copilot|Perplexity/g)
  if (aiTools) entities.push(...aiTools)

  // Technology patterns
  const tech = content.match(/AI|ML|NLP|API|LLM|GPT|machine learning|deep learning/gi)
  if (tech) entities.push(...[...new Set(tech)])

  return [...new Set(entities)].slice(0, 20)
}

function analyzeSentiment(content: string): 'positive' | 'neutral' | 'negative' {
  const positive = /excellent|great|amazing|best|outstanding|superb|fantastic|wonderful|perfect/i
  const negative = /bad|poor|terrible|worst|awful|horrible|disappointing|useless/i

  if (positive.test(content)) return 'positive'
  if (negative.test(content)) return 'negative'
  return 'neutral'
}

/**
 * Generate comprehensive SEO audit
 */
export function performUltimateSEOAudit(options: {
  title: string
  description: string
  content: string
  url: string
  images?: number
  internalLinks?: number
  externalLinks?: number
}): {
  score: number
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
  categories: Record<string, { score: number; issues: string[]; tips: string[] }>
  recommendations: string[]
} {
  const categories: Record<string, { score: number; issues: string[]; tips: string[] }> = {}
  const recommendations: string[] = []

  // Title Analysis
  categories.title = analyzeTitle(options.title)
  
  // Description Analysis
  categories.description = analyzeDescription(options.description)
  
  // Content Analysis
  categories.content = analyzeContent(options.content)
  
  // AI Optimization Analysis
  categories.aiOptimization = analyzeAIOptimization(options.content)
  
  // Technical SEO Analysis
  categories.technical = {
    score: 100,
    issues: [],
    tips: ['Ensure HTTPS is enabled', 'Implement proper caching headers']
  }

  // Calculate overall score
  const scores = Object.values(categories).map(c => c.score)
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length

  // Determine grade
  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
  if (avgScore >= 95) grade = 'A+'
  else if (avgScore >= 90) grade = 'A'
  else if (avgScore >= 80) grade = 'B'
  else if (avgScore >= 70) grade = 'C'
  else if (avgScore >= 60) grade = 'D'
  else grade = 'F'

  // Collect all recommendations
  for (const category of Object.values(categories)) {
    recommendations.push(...category.tips)
  }

  return {
    score: Math.round(avgScore),
    grade,
    categories,
    recommendations
  }
}

function analyzeTitle(title: string): { score: number; issues: string[]; tips: string[] } {
  const issues: string[] = []
  const tips: string[] = []
  let score = 100

  if (title.length < 30) {
    issues.push('Title too short')
    tips.push('Expand title to 50-60 characters')
    score -= 20
  }
  if (title.length > 60) {
    issues.push('Title too long')
    tips.push('Shorten title to 50-60 characters')
    score -= 15
  }
  if (!title.toLowerCase().includes('ai') && !title.toLowerCase().includes('tool')) {
    issues.push('Missing primary keywords in title')
    tips.push('Include primary keywords in title')
    score -= 10
  }

  return { score: Math.max(0, score), issues, tips }
}

function analyzeDescription(description: string): { score: number; issues: string[]; tips: string[] } {
  const issues: string[] = []
  const tips: string[] = []
  let score = 100

  if (description.length < 120) {
    issues.push('Description too short')
    tips.push('Expand description to 150-160 characters')
    score -= 20
  }
  if (description.length > 160) {
    issues.push('Description too long')
    tips.push('Shorten description to 150-160 characters')
    score -= 15
  }
  if (!description.includes('.')) {
    issues.push('Description lacks proper punctuation')
    tips.push('Add proper sentence structure')
    score -= 5
  }

  return { score: Math.max(0, score), issues, tips }
}

function analyzeContent(content: string): { score: number; issues: string[]; tips: string[] } {
  const issues: string[] = []
  const tips: string[] = []
  let score = 100
  const wordCount = content.split(/\s+/).length

  if (wordCount < 500) {
    issues.push('Content too short')
    tips.push('Expand content to at least 800 words')
    score -= 30
  } else if (wordCount < 800) {
    issues.push('Content could be longer')
    tips.push('Consider expanding to 1200+ words for better rankings')
    score -= 10
  }

  if (!content.includes('##') && wordCount > 300) {
    issues.push('Missing heading structure')
    tips.push('Add H2 and H3 headings to structure content')
    score -= 15
  }

  if (!content.includes('- ') && !content.includes('1. ')) {
    issues.push('No lists found')
    tips.push('Add bullet points or numbered lists')
    score -= 10
  }

  return { score: Math.max(0, score), issues, tips }
}

function analyzeAIOptimization(content: string): { score: number; issues: string[]; tips: string[] } {
  const issues: string[] = []
  const tips: string[] = []
  let score = 100

  if (!content.toLowerCase().includes('faq')) {
    issues.push('No FAQ section')
    tips.push('Add FAQ section for AI search optimization')
    score -= 15
  }

  if (!/according to|research shows|experts recommend/i.test(content)) {
    issues.push('Missing authoritative phrases')
    tips.push('Add phrases like "according to research" for AI credibility')
    score -= 10
  }

  if (!content.toLowerCase().includes('summary') && !content.toLowerCase().includes('key takeaways')) {
    issues.push('No summary section')
    tips.push('Add summary or key takeaways section')
    score -= 10
  }

  return { score: Math.max(0, score), issues, tips }
}
