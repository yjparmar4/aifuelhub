/**
 * AEO (AI Engine Optimization) Module
 * Optimization for AI search engines (ChatGPT, Perplexity, Claude, Gemini, etc.)
 * This module ensures your content is optimized for AI-powered search and assistants
 */

import { SITE_URL } from '@/lib/seo'

export interface AEOContentConfig {
  title: string
  description: string
  content: string
  targetAudience: string[]
  keyTakeaways: string[]
  structuredData?: object
}

export interface AIEngineTarget {
  name: string
  crawlFrequency: 'high' | 'medium' | 'low'
  priorityContent: string[]
  schemaPreferences: string[]
}

// AI engines and their optimization requirements
export const AI_ENGINES: AIEngineTarget[] = [
  {
    name: 'ChatGPT',
    crawlFrequency: 'high',
    priorityContent: ['how-to', 'comparison', 'reviews', 'tutorials'],
    schemaPreferences: ['FAQPage', 'HowTo', 'Review']
  },
  {
    name: 'Perplexity',
    crawlFrequency: 'high',
    priorityContent: ['factual', 'research', 'analysis', 'latest updates'],
    schemaPreferences: ['Article', 'Report', 'FAQPage']
  },
  {
    name: 'Claude',
    crawlFrequency: 'medium',
    priorityContent: ['detailed explanations', 'technical docs', 'guides'],
    schemaPreferences: ['TechArticle', 'Documentation', 'HowTo']
  },
  {
    name: 'Gemini',
    crawlFrequency: 'high',
    priorityContent: ['multimedia', 'structured data', 'comprehensive'],
    schemaPreferences: ['VideoObject', 'ImageObject', 'Article']
  },
  {
    name: 'Copilot',
    crawlFrequency: 'medium',
    priorityContent: ['code', 'technical', 'developer tools'],
    schemaPreferences: ['SoftwareApplication', 'TechArticle', 'Code']
  }
]

// Generate AEO-optimized content structure
export function generateAEOContent(config: AEOContentConfig): {
  structuredContent: string
  keyPoints: string[]
  entities: object[]
  recommendations: string[]
} {
  const keyPoints = extractKeyPoints(config.content)
  const entities = extractEntities(config.content)
  
  return {
    structuredContent: generateStructuredContent(config),
    keyPoints: keyPoints,
    entities: entities,
    recommendations: generateAEORecommendations(config)
  }
}

// Extract key points from content for AI consumption
function extractKeyPoints(content: string): string[] {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20)
  const keyPoints: string[] = []
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim()
    if (
      trimmed.toLowerCase().includes('important') ||
      trimmed.toLowerCase().includes('key') ||
      trimmed.toLowerCase().includes('essential') ||
      trimmed.toLowerCase().includes('main') ||
      trimmed.toLowerCase().includes('first') ||
      trimmed.toLowerCase().includes('best') ||
      trimmed.toLowerCase().includes('top') ||
      trimmed.toLowerCase().includes('recommend') ||
      trimmed.length > 30 && trimmed.length < 150
    ) {
      keyPoints.push(trimmed)
    }
  }
  
  return keyPoints.slice(0, 10)
}

// Extract named entities for knowledge graph
function extractEntities(content: string): Array<{
  name: string
  type: string
  confidence: number
}> {
  const entities: Array<{ name: string; type: string; confidence: number }> = []
  
  // AI tool patterns
  const aiTools = content.match(/ChatGPT|Claude|GPT-4|Gemini|Midjourney|Stable Diffusion|DALL-E|Llama|Mistral/g)
  if (aiTools) {
    aiTools.forEach(tool => {
      entities.push({ name: tool, type: 'AISoftware', confidence: 0.9 })
    })
  }
  
  // Technology patterns
  const techPatterns = [
    /(?:machine learning|deep learning|natural language processing|computer vision)/gi
  ]
  techPatterns.forEach(pattern => {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach(match => {
        entities.push({ name: match, type: 'Technology', confidence: 0.85 })
      })
    }
  })
  
  return entities.slice(0, 20)
}

// Generate structured content with clear hierarchy
function generateStructuredContent(config: AEOContentConfig): string {
  return `## ${config.title}

### Overview
${config.description}

### Key Takeaways
${config.keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}

### Detailed Content
${config.content}

### Target Audience
${config.targetAudience.join(', ')}
`
}

// Generate AEO recommendations
function generateAEORecommendations(config: AEOContentConfig): string[] {
  const recommendations: string[] = []
  
  // Content length check
  const wordCount = config.content.split(/\s+/).length
  if (wordCount < 500) {
    recommendations.push('Expand content to 500+ words for better AI visibility')
  }
  
  // Structure check
  if (!config.content.includes('##') && wordCount > 300) {
    recommendations.push('Add heading structure (H2, H3) for better AI parsing')
  }
  
  // FAQ check
  recommendations.push('Include FAQ section with 3-5 common questions')
  recommendations.push('Add schema markup (FAQPage, HowTo, Review)')
  recommendations.push('Use numbered lists for step-by-step content')
  recommendations.push('Include data points and statistics where relevant')
  recommendations.push('Add comparison tables for tool/content reviews')
  
  return recommendations
}

