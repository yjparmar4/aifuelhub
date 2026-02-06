/**
 * World-Class SEO Implementation
 * Ultimate optimization for global traffic, AI search engines, and top rankings
 * Combines SEO, AEO, and GEO strategies for maximum visibility
 */
import { Metadata } from 'next'

import { SITE_URL } from '@/lib/seo'
import { SUPPORTED_LOCALES } from './international-seo'

// World-Class SEO Configuration
export const WORLD_CLASS_SEO_CONFIG = {
  // Global keyword strategy
  primaryMarkets: [
    'US', 'GB', 'CA', 'AU', 'IN', 'DE', 'FR', 'ES', 'IT', 'JP', 'KR', 'CN', 'BR', 'MX', 'RU'
  ],

  // AI search engine optimization targets
  aiEngines: {
    chatgpt: { priority: 'high', contentTypes: ['reviews', 'comparisons', 'tutorials'] },
    perplexity: { priority: 'high', contentTypes: ['analysis', 'research', 'guides'] },
    claude: { priority: 'medium', contentTypes: ['technical', 'in-depth', 'explanations'] },
    gemini: { priority: 'high', contentTypes: ['multimedia', 'comprehensive', 'structured'] },
    copilot: { priority: 'medium', contentTypes: ['code', 'technical', 'developer'] }
  },

  // Core SEO metrics targets
  targets: {
    pageSpeed: '90+',
    mobileFriendly: true,
    coreWebVitals: {
      LCP: '2.5s',
      FID: '100ms',
      CLS: '0.1'
    },
    contentLength: {
      minimum: 800,
      optimal: 2000
    }
  }
}

// Generate comprehensive meta tags for global reach

export function generateWorldClassMetadata({
  title,
  description,
  path,
  locale = 'en',
  contentType = 'website',
  keywords,
  imageUrl,
  publishedAt,
  updatedAt,
  author
}: {
  title: string
  description: string
  path: string
  locale?: string
  contentType?: 'website' | 'article' | 'tool' | 'blog'
  keywords?: string[]
  imageUrl?: string | null
  publishedAt?: string
  updatedAt?: string
  author?: string
}): Metadata {
  const currentLocale = SUPPORTED_LOCALES.find(l => l.code === locale) || SUPPORTED_LOCALES[0]
  const fullUrl = `${SITE_URL}${path}`

  // Generate localized keywords
  const localizedKeywords = [
    ...(keywords || []),
    'AI tools 2026',
    'artificial intelligence software',
    'machine learning tools',
    'AI productivity',
    'best AI software',
    ...getLocalizedKeywords(locale)
  ]

  return {
    // Basic meta tags
    title: title.length > 60 ? title.substring(0, 57) + '...' : title,
    description: localizeDescription(description, locale),
    keywords: localizedKeywords.join(', '),

    // Canonical and alternates
    alternates: {
      canonical: fullUrl,
      languages: generateLanguageAlternates(path, locale)
    },

    // Open Graph with global optimization
    openGraph: {
      type: contentType === 'article' ? 'article' : 'website',
      locale: currentLocale.code,
      alternateLocale: SUPPORTED_LOCALES.map(l => l.code),
      url: fullUrl,
      title: localizeTitle(title, locale).substring(0, 60),
      description: localizeDescription(description, locale),
      siteName: 'AI Fuel Hub',
      images: [
        {
          url: imageUrl || '/og-image.png',
          width: 1200,
          height: 630,
          alt: localizeTitle(title, locale),
          type: 'image/png'
        }
      ],
      // Enhanced tags for social sharing
      countryName: currentLocale.region || 'US',
      emails: ['hello@aifuelhub.com'],
      phoneNumbers: [],
      faxNumbers: []
    },

    // Twitter Card optimization
    twitter: {
      card: 'summary_large_image',
      site: '@aifuelhub',
      creator: '@aifuelhub',
      title: localizeTitle(title, locale).substring(0, 60),
      description: localizeDescription(description, locale),
      images: [imageUrl || '/og-image.png']
    },

    // App and platform optimization
    applicationName: 'AI Fuel Hub',
    referrer: 'origin-when-cross-origin' as const,
    formatDetection: {
      telephone: false,
      email: false,
      address: false
    },

    // Advanced robots meta
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'noimageindex': false,
        'notranslate': false
      },
      // Other bots need to be defined safely or Next.js types might complain
      // Moving these to top-level "other" in metadata might be safer,
      // OR assuming they are valid if we cast, but let's stick to standard fields for now
      // to avoid build errors. We'll rely on the global 'robots.txt' for these.,
    },

    // Content-specific optimization
    ...(contentType === 'article' && {
      article: {
        publishedTime: publishedAt,
        modifiedTime: updatedAt || publishedAt,
        authors: [author || 'AI Fuel Hub'],
        section: 'AI Tools',
        tags: keywords
      }
    }),

    // Verification and security
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google1b97f335783a2de5',
      yandex: process.env.YANDEX_VERIFICATION,
      other: {
        bing: process.env.BING_VERIFICATION || '',
        pinterest: process.env.PINTEREST_VERIFICATION || ''
      }
    },

    // Additional meta tags for AI search engines
    other: {
      'ai-search-optimized': 'true',
      'content-language': locale,
      'target-market': currentLocale.region || 'US',
      'content-type': contentType,
      'last-updated': updatedAt || new Date().toISOString(),
      'entity-type': 'AI Tools Directory',
      'trust-score': '4.8',
      'expert-reviewed': 'true'
    }
  }
}

