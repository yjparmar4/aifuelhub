/**
 * Google SEO Optimized Content Component
 * Advanced on-page SEO optimization for higher Google rankings
 */

import React from 'react'
import { JsonLd } from './json-ld'
import {
  generateGoogleRichSnippets,
  generateGoogleFAQSchema,
  generateGoogleHowToSchema,
  generateSEOTitle,
  generateSEODescription,
  generateKeywords,
  analyzeSEOContent,
  generateInternalLinks
} from '@/lib/google-seo-optimization'
import { Tool, BlogPost, Category } from '@/types'

interface GoogleSEOOptimizedContentProps {
  type: 'tool' | 'blog' | 'category'
  data: Tool | BlogPost | Category
  children: React.ReactNode
  availableContent?: Array<{ type: string; slug: string; title: string; tags?: string[] }>
  className?: string
}

export function GoogleSEOOptimizedContent({
  type,
  data,
  children,
  availableContent = [],
  className = ''
}: GoogleSEOOptimizedContentProps) {
  // Generate SEO-optimized metadata
  const title = generateSEOTitle(
    'title' in data ? data.title : 'name' in data ? data.name : '',
    type
  )

  const description = generateSEODescription(
    'description' in data ? data.description : 'content' in data ? data.content : '',
    type
  )

  const keywords = generateKeywords(
    'description' in data ? data.description : 'content' in data ? data.content : '',
    type,
    'title' in data ? data.title : 'name' in data ? data.name : ''
  )

  // Generate rich snippets schema
  const richSnippetsSchema = generateGoogleRichSnippets(type, data)

  // Generate internal linking suggestions
  const internalLinks = generateInternalLinks(
    type,
    'slug' in data ? data.slug : '',
    availableContent
  )

  // Analyze content for SEO
  const content = 'content' in data ? data.content : 'description' in data ? data.description : ''
  const seoAnalysis = analyzeSEOContent(content)

  return (
    <>
      {/* Google Rich Snippets Schema */}
      <JsonLd data={richSnippetsSchema} />

      {/* SEO Meta Tags (if not already in layout) */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="AI Fuel Hub" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Open Graph for Google */}
      <meta property="og:type" content={type === 'blog' ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="AI Fuel Hub" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@aifuelhub" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#4F46E5" />
      <meta name="msapplication-TileColor" content="#4F46E5" />
      <meta name="application-name" content="AI Fuel Hub" />

      {/* Canonical URL */}
      <link
        rel="canonical"
        href={`https://www.aifuelhub.com/${type}/${'slug' in data ? data.slug : ''}`}
      />

      {/* SEO Optimized Content Wrapper */}
      <div className={`google-seo-optimized ${className}`}>
        {/* Hidden SEO Content */}
        <div className="sr-only" aria-hidden="true">
          <div data-seo-analysis>
            <h2>SEO Analysis</h2>
            <p>Word Count: {seoAnalysis.wordCount}</p>
            <p>Readability Score: {seoAnalysis.readabilityScore.toFixed(1)}</p>
            <p>SEO Score: {seoAnalysis.seoScore.toFixed(1)}</p>
            <p>Keyword Density: {seoAnalysis.keywordDensity.toFixed(2)}%</p>
          </div>

          {/* Structured data for Google */}
          <div data-google-structured-data>
            <h2>Google Structured Data</h2>
            <p>Type: {type}</p>
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <p>Keywords: {keywords}</p>
          </div>
        </div>

        {/* Main content */}
        {children}

        {/* SEO Recommendations removed per user request */}

        {/* Internal Linking Suggestions */}
        {internalLinks.length > 0 && (
          <section className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Related Content
            </h3>
            <div className="space-y-2">
              {internalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {link.anchorText}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

// SEO Score Component
export function SEOScoreDisplay({ score }: { score: number }) {
  const getColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    if (score >= 40) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  const getLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Needs Improvement'
    return 'Poor'
  }

  const colorClass = getColor(score)
  const label = getLabel(score)

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
      <span className="mr-2">SEO Score:</span>
      <span className="font-bold">{score.toFixed(0)}</span>
      <span className="ml-2">({label})</span>
    </div>
  )
}

// FAQ Component for Google FAQ Rich Snippets
export function GoogleFAQSection({
  faqs,
  title = "Frequently Asked Questions"
}: {
  faqs: Array<{ question: string; answer: string }>
  title?: string
}) {
  const faqSchema = generateGoogleFAQSchema(faqs)

  return (
    <>
      <JsonLd data={faqSchema} />
      <section className="mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-3xl font-bold mb-8 text-center">
          {title}
        </h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                {faq.question}
              </h3>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

// HowTo Component for Google How-to Rich Snippets
export function GoogleHowToSection({
  title,
  description,
  steps
}: {
  title: string
  description: string
  steps: Array<{ name: string; text: string; image?: string }>
}) {
  const howToSchema = generateGoogleHowToSchema(title, description, steps)

  return (
    <>
      <JsonLd data={howToSchema} />
      <section className="mt-12" aria-labelledby="howto-heading">
        <h2 id="howto-heading" className="text-3xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {description}
        </p>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{step.name}</h3>
                <p className="text-gray-700 dark:text-gray-300">{step.text}</p>
                {step.image && (
                  <img
                    src={step.image}
                    alt={step.name}
                    className="mt-4 rounded-lg shadow-sm"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// Breadcrumb Component for Google Breadcrumb Rich Snippets
export function GoogleBreadcrumbs({
  items
}: {
  items: Array<{ name: string; url: string }>
}) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index === items.length - 1 ? (
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
