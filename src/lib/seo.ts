import { Metadata } from 'next'

interface SEOMetaProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'review'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  keywords?: string
  noIndex?: boolean
  canonical?: string
}

export function generateMetadata({
  title,
  description,
  image = '/og-image.png',
  url = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  noIndex = false,
  canonical,
}: SEOMetaProps): Metadata {
  const defaultTitle = 'AI Fuel Hub - Discover the Best AI Tools'
  const defaultDescription =
    'Find and compare the best AI tools for every task. Expert reviews, detailed comparisons, and comprehensive guides for AI-powered software.'

  const openGraphType: 'website' | 'article' = type === 'article' ? 'article' : 'website'

  const metadataAuthors = authors?.map((name) => ({ name }))

  return {
    title: title || defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || 'AI tools, artificial intelligence, software reviews, AI directory, best AI apps',
    authors: metadataAuthors,
    openGraph: {
      type: openGraphType,
      title: title || defaultTitle,
      description: description || defaultDescription,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || defaultTitle,
        },
      ],
      publishedTime,
      modifiedTime,
      ...(url && { url }),
      siteName: 'AI Fuel Hub',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || defaultTitle,
      description: description || defaultDescription,
      images: [image],
    },
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export const DEFAULT_SITE_NAME = 'AI Fuel Hub'
export const DEFAULT_DESCRIPTION =
  'Discover, compare, and review the best AI tools. Expert insights, detailed comparisons, and comprehensive guides for AI-powered software.'
export const SITE_URL = 'https://www.aifuelhub.com'
