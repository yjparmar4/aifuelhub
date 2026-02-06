/**
 * AI Search Engine Optimization (GEO) Utilities
 * Optimizes content for ChatGPT, Perplexity, Claude, Google AI Overviews, and emerging AI engines
 */

import { Tool, BlogPost, Category } from '@/types'
import { SITE_URL } from '@/lib/seo'

// AI Search Engine specific optimization patterns - Expanded for world-class coverage
const AI_SEARCH_PATTERNS = {
  // ChatGPT Browse optimization
  chatgpt: {
    preferredContentLength: { min: 800, max: 2000 },
    keyPhrases: [
      'according to research',
      'experts recommend',
      'based on testing',
      'our analysis shows',
      'data indicates'
    ],
    structure: ['introduction', 'key_points', 'detailed_analysis', 'conclusion']
  },

  // Perplexity AI optimization
  perplexity: {
    preferredContentLength: { min: 1200, max: 3000 },
    keyPhrases: [
      'comprehensive guide',
      'detailed comparison',
      'in-depth analysis',
      'complete overview',
      'thorough review'
    ],
    structure: ['overview', 'comparison_table', 'detailed_review', 'pros_cons', 'recommendation']
  },

  // Claude.ai optimization
  claude: {
    preferredContentLength: { min: 1000, max: 2500 },
    keyPhrases: [
      'nuanced understanding',
      'subtle differences',
      'context-dependent',
      'considering multiple factors',
      'balanced perspective'
    ],
    structure: ['context', 'analysis', 'implications', 'considerations', 'recommendation']
  },

  // Google AI Overviews optimization
  google_ai: {
    preferredContentLength: { min: 600, max: 1500 },
    keyPhrases: [
      'according to studies',
      'research shows',
      'experts agree',
      'commonly used for',
      'best practices'
    ],
    structure: ['direct_answer', 'supporting_points', 'examples', 'summary']
  },

  // Bing AI (Copilot) optimization
  bing_ai: {
    preferredContentLength: { min: 1000, max: 2000 },
    keyPhrases: [
      'Microsoft recommends',
      'industry standard',
      'widely adopted',
      'proven solution',
      'enterprise-ready'
    ],
    structure: ['problem_statement', 'solution_overview', 'implementation', 'benefits', 'next_steps']
  },

  // You.com AI optimization
  you_ai: {
    preferredContentLength: { min: 800, max: 1800 },
    keyPhrases: [
      'real-time data shows',
      'current trends indicate',
      'latest developments',
      'up-to-date information',
      'recent studies'
    ],
    structure: ['current_situation', 'latest_updates', 'trends', 'forecast', 'recommendations']
  },

  // Grok (xAI) optimization
  grok: {
    preferredContentLength: { min: 900, max: 2100 },
    keyPhrases: [
      'maximally truthful',
      'evidence-based',
      'scientifically accurate',
      'data-driven insights',
      'objective analysis'
    ],
    structure: ['facts', 'evidence', 'analysis', 'conclusions', 'implications']
  }
}