// Generate AI-friendly structured data
export function generateAISearchSchema(
  type: 'tool' | 'blog' | 'guide' | 'comparison',
  data: {
    title: string
    description: string
    url: string
    publishedAt?: string
    updatedAt?: string
    author?: string
    rating?: number
    reviewCount?: number
    keyPoints?: string[]
    faqs?: Array<{ question: string; answer: string }>
  }
): object {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type === 'tool' ? 'SoftwareApplication' : 
            type === 'blog' ? 'Article' :
            type === 'guide' ? 'HowTo' : 'WebPage',
    name: data.title,
    description: data.description,
    url: data.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url
    }
  }
  
  if (type === 'tool') {
    return {
      ...baseSchema,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: data.rating ? {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
        reviewCount: data.reviewCount || 1,
        bestRating: 5,
        worstRating: 1
      } : undefined,
      keyPoints: data.keyPoints
    }
  }
  
  if (type === 'blog' && data.publishedAt) {
    return {
      ...baseSchema,
      datePublished: data.publishedAt,
      dateModified: data.updatedAt || data.publishedAt,
      author: {
        '@type': 'Organization',
        name: data.author || 'AI Fuel Hub'
      },
      publisher: {
        '@type': 'Organization',
        name: 'AI Fuel Hub',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`
        }
      },
      keyPoints: data.keyPoints
    }
  }
  
  if (type === 'guide') {
    return {
      ...baseSchema,
      step: data.keyPoints?.map((point, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: `Step ${index + 1}`,
        text: point
      })) || []
    }
  }
  
  return baseSchema
}

// Generate comprehensive FAQ schema for AI engines
export function generateAIOptimizedFAQ(
  topic: string,
  faqs: Array<{ question: string; answer: string; keywords?: string[] }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/faq/${topic.replace(/\s+/g, '-').toLowerCase()}`,
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        keywords: faq.keywords || []
      }
    }))
  }
}

// Generate HowTo schema for AI assistant consumption
export function generateAIHowTo(
  title: string,
  description: string,
  steps: Array<{
    name: string
    text: string
    duration?: string
    tips?: string[]
  }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    totalTime: steps.length > 0 ? `PT${steps.length * 5}M` : undefined,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      duration: step.duration,
      tip: step.tips
    })),
    video: {
      '@type': 'VideoObject',
      name: `${title} Video Guide`,
      description: `Video guide for ${title}`,
      thumbnailUrl: [`${SITE_URL}/images/${title.replace(/\s+/g, '-').toLowerCase()}-thumb.jpg`]
    }
  }
}

// Generate comparison schema for AI engines
export function generateAIComparisonSchema(
  subject: string,
  items: Array<{
    name: string
    rating?: number
    price?: string
    features: string[]
    pros?: string[]
    cons?: string[]
  }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Table',
    about: subject,
    description: `Comparison of ${subject} options`,
    column: ['Feature', 'Options'],
    row: items.map(item => ({
      '@type': 'TableRow',
      rowValue: item.name,
      columnValue: [
        { '@type': 'TableCell', header: 'Rating', value: item.rating ? `${item.rating}/5` : 'N/A' },
        { '@type': 'TableCell', header: 'Price', value: item.price || 'Varies' },
        { '@type': 'TableCell', header: 'Key Features', value: item.features.join(', ') },
        { '@type': 'TableCell', header: 'Pros', value: item.pros?.join(', ') || 'N/A' },
        { '@type': 'TableCell', header: 'Cons', value: item.cons?.join(', ') || 'N/A' }
      ]
    }))
  }
}

// Generate content summary for AI consumption
export function generateAISummary(
  content: string,
  maxLength: number = 300
): { summary: string; keywords: string[]; entities: string[] } {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20)
  
  // Extract first few sentences for summary
  let summary = sentences.slice(0, 3).join('. ').trim()
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength) + '...'
  }
  
  // Extract keywords
  const keywords = content
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 4)
    .reduce((acc, word) => {
      if (!acc.includes(word)) acc.push(word)
      return acc.slice(-10)
    }, [] as string[])
  
  // Extract entities
  const entities = extractEntities(content).map(e => e.name)
  
  return { summary, keywords, entities }
}

