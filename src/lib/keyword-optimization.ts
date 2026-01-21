/**
 * Keyword Research and Content Optimization System
 * Helps identify high-value keywords and optimize content for better rankings
 */

export interface Keyword {
  keyword: string
  searchVolume: number
  difficulty: number
  intent: 'informational' | 'transactional' | 'navigational' | 'commercial'
  trend: 'rising' | 'stable' | 'declining'
  relatedKeywords: string[]
}

export interface ContentOptimization {
  targetKeywords: string[]
  keywordDensity: Record<string, number>
  readabilityScore: number
  seoScore: number
  suggestions: string[]
}

/**
 * High-value keyword database for AI tools niche
 */
export const aiToolsKeywords: Record<string, Keyword> = {
  'best ai tools': {
    keyword: 'best ai tools',
    searchVolume: 12100,
    difficulty: 45,
    intent: 'informational',
    trend: 'rising',
    relatedKeywords: ['top ai tools', 'ai software', 'artificial intelligence tools', 'best ai apps']
  },
  'ai writing tools': {
    keyword: 'ai writing tools',
    searchVolume: 8100,
    difficulty: 38,
    intent: 'commercial',
    trend: 'rising',
    relatedKeywords: ['ai content generator', 'copywriting ai', 'blog writing ai', 'ai text generator']
  },
  'ai image generator': {
    keyword: 'ai image generator',
    searchVolume: 45000,
    difficulty: 52,
    intent: 'informational',
    trend: 'rising',
    relatedKeywords: ['ai art generator', 'image creation ai', 'midjourney alternative', 'dall-e']
  },
  'chatgpt alternatives': {
    keyword: 'chatgpt alternatives',
    searchVolume: 18200,
    difficulty: 42,
    intent: 'commercial',
    trend: 'rising',
    relatedKeywords: ['chatgpt competitors', 'best ai chatbot', 'free chatgpt', 'ai assistant']
  },
  'ai video generator': {
    keyword: 'ai video generator',
    searchVolume: 9900,
    difficulty: 35,
    intent: 'commercial',
    trend: 'rising',
    relatedKeywords: ['video creation ai', 'ai video maker', 'text to video ai', 'synthesia alternative']
  },
  'ai coding assistant': {
    keyword: 'ai coding assistant',
    searchVolume: 5400,
    difficulty: 40,
    intent: 'commercial',
    trend: 'rising',
    relatedKeywords: ['ai code generator', 'copilot alternative', 'code completion ai', 'programming ai']
  },
  'free ai tools': {
    keyword: 'free ai tools',
    searchVolume: 14800,
    difficulty: 30,
    intent: 'informational',
    trend: 'stable',
    relatedKeywords: ['free ai software', 'no cost ai tools', 'free ai apps', 'gratis ai tools']
  },
  'ai productivity tools': {
    keyword: 'ai productivity tools',
    searchVolume: 3600,
    difficulty: 32,
    intent: 'commercial',
    trend: 'rising',
    relatedKeywords: ['ai workflow automation', 'ai task management', 'productivity ai apps']
  },
  'ai seo tools': {
    keyword: 'ai seo tools',
    searchVolume: 2900,
    difficulty: 35,
    intent: 'commercial',
    trend: 'rising',
    relatedKeywords: ['seo ai assistant', 'keyword research ai', 'content optimization ai']
  },
  'ai for business': {
    keyword: 'ai for business',
    searchVolume: 8100,
    difficulty: 48,
    intent: 'informational',
    trend: 'rising',
    relatedKeywords: ['enterprise ai solutions', 'business ai software', 'ai automation']
  }
}

/**
 * Long-tail keyword generator
 */
export function generateLongTailKeywords(mainKeyword: string, modifiers: string[]): string[] {
  const keywords: string[] = []

  modifiers.forEach(modifier => {
    keywords.push(`${modifier} ${mainKeyword}`)
    keywords.push(`${mainKeyword} ${modifier}`)
    keywords.push(`${mainKeyword} for ${modifier}`)
  })

  return keywords
}

/**
 * Analyze content for keyword optimization
 */
