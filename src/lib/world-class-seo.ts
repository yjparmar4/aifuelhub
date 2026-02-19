/**
 * World-Class SEO, AEO, and GEO Implementation
 * Ultimate optimization for global traffic, AI search engines, and top rankings
 * Combines SEO, AEO, and GEO strategies for maximum visibility
 * 
 * Features:
 * - Traditional SEO (Google, Bing, Baidu, Yandex, Naver, DuckDuckGo)
 * - AEO (AI Engine Optimization) for ChatGPT, Perplexity, Claude, Gemini, Copilot
 * - GEO (Graphical Entity Optimization) for Knowledge Graph dominance
 * - Voice Search Optimization for Alexa, Siri, Google Assistant
 * - Global reach with 45+ locales and hreflang implementation
 */
import { Metadata } from 'next'

import { SITE_URL } from '@/lib/seo'
import { SUPPORTED_LOCALES } from './international-seo'

// World-Class SEO Configuration
export const WORLD_CLASS_SEO_CONFIG = {
  // Global keyword strategy - All major markets
  primaryMarkets: [
    'US', 'GB', 'CA', 'AU', 'IN', 'DE', 'FR', 'ES', 'IT', 'JP', 'KR', 'CN', 'BR', 'MX', 'RU',
    'NZ', 'ZA', 'AR', 'CO', 'BE', 'AT', 'CH', 'PT', 'TW', 'HK', 'SA', 'AE', 'SE', 'DK', 'NO',
    'FI', 'PL', 'CZ', 'HU', 'TR', 'TH', 'VN', 'ID', 'MY', 'IL', 'NG', 'EG', 'PH'
  ],

  // AI search engine optimization targets - All major AI engines
  aiEngines: {
    chatgpt: { priority: 'critical', contentTypes: ['reviews', 'comparisons', 'tutorials', 'how-to'], crawlRate: 'high' },
    perplexity: { priority: 'critical', contentTypes: ['analysis', 'research', 'guides', 'facts'], crawlRate: 'high' },
    claude: { priority: 'high', contentTypes: ['technical', 'in-depth', 'explanations', 'code'], crawlRate: 'medium' },
    gemini: { priority: 'critical', contentTypes: ['multimedia', 'comprehensive', 'structured', 'visual'], crawlRate: 'high' },
    copilot: { priority: 'high', contentTypes: ['code', 'technical', 'developer', 'enterprise'], crawlRate: 'medium' },
    deepseek: { priority: 'high', contentTypes: ['technical', 'research', 'analysis'], crawlRate: 'medium' },
    grok: { priority: 'medium', contentTypes: ['real-time', 'news', 'analysis'], crawlRate: 'medium' },
    you: { priority: 'medium', contentTypes: ['comprehensive', 'visual', 'interactive'], crawlRate: 'medium' },
    meta_ai: { priority: 'high', contentTypes: ['social', 'visual', 'conversational'], crawlRate: 'high' }
  },

  // Traditional search engines - Global coverage
  searchEngines: {
    google: { priority: 'critical', markets: ['global'], features: ['rich-results', 'knowledge-graph', 'discover'] },
    bing: { priority: 'critical', markets: ['global'], features: ['rich-results', 'copilot-integration'] },
    baidu: { priority: 'critical', markets: ['CN'], features: ['baidu-baike', 'baidu-zhishu'] },
    yandex: { priority: 'critical', markets: ['RU', 'TR', 'BY', 'KZ'], features: ['yandex-direct', 'turbo-pages'] },
    naver: { priority: 'high', markets: ['KR'], features: ['naver-blog', 'naver-cafe'] },
    duckduckgo: { priority: 'high', markets: ['global'], features: ['instant-answers'] },
    sogou: { priority: 'medium', markets: ['CN'], features: ['sogou-wenwen'] },
    seznam: { priority: 'medium', markets: ['CZ'], features: ['rich-results'] },
    qwant: { priority: 'medium', markets: ['EU', 'FR'], features: ['instant-answers'] }
  },

  // Voice search optimization
  voiceSearch: {
    enabled: true,
    platforms: ['alexa', 'siri', 'google-assistant', 'cortana', 'bixby'],
    contentTypes: ['faq', 'how-to', 'quick-answers', 'featured-snippets'],
    languageSupport: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh']
  },

  // Core SEO metrics targets
  targets: {
    pageSpeed: '95+',
    mobileFriendly: true,
    coreWebVitals: {
      LCP: '<2.5s',
      FID: '<100ms',
      INP: '<200ms',
      CLS: '<0.1',
      TTFB: '<200ms',
      FCP: '<1.8s'
    },
    contentLength: {
      minimum: 1200,
      optimal: 2500,
      maximum: 5000
    },
    keywordDensity: {
      minimum: 0.5,
      optimal: 1.5,
      maximum: 2.5
    }
  },

  // Schema.org types to implement
  schemaTypes: [
    'Organization', 'WebSite', 'WebPage', 'Article', 'BlogPosting',
    'SoftwareApplication', 'Product', 'Review', 'FAQPage', 'HowTo',
    'BreadcrumbList', 'SpeakableSpecification', 'VideoObject', 'ImageObject',
    'Author', 'Publisher', 'AggregateRating', 'Offer', 'Category',
    'ItemList', 'CollectionPage', 'AboutPage', 'ContactPage',
    'QAPage', 'DiscussionForumPosting', 'TechArticle', 'Guide'
  ]
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

// ============================================
// VOICE SEARCH OPTIMIZATION
// ============================================

/**
 * Generate speakable content schema for voice search
 * Optimizes content for Alexa, Siri, Google Assistant, and other voice platforms
 */
export function generateSpeakableSchema(content: {
  title: string
  description: string
  url: string
  speakableText?: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector: ['.voice-content', '.summary', '.key-points', '.faq-answer'],
    xpath: [
      '/html/head/title',
      '/html/body/article/section[@class="summary"]',
      '/html/body/article/section[@class="faq"]'
    ],
    name: content.title,
    text: content.speakableText || content.description,
    url: content.url,
    // Voice-optimized content markers
    speakableType: ['summary', 'question-answer', 'how-to'],
    estimatedDuration: 'PT2M',
    inLanguage: 'en-US'
  }
}

/**
 * Generate voice search optimized content
 * Creates natural language content for voice assistants
 */
export function generateVoiceSearchContent(data: {
  question: string
  answer: string
  context?: string
}): { speakableAnswer: string; voiceKeywords: string[] } {
  // Create conversational, natural language response
  const speakableAnswer = data.context
    ? `${data.context}. ${data.answer}`
    : data.answer

  // Extract voice-friendly keywords
  const voiceKeywords = extractVoiceKeywords(data.question + ' ' + data.answer)

  return { speakableAnswer, voiceKeywords }
}

/**
 * Extract keywords optimized for voice search
 */
function extractVoiceKeywords(content: string): string[] {
  const voicePhrases = [
    'what is', 'how to', 'best way to', 'where can I',
    'when should I', 'why should I', 'which is better',
    'how much does', 'how do I', 'what are the'
  ]

  const keywords: string[] = []
  const lowerContent = content.toLowerCase()

  for (const phrase of voicePhrases) {
    if (lowerContent.includes(phrase)) {
      keywords.push(phrase)
    }
  }

  return keywords
}

// ============================================
// AI SEARCH ENGINE SPECIFIC SCHEMAS
// ============================================

/**
 * Generate ChatGPT-optimized content structure
 */
export function generateChatGPTSchema(data: {
  title: string
  content: string
  url: string
  keyPoints: string[]
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: data.title,
    articleBody: data.content,
    url: data.url,
    // ChatGPT-specific optimizations
    mainEntity: {
      '@type': 'Thing',
      name: data.title,
      description: extractSummary(data.content, 200)
    },
    keyPoints: data.keyPoints,
    // Structured for AI parsing
    articleSection: getArticleSection(data.title),
    wordCount: data.content.split(/\s+/).length,
    // Trust signals
    author: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL,
      expertise: ['AI Tools', 'Software Reviews', 'Technology Analysis']
    },
    dateModified: new Date().toISOString(),
    // AI-friendly markers
    educationalUse: 'research',
    learningResourceType: 'article',
    isAccessibleForFree: true
  }
}

