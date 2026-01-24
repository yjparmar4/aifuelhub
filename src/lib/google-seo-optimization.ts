/**
 * Google Search Engine Optimization Utilities
 * Advanced SEO strategies for higher Google rankings and increased organic traffic
 */

import { Tool, BlogPost, Category } from '@/types'
import { SITE_URL } from '@/lib/seo'

// High-value keyword database for AI tools niche
const HIGH_VALUE_KEYWORDS = {
  primary: [
    'best AI tools 2026',
    'AI software reviews',
    'ChatGPT alternatives',
    'free AI tools',
    'AI writing tools',
    'AI image generators',
    'AI coding tools',
    'artificial intelligence software'
  ],
  secondary: [
    'Midjourney alternatives',
    'AI tools for business',
    'AI productivity tools',
    'AI marketing tools',
    'machine learning tools',
    'AI automation software',
    'AI content creation',
    'best AI assistants'
  ],
  longTail: [
    'best free AI writing tools 2026',
    'AI image generator no watermark',
    'ChatGPT alternatives for coding',
    'best AI tools for small business',
    'free AI tools for content creators',
    'AI tools better than ChatGPT',
    'best AI video generator tools',
    'AI tools for social media marketing'
  ],
  commercial: [
    'AI tools pricing comparison',
    'best paid AI tools',
    'AI software subscription cost',
    'enterprise AI tools pricing',
    'AI tools ROI analysis',
    'cost-effective AI solutions',
    'AI tools for startups budget',
    'affordable AI software plans'
  ]
}

// Search intent categories
const SEARCH_INTENTS = {
  informational: [
    'what is', 'how to', 'guide', 'tutorial', 'best', 'top', 'vs', 'comparison',
    'review', 'analysis', 'explained', 'meaning', 'definition', 'examples'
  ],
  commercial: [
    'pricing', 'cost', 'price', 'alternatives', 'vs', 'comparison', 'review',
    'best', 'top', 'rating', 'features', 'pros and cons', 'worth it'
  ],
  transactional: [
    'buy', 'purchase', 'download', 'sign up', 'free trial', 'demo', 'pricing',
    'plans', 'subscription', 'get started', 'register', 'create account'
  ],
  navigational: [
    'login', 'sign in', 'dashboard', 'app', 'official', 'website', 'support',
    'contact', 'help', 'documentation', 'api', 'integrations'
  ]
}

// Generate SEO-optimized title
export function generateSEOTitle(
  baseTitle: string,
  type: 'tool' | 'blog' | 'category' | 'homepage',
  targetKeyword?: string
): string {
  const currentYear = new Date().getFullYear()
  const month = new Date().toLocaleDateString('en-US', { month: 'short' })
  
  const patterns = {
    tool: [
      `${baseTitle} Review 2026: Features, Pricing & Pros/Cons`,
      `${baseTitle} (${currentYear}): Honest Review & Alternatives`,
      `Is ${baseTitle} Worth It? Complete Review ${currentYear}`,
      `${baseTitle} vs Alternatives: Which is Best?`,
      `${baseTitle} Pricing & Features: Expert Review`
    ],
    blog: [
      `${baseTitle} (${currentYear}): Complete Guide`,
      `${baseTitle}: What You Need to Know ${currentYear}`,
      `Ultimate Guide to ${baseTitle} ${currentYear}`,
      `${baseTitle}: Tips, Tricks & Best Practices`,
      `${baseTitle} Explained: Beginner's Guide ${currentYear}`
    ],
    category: [
      `Best ${baseTitle} ${currentYear}: Top 10 Tools Compared`,
      `${baseTitle} 2026: Complete Guide & Reviews`,
      `Top ${baseTitle} for Business & Professionals`,
      `${baseTitle} Compared: Features, Pricing & Reviews`,
      `Ultimate ${baseTitle} Directory ${currentYear}`
    ],
    homepage: [
      `AI Fuel Hub: 118+ AI Tools Compared & Reviewed ${currentYear}`,
      `Best AI Tools ${currentYear}: Expert Reviews & Comparisons`,
      `AI Software Directory: Top Tools for Every Need ${currentYear}`,
      `Compare 118+ AI Tools: Honest Reviews & Pricing ${currentYear}`,
      `Ultimate AI Tools Guide: Reviews, Alternatives & Deals ${currentYear}`
    ]
  }

  const titlePatterns = patterns[type]
  let selectedPattern = titlePatterns[0]

  // If target keyword is provided, try to incorporate it
  if (targetKeyword) {
    const keywordPattern = titlePatterns.find(pattern => 
      pattern.toLowerCase().includes(targetKeyword.toLowerCase())
    )
    if (keywordPattern) {
      selectedPattern = keywordPattern
    }
  }

  return selectedPattern
}

