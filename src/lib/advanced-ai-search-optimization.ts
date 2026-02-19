/**
 * Advanced AI Search Engine Optimization
 * World-class optimization for all AI search engines including emerging platforms
 * Targets: ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, You.com, Meta AI, DuckDuckGo AI
 */

import { SITE_URL } from '@/lib/seo'

export interface AIEngineConfig {
  name: string
  domain: string
  crawlPriority: 'high' | 'medium' | 'low'
  contentPreferences: {
    minLength: number
    maxLength: number
    preferredFormats: string[]
    keyPhrasePatterns: string[]
  }
  schemaTypes: string[]
  optimizationTips: string[]
}

export const ADVANCED_AI_ENGINES: Record<string, AIEngineConfig> = {
  // ChatGPT (OpenAI)
  chatgpt: {
    name: 'ChatGPT',
    domain: 'chatgpt.com',
    crawlPriority: 'high',
    contentPreferences: {
      minLength: 800,
      maxLength: 2000,
      preferredFormats: ['how-to', 'comparison', 'review', 'tutorial', 'listicle'],
      keyPhrasePatterns: [
        'according to research',
        'experts recommend',
        'based on our testing',
        'our analysis shows',
        'data indicates',
        'in our experience',
        'after thorough evaluation'
      ]
    },
    schemaTypes: ['FAQPage', 'HowTo', 'Review', 'Article', 'ComparisonTable'],
    optimizationTips: [
      'Use clear, direct answers at the start',
      'Include specific examples and use cases',
      'Provide actionable recommendations',
      'Use numbered lists for steps',
      'Include pros and cons for comparisons'
    ]
  },

  // Perplexity AI
  perplexity: {
    name: 'Perplexity',
    domain: 'perplexity.ai',
    crawlPriority: 'high',
    contentPreferences: {
      minLength: 1200,
      maxLength: 3000,
      preferredFormats: ['research', 'analysis', 'comprehensive guide', 'comparison'],
      keyPhrasePatterns: [
        'comprehensive guide',
        'detailed comparison',
        'in-depth analysis',
        'complete overview',
        'thorough review',
        'research findings',
        'statistical data'
      ]
    },
    schemaTypes: ['Article', 'Report', 'FAQPage', 'TechArticle', 'AnalysisNewsArticle'],
    optimizationTips: [
      'Lead with factual, cited information',
      'Include recent data and statistics',
      'Provide multiple perspectives',
      'Use clear section headings',
      'Include source citations'
    ]
  },

  // Claude (Anthropic)
  claude: {
    name: 'Claude',
    domain: 'claude.ai',
    crawlPriority: 'medium',
    contentPreferences: {
      minLength: 1000,
      maxLength: 2500,
      preferredFormats: ['technical explanation', 'detailed guide', 'documentation'],
      keyPhrasePatterns: [
        'nuanced understanding',
        'subtle differences',
        'context-dependent',
        'considering multiple factors',
        'balanced perspective',
        'important to note',
        'it depends on'
      ]
    },
    schemaTypes: ['TechArticle', 'Documentation', 'HowTo', 'Article', 'Guide'],
    optimizationTips: [
      'Provide nuanced, detailed explanations',
      'Include edge cases and considerations',
      'Use technical accuracy',
      'Structure content logically',
      'Include context and prerequisites'
    ]
  },

  // Google Gemini
  gemini: {
    name: 'Gemini',
    domain: 'gemini.google.com',
    crawlPriority: 'high',
    contentPreferences: {
      minLength: 600,
      maxLength: 1500,
      preferredFormats: ['multimedia content', 'structured data', 'comprehensive overview'],
      keyPhrasePatterns: [
        'according to Google',
        'Google research shows',
        'latest updates',
        'currently available',
        'recently launched',
        'new features include'
      ]
    },
    schemaTypes: ['VideoObject', 'ImageObject', 'Article', 'FAQPage', 'Product'],
    optimizationTips: [
      'Use structured data markup',
      'Include multimedia content',
      'Keep content comprehensive but concise',
      'Use clear headings and bullet points',
      'Optimize for featured snippets'
    ]
  },

  // Microsoft Copilot
  copilot: {
    name: 'Copilot',
    domain: 'copilot.microsoft.com',
    crawlPriority: 'medium',
    contentPreferences: {
      minLength: 1000,
      maxLength: 2000,
      preferredFormats: ['technical', 'code', 'developer', 'implementation guide'],
      keyPhrasePatterns: [
        'Microsoft recommends',
        'industry standard',
        'widely adopted',
        'proven solution',
        'enterprise-ready',
        'best practice',
        'recommended approach'
      ]
    },
    schemaTypes: ['SoftwareApplication', 'TechArticle', 'Code', 'APIReference'],
    optimizationTips: [
      'Include technical details',
      'Provide code examples',
      'Follow Microsoft documentation style',
      'Include implementation steps',
      'Reference official documentation'
    ]
  },

  // Grok (xAI)
  grok: {
    name: 'Grok',
    domain: 'x.ai',
    crawlPriority: 'medium',
    contentPreferences: {
      minLength: 900,
      maxLength: 2100,
      preferredFormats: ['factual analysis', 'data-driven', 'evidence-based'],
      keyPhrasePatterns: [
        'maximally truthful',
        'evidence-based',
        'scientifically accurate',
        'data-driven insights',
        'objective analysis',
        'research indicates',
        'factual information'
      ]
    },
    schemaTypes: ['Article', 'Report', 'FactCheck', 'SciArticle'],
    optimizationTips: [
      'Prioritize factual accuracy',
      'Include data and statistics',
      'Provide source citations',
      'Avoid promotional language',
      'Present balanced viewpoints'
    ]
  },

  // You.com
  you: {
    name: 'You.com',
    domain: 'you.com',
    crawlPriority: 'medium',
    contentPreferences: {
      minLength: 800,
      maxLength: 1800,
      preferredFormats: ['current news', 'trends', 'latest updates'],
      keyPhrasePatterns: [
        'real-time data shows',
        'current trends indicate',
        'latest developments',
        'up-to-date information',
        'recent studies',
        'as of 2026',
        'currently trending'
      ]
    },
    schemaTypes: ['Article', 'NewsArticle', 'FAQPage', 'VideoObject'],
    optimizationTips: [
      'Keep content fresh and updated',
      'Include current statistics',
      'Reference recent developments',
      'Use trending keywords',
      'Include timestamp information'
    ]
  },

  // Meta AI (Facebook/Instagram)
  meta_ai: {
    name: 'Meta AI',
    domain: 'meta.ai',
    crawlPriority: 'medium',
    contentPreferences: {
      minLength: 700,
      maxLength: 1800,
      preferredFormats: ['social', 'community', 'trending'],
      keyPhrasePatterns: [
        'popular choice',
        'widely used',
        'community favorite',
        'trending in',
        'viral',
        'social media'
      ]
    },
    schemaTypes: ['Article', 'SocialMediaPosting', 'FAQPage', 'Review'],
    optimizationTips: [
      'Include social proof',
      'Mention user counts and popularity',
      'Use engaging, shareable content',
      'Include community feedback',
      'Reference trending topics'
    ]
  },

  // DuckDuckGo AI
  duckduckgo: {
    name: 'DuckDuckGo',
    domain: 'duckduckgo.com',
    crawlPriority: 'medium',
    contentPreferences: {
      minLength: 600,
      maxLength: 1500,
      preferredFormats: ['concise answer', 'direct answer', 'FAQ'],
      keyPhrasePatterns: [
        'in short',
        'simply put',
        'the answer is',
        'to summarize',
        'basically',
        'essentially'
      ]
    },
    schemaTypes: ['FAQPage', 'Article', 'HowTo', 'QAPage'],
    optimizationTips: [
      'Provide concise, direct answers',
      'Use FAQ format',
      'Keep paragraphs short',
      'Include quick summaries',
      'Answer common questions'
    ]
  },

  // Brave Search AI
  brave: {
    name: 'Brave Search AI',
    domain: 'search.brave.com',
    crawlPriority: 'medium',
    contentPreferences: {
      minLength: 700,
      maxLength: 1600,
      preferredFormats: ['privacy-focused', 'independent', 'unbiased'],
      keyPhrasePatterns: [
        'privacy-focused',
        'independent analysis',
        'unbiased review',
        'no sponsored content',
        'transparent methodology',
        'our findings'
      ]
    },
    schemaTypes: ['Article', 'Review', 'FAQPage', 'ComparisonTable'],
    optimizationTips: [
      'Emphasize transparency',
      'Include methodology details',
      'Provide unbiased comparisons',
      'Focus on privacy aspects',
      'Use clear, factual language'
    ]
  }
}