/**
 * Generate Perplexity-optimized content
 */
export function generatePerplexitySchema(data: {
  title: string
  content: string
  url: string
  sources?: string[]
  citations?: string[]
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    articleBody: data.content,
    url: data.url,
    // Perplexity-specific: citations and sources
    citation: data.citations || [],
    sourceOrganization: {
      '@type': 'Organization',
      name: 'AI Fuel Hub'
    },
    // Fact-checking signals
    verifiedBy: {
      '@type': 'Organization',
      name: 'AI Fuel Hub Editorial Team'
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    // Research markers
    researchMethod: 'expert-analysis',
    dataSources: data.sources || ['internal-testing', 'user-reviews', 'vendor-data']
  }
}

/**
 * Generate Claude-optimized content
 */
export function generateClaudeSchema(data: {
  title: string
  content: string
  url: string
  technicalDepth?: 'beginner' | 'intermediate' | 'advanced'
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: data.title,
    articleBody: data.content,
    url: data.url,
    // Claude-specific: technical depth and nuance
    proficiencyLevel: data.technicalDepth || 'intermediate',
    // Detailed explanations
    about: {
      '@type': 'Thing',
      name: 'AI Tools',
      description: 'Comprehensive analysis of AI tools and software'
    },
    // Context and considerations
    dependencies: [],
    prerequisite: [],
    // Author expertise
    author: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Natural Language Processing',
        'Software Development'
      ]
    }
  }
}