// Generate SEO-optimized meta description
export function generateSEODescription(
  content: string,
  type: 'tool' | 'blog' | 'category',
  targetKeyword?: string
): string {
  const currentYear = new Date().getFullYear()
  
  const baseDescription = content.length > 160 
    ? content.substring(0, 157) + '...'
    : content

  const patterns = {
    tool: [
      `Comprehensive ${currentYear} review of ${baseDescription}. Compare features, pricing, pros & cons. Expert-tested analysis and top alternatives.`,
      `Is ${baseDescription} worth it in ${currentYear}? Honest review covering features, pricing, use cases, and best alternatives.`,
      `Complete ${currentYear} guide to ${baseDescription}. Expert analysis, real user reviews, pricing comparison, and alternative recommendations.`
    ],
    blog: [
      `${baseDescription} Learn everything you need to know about AI tools in ${currentYear}. Expert tips, best practices, and actionable insights.`,
      `Ultimate guide to ${baseDescription} Updated for ${currentYear} with latest trends, tools, and strategies for success.`,
      `${baseDescription} Expert analysis and practical tips for ${currentYear}. Stay ahead with our comprehensive guide.`
    ],
    category: [
      `Compare the best ${baseDescription} in ${currentYear}. Expert reviews, feature comparisons, pricing analysis, and recommendations for every need.`,
      `Complete ${currentYear} guide to ${baseDescription} Top tools reviewed, compared, and ranked by experts. Find your perfect match.`,
      `Discover the best ${baseDescription} for ${currentYear}. Honest reviews, detailed comparisons, and expert recommendations to save you time.`
    ]
  }

  const descriptionPatterns = patterns[type]
  let selectedDescription = descriptionPatterns[0]

  // Incorporate target keyword if provided
  if (targetKeyword) {
    const keywordPattern = descriptionPatterns.find(pattern => 
      pattern.toLowerCase().includes(targetKeyword.toLowerCase())
    )
    if (keywordPattern) {
      selectedDescription = keywordPattern
    }
  }

  return selectedDescription
}

// Generate keyword tags
export function generateKeywords(
  content: string,
  type: 'tool' | 'blog' | 'category',
  primaryKeyword?: string
): string {
  const allKeywords = [
    ...HIGH_VALUE_KEYWORDS.primary,
    ...HIGH_VALUE_KEYWORDS.secondary,
    ...HIGH_VALUE_KEYWORDS.longTail,
    ...HIGH_VALUE_KEYWORDS.commercial
  ]

  // Extract keywords from content
  const contentWords = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3)

  // Find matching keywords
  const matchedKeywords = allKeywords.filter(keyword => {
    const keywordWords = keyword.toLowerCase().split(' ')
    return keywordWords.some(word => contentWords.includes(word))
  })

  // Add primary keyword if provided
  if (primaryKeyword && !matchedKeywords.includes(primaryKeyword)) {
    matchedKeywords.unshift(primaryKeyword)
  }

  // Add type-specific keywords
  const typeKeywords = {
    tool: ['review', 'pricing', 'features', 'alternatives', 'comparison', 'pros and cons'],
    blog: ['guide', 'tutorial', 'tips', 'how to', 'best practices', 'examples'],
    category: ['tools', 'software', 'apps', 'platforms', 'solutions', 'services']
  }

  matchedKeywords.push(...typeKeywords[type])

  // Remove duplicates and limit to 15 keywords
  return [...new Set(matchedKeywords)]
    .slice(0, 15)
    .join(', ')
}

