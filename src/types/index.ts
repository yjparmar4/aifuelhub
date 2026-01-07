// Core types for the AI Tools Directory

export interface Tool {
  id: string
  name: string
  slug: string
  tagline?: string | null
  description: string
  longDescription?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  pricingType: 'Free' | 'Freemium' | 'Paid'
  startingPrice?: string | null
  websiteUrl: string
  affiliateLink?: string | null
  affiliateCTA?: string | null
  categoryId: string
  category?: Category
  views: number
  rating?: number | null
  reviewCount: number
  featured: boolean
  trending: boolean
  sponsored: boolean
  sponsoredBy?: string | null
  features: string
  pros?: string | null
  cons?: string | null
  useCases?: string | null
  faqs?: string | null
  targetAudience?: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  tags?: Tag[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon?: string | null
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
  _count?: {
    tools: number
  }
}

export interface Tag {
  id: string
  name: string
  slug: string
  createdAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: string
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  categoryId?: string
  category?: Category
  views: number
  featured: boolean
  sponsored: boolean
  sponsoredBy?: string
  publishedAt?: Date
  published: boolean
  createdAt: Date
  updatedAt: Date
  tags?: Tag[]
}

export interface Comparison {
  id: string
  title: string
  slug: string
  description?: string
  metaTitle?: string
  metaDescription?: string
  verdict?: string
  verdictText?: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  tools?: ComparisonTool[]
}

export interface ComparisonTool {
  id: string
  comparisonId: string
  toolId: string
  tool?: Tool
  featureData: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface ToolFilters {
  category?: string
  pricingType?: string
  search?: string
  tags?: string[]
  featured?: boolean
  trending?: boolean
  page?: number
  limit?: number
}

export interface SearchParams {
  category?: string
  pricing?: string
  search?: string
  tags?: string
  page?: string
}