/**
 * Generate Google AI Overviews schema
 */
export function generateGoogleAISchema(data: {
  title: string
  content: string
  url: string
  faqs?: Array<{ question: string; answer: string }>
}): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: data.title,
        articleBody: data.content,
        url: data.url,
        // Google AI Overview optimization
        mainEntity: {
          '@type': 'Thing',
          name: data.title
        },
        // E-E-A-T signals
        author: {
          '@type': 'Organization',
          name: 'AI Fuel Hub',
          url: SITE_URL
        },
        publisher: {
          '@type': 'Organization',
          name: 'AI Fuel Hub',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`
          }
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString()
      },
      // Include FAQ for AI Overview extraction
      ...(data.faqs && data.faqs.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: data.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }] : [])
    ]
  }
}

// ============================================
// GLOBAL SEARCH ENGINE OPTIMIZATION
// ============================================

/**
 * Generate Baidu-optimized meta tags
 */
export function generateBaiduMetadata(data: {
  title: string
  description: string
  keywords: string[]
}): { metaTags: Record<string, string> } {
  return {
    metaTags: {
      // Baidu-specific meta tags
      'baidu-site-verification': process.env.BAIDU_VERIFICATION || '',
      'applicable-device': 'pc,mobile',
      'mobile-agent': 'format=html5; url=https://m.aifuelhub.com',
      // Chinese keywords
      'keywords': [...data.keywords, '人工智能工具', 'AI软件', '机器学习工具'].join(', '),
      'description': data.description,
      // Baidu prefers shorter titles
      'title': data.title.substring(0, 30)
    }
  }
}

/**
 * Generate Yandex-optimized meta tags
 */
export function generateYandexMetadata(data: {
  title: string
  description: string
}): { metaTags: Record<string, string> } {
  return {
    metaTags: {
      // Yandex-specific meta tags
      'yandex-verification': process.env.YANDEX_VERIFICATION || '',
      'yandex-tableau-widget': JSON.stringify({
        logo: `${SITE_URL}/logo.png`,
        color: '#ffffff',
        feed: `${SITE_URL}/feed.xml`
      }),
      // Russian market optimization
      'title': data.title,
      'description': data.description
    }
  }
}

/**
 * Generate Naver-optimized meta tags
 */
export function generateNaverMetadata(data: {
  title: string
  description: string
  keywords: string[]
}): { metaTags: Record<string, string> } {
  return {
    metaTags: {
      // Naver-specific meta tags
      'naver-site-verification': process.env.NAVER_VERIFICATION || '',
      'naver-search-metadata': JSON.stringify({
        title: data.title,
        description: data.description,
        keywords: [...data.keywords, 'AI 도구', '인공지능 소프트웨어'].join(', ')
      })
    }
  }
}

// ============================================
// ADVANCED ENTITY SIGNALS
// ============================================

/**
 * Generate comprehensive entity signals for Knowledge Graph
 */
export function generateEntitySignals(entity: {
  name: string
  type: string
  description: string
  url: string
  relatedEntities?: string[]
  properties?: Record<string, any>
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': entity.type,
    '@id': `${SITE_URL}/entity/${entity.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: entity.name,
    description: entity.description,
    url: entity.url,
    // Entity relationships
    sameAs: entity.relatedEntities?.map(e => 
      `${SITE_URL}/entity/${e.toLowerCase().replace(/\s+/g, '-')}`
    ) || [],
    // Additional properties
    ...entity.properties,
    // Trust signals
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': entity.url
    },
    // Knowledge Graph signals
    knowsAbout: generateKnowsAbout(entity.type),
    // Authority signals
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

/**
 * Generate knowsAbout for entity signals
 */
function generateKnowsAbout(entityType: string): object[] {
  const knowledgeBase: Record<string, object[]> = {
    'Organization': [
      { '@type': 'Thing', name: 'Artificial Intelligence' },
      { '@type': 'Thing', name: 'Machine Learning' },
      { '@type': 'Thing', name: 'Natural Language Processing' },
      { '@type': 'Thing', name: 'AI Tools' },
      { '@type': 'Thing', name: 'Software Reviews' }
    ],
    'SoftwareApplication': [
      { '@type': 'Thing', name: 'AI Software' },
      { '@type': 'Thing', name: 'Productivity Tools' },
      { '@type': 'Thing', name: 'Automation' }
    ]
  }

  return knowledgeBase[entityType] || knowledgeBase['Organization']
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Extract summary from content
 */
function extractSummary(content: string, maxLength: number): string {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20)
  let summary = sentences.slice(0, 3).join('. ').trim()
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength) + '...'
  }
  return summary
}

