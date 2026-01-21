import { SITE_URL } from './seo'

export interface AuthorProfile {
  id: string
  name: string
  title: string
  bio: string
  expertise: string[]
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
    website?: string
  }
  image?: string
  yearsExperience?: number
  certifications?: string[]
}

export interface ExpertiseBadge {
  level: 'expert' | 'senior' | 'verified' | 'trusted'
  label: string
  description: string
  color: string
}

/**
 * E-E-A-T Enhancement System
 * Implements signals for Experience, Expertise, Authoritativeness, and Trustworthiness
 */

// Author profiles with expertise information
export const authors: Record<string, AuthorProfile> = {
  'ai-fuel-hub-team': {
    id: 'ai-fuel-hub-team',
    name: 'AI Fuel Hub Team',
    title: 'AI Research & Review Specialists',
    bio: 'Our team of AI researchers and technology experts thoroughly test and review every AI tool we feature. With combined experience in machine learning, software development, and digital transformation, we provide unbiased, data-driven insights to help you make informed decisions.',
    expertise: [
      'AI & Machine Learning',
      'Software Testing & Review',
      'Technology Research',
      'Digital Transformation',
      'Product Comparison'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/aifuelhub',
      linkedin: 'https://linkedin.com/company/aifuelhub',
      website: SITE_URL
    },
    image: `${SITE_URL}/images/authors/team.jpg`,
    yearsExperience: 15,
    certifications: [
      'Google AI Certified',
      'AWS Machine Learning Specialty',
      'Microsoft Azure AI Engineer'
    ]
  }
}

// Expertise badges for content credibility
export const expertiseBadges: Record<string, ExpertiseBadge> = {
  'expert-tested': {
    level: 'expert',
    label: 'Expert Tested',
    description: 'This tool has been thoroughly tested and reviewed by our AI specialists',
    color: 'bg-purple-600'
  },
  'verified-review': {
    level: 'verified',
    label: 'Verified Review',
    description: 'Review based on hands-on testing and real-world usage',
    color: 'bg-blue-600'
  },
  'trusted-source': {
    level: 'trusted',
    label: 'Trusted Source',
    description: 'Content reviewed and verified by industry experts',
    color: 'bg-green-600'
  },
  'senior-analyst': {
    level: 'senior',
    label: 'Senior Analyst Review',
    description: 'Reviewed by senior technology analysts with 10+ years experience',
    color: 'bg-amber-600'
  }
}

/**
 * Generate Person schema for E-E-A-T
 */
export function generateAuthorEEATSchema(author: AuthorProfile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: `${SITE_URL}/about`,
    ...(author.image && { image: author.image }),
    ...(author.yearsExperience && {
      knowsAbout: author.expertise
    }),
    ...(author.certifications && author.certifications.length > 0 && {
      hasCredential: author.certifications.map(cert => ({
        '@type': 'EducationalOccupationalCredential',
        name: cert,
        credentialCategory: 'Professional Certification'
      }))
    }),
    ...(author.socialLinks && {
      sameAs: Object.values(author.socialLinks).filter(Boolean)
    }),
    worksFor: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL
    }
  }
}

/**
 * Generate Review schema with E-E-A-T signals
 */
export function generateReviewEEATSchema({
  itemReviewed,
  reviewBody,
  author,
  rating,
  datePublished,
  verified = true
}: {
  itemReviewed: {
    name: string
    type: 'SoftwareApplication' | 'Product' | 'Service'
  }
  reviewBody: string
  author: AuthorProfile
  rating: number
  datePublished: string
  verified?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name
    },
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.title
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL
    },
    datePublished,
    ...(verified && {
      reviewAspect: 'verifiedPurchase'
    })
  }
}

/**
 * Generate ClaimReview schema for fact-checking
 */
export function generateClaimReviewEEATSchema({
  claim,
  claimReviewedBy,
  claimAuthor,
  reviewDate,
  verdict,
  url
}: {
  claim: string
  claimReviewedBy: string
  claimAuthor?: string
  reviewDate: string
  verdict: 'True' | 'False' | 'Misleading' | 'Partly True'
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    claimReviewed: claim,
    itemReviewed: {
      '@type': 'Claim',
      appearance: {
        '@type': 'CreativeWork',
        url
      },
      datePublished: reviewDate,
      author: {
        '@type': 'Organization',
        name: claimAuthor || 'AI Fuel Hub'
      }
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: verdict === 'True' ? '5' : verdict === 'False' ? '1' : '3',
      bestRating: '5',
      worstRating: '1',
      ratingExplanation: verdict
    },
    author: {
      '@type': 'Organization',
      name: claimReviewedBy,
      url: SITE_URL
    },
    reviewDate,
    url
  }
}

/**
 * Get last updated date with freshness signals
 */
export function getLastUpdatedDate(
  createdAt: Date,
  updatedAt: Date,
  format: 'short' | 'long' = 'short'
): string {
  const now = new Date()
  const daysSinceUpdate = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24))

  let freshnessText = ''
  if (daysSinceUpdate === 0) freshnessText = 'Updated today'
  else if (daysSinceUpdate === 1) freshnessText = 'Updated yesterday'
  else if (daysSinceUpdate < 7) freshnessText = `Updated ${daysSinceUpdate} days ago`
  else if (daysSinceUpdate < 30) freshnessText = `Updated ${Math.floor(daysSinceUpdate / 7)} weeks ago`
  else if (daysSinceUpdate < 365) freshnessText = `Updated ${Math.floor(daysSinceUpdate / 30)} months ago`
  else freshnessText = `Updated ${Math.floor(daysSinceUpdate / 365)} years ago`

  if (format === 'long') {
    return `${freshnessText} (${updatedAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })})`
  }

  return freshnessText
}

