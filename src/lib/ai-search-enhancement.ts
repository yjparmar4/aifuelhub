/**
 * Advanced AI Search Engine Enhancement
 * Cutting-edge optimization for ChatGPT, Perplexity, Claude, Gemini, and emerging AI engines
 * Implements the latest AEO (AI Engine Optimization) strategies for 2026
 */

import { SITE_URL } from '@/lib/seo'

// AI Search Engine Personas and Optimization Strategies
export const AI_ENGINE_PERSONAS = {
  chatgpt: {
    name: 'ChatGPT Browse',
    characteristics: ['values credible sources', 'prefers structured content', 'likes step-by-step guides'],
    contentPreferences: {
      length: { min: 800, max: 2000 },
      structure: ['introduction', 'key points', 'detailed analysis', 'conclusion'],
      tone: 'authoritative but accessible',
      keywords: ['according to research', 'experts recommend', 'data shows', 'studies indicate']
    },
    schemaTypes: ['Article', 'HowTo', 'FAQPage', 'Review'],
    crawlSignals: {
      freshness: 'high',
      authority: 'critical',
      structure: 'essential'
    }
  },
  
  perplexity: {
    name: 'Perplexity AI',
    characteristics: ['research-focused', 'values citations', 'prefers comprehensive coverage'],
    contentPreferences: {
      length: { min: 1200, max: 3000 },
      structure: ['overview', 'research findings', 'detailed analysis', 'sources', 'conclusion'],
      tone: 'academic but practical',
      keywords: ['research indicates', 'studies show', 'according to', 'data suggests']
    },
    schemaTypes: ['Article', 'Report', 'ScholarlyArticle', 'FAQPage'],
    crawlSignals: {
      freshness: 'critical',
      authority: 'essential',
      citations: 'critical'
    }
  },
  
  claude: {
    name: 'Claude.ai',
    characteristics: ['nuanced understanding', 'context-aware', 'values detailed explanations'],
    contentPreferences: {
      length: { min: 1000, max: 2500 },
      structure: ['context', 'analysis', 'implications', 'considerations', 'recommendations'],
      tone: 'thoughtful and analytical',
      keywords: ['considering', 'analysis shows', 'context matters', 'nuanced approach']
    },
    schemaTypes: ['Article', 'TechArticle', 'AnalysisNewsArticle', 'HowTo'],
    crawlSignals: {
      depth: 'critical',
      context: 'essential',
      nuance: 'important'
    }
  },
  
  gemini: {
    name: 'Google Gemini',
    characteristics: ['multimedia-friendly', 'comprehensive coverage', 'structured data preference'],
    contentPreferences: {
      length: { min: 1000, max: 2500 },
      structure: ['summary', 'detailed content', 'examples', 'visual descriptions', 'conclusion'],
      tone: 'comprehensive and clear',
      keywords: ['comprehensive guide', 'complete overview', 'thorough analysis', 'detailed examination']
    },
    schemaTypes: ['Article', 'VideoObject', 'ImageObject', 'HowTo', 'ItemList'],
    crawlSignals: {
      multimedia: 'important',
      structure: 'critical',
      comprehensiveness: 'essential'
    }
  },
  
  copilot: {
    name: 'Microsoft Copilot',
    characteristics: ['code-friendly', 'technical depth', 'practical implementation'],
    contentPreferences: {
      length: { min: 800, max: 2000 },
      structure: ['problem', 'solution', 'implementation', 'code examples', 'troubleshooting'],
      tone: 'technical and practical',
      keywords: ['implementation', 'code example', 'practical solution', 'technical guide']
    },
    schemaTypes: ['SoftwareSourceCode', 'TechArticle', 'HowTo', 'SoftwareApplication'],
    crawlSignals: {
      technical: 'critical',
      code: 'important',
      practical: 'essential'
    }
  }
}

// Generate AI-optimized content structure
export function generateAIOptimizedContent({
  title,
  content,
  targetEngines = ['chatgpt', 'perplexity', 'claude', 'gemini'],
  contentType = 'article'
}: {
  title: string
  content: string
  targetEngines?: Array<keyof typeof AI_ENGINE_PERSONAS>
  contentType?: 'article' | 'guide' | 'review' | 'comparison'
}): {
  optimizedContent: string
  aiSignals: Record<string, any>
  recommendations: string[]
} {
  const aiSignals: Record<string, any> = {}
  const recommendations: string[] = []
  let optimizedContent = content

  // Analyze and optimize for each target engine
  for (const engine of targetEngines) {
    const persona = AI_ENGINE_PERSONAS[engine]
    
    // Content length optimization
    const wordCount = content.split(/\s+/).length
    if (wordCount < persona.contentPreferences.length.min) {
      recommendations.push(`${persona.name}: Expand content to ${persona.contentPreferences.length.min}+ words`)
    } else if (wordCount > persona.contentPreferences.length.max) {
      recommendations.push(`${persona.name}: Consider condensing to ${persona.contentPreferences.length.max} words`)
    }

    // Structure analysis
    const structureScore = analyzeContentStructure(content, persona.contentPreferences.structure)
    aiSignals[engine] = {
      structureScore,
      lengthScore: calculateLengthScore(wordCount, persona.contentPreferences.length),
      keywordScore: calculateKeywordScore(content, persona.contentPreferences.keywords),
      recommendations: getEngineSpecificRecommendations(content, persona)
    }

    // Add engine-specific optimizations
    optimizedContent = addEngineSpecificOptimizations(optimizedContent, persona)
  }

  return {
    optimizedContent,
    aiSignals,
    recommendations
  }
}