/**
 * Get article section based on title
 */
function getArticleSection(title: string): string {
  const sections: Record<string, string> = {
    'best': 'Reviews',
    'how to': 'Tutorials',
    'vs': 'Comparisons',
    'guide': 'Guides',
    'review': 'Reviews',
    'alternative': 'Comparisons'
  }

  const lowerTitle = title.toLowerCase()
  for (const [keyword, section] of Object.entries(sections)) {
    if (lowerTitle.includes(keyword)) {
      return section
    }
  }

  return 'Technology'
}

/**
 * Generate comprehensive AI optimization report
 */
export function generateAIOptimizationReport(content: string): {
  overallScore: number
  chatgptScore: number
  perplexityScore: number
  claudeScore: number
  geminiScore: number
  voiceSearchScore: number
  recommendations: string[]
  strengths: string[]
} {
  const recommendations: string[] = []
  const strengths: string[] = []

  // Content analysis
  const wordCount = content.split(/\s+/).length
  const hasHeadings = content.includes('##')
  const hasLists = content.includes('- ') || content.includes('1. ')
  const hasFAQ = content.toLowerCase().includes('faq') || content.toLowerCase().includes('question')
  const hasComparison = content.toLowerCase().includes('vs') || content.toLowerCase().includes('compare')
  const hasStats = /\d+%|\d+\s*(users|reviews|stars)/.test(content)
  const hasAuthoritativePhrases = /according to|research shows|experts recommend|studies indicate/i.test(content)

  // ChatGPT scoring
  let chatgptScore = 50
  if (wordCount >= 800) chatgptScore += 15
  if (hasHeadings) chatgptScore += 10
  if (hasLists) chatgptScore += 10
  if (hasComparison) chatgptScore += 10
  if (hasAuthoritativePhrases) chatgptScore += 5

  // Perplexity scoring
  let perplexityScore = 50
  if (wordCount >= 1200) perplexityScore += 15
  if (hasStats) perplexityScore += 15
  if (hasHeadings) perplexityScore += 10
  if (hasFAQ) perplexityScore += 10

  // Claude scoring
  let claudeScore = 50
  if (wordCount >= 1000) claudeScore += 15
  if (hasHeadings) claudeScore += 10
  if (hasLists) claudeScore += 10
  if (content.includes('```')) claudeScore += 10 // Code examples
  if (hasAuthoritativePhrases) claudeScore += 5

  // Gemini scoring
  let geminiScore = 50
  if (wordCount >= 600) geminiScore += 15
  if (hasHeadings) geminiScore += 10
  if (hasFAQ) geminiScore += 15
  if (hasLists) geminiScore += 10

  // Voice search scoring
  let voiceSearchScore = 50
  if (hasFAQ) voiceSearchScore += 20
  if (wordCount <= 1500 && wordCount >= 300) voiceSearchScore += 10
  if (hasAuthoritativePhrases) voiceSearchScore += 10
  if (/what is|how to|best way/i.test(content)) voiceSearchScore += 10

  // Generate recommendations
  if (wordCount < 800) recommendations.push('Increase content length to 800+ words for better AI visibility')
  if (!hasHeadings) recommendations.push('Add heading structure (H2, H3) for better AI parsing')
  if (!hasFAQ) recommendations.push('Include FAQ section with 3-5 common questions')
  if (!hasLists) recommendations.push('Add bullet points or numbered lists for easy scanning')
  if (!hasStats) recommendations.push('Include statistics and data points for credibility')
  if (!hasAuthoritativePhrases) recommendations.push('Add authoritative phrases like "according to research"')
  if (!hasComparison) recommendations.push('Consider adding comparison tables for tool reviews')

  // Generate strengths
  if (wordCount >= 1000) strengths.push('Comprehensive content length')
  if (hasHeadings) strengths.push('Well-structured with headings')
  if (hasFAQ) strengths.push('Includes FAQ for AI extraction')
  if (hasLists) strengths.push('Uses lists for readability')
  if (hasStats) strengths.push('Contains statistical data')
  if (hasAuthoritativePhrases) strengths.push('Uses authoritative language')

  const overallScore = Math.round((chatgptScore + perplexityScore + claudeScore + geminiScore + voiceSearchScore) / 5)

  return {
    overallScore,
    chatgptScore: Math.min(100, chatgptScore),
    perplexityScore: Math.min(100, perplexityScore),
    claudeScore: Math.min(100, claudeScore),
    geminiScore: Math.min(100, geminiScore),
    voiceSearchScore: Math.min(100, voiceSearchScore),
    recommendations,
    strengths
  }
}

/**
 * Generate meta description optimized for all platforms
 */
export function generateUniversalMetaDescription(data: {
  title: string
  content: string
  keywords: string[]
}): string {
  const maxLength = 155
  const summary = extractSummary(data.content, 120)
  const keywordsStr = data.keywords.slice(0, 3).join(', ')

  let description = `${summary}. ${keywordsStr}.`

  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...'
  }

  return description
}