// Generate AI-optimized content summary
export function generateAISearchSummary(
  content: string,
  targetEngine: keyof typeof AI_SEARCH_PATTERNS = 'google_ai'
): string {
  const patterns = AI_SEARCH_PATTERNS[targetEngine]
  
  // Extract key sentences that match AI preferences
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20)
  
  // Prioritize sentences with AI-preferred phrases
  const prioritizedSentences = sentences
    .map(sentence => ({
      sentence: sentence.trim(),
      score: patterns.keyPhrases.reduce((acc, phrase) => 
        sentence.toLowerCase().includes(phrase.toLowerCase()) ? acc + 1 : acc, 0
      )
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.sentence)

  return prioritizedSentences.join('. ') + '.'
}

// Generate AI search-friendly FAQ pairs
export function generateAISearchFAQs(tool: Tool, category?: Category): Array<{question: string, answer: string}> {
  const faqs = [
    {
      question: `What is ${tool.name} and how does it work?`,
      answer: `${tool.name} is ${tool.description}. It works by ${generateWorkingExplanation(tool)} and is designed for ${generateTargetAudience(tool)}.`
    },
    {
      question: `Is ${tool.name} worth it in ${new Date().getFullYear()}?`,
      answer: `Based on our testing and analysis, ${tool.name} ${generateWorthinessAssessment(tool)}. Key factors include ${generateKeyFactors(tool)}.`
    },
    {
      question: `What are the best alternatives to ${tool.name}?`,
      answer: `The top alternatives to ${tool.name} include ${generateAlternatives(tool)}. Each has different strengths depending on your specific needs.`
    },
    {
      question: `How much does ${tool.name} cost?`,
      answer: `${tool.name} offers ${generatePricingDescription(tool)}. The value proposition depends on your usage patterns and requirements.`
    },
    {
      question: `Who should use ${tool.name}?`,
      answer: `${tool.name} is ideal for ${generateTargetAudience(tool)}. It's particularly effective for ${generateUseCases(tool)}.`
    }
  ]

  if (category) {
    faqs.push({
      question: `How does ${tool.name} compare to other ${category.name.toLowerCase()}?`,
      answer: `Compared to other ${category.name.toLowerCase()}, ${tool.name} ${generateComparisonPoints(tool, category)}.`
    })
  }

  return faqs
}

// Generate AI-optimized meta descriptions
export function generateAIMetaDescription(
  title: string,
  content: string,
  targetEngine: keyof typeof AI_SEARCH_PATTERNS = 'google_ai'
): string {
  const patterns = AI_SEARCH_PATTERNS[targetEngine]
  const summary = generateAISearchSummary(content, targetEngine)
  
  // Include target keywords and AI-preferred phrases
  const keywords = extractKeywords(content)
  const keyPhrase = patterns.keyPhrases[Math.floor(Math.random() * patterns.keyPhrases.length)]
  
  return `${keyPhrase}: ${summary.substring(0, 120)}... ${keywords.slice(0, 3).join(', ')}.`
}

// Generate structured data for AI search engines
export function generateAISearchSchema(
  type: 'tool' | 'blog' | 'category',
  data: Tool | BlogPost | Category,
  targetEngines: Array<keyof typeof AI_SEARCH_PATTERNS> = ['google_ai', 'chatgpt', 'perplexity', 'claude', 'bing_ai', 'you_ai', 'grok']
) {
  const baseSchema = type === 'tool' ? generateToolSchema(data as Tool) :
                    type === 'blog' ? generateBlogPostSchema(data as BlogPost) :
                    generateCategorySchema(data as Category, [])

  // Add AI-specific optimizations
  const aiOptimizations = {
    // AI search engines prefer fresh content
    dateModified: new Date().toISOString(),
    
    // Add educational level for AI context
    educationalLevel: 'Beginner to Advanced',
    
    // Add learning outcomes for AI understanding
    teaches: extractLearningOutcomes(data),
    
    // Add assessment for AI evaluation
    assessment: generateAIAssessment(data),
    
    // Add AI-friendly description
    description: generateAISearchSummary(
      type === 'tool' ? (data as Tool).description :
      type === 'blog' ? (data as BlogPost).content :
      (data as Category).description,
      'google_ai'
    )
  }

  return {
    ...JSON.parse(baseSchema),
    ...aiOptimizations
  }
}

// Helper functions
function generateWorkingExplanation(tool: Tool): string {
  const features = JSON.parse(tool.features || '[]')
  if (features.length > 0) {
    return `leveraging ${features.slice(0, 2).join(' and ')}`
  }
  return 'using advanced AI algorithms and machine learning techniques'
}

function generateTargetAudience(tool: Tool): string {
  // Extract from category or use default
  return 'professionals, businesses, and individuals looking to enhance their productivity'
}

function generateWorthinessAssessment(tool: Tool): string {
  if (tool.rating && tool.rating >= 4.0) {
    return 'offers excellent value and is highly recommended'
  } else if (tool.rating && tool.rating >= 3.0) {
    return 'provides good value for specific use cases'
  }
  return 'may be worth considering depending on your needs'
}

function generateKeyFactors(tool: Tool): string {
  const features = JSON.parse(tool.features || '[]')
  return features.slice(0, 3).join(', ') || 'its features, pricing, and ease of use'
}

function generateAlternatives(tool: Tool): string {
  // This would typically come from your database
  return 'similar AI tools in its category'
}

function generatePricingDescription(tool: Tool): string {
  if (tool.startingPrice) {
    return `pricing starting from ${tool.startingPrice}`
  }
  return 'various pricing plans to suit different needs'
}

function generateUseCases(tool: Tool): string {
  return 'content creation, data analysis, automation, and productivity enhancement'
}

function generateComparisonPoints(tool: Tool, category: Category): string {
  return 'superior features, better pricing, and more intuitive user interface'
}

function extractKeywords(content: string): string[] {
  // Simple keyword extraction - in production, use NLP
  const words = content.toLowerCase().match(/\b\w{4,}\b/g) || []
  const frequency: Record<string, number> = {}
  
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })
  
  return Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word)
}

function extractLearningOutcomes(data: any): string[] {
  if ('features' in data) {
    const features = JSON.parse(data.features || '[]')
    return features.slice(0, 3)
  }
  return ['understanding AI tools', 'making informed decisions', 'improving productivity']
}

function generateAIAssessment(data: any): string {
  if ('rating' in data && data.rating) {
    return `Expert rating: ${data.rating}/5 based on comprehensive testing`
  }
  return 'Thoroughly reviewed by AI experts'
}

// Import existing schema functions
import { generateToolSchema, generateBlogPostSchema, generateCategorySchema } from './schema'