// Generate language-specific alternates
function generateLanguageAlternates(path: string, currentLocale: string) {
  const alternates: Record<string, string> = {}

  for (const locale of SUPPORTED_LOCALES) {
    alternates[locale.code] = `${SITE_URL}${path}?lang=${locale.code}`
  }

  // Add x-default
  alternates['x-default'] = `${SITE_URL}${path}`

  return alternates
}

// Get localized keywords based on locale
function getLocalizedKeywords(locale: string): string[] {
  const keywordMap: Record<string, string[]> = {
    'en': ['AI tools', 'artificial intelligence software', 'machine learning tools'],
    'es': ['herramientas IA', 'software inteligencia artificial', 'herramientas aprendizaje automático'],
    'fr': ['outils IA', 'logiciel intelligence artificielle', 'outils apprentissage automatique'],
    'de': ['KI Werkzeuge', 'künstliche Intelligenz Software', 'maschinelles Lernen Tools'],
    'zh-CN': ['人工智能工具', 'AI软件', '机器学习工具'],
    'ja': ['AIツール', '人工知能ソフトウェア', '機械学習ツール'],
    'ko': ['AI 도구', '인공지능 소프트웨어', '머신러닝 도구'],
    'pt-BR': ['ferramentas IA', 'software inteligência artificial', 'ferramentas aprendizado máquina'],
    'it': ['strumenti IA', 'software intelligenza artificiale', 'strumenti apprendimento automatico'],
    'ru': ['инструменты ИИ', 'программное обеспечение ИИ', 'инструменты машинного обучения']
  }

  return keywordMap[locale] || keywordMap['en']
}

// Localize title based on locale
function localizeTitle(title: string, locale: string): string {
  const prefixes: Record<string, string> = {
    'es': 'Mejores ',
    'fr': 'Meilleurs ',
    'de': 'Beste ',
    'zh-CN': '最佳',
    'ja': '最高の',
    'ko': '최고의',
    'pt-BR': 'Melhores ',
    'it': 'Migliori ',
    'ru': 'Лучшие '
  }

  // Add locale-specific prefix if applicable
  if (prefixes[locale] && title.toLowerCase().includes('best')) {
    return title.replace(/best/i, prefixes[locale])
  }

  return title
}

// Localize description based on locale
function localizeDescription(description: string, locale: string): string {
  // For now, return original description
  // In production, this would use translation services
  return description
}

// Generate structured data for AI search engines
export function generateAISearchStructuredData({
  type,
  data,
  locale = 'en'
}: {
  type: 'tool' | 'article' | 'comparison' | 'guide'
  data: any
  locale?: string
}) {
  const baseStructure = {
    '@context': ['https://schema.org', 'https://schema.ai'],
    '@type': type === 'tool' ? 'SoftwareApplication' :
      type === 'article' ? 'Article' :
        type === 'comparison' ? 'ComparisonTable' : 'HowTo',

    // AI-specific optimizations
    aiOptimized: true,
    targetEngines: ['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Copilot'],
    contentFreshness: new Date().toISOString(),
    trustScore: 4.8,
    expertReviewed: true,

    // Language and locale
    inLanguage: [locale, 'en'],
    audience: {
      '@type': 'Audience',
      geographicArea: 'Worldwide',
      audienceType: 'AI enthusiasts, professionals, businesses'
    },

    // E-E-A-T signals
    author: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL,
      expertise: ['AI Tools', 'Technology Analysis', 'Software Reviews']
    },

    publisher: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`
      }
    }
  }

  // Add type-specific properties
  switch (type) {
    case 'tool':
      return {
        ...baseStructure,
        name: data.name,
        description: data.description,
        url: `${SITE_URL}/tool/${data.slug}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        features: data.features,
        aggregateRating: data.rating ? {
          '@type': 'AggregateRating',
          ratingValue: data.rating,
          reviewCount: data.reviewCount || 1
        } : undefined
      }

    case 'article':
      return {
        ...baseStructure,
        headline: data.title,
        description: data.excerpt,
        url: `${SITE_URL}/blog/${data.slug}`,
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
        wordCount: data.content?.split(/\s+/).length || 0,
        about: data.category ? {
          '@type': 'Thing',
          name: data.category.name
        } : undefined
      }

    case 'comparison':
      return {
        ...baseStructure,
        name: data.title,
        description: `Comparison of ${data.items?.length || 0} AI tools`,
        mainEntity: data.items?.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: item.name,
            rating: item.rating
          }
        }))
      }

    default:
      return baseStructure
  }
}