export function analyzeContentOptimization(
  content: string,
  targetKeywords: string[]
): ContentOptimization {
  const wordCount = content.split(/\s+/).length
  const keywordDensity: Record<string, number> = {}
  const suggestions: string[] = []

  // Calculate keyword density
  targetKeywords.forEach(keyword => {
    const regex = new RegExp(keyword.toLowerCase(), 'gi')
    const matches = content.match(regex) || []
    const density = (matches.length / wordCount) * 100
    keywordDensity[keyword] = Math.round(density * 100) / 100

    // Check if keyword density is optimal (1-3%)
    if (density < 1) {
      suggestions.push(`Increase usage of "${keyword}" (current: ${density.toFixed(2)}%)`)
    } else if (density > 3) {
      suggestions.push(`Reduce usage of "${keyword}" to avoid keyword stuffing (current: ${density.toFixed(2)}%)`)
    }
  })

  // Check for keyword in title
  const hasTitleKeyword = targetKeywords.some(kw =>
    content.toLowerCase().includes(kw.toLowerCase())
  )
  if (!hasTitleKeyword) {
    suggestions.push('Include target keywords in your title/headings')
  }

  // Check for meta description
  if (content.length < 150) {
    suggestions.push('Content is too short for optimal SEO (aim for 1500+ words)')
  }

  // Calculate readability (simplified Flesch Reading Ease)
  const sentences = content.split(/[.!?]+/).length
  const avgWordsPerSentence = wordCount / sentences
  const avgSyllablesPerWord = content.split(/\s+/).reduce((acc, word) => {
    return acc + countSyllables(word)
  }, 0) / wordCount

  const readabilityScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
  const normalizedReadability = Math.max(0, Math.min(100, readabilityScore))

  // Calculate SEO score
  let seoScore = 0
  seoScore += wordCount > 1500 ? 20 : wordCount > 1000 ? 15 : 10
  seoScore += targetKeywords.every(kw => keywordDensity[kw] >= 1 && keywordDensity[kw] <= 3) ? 20 : 10
  seoScore += normalizedReadability > 60 ? 20 : normalizedReadability > 40 ? 15 : 10
  seoScore += content.includes('##') ? 10 : 5 // Has headings
  seoScore += content.includes('[') && content.includes(']') ? 10 : 5 // Has lists
  seoScore += /\d+/.test(content) ? 10 : 5 // Has numbers/data

  return {
    targetKeywords,
    keywordDensity,
    readabilityScore: Math.round(normalizedReadability),
    seoScore,
    suggestions
  }
}

/**
 * Count syllables in a word (simplified)
 */
function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '')
  if (word.length <= 3) return 1

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, '')
  const matches = word.match(/[aeiouy]{1,2}/g)
  return matches ? matches.length : 1
}

/**
 * Generate topic clusters for content strategy
 */
export function generateTopicClusters(mainTopic: string): {
  pillar: string
  cluster: Array<{ topic: string; keywords: string[]; priority: number }>
} {
  const topicMap: Record<string, Array<{ topic: string; keywords: string[]; priority: number }>> = {
    'ai writing tools': [
      { topic: 'best ai writing tools', keywords: ['ai writing tools', 'copywriting ai', 'content generator'], priority: 10 },
      { topic: 'free ai writing tools', keywords: ['free ai writing', 'no cost copywriting ai'], priority: 8 },
      { topic: 'ai writing tools for blogs', keywords: ['blog writing ai', 'content creation ai'], priority: 9 },
      { topic: 'ai writing tools for students', keywords: ['academic writing ai', 'essay writing ai'], priority: 7 },
      { topic: 'ai writing tools comparison', keywords: ['copywriting ai review', 'best ai writer'], priority: 8 }
    ],
    'ai image generators': [
      { topic: 'best ai image generators', keywords: ['ai art generator', 'image creation ai'], priority: 10 },
      { topic: 'free ai image generators', keywords: ['free ai art', 'no cost image ai'], priority: 9 },
      { topic: 'midjourney alternatives', keywords: ['midjourney like tools', 'ai art alternatives'], priority: 8 },
      { topic: 'ai image generator for business', keywords: ['commercial ai art', 'brand image ai'], priority: 7 },
      { topic: 'text to image ai', keywords: ['text to image generator', 'prompt to image'], priority: 8 }
    ],
    'ai video tools': [
      { topic: 'best ai video generators', keywords: ['ai video maker', 'video creation ai'], priority: 10 },
      { topic: 'free ai video tools', keywords: ['free video ai', 'no cost video generator'], priority: 9 },
      { topic: 'ai video editing tools', keywords: ['video editing ai', 'automatic video editor'], priority: 8 },
      { topic: 'text to video ai', keywords: ['text to video generator', 'script to video'], priority: 9 },
      { topic: 'ai video for marketing', keywords: ['marketing video ai', 'promo video ai'], priority: 7 }
    ]
  }

  // Find matching topic or default to general
  const cluster = topicMap[mainTopic] || topicMap['ai writing tools']

  return {
    pillar: mainTopic,
    cluster
  }
}

/**
 * Generate content brief with SEO recommendations
 */