// Generate structured data for AI knowledge panels
export function generateKnowledgePanelSchema(
  entityName: string,
  entityType: string,
  data: {
    description: string
    officialWebsite?: string
    founded?: string
    headquarters?: string
    keyProducts?: string[]
    relatedEntities?: string[]
  }
): object {
  return {
    '@context': 'https://schema.org',
    '@type': entityType,
    '@id': `${SITE_URL}/entity/${entityName.replace(/\s+/g, '-').toLowerCase()}`,
    name: entityName,
    description: data.description,
    url: data.officialWebsite || `${SITE_URL}/entity/${entityName.replace(/\s+/g, '-').toLowerCase()}`,
    ...(data.founded && { foundingDate: data.founded }),
    ...(data.headquarters && { headquarters: { '@type': 'Place', name: data.headquarters } }),
    ...(data.keyProducts && { makes: data.keyProducts }),
    ...(data.relatedEntities && { relatedLink: data.relatedEntities.map(e => `${SITE_URL}/entity/${e.replace(/\s+/g, '-').toLowerCase()}`) })
  }
}

// Generate E-E-A-T signals for AI trust
export function generateEETSignalSchema(
  contentType: 'review' | 'guide' | 'news' | 'analysis',
  author: {
    name: string
    credentials?: string
    expertise?: string[]
  },
  reviewDate: string,
  updateFrequency: 'daily' | 'weekly' | 'monthly'
): object {
  return {
    '@context': 'https://schema.org',
    '@type': contentType === 'review' ? 'Review' : 
            contentType === 'news' ? 'NewsArticle' :
            contentType === 'analysis' ? 'Report' : 'Article',
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.credentials,
      knowsAbout: author.expertise,
      worksFor: {
        '@type': 'Organization',
        name: 'AI Fuel Hub'
      }
    },
    datePublished: reviewDate,
    dateModified: new Date().toISOString(),
    updatePolicy: updateFrequency === 'daily' ? 'https://schema.org/Daily' :
                   updateFrequency === 'weekly' ? 'https://schema.org/Weekly' : 'https://schema.org/Monthly',
    trustIndicators: {
      '@type': 'Review',
      ratingValue: 4.8,
      reviewCount: 5000,
      bestRating: 5
    }
  }
}

// Export AI engine specific optimization tips
export const AI_ENGINE_TIPS: Record<string, string[]> = {
  ChatGPT: [
    'Use clear headings and bullet points',
    'Include specific examples and use cases',
    'Add comparison tables with pros/cons',
    'Provide actionable takeaways',
    'Use consistent formatting throughout'
  ],
  Perplexity: [
    'Focus on factual accuracy and citations',
    'Include recent updates and dates',
    'Structure content with clear sections',
    'Add statistics and data points',
    'Reference authoritative sources'
  ],
  Claude: [
    'Use detailed explanations with context',
    'Include technical depth where appropriate',
    'Add step-by-step guides',
    'Use code examples for technical content',
    'Provide nuanced analysis'
  ],
  Gemini: [
    'Include multimedia descriptions',
    'Use structured data markup',
    'Provide comprehensive coverage',
    'Add related entity links',
    'Optimize for voice search queries'
  ],
  Copilot: [
    'Include code snippets with explanations',
    'Add technical documentation links',
    'Use clear function signatures',
    'Provide usage examples',
    'Include troubleshooting tips'
  ]
}

// Generate AEO audit report
export function generateAEOAudit(content: string): {
  score: number
  aiCompatibility: number
  recommendations: string[]
  strengths: string[]
  weaknesses: string[]
} {
  const recommendations: string[] = []
  const strengths: string[] = []
  const weaknesses: string[] = []
  
  // Check for headings
  if (content.includes('##')) {
    strengths.push('Has heading structure for AI parsing')
  } else {
    weaknesses.push('Missing heading structure')
    recommendations.push('Add H2 and H3 headings')
  }
  
  // Check for lists
  if (content.includes('- ') || content.includes('1. ')) {
    strengths.push('Uses lists for easy scanning')
  } else {
    weaknesses.push('Missing bullet or numbered lists')
    recommendations.push('Add bullet points for key information')
  }
  
  // Check for FAQ
  if (content.toLowerCase().includes('faq') || content.toLowerCase().includes('question')) {
    strengths.push('Includes FAQ content')
  } else {
    weaknesses.push('Missing FAQ section')
    recommendations.push('Add FAQ section with 3-5 questions')
  }
  
  // Check for comparison
  if (content.toLowerCase().includes('vs') || content.toLowerCase().includes('compare')) {
    strengths.push('Includes comparison content')
  } else {
    recommendations.push('Consider adding comparison tables')
  }
  
  // Check content length
  const wordCount = content.split(/\s+/).length
  if (wordCount >= 500) {
    strengths.push('Content length is sufficient (500+ words)')
  } else {
    weaknesses.push('Content too short for AI visibility')
    recommendations.push('Expand content to 500+ words')
  }
  
  // Calculate scores
  const aiCompatibility = Math.min(100, strengths.length * 20)
  const score = Math.min(100, (aiCompatibility + wordCount / 20) / 2)
  
  return {
    score,
    aiCompatibility,
    recommendations,
    strengths,
    weaknesses
  }
}