// Generate AI engine specific structured data
export function generateAIEngineSchema(
  engine: string,
  content: {
    title: string
    description: string
    url: string
    content?: string
    rating?: number
    reviewCount?: number
    price?: string
    features?: string[]
  }
): object {
  const config = ADVANCED_AI_ENGINES[engine]
  if (!config) return {}

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    description: content.description,
    url: content.url,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL
    },
    about: {
      '@type': 'Thing',
      name: content.title,
      description: content.description
    },
    aiEngineOptimized: {
      '@type': 'AIEngineOptimization',
      targetEngine: config.name,
      contentFormat: config.contentPreferences.preferredFormats,
      schemaTypes: config.schemaTypes
    }
  }

  // Add rating if available
  if (content.rating) {
    Object.assign(baseSchema, {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: content.rating,
        reviewCount: content.reviewCount || 1,
        bestRating: 5
      }
    })
  }

  return baseSchema
}

// Generate multi-engine optimization report
export function generateMultiEngineOptimization(content: {
  title: string
  description: string
  content: string
}): {
  engines: string[]
  recommendations: Record<string, string[]>
  schemaTypes: string[]
  contentScore: number
} {
  const recommendations: Record<string, string[]> = {}
  const allSchemaTypes = new Set<string>()
  let totalScore = 0

  for (const [key, engine] of Object.entries(ADVANCED_AI_ENGINES)) {
    const recs: string[] = []
    const wordCount = content.content.split(/\s+/).length

    // Check content length
    if (wordCount < engine.contentPreferences.minLength) {
      recs.push(`Content too short. Aim for ${engine.contentPreferences.minLength}+ words for ${engine.name}`)
    } else if (wordCount > engine.contentPreferences.maxLength) {
      recs.push(`Content too long. Keep under ${engine.contentPreferences.maxLength} words for ${engine.name}`)
    } else {
      recs.push(`✓ Content length optimal for ${engine.name}`)
      totalScore += 10
    }

    // Check for key phrases
    const keyPhraseCount = engine.contentPreferences.keyPhrasePatterns.filter(phrase =>
      content.content.toLowerCase().includes(phrase.toLowerCase())
    ).length
    recs.push(`Key phrases found: ${keyPhraseCount}/${engine.contentPreferences.keyPhrasePatterns.length}`)
    totalScore += keyPhraseCount * 2

    recommendations[engine.name] = recs
    engine.schemaTypes.forEach(type => allSchemaTypes.add(type))
  }

  return {
    engines: Object.keys(ADVANCED_AI_ENGINES),
    recommendations,
    schemaTypes: Array.from(allSchemaTypes),
    contentScore: Math.min(100, totalScore)
  }
}

