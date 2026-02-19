/**
 * Voice Search Optimization Module
 * Optimizes content for voice search queries and smart assistants
 * Targets: Google Assistant, Siri, Alexa, Cortana, and other voice platforms
 */

import { SITE_URL } from '@/lib/seo'

export interface VoiceSearchConfig {
  platform: string
  preferredContentLength: { min: number; max: number }
  questionPatterns: string[]
  answerFormat: string
}

// Voice search platform configurations
export const VOICE_SEARCH_PLATFORMS: Record<string, VoiceSearchConfig> = {
  google_assistant: {
    platform: 'Google Assistant',
    preferredContentLength: { min: 30, max: 60 },
    questionPatterns: [
      'what is', 'how do i', 'what is the best', 'which is better',
      'tell me about', 'what does', 'how much', 'where can i find'
    ],
    answerFormat: 'conversational'
  },
  siri: {
    platform: 'Siri',
    preferredContentLength: { min: 20, max: 50 },
    questionPatterns: [
      'what is', 'find', 'show me', 'get', 'make sure', 'remind me'
    ],
    answerFormat: 'concise'
  },
  alexa: {
    platform: 'Alexa',
    preferredContentLength: { min: 25, max: 55 },
    questionPatterns: [
      'what is', 'how do i', 'what is the best', 'tell me about', 'play'
    ],
    answerFormat: 'engaging'
  },
  cortana: {
    platform: 'Cortana',
    preferredContentLength: { min: 30, max: 60 },
    questionPatterns: [
      'what is', 'find', 'remind me', 'schedule', 'send'
    ],
    answerFormat: 'actionable'
  }
}

// Generate voice search optimized FAQ schema
export function generateVoiceSearchFAQ(
  faqs: Array<{ question: string; answer: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        // Voice search optimization: ensure answer is conversational
        speech: {
          '@type': 'SpeechMarkup',
          markups: [
            { '@type': 'Prosody', rate: '1.0', pitch: '0' }
          ]
        }
      },
      // Suggested voice commands
      suggestedAnswer: [
        {
          '@type': 'Answer',
          text: faq.answer,
          about: {
            '@type': 'Thing',
            name: faq.question
          }
        }
      ]
    }))
  }
}

// Generate HowTo schema optimized for voice search
export function generateVoiceSearchHowTo(
  title: string,
  steps: Array<{ step: string; instruction: string; duration?: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: `Step-by-step guide to ${title}`,
    totalTime: steps.reduce((acc, step) => {
      if (step.duration) {
        const minutes = parseInt(step.duration.replace(/\D/g, '')) || 0
        return acc + minutes
      }
      return acc
    }, 0) + 'PT' + steps.reduce((acc, step) => {
      if (step.duration) {
        const minutes = parseInt(step.duration.replace(/\D/g, '')) || 0
        return acc + minutes
      }
      return acc
    }, 0) + 'M',
    step: steps.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}: ${s.step}`,
      text: s.instruction,
      url: `${SITE_URL}/how-to/${title.toLowerCase().replace(/\s+/g, '-')}#step-${index + 1}`,
      ...(s.duration && {
        totalTime: `PT${parseInt(s.duration.replace(/\D/g, '')) || 1}M`
      })
    })),
    // Voice search optimization
    speech: {
      '@type': 'SpeechMarkup',
      markups: [
        { '@type': 'Emphasis', level: 'moderate', words: title }
      ]
    }
  }
}

// Extract voice search optimized answer from content
export function extractVoiceSearchAnswer(content: string, question: string): string {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10)
  
  // Find sentences that directly answer the question
  const keywords = question.toLowerCase()
    .replace(/(what is|how do i|what is the best|which is better|tell me about)/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3)

  const relevantSentences = sentences.filter(sentence => {
    const lower = sentence.toLowerCase()
    return keywords.some(keyword => lower.includes(keyword))
  })

  if (relevantSentences.length > 0) {
    // Return the most relevant sentence, truncated for voice
    const answer = relevantSentences[0].trim()
    return answer.length > 150 ? answer.substring(0, 147) + '...' : answer
  }

  // Fallback to first relevant sentence
  return sentences[0]?.trim().substring(0, 150) || content.substring(0, 150)
}