/**
 * Generate content freshness metadata
 */
export function generateContentFreshnessMetadata(
  createdAt: Date,
  updatedAt: Date,
  reviewFrequency: 'daily' | 'weekly' | 'monthly' = 'monthly'
) {
  const now = new Date()
  const daysSinceUpdate = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24))

  return {
    lastUpdated: updatedAt.toISOString(),
    lastReviewed: updatedAt.toISOString(),
    nextReviewDate: new Date(
      updatedAt.getTime() + (reviewFrequency === 'daily' ? 1 : reviewFrequency === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000
    ).toISOString(),
    freshnessScore: Math.max(0, 100 - daysSinceUpdate * 2),
    needsUpdate: daysSinceUpdate > 30,
    reviewFrequency
  }
}

/**
 * Generate trust signals for content
 */
export function generateTrustSignals(content: {
  hasReferences: boolean
  hasExpertReview: boolean
  isFactChecked: boolean
  hasDataSources: boolean
  isUpdated: boolean
  authorVerified: boolean
}) {
  const signals: Array<{
    type: string
    label: string
    description: string
    score: number
  }> = []

  if (content.hasReferences) {
    signals.push({
      type: 'references',
      label: 'Well-Researched',
      description: 'Content includes verified sources and references',
      score: 20
    })
  }

  if (content.hasExpertReview) {
    signals.push({
      type: 'expert-review',
      label: 'Expert Reviewed',
      description: 'Reviewed by subject matter experts',
      score: 25
    })
  }

  if (content.isFactChecked) {
    signals.push({
      type: 'fact-checked',
      label: 'Fact Checked',
      description: 'Claims verified for accuracy',
      score: 20
    })
  }

  if (content.hasDataSources) {
    signals.push({
      type: 'data-sources',
      label: 'Data-Backed',
      description: 'Includes data and statistics from reliable sources',
      score: 15
    })
  }

  if (content.isUpdated) {
    signals.push({
      type: 'updated',
      label: 'Recently Updated',
      description: 'Content is current and relevant',
      score: 10
    })
  }

  if (content.authorVerified) {
    signals.push({
      type: 'verified-author',
      label: 'Verified Author',
      description: 'Written by verified experts',
      score: 10
    })
  }

  return {
    signals,
    totalScore: signals.reduce((acc, signal) => acc + signal.score, 0),
    trustLevel: signals.length >= 4 ? 'high' : signals.length >= 2 ? 'medium' : 'low'
  }
}

/**
 * Generate AboutPage schema with E-E-A-T signals
 */
export function generateAboutPageEEATSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'AI Fuel Hub',
      url: SITE_URL,
      description: 'The ultimate AI tools directory with expert reviews and comparisons',
      foundingDate: '2024',
      founders: [
        {
          '@type': 'Person',
          name: 'AI Fuel Hub Team'
        }
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'hello@aifuelhub.com',
        url: `${SITE_URL}/contact`
      },
      sameAs: [
        'https://twitter.com/aifuelhub',
        'https://linkedin.com/company/aifuelhub'
      ]
    },
    about: [
      {
        '@type': 'Thing',
        name: 'AI Tools Directory',
        description: 'Comprehensive directory of AI-powered tools and software'
      },
      {
        '@type': 'Thing',
        name: 'Software Reviews',
        description: 'Expert reviews and comparisons of AI software'
      }
    ]
  }
}

/**
 * Generate Medical/Financial disclaimer schema (if applicable)
 */
export function generateDisclaimerSchema(disclaimerText: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Disclaimer',
    text: disclaimerText,
    about: {
      '@type': 'Thing',
      name: 'Content Disclaimer'
    }
  }
}

/**
 * Get expertise level based on content characteristics
 */
export function getExpertiseLevel(content: {
  wordCount: number
  hasCodeExamples: boolean
  hasCaseStudies: boolean
  hasTutorials: boolean
  hasReferences: boolean
  authorExpertise: 'beginner' | 'intermediate' | 'expert'
}): 'beginner' | 'intermediate' | 'expert' | 'advanced' {
  let score = 0

  if (content.wordCount > 2000) score += 1
  if (content.hasCodeExamples) score += 1
  if (content.hasCaseStudies) score += 1
  if (content.hasTutorials) score += 1
  if (content.hasReferences) score += 1

  if (content.authorExpertise === 'expert') score += 2
  else if (content.authorExpertise === 'intermediate') score += 1

  if (score >= 5) return 'advanced'
  if (score >= 4) return 'expert'
  if (score >= 2) return 'intermediate'
  return 'beginner'
}

/**
 * Generate FAQ schema with E-E-A-T signals
 */
export function generateFAQEEATSchema(
  faqs: Array<{ question: string; answer: string; author?: string }>,
  reviewedBy?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        author: faq.author || reviewedBy || 'AI Fuel Hub Team',
        datePublished: new Date().toISOString()
      }
    })),
    ...(reviewedBy && {
      reviewedBy: {
        '@type': 'Organization',
        name: reviewedBy
      }
    })
  }
}