// Generate voice search optimized content
export function generateVoiceSearchContent(content: {
  title: string
  description: string
  content: string
}): {
  featuredSnippet: string
  voiceOptimizedSummary: string
  questionAnswerPairs: Array<{ question: string; answer: string }>
} {
  // Extract key sentences for featured snippets
  const sentences = content.content.split(/[.!?]+/).filter(s => s.trim().length > 30)
  const keySentence = sentences.find(s => 
    s.toLowerCase().includes('best') || 
    s.toLowerCase().includes('top') ||
    s.toLowerCase().includes('recommend')
  ) || sentences[0] || content.description

  // Generate question-answer pairs for voice search
  const questionAnswerPairs = [
    {
      question: `What is the best ${content.title}?`,
      answer: keySentence.substring(0, 200) + '.'
    },
    {
      question: `Tell me about ${content.title}`,
      answer: content.description.substring(0, 200) + '.'
    },
    {
      question: `How does ${content.title} work?`,
      answer: content.description.substring(0, 200) + '.'
    }
  ]

  return {
    featuredSnippet: keySentence.substring(0, 300),
    voiceOptimizedSummary: content.description.substring(0, 150) + '. ' + keySentence.substring(0, 150) + '.',
    questionAnswerPairs
  }
}

// Generate comprehensive AI search manifest
export function generateAISearchManifest(): {
  description: string
  engines: Array<{
    name: string
    url: string
    priority: string
    crawlRate: string
  }>
  lastUpdated: string
} {
  return {
    description: 'AI Fuel Hub - Comprehensive AI Tools Directory optimized for all AI search engines',
    engines: Object.values(ADVANCED_AI_ENGINES).map(engine => ({
      name: engine.name,
      url: `https://${engine.domain}`,
      priority: engine.crawlPriority,
      crawlRate: engine.crawlPriority === 'high' ? 'daily' : 'weekly'
    })),
    lastUpdated: new Date().toISOString()
  }
}