// Generate Q&A pairs for voice search
export function generateVoiceSearchQA(
  title: string,
  description: string,
  content?: string
): Array<{ question: string; answer: string }> {
  const qaPairs = [
    {
      question: `What is ${title}?`,
      answer: extractVoiceSearchAnswer(description, 'what is')
    },
    {
      question: `Tell me about ${title}`,
      answer: extractVoiceSearchAnswer(description, 'tell me about')
    },
    {
      question: `What are the best ${title} tools?`,
      answer: extractVoiceSearchAnswer(description, 'best tools')
    },
    {
      question: `How do I use ${title}?`,
      answer: extractVoiceSearchAnswer(content || description, 'how do i use')
    },
    {
      question: `Is ${title} worth it?`,
      answer: extractVoiceSearchAnswer(description, 'is it worth')
    }
  ]

  return qaPairs
}

// Generate Speakable schema for voice search
export function generateSpeakableSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector: [
      '.voice-search-content',
      '.featured-snippet',
      '.faq-answer',
      '.how-to-step',
      'article h1',
      'article h2',
      '.meta-description'
    ],
    xpath: [
      '//article/p[1]',
      '//div[@class="summary"]',
      '//section[@class="overview"]'
    ]
  }
}

// Generate voice search optimized meta tags
export function generateVoiceSearchMeta(
  title: string,
  description: string
): Record<string, string> {
  return {
    'google-assistant': 'AUDIO',
    'google-assistant-display': 'false',
    'google-assistant-mode': 'voice',
    'google-assistant-type': 'action',
    'voice-search-enabled': 'true',
    'speech-enabled': 'true',
    'answer-type': 'conversational',
    'voice-optimized-title': title,
    'voice-optimized-description': description.substring(0, 200)
  }
}

// Generate structured data for voice search compatibility
export function generateVoiceSearchStructuredData(options: {
  type: 'article' | 'product' | 'faq' | 'howto'
  data: {
    title: string
    description: string
    content?: string
    steps?: Array<{ step: string; instruction: string; duration?: string }>
    faqs?: Array<{ question: string; answer: string }>
  }
}): object {
  const { type, data } = options

  const baseSchema = {
    '@context': 'https://schema.org',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.voice-content', '.summary', '.faq-answer']
    }
  }

  switch (type) {
    case 'article':
      return {
        ...baseSchema,
        '@type': 'Article',
        headline: data.title,
        articleSection: 'Technology',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.article-summary', '.lead-paragraph']
        }
      }

    case 'faq':
      return generateVoiceSearchFAQ(data.faqs || [])

    case 'howto':
      return generateVoiceSearchHowTo(data.title, data.steps || [])

    default:
      return baseSchema
  }
}

// Analyze content for voice search optimization
export function analyzeVoiceSearchOptimization(content: string): {
  score: number
  recommendations: string[]
  opportunities: string[]
} {
  const recommendations: string[] = []
  const opportunities: string[] = []
  let score = 0

  // Check content length (voice prefers shorter)
  const wordCount = content.split(/\s+/).length
  if (wordCount >= 300 && wordCount <= 1500) {
    score += 25
    opportunities.push('Content length is optimal for voice search')
  } else if (wordCount > 1500) {
    recommendations.push('Consider creating a shorter, voice-optimized version of this content')
  } else {
    recommendations.push('Expand content to at least 300 words for better voice search visibility')
  }

  // Check for question-based headings
  const questionHeadings = content.match(/<h[2-3][^>]*>.*\?.*<\/h[2-3]>/gi) || []
  if (questionHeadings.length >= 3) {
    score += 25
    opportunities.push('Good use of question-based headings')
  } else {
    recommendations.push('Add more question-based headings (H2/H3) for voice search')
  }

  // Check for FAQ section
  if (content.toLowerCase().includes('faq') || content.toLowerCase().includes('frequently asked')) {
    score += 25
    opportunities.push('FAQ section found - good for voice search')
  } else {
    recommendations.push('Add an FAQ section with common questions and answers')
  }

  // Check for conversational language
  const conversationalPhrases = ['in other words', 'basically', 'simply put', 'in short', 'for example']
  const hasConversational = conversationalPhrases.some(phrase => 
    content.toLowerCase().includes(phrase)
  )
  if (hasConversational) {
    score += 15
    opportunities.push('Uses conversational language')
  } else {
    recommendations.push('Add conversational phrases to make content more voice-search friendly')
  }

  // Check for structured data
  if (content.includes('schema.org') || content.includes('JSON-LD')) {
    score += 10
  } else {
    recommendations.push('Add structured data (Schema.org) for better voice search visibility')
  }

  return {
    score: Math.min(100, score),
    recommendations,
    opportunities
  }
}