// Generate comprehensive sitemap entries
export function generateWorldClassSitemapEntries(): Array<{
  url: string
  lastModified: string
  changeFrequency: string
  priority: number
  alternates?: Record<string, string>
}> {
  const entries: any[] = []
  const now = new Date().toISOString()

  // Homepage for all locales
  for (const locale of SUPPORTED_LOCALES) {
    entries.push({
      url: `${SITE_URL}/?lang=${locale.code}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: locale.isDefault ? 1.0 : 0.9,
      alternates: {
        [locale.code]: `${SITE_URL}/?lang=${locale.code}`
      }
    })
  }

  // Main pages
  const mainPages = [
    { path: '/ai-tools', priority: 0.9, frequency: 'daily' },
    { path: '/blog', priority: 0.8, frequency: 'daily' },
    { path: '/compare', priority: 0.8, frequency: 'weekly' },
    { path: '/about', priority: 0.7, frequency: 'monthly' },
    { path: '/contact', priority: 0.6, frequency: 'monthly' }
  ]

  for (const page of mainPages) {
    for (const locale of SUPPORTED_LOCALES) {
      entries.push({
        url: `${SITE_URL}${page.path}?lang=${locale.code}`,
        lastModified: now,
        changeFrequency: page.frequency,
        priority: page.priority * (locale.isDefault ? 1.0 : 0.9)
      })
    }
  }

  return entries
}

// Content optimization recommendations
export function generateContentOptimizationTips(content: string, locale: string = 'en'): {
  score: number
  recommendations: string[]
  strengths: string[]
  optimizations: string[]
} {
  const recommendations: string[] = []
  const strengths: string[] = []
  const optimizations: string[] = []
  let score = 0

  const wordCount = content.split(/\s+/).length

  // Content length analysis
  if (wordCount >= 2000) {
    strengths.push('Comprehensive content length (2000+ words)')
    score += 20
  } else if (wordCount >= 1000) {
    strengths.push('Good content length (1000+ words)')
    score += 15
  } else if (wordCount >= 500) {
    score += 10
  } else {
    recommendations.push('Expand content to 1000+ words for better SEO')
  }

  // Heading structure
  const headingCount = (content.match(/^##\s/gm) || []).length
  if (headingCount >= 3) {
    strengths.push('Good heading structure with multiple H2s')
    score += 15
  } else {
    recommendations.push('Add more H2 headings to structure content')
  }

  // List usage
  const listCount = (content.match(/^\s*[-*+]\s/gm) || []).length
  if (listCount >= 5) {
    strengths.push('Uses bullet points for readability')
    score += 10
  } else {
    optimizations.push('Add more bullet points for better scannability')
  }

  // FAQ content
  if (content.toLowerCase().includes('faq') || content.toLowerCase().includes('question')) {
    strengths.push('Includes FAQ content for AEO')
    score += 15
  } else {
    recommendations.push('Add FAQ section with 3-5 common questions')
  }

  // Technical terms
  const technicalTerms = ['AI', 'machine learning', 'algorithm', 'API', 'integration']
  const technicalCount = technicalTerms.filter(term =>
    content.toLowerCase().includes(term.toLowerCase())
  ).length

  if (technicalCount >= 3) {
    strengths.push('Includes relevant technical terminology')
    score += 10
  }

  // Call-to-action
  if (content.toLowerCase().includes('try') || content.toLowerCase().includes('start')) {
    strengths.push('Includes clear call-to-action')
    score += 10
  } else {
    optimizations.push('Add clear call-to-action for user engagement')
  }

  // Localization
  if (locale !== 'en') {
    optimizations.push(`Consider adding ${locale}-specific examples and use cases`)
  }

  // AI optimization
  if (content.includes('according to') || content.includes('research shows')) {
    strengths.push('Includes authoritative language for AI search')
    score += 10
  } else {
    optimizations.push('Add authoritative phrases like "according to research"')
  }

  return {
    score: Math.min(100, score),
    recommendations,
    strengths,
    optimizations
  }
}


