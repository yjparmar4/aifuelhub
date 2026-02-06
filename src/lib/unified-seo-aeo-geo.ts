/**
 * Unified SEO, AEO, and GEO Optimization Module
 * World-class search optimization for traditional search, AI engines, and entity signals
 * 
 * This module exports all optimization functions for easy access:
 * - SEO: Traditional search engine optimization
 * - AEO: AI Engine Optimization (ChatGPT, Perplexity, Claude, etc.)
 * - GEO: Graphical Entity Optimization (Knowledge Graph, entity signals)
 */

import { SITE_URL } from '@/lib/seo'
import { SUPPORTED_LOCALES, getCurrencyForLocale } from '@/lib/international-seo'
import { generateAdvancedHreflangTags } from '@/lib/global-seo-enhancements'
import { generateAEOContent, generateAISearchSchema as generateAEOAISearchSchema, generateAIOptimizedFAQ, generateAIHowTo, generateAIComparisonSchema, generateAISummary, generateKnowledgePanelSchema, generateEETSignalSchema, AI_ENGINE_TIPS, generateAEOAudit, type AEOContentConfig, type AIEngineTarget } from '@/lib/aeo-optimization'
import { generateEntitySchema, generateAIToolEntitySchema, generateBreadcrumbSchema, generateToolSchema, generateCategorySchema } from '@/lib/geo-schema'
import { generateAISearchSummary, generateAISearchFAQs, generateAIMetaDescription } from '@/lib/ai-search-optimization'

/**
 * Unified optimization function that generates all necessary schema and metadata
 * for maximum visibility across traditional search, AI engines, and knowledge graphs
 */
export function generateUnifiedOptimization(options: {
  type: 'tool' | 'blog' | 'guide' | 'comparison'
  data: any
  locale?: string
  region?: string
}) {
  const { type, data, locale = 'en', region = 'US' } = options
  
  return {
    // Traditional SEO
    seo: {
      title: data.title || data.name,
      description: data.description,
      keywords: extractKeywords(data),
      canonical: `${SITE_URL}/${type}/${data.slug}`,
      structuredData: generateStructuredData(type, data)
    },
    
    // AI Engine Optimization
    aeo: {
      content: generateAEOContent({
        title: data.title || data.name,
        description: data.description,
        content: data.content || data.description,
        targetAudience: ['AI professionals', 'Business users', 'Developers'],
        keyTakeaways: extractKeyTakeaways(data)
      }),
      schema: generateAEOAISearchSchema(type, data),
      faqs: generateAISearchFAQs(data)
    },
    
    // Entity Optimization
    geo: {
      schema: generateEntitySchema(),
      toolEntity: type === 'tool' ? generateAIToolEntitySchema(data) : null,
      breadcrumbs: generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: type.charAt(0).toUpperCase() + type.slice(1) + 's', url: `${SITE_URL}/${type}s` },
        { name: data.title || data.name, url: `${SITE_URL}/${type}/${data.slug}` }
      ])
    },
    
    // International targeting
    international: {
      locale,
      region,
      hreflang: generateAdvancedHreflangTags(`/${type}/${data.slug}`),
      currency: getCurrencyForLocale(locale)
    }
  }
}

/**
 * Helper function to extract keywords from data
 */
function extractKeywords(data: any): string[] {
  const text = (data.title || '') + ' ' + (data.description || '') + ' ' + (data.content || '')
  const words = text.toLowerCase().match(/\b\w{4,}\b/g) || []
  const frequency: Record<string, number> = {}
  
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })
  
  return Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word)
}

/**
 * Helper function to extract key takeaways
 */
function extractKeyTakeaways(data: any): string[] {
  const takeaways: string[] = []
  
  if (data.features) {
    const features = typeof data.features === 'string' 
      ? JSON.parse(data.features) 
      : data.features
    if (Array.isArray(features)) {
      takeaways.push(...features.slice(0, 5))
    }
  }
  
  if (data.rating) {
    takeaways.push(`Rated ${data.rating}/5 stars`)
  }
  
  if (data.pricing) {
    takeaways.push(`Pricing: ${data.pricing}`)
  }
  
  return takeaways.slice(0, 5)
}

/**
 * Generate structured data based on type
 */
function generateStructuredData(type: string, data: any): object {
  switch (type) {
    case 'tool':
      return generateToolSchema(data)
    case 'blog':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        datePublished: data.publishedAt,
        author: { '@type': 'Organization', name: 'AI Fuel Hub' }
      }
    case 'category':
      return generateCategorySchema(data)
    default:
      return {}
  }
}

/**
 * Performance optimization report
 */
export function generatePerformanceReport() {
  return {
    coreWebVitals: {
      status: 'monitoring',
      lcp: { target: '< 2.5s', current: 'pending' },
      fid: { target: '< 100ms', current: 'pending' },
      cls: { target: '< 0.1', current: 'pending' }
    },
    aiSearch: {
      status: 'active',
      engines: ['ChatGPT', 'Perplexity', 'Claude', 'Google AI', 'Bing AI'],
      monitoring: true
    },
    entitySignals: {
      status: 'optimized',
      knowledgeGraph: true,
      richResults: true,
      faqSchema: true,
      reviewSchema: true
    },
    international: {
      status: 'ready',
      locales: SUPPORTED_LOCALES.length,
      hreflang: true,
      geoTargeting: true
    }
  }
}

/**
 * SEO health check
 */
export function performSEOHealthCheck() {
  return {
    score: 0,
    categories: {
      technical: { score: 0, issues: [], recommendations: [] },
      content: { score: 0, issues: [], recommendations: [] },
      aeo: { score: 0, issues: [], recommendations: [] },
      geo: { score: 0, issues: [], recommendations: [] },
      international: { score: 0, issues: [], recommendations: [] }
    },
    lastChecked: new Date().toISOString()
  }
}