// Analyze content for SEO optimization
export function analyzeSEOContent(
  content: string,
  targetKeyword?: string
): {
  wordCount: number
  readabilityScore: number
  keywordDensity: number
  seoScore: number
  recommendations: string[]
} {
  const wordCount = content.split(/\s+/).length
  
  // Calculate readability (simplified Flesch-Kincaid)
  const sentences = content.split(/[.!?]+/).length
  const words = content.split(/\s+/).length
  const avgWordsPerSentence = words / sentences
  const readabilityScore = Math.max(0, Math.min(100, 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * (content.length / words))))
  
  // Calculate keyword density
  let keywordDensity = 0
  if (targetKeyword) {
    const keywordOccurrences = (content.toLowerCase().match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length
    keywordDensity = (keywordOccurrences / wordCount) * 100
  }
  
  // Calculate overall SEO score
  let seoScore = 0
  
  // Word count scoring
  if (wordCount >= 1000) seoScore += 25
  else if (wordCount >= 500) seoScore += 15
  else if (wordCount >= 300) seoScore += 10
  
  // Readability scoring
  if (readabilityScore >= 60) seoScore += 25
  else if (readabilityScore >= 40) seoScore += 15
  else if (readabilityScore >= 20) seoScore += 10
  
  // Keyword density scoring
  if (keywordDensity >= 1 && keywordDensity <= 3) seoScore += 25
  else if (keywordDensity >= 0.5 && keywordDensity <= 4) seoScore += 15
  else if (keywordDensity >= 0.3 && keywordDensity <= 5) seoScore += 10
  
  // Content structure scoring
  const hasHeadings = content.includes('##') || content.includes('###')
  const hasLists = content.includes('-') || content.includes('*') || content.includes('\d+.')
  const hasBold = content.includes('**')
  
  if (hasHeadings) seoScore += 10
  if (hasLists) seoScore += 8
  if (hasBold) seoScore += 7
  
  // Generate recommendations
  const recommendations: string[] = []
  
  if (wordCount < 300) {
    recommendations.push('Increase content length to at least 300 words for better SEO')
  } else if (wordCount < 1000) {
    recommendations.push('Consider expanding content to 1000+ words for higher rankings')
  }
  
  if (readabilityScore < 40) {
    recommendations.push('Improve readability with shorter sentences and simpler language')
  }
  
  if (keywordDensity < 0.5) {
    recommendations.push('Increase keyword density to 1-3% for better optimization')
  } else if (keywordDensity > 3) {
    recommendations.push('Reduce keyword density to avoid keyword stuffing')
  }
  
  if (!hasHeadings) {
    recommendations.push('Add headings (H2, H3) to improve content structure')
  }
  
  if (!hasLists) {
    recommendations.push('Use bullet points or numbered lists for better readability')
  }
  
  if (!hasBold) {
    recommendations.push('Use bold text to highlight important keywords')
  }
  
  return {
    wordCount,
    readabilityScore,
    keywordDensity,
    seoScore,
    recommendations
  }
}

// Generate internal linking suggestions
export function generateInternalLinks(
  currentType: 'tool' | 'blog' | 'category',
  currentSlug: string,
  availableContent: Array<{ type: string; slug: string; title: string; tags?: string[] }>
): Array<{ url: string; anchorText: string; relevance: number }> {
  const suggestions: Array<{ url: string; anchorText: string; relevance: number }> = []
  
  availableContent.forEach(item => {
    if (item.slug === currentSlug) return
    
    let relevance = 0
    
    // Same type gets higher relevance
    if (item.type === currentType) {
      relevance += 30
    }
    
    // Check for common keywords in titles
    const currentTitle = availableContent.find(c => c.slug === currentSlug)?.title || ''
    const titleWords = currentTitle.toLowerCase().split(' ')
    const itemTitleWords = item.title.toLowerCase().split(' ')
    
    const commonWords = titleWords.filter(word => itemTitleWords.includes(word))
    relevance += commonWords.length * 10
    
    // Check for tag matches
    if (item.tags) {
      const currentTags = availableContent.find(c => c.slug === currentSlug)?.tags || []
      const commonTags = currentTags.filter(tag => item.tags?.includes(tag))
      relevance += commonTags.length * 15
    }
    
    if (relevance > 20) {
      suggestions.push({
        url: `/${item.type}/${item.slug}`,
        anchorText: item.title,
        relevance
      })
    }
  })
  
  return suggestions
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5)
}

// Generate structured data for Google rich snippets
export function generateGoogleRichSnippets(
  type: 'tool' | 'blog' | 'category',
  data: Tool | BlogPost | Category
): object {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type === 'tool' ? 'SoftwareApplication' : 
            type === 'blog' ? 'Article' : 'CollectionPage',
    name: 'title' in data ? data.title : 'name' in data ? data.name : '',
    description: 'description' in data ? data.description : '',
    url: `${SITE_URL}/${type}/${'slug' in data ? data.slug : ''}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${type}/${'slug' in data ? data.slug : ''}`
    }
  }
  
  // Add type-specific properties
  if (type === 'tool' && 'rating' in data) {
    return {
      ...baseSchema,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: 'startingPrice' in data ? data.startingPrice : '0',
        priceCurrency: 'USD'
      },
      aggregateRating: data.rating ? {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
        reviewCount: 'reviewCount' in data ? data.reviewCount : 1,
        bestRating: '5',
        worstRating: '1'
      } : undefined
    }
  }
  
  if (type === 'blog' && 'publishedAt' in data) {
    return {
      ...baseSchema,
      datePublished: data.publishedAt?.toISOString(),
      dateModified: 'updatedAt' in data ? data.updatedAt.toISOString() : new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'AI Fuel Hub'
      },
      publisher: {
        '@type': 'Organization',
        name: 'AI Fuel Hub',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.svg`
        }
      }
    }
  }
  
  return baseSchema
}

// Generate FAQ schema for Google FAQ rich snippets
export function generateGoogleFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
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

// Generate HowTo schema for Google How-to rich snippets
export function generateGoogleHowToSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image })
    }))
  }
}

// Export keyword databases for external use
export { HIGH_VALUE_KEYWORDS, SEARCH_INTENTS }