export function generateContentBrief(
  targetKeyword: string,
  contentType: 'blog' | 'tool-review' | 'comparison' | 'guide'
): {
  title: string
  metaDescription: string
  headings: string[]
  targetWordCount: number
  keyPoints: string[]
  relatedKeywords: string[]
  suggestedStructure: string[]
} {
  const keywordData = aiToolsKeywords[targetKeyword] || {
    keyword: targetKeyword,
    searchVolume: 1000,
    difficulty: 30,
    intent: 'informational',
    trend: 'stable',
    relatedKeywords: []
  }

  const title = contentType === 'blog'
    ? `${targetKeyword.charAt(0).toUpperCase() + targetKeyword.slice(1)}: Complete Guide (2026)`
    : contentType === 'tool-review'
    ? `${targetKeyword.charAt(0).toUpperCase() + targetKeyword.slice(1)} Review: Pros, Cons & Pricing`
    : contentType === 'comparison'
    ? `${targetKeyword.charAt(0).toUpperCase() + targetKeyword.slice(1)} vs Top Alternatives`
    : `How to Use ${targetKeyword.charAt(0).toUpperCase() + targetKeyword.slice(1)}: Step-by-Step Guide`

  const metaDescription = `Discover ${targetKeyword} in our comprehensive guide. Learn features, pricing, pros & cons. Expert-reviewed alternatives included.`

  const headings = [
    `What is ${targetKeyword}?`,
    `Top ${targetKeyword} in 2026`,
    `${targetKeyword} Features & Benefits`,
    `${targetKeyword} Pricing & Plans`,
    `${targetKeyword} Pros & Cons`,
    `${targetKeyword} Alternatives`,
    `Who Should Use ${targetKeyword}?`,
    `How to Choose the Right ${targetKeyword}`,
    `${targetKeyword} FAQs`
  ]

  const targetWordCount = contentType === 'blog' ? 2000 : contentType === 'tool-review' ? 1500 : 1800

  const keyPoints = [
    `Comprehensive overview of ${targetKeyword}`,
    `Expert analysis of key features and benefits`,
    `Detailed pricing comparison`,
    `Real-world use cases and examples`,
    `Pros and cons analysis`,
    `Top alternatives comparison`,
    `Recommendations based on use case`
  ]

  const relatedKeywords = keywordData.relatedKeywords.slice(0, 5)

  const suggestedStructure = [
    '1. Introduction (150-200 words)',
    '2. What is [Keyword]? (200-250 words)',
    '3. Key Features (300-400 words)',
    '4. Benefits & Use Cases (200-300 words)',
    '5. Pricing Comparison (200-250 words)',
    '6. Pros & Cons (200-250 words)',
    '7. Top Alternatives (300-400 words)',
    '8. How to Choose (200-250 words)',
    '9. FAQs (200-250 words)',
    '10. Conclusion (100-150 words)'
  ]

  return {
    title,
    metaDescription,
    headings,
    targetWordCount,
    keyPoints,
    relatedKeywords,
    suggestedStructure
  }
}

/**
 * Find keyword opportunities (low difficulty, high volume)
 */
export function findKeywordOpportunities(
  maxDifficulty: number = 40,
  minVolume: number = 1000
): Array<{
  keyword: string
  searchVolume: number
  difficulty: number
  opportunityScore: number
}> {
  const opportunities = Object.entries(aiToolsKeywords)
    .map(([keyword, data]) => ({
      keyword,
      searchVolume: data.searchVolume,
      difficulty: data.difficulty,
      opportunityScore: (data.searchVolume / data.difficulty) * (data.trend === 'rising' ? 1.5 : 1)
    }))
    .filter(kw => kw.difficulty <= maxDifficulty && kw.searchVolume >= minVolume)
    .sort((a, b) => b.opportunityScore - a.opportunityScore)

  return opportunities.slice(0, 10)
}

/**
 * Generate semantic keywords (LSI) for content
 */
export function generateSemanticKeywords(mainKeyword: string): string[] {
  const semanticMap: Record<string, string[]> = {
    'ai writing tools': ['content creation', 'copywriting', 'blog writing', 'text generation', 'seo writing'],
    'ai image generator': ['art creation', 'image design', 'visual content', 'graphic design', 'digital art'],
    'chatgpt alternatives': ['ai chatbot', 'conversational ai', 'virtual assistant', 'language model', 'nlp'],
    'ai video generator': ['video creation', 'video editing', 'content production', 'multimedia', 'animation'],
    'ai coding assistant': ['code generation', 'programming help', 'development tools', 'code completion', 'debugging']
  }

  return semanticMap[mainKeyword] || []
}

/**
 * Optimize content for featured snippets
 */
export function optimizeForFeaturedSnippets(content: string, question: string): {
  optimizedContent: string
  suggestions: string[]
} {
  const suggestions: string[] = []

  // Check for direct answer format
  if (!content.match(/^[A-Z].*\.$/m)) {
    suggestions.push('Start with a direct, concise answer (40-60 words)')
  }

  // Check for structured format
  if (!content.includes('##') && !content.includes('- ')) {
    suggestions.push('Use structured formatting with headings and bullet points')
  }

  // Check for data points
  if (!/\d+/.test(content)) {
    suggestions.push('Include specific data points and statistics')
  }

  // Check for FAQ format
  if (!content.includes('?')) {
    suggestions.push('Include questions and answers for FAQ snippets')
  }

  // Generate optimized content
  const optimizedContent = `
${question}

${content.split('\n')[0]}

## Key Points
${content.split('\n').slice(1, 5).join('\n')}

## Additional Details
${content.split('\n').slice(5).join('\n')}
  `.trim()

  return {
    optimizedContent,
    suggestions
  }
}