// Analyze content structure against AI preferences
function analyzeContentStructure(content: string, preferredStructure: string[]): number {
  let score = 0
  const totalSections = preferredStructure.length
  
  for (const section of preferredStructure) {
    if (section === 'introduction' && content.match(/^##?\s*(intro|overview|summary)/mi)) score++
    if (section === 'key points' && content.match(/^##?\s*(key points|main points|highlights)/mi)) score++
    if (section === 'detailed analysis' && content.match(/^##?\s*(analysis|details|examination)/mi)) score++
    if (section === 'conclusion' && content.match(/^##?\s*(conclusion|summary|final)/mi)) score++
    if (section === 'research findings' && content.match(/^##?\s*(research|findings|studies)/mi)) score++
    if (section === 'sources' && content.match(/^##?\s*(sources|references|citations)/mi)) score++
  }
  
  return (score / totalSections) * 100
}

// Calculate content length score
function calculateLengthScore(wordCount: number, targetLength: { min: number; max: number }): number {
  if (wordCount >= targetLength.min && wordCount <= targetLength.max) return 100
  if (wordCount < targetLength.min) return (wordCount / targetLength.min) * 100
  return Math.max(0, 100 - ((wordCount - targetLength.max) / targetLength.max) * 50)
}

// Calculate keyword relevance score
function calculateKeywordScore(content: string, keywords: string[]): number {
  const contentLower = content.toLowerCase()
  let matches = 0
  
  for (const keyword of keywords) {
    if (contentLower.includes(keyword.toLowerCase())) matches++
  }
  
  return (matches / keywords.length) * 100
}

// Get engine-specific recommendations
function getEngineSpecificRecommendations(content: string, persona: any): string[] {
  const recommendations: string[] = []
  
  // Check for preferred keywords
  const hasKeywords = persona.contentPreferences.keywords.some((keyword: string) => 
    content.toLowerCase().includes(keyword.toLowerCase())
  )
  
  if (!hasKeywords) {
    recommendations.push(`Add phrases like "${persona.contentPreferences.keywords[0]}" for ${persona.name} optimization`)
  }
  
  // Check structure
  const structureScore = analyzeContentStructure(content, persona.contentPreferences.structure)
  if (structureScore < 70) {
    recommendations.push(`Improve content structure for ${persona.name} (current: ${structureScore.toFixed(0)}%)`)
  }
  
  // Check for citations (important for some engines)
  if (persona.crawlSignals.citations === 'critical' && !content.includes('according to')) {
    recommendations.push(`Add authoritative citations for ${persona.name}`)
  }
  
  return recommendations
}

// Add engine-specific optimizations to content
function addEngineSpecificOptimizations(content: string, persona: any): string {
  let optimized = content
  
  // Add authoritative language if missing
  if (persona.contentPreferences.keywords.some((k: string) => k.includes('according to')) && 
      !optimized.includes('according to')) {
    optimized = optimized.replace(/\n\n## /, '\n\nAccording to research and expert analysis, \n\n## ')
  }
  
  // Add structured headings if missing
  if (!optimized.includes('## ')) {
    optimized = `## Overview\n\n${optimized}\n\n## Key Takeaways\n\nThis comprehensive analysis provides actionable insights for making informed decisions.`
  }
  
  return optimized
}

// Generate advanced structured data for AI engines
export function generateAIEnhancedSchema({
  type,
  data,
  targetEngines = ['chatgpt', 'perplexity', 'claude', 'gemini'],
  locale = 'en'
}: {
  type: 'tool' | 'article' | 'guide' | 'comparison'
  data: any
  targetEngines?: Array<keyof typeof AI_ENGINE_PERSONAS>
  locale?: string
}) {
  const baseSchema = {
    '@context': ['https://schema.org', 'https://schema.ai'],
    '@type': type === 'tool' ? 'SoftwareApplication' : 
            type === 'article' ? 'Article' :
            type === 'guide' ? 'HowTo' : 'ItemList',
    
    // AI-specific enhancements
    aiOptimized: true,
    targetEngines: targetEngines.map(engine => AI_ENGINE_PERSONAS[engine].name),
    contentFreshness: new Date().toISOString(),
    trustScore: 4.8,
    expertReviewed: true,
    
    // Multi-language support
    inLanguage: [locale, 'en'],
    
    // E-E-A-T signals
    author: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL,
      expertise: ['AI Tools', 'Technology Analysis', 'Software Reviews', 'Machine Learning']
    },
    
    publisher: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`
      }
    },
    
    // AI search optimization
    audience: {
      '@type': 'Audience',
      geographicArea: 'Worldwide',
      audienceType: 'AI enthusiasts, professionals, businesses, developers'
    },
    
    // Content signals for AI engines
    contentSignals: {
      comprehensiveness: 'high',
      authority: 'high',
      freshness: 'high',
      structure: 'high',
      multimedia: type === 'guide' ? 'high' : 'medium'
    }
  }

  // Add type-specific properties
  switch (type) {
    case 'tool':
      return {
        ...baseSchema,
        name: data.name,
        description: data.description,
        url: `${SITE_URL}/tool/${data.slug}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        features: JSON.parse(data.features || '[]'),
        
        // Enhanced tool schema for AI
        teaches: [`Using ${data.name} effectively`, `Integrating ${data.name} in workflows`, `Best practices for ${data.name}`],
        learningResourceType: 'Interactive tutorial',
        
        aggregateRating: data.rating ? {
          '@type': 'AggregateRating',
          ratingValue: data.rating,
          reviewCount: data.reviewCount || 1,
          bestRating: 5,
          worstRating: 1,
          author: {
            '@type': 'Organization',
            name: 'AI Fuel Hub'
          }
        } : undefined,
        
        // AI-specific properties
        potentialAction: {
          '@type': 'UseAction',
          target: `${SITE_URL}/tool/${data.slug}`,
          object: {
            '@type': 'SoftwareApplication',
            name: data.name
          }
        }
      }
      
    case 'article':
      return {
        ...baseSchema,
        headline: data.title,
        description: data.excerpt || data.metaDescription,
        url: `${SITE_URL}/blog/${data.slug}`,
        datePublished: data.publishedAt,
        dateModified: data.updatedAt || data.publishedAt,
        wordCount: data.content?.split(/\s+/).length || 0,
        
        // Enhanced article schema for AI
        about: data.category ? {
          '@type': 'Thing',
          name: data.category.name,
          url: `${SITE_URL}/categories/${data.category.slug}`
        } : undefined,
        
        // AI-friendly content structure
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.summary', '.conclusion']
        },
        
        // Educational content for AI
        educationalLevel: 'Beginner to Advanced',
        teaches: extractLearningOutcomes(data.content),
        
        keywords: data.tags?.map((tag: any) => tag.name).join(', ') || '',
        
        // Entity mentions for knowledge graph
        mentions: extractEntityMentions(data.content)
      }
      
    case 'guide':
      return {
        ...baseSchema,
        name: data.title,
        description: data.description,
        url: `${SITE_URL}/guides/${data.slug}`,
        
        // HowTo schema enhanced for AI
        step: extractSteps(data.content).map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
          image: step.image,
          duration: step.duration
        })),
        
        totalTime: calculateTotalTime(data.content),
        
        // Learning outcomes for AI
        educationalUse: 'Instruction',
        learningResourceType: 'Tutorial guide',
        teaches: extractLearningOutcomes(data.content),
        
        // Tools and materials
        tool: extractTools(data.content).map(tool => ({
          '@type': 'HowToTool',
          name: tool
        })),
        
        supply: extractSupplies(data.content).map(supply => ({
          '@type': 'HowToSupply',
          name: supply
        }))
      }
      
    case 'comparison':
      return {
        ...baseSchema,
        name: data.title,
        description: `Comprehensive comparison of ${data.items?.length || 0} AI tools`,
        url: `${SITE_URL}/comparisons/${data.slug}`,
        
        // Enhanced comparison for AI
        mainEntity: data.items?.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: item.name,
            description: item.description,
            offers: item.price ? {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'USD'
            } : undefined,
            aggregateRating: item.rating ? {
              '@type': 'AggregateRating',
              ratingValue: item.rating
            } : undefined
          }
        })),
        
        // Comparison criteria
        about: [
          { '@type': 'Thing', name: 'Features' },
          { '@type': 'Thing', name: 'Pricing' },
          { '@type': 'Thing', name: 'User Experience' },
          { '@type': 'Thing', name: 'Performance' }
        ]
      }
      
    default:
      return baseSchema
  }
}

// Helper functions for content analysis
function extractLearningOutcomes(content: string): string[] {
  const outcomes: string[] = []
  
  // Look for explicit learning outcomes
  const outcomeMatch = content.match(/##?\s*(learning outcomes|what you'll learn|objectives)[\s\S]*?(?=##|$)/i)
  if (outcomeMatch) {
    const lines = outcomeMatch[0].split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
    outcomes.push(...lines.map(line => line.replace(/^[-*]\s*/, '').trim()))
  }
  
  // Default outcomes if none found
  if (outcomes.length === 0) {
    outcomes.push(
      'Understanding AI tool capabilities',
      'Making informed decisions about AI tools',
      'Implementing AI solutions effectively'
    )
  }
  
  return outcomes.slice(0, 5)
}

function extractEntityMentions(content: string): Array<{ '@type': string; name: string; url?: string }> {
  const mentions: Array<{ '@type': string; name: string; url?: string }> = []
  
  // AI tool mentions
  const aiTools = ['ChatGPT', 'Claude', 'Gemini', 'Midjourney', 'Stable Diffusion', 'DALL-E']
  for (const tool of aiTools) {
    if (content.includes(tool)) {
      mentions.push({
        '@type': 'SoftwareApplication',
        name: tool,
        url: `${SITE_URL}/tool/${tool.toLowerCase().replace(/\s+/g, '-')}`
      })
    }
  }
  
  return mentions
}

function extractSteps(content: string): Array<{ name: string; text: string; image?: string; duration?: string }> {
  const steps: Array<{ name: string; text: string; image?: string; duration?: string }> = []
  
  // Look for step patterns
  const stepPattern = /(?:###?\s*)?(?:Step\s*)?(\d+)[:.]\s*([^\n]+)\n+([\s\S]*?)(?=(?:###?\s*)?(?:Step\s*)?\d+[:.]\s*|##[^#]|$)/gi
  
  let match
  while ((match = stepPattern.exec(content)) !== null) {
    const name = match[2].trim().replace(/\*\*/g, '')
    const text = match[3].trim().replace(/\*\*/g, '').split('\n\n')[0]
    
    if (name && text) {
      steps.push({ name, text })
    }
  }
  
  return steps.slice(0, 15)
}

function calculateTotalTime(content: string): string {
  const stepCount = extractSteps(content).length
  const estimatedMinutes = stepCount * 5 // 5 minutes per step average
  return `PT${estimatedMinutes}M`
}

function extractTools(content: string): string[] {
  const tools: string[] = []
  
  // Look for tool mentions in content
  const toolPattern = /(?:tool|software|application):\s*([^\n,]+)/gi
  let match
  while ((match = toolPattern.exec(content)) !== null) {
    tools.push(match[1].trim())
  }
  
  return [...new Set(tools)].slice(0, 10)
}

function extractSupplies(content: string): string[] {
  const supplies: string[] = []
  
  // Look for supply/prerequisite mentions
  const supplyPattern = /(?:requirement|prerequisite|supply):\s*([^\n,]+)/gi
  let match
  while ((match = supplyPattern.exec(content)) !== null) {
    supplies.push(match[1].trim())
  }
  
  return [...new Set(supplies)].slice(0, 10)
}

// Generate AI search performance report
export function generateAIPerformanceReport(content: string, targetEngines: Array<keyof typeof AI_ENGINE_PERSONAS> = ['chatgpt', 'perplexity', 'claude', 'gemini']) {
  const report: any = {
    overallScore: 0,
    engineScores: {} as Record<string, any>,
    recommendations: [],
    strengths: [],
    weaknesses: []
  }
  
  let totalScore = 0
  
  for (const engine of targetEngines) {
    const persona = AI_ENGINE_PERSONAS[engine]
    const wordCount = content.split(/\s+/).length
    
    const engineScore = {
      engine: persona.name,
      overall: 0,
      structure: analyzeContentStructure(content, persona.contentPreferences.structure),
      length: calculateLengthScore(wordCount, persona.contentPreferences.length),
      keywords: calculateKeywordScore(content, persona.contentPreferences.keywords),
      recommendations: getEngineSpecificRecommendations(content, persona)
    }
    
    engineScore.overall = (engineScore.structure + engineScore.length + engineScore.keywords) / 3
    report.engineScores[engine] = engineScore
    totalScore += engineScore.overall
    
    // Collect overall recommendations
    report.recommendations.push(...engineScore.recommendations)
    
    if (engineScore.overall >= 80) {
      report.strengths.push(`Excellent optimization for ${persona.name}`)
    } else if (engineScore.overall < 60) {
      report.weaknesses.push(`Needs improvement for ${persona.name}`)
    }
  }
  
  report.overallScore = totalScore / targetEngines.length
  report.recommendations = [...new Set(report.recommendations)] // Remove duplicates
  
  return report
}

export { AI_ENGINE_PERSONAS }
