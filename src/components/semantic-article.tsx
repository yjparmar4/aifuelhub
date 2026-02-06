/**
 * Semantic Article Markup Component for AEO (Answer Engine Optimization)
 * Provides structured, machine-readable content for AI search engines
 */

import React from 'react'
import { cn } from '@/lib/utils'

interface SemanticArticleProps {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
  id?: string
}

/**
 * Main semantic article wrapper with proper HTML5 semantics
 * Uses Article schema and speakable specifications
 */
export function SemanticArticle({
  children,
  title,
  description,
  className,
  id,
}: SemanticArticleProps) {
  return (
    <article
      id={id}
      itemScope
      itemType="https://schema.org/Article"
      className={cn('semantic-article', className)}
    >
      <meta itemProp="headline" content={title} />
      {description && <meta itemProp="description" content={description} />}
      {children}
    </article>
  )
}

interface QuickAnswerProps {
  children: React.ReactNode
  className?: string
}

/**
 * QuickAnswer component - Direct answer to the main query
 * Critical for featured snippets and AI search engines
 */
export function QuickAnswer({ children, className }: QuickAnswerProps) {
  return (
    <div
      className={cn(
        'quick-answer speakable-summary p-6 bg-muted/50 rounded-lg border-l-4 border-primary mb-8',
        className
      )}
      itemProp="abstract"
    >
      <h2 className="text-lg font-semibold mb-2 sr-only">Quick Answer</h2>
      <div className="prose prose-sm max-w-none text-base leading-relaxed">
        {children}
      </div>
    </div>
  )
}

interface KeyTakeawaysProps {
  items: string[]
  className?: string
}

/**
 * KeyTakeaways component - Scannable bullet points
 * Improves AEO by providing structured summary points
 */
export function KeyTakeaways({ items, className }: KeyTakeawaysProps) {
  if (!items || items.length === 0) return null

  return (
    <div className={cn('key-takeaways bg-card p-6 rounded-lg border mb-8', className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Key Takeaways
      </h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
            itemProp="hasPart"
            itemScope
            itemType="https://schema.org/WebPageElement"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span className="text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface DataPointProps {
  value: string
  unit?: string
  context?: string
  className?: string
}

/**
 * DataPoint component - Highlighted statistics with schema markup
 * Critical for data-driven content and AI search
 */
export function DataPoint({ value, unit, context, className }: DataPointProps) {
  return (
    <span
      className={cn('inline-flex items-baseline gap-1 font-medium', className)}
      itemProp="hasPart"
      itemScope
      itemType="https://schema.org/QuantitativeValue"
    >
      <span itemProp="value">{value}</span>
      {unit && <span itemProp="unitText">{unit}</span>}
      {context && (
        <meta itemProp="description" content={context} />
      )}
    </span>
  )
}

interface ComparisonTableProps {
  title: string
  headers: string[]
  rows: (string | React.ReactNode)[][]
  className?: string
}

/**
 * ComparisonTable component - Structured comparison data
 * Optimized for "vs" queries and comparison searches
 */
export function ComparisonTable({ title, headers, rows, className }: ComparisonTableProps) {
  return (
    <div className={cn('comparison-table overflow-x-auto mb-8', className)}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <table
        className="w-full border-collapse"
        itemProp="hasPart"
        itemScope
        itemType="https://schema.org/Table"
      >
        <meta itemProp="about" content={title} />
        <thead>
          <tr className="bg-muted">
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-left p-3 font-semibold border border-border first:rounded-tl-lg last:rounded-tr-lg"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border last:border-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="p-3 border border-border first:font-medium"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface FAQSectionProps {
  faqs: Array<{
    question: string
    answer: string
  }>
  className?: string
}

/**
 * FAQSection component - Schema.org FAQ markup
 * Critical for "People Also Ask" and voice search
 */
export function FAQSection({ faqs, className }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null

  return (
    <div
      className={cn('faq-section my-8', className)}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item border rounded-lg p-4"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <h3 itemProp="name" className="font-semibold mb-2">
              {faq.question}
            </h3>
            <div
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
              className="text-muted-foreground"
            >
              <div itemProp="text">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ProsConsProps {
  pros: string[]
  cons: string[]
  className?: string
}

/**
 * ProsCons component - Balanced review structure
 * Standard format for product reviews and comparisons
 */
export function ProsCons({ pros, cons, className }: ProsConsProps) {
  return (
    <div className={cn('grid md:grid-cols-2 gap-6 my-6', className)}>
      <div className="pros-section">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-green-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Pros
        </h3>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm">{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="cons-section">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cons
        </h3>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-red-500 mt-1">×</span>
              <span className="text-sm">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

interface HowToSectionProps {
  title: string
  steps: Array<{
    name: string
    text: string
    image?: string
  }>
  totalTime?: string
  className?: string
}

/**
 * HowToSection component - Step-by-step instructions
 * Optimized for "how to" queries and featured snippets
 */
export function HowToSection({ title, steps, totalTime, className }: HowToSectionProps) {
  return (
    <div
      className={cn('how-to-section my-8', className)}
      itemScope
      itemType="https://schema.org/HowTo"
    >
      <meta itemProp="name" content={title} />
      {totalTime && <meta itemProp="totalTime" content={totalTime} />}
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="how-to-step flex gap-4"
            itemProp="step"
            itemScope
            itemType="https://schema.org/HowToStep"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 itemProp="name" className="font-semibold mb-1">
                {step.name}
              </h3>
              <div itemProp="text" className="text-muted-foreground text-sm leading-relaxed">
                {step.text}
              </div>
              {step.image && (
                <meta itemProp="image" content={step.image} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface VerdictBoxProps {
  title: string
  verdict: string
  rating?: number
  recommendation: string
  className?: string
}

/**
 * VerdictBox component - Final recommendation with rating
 * Critical for review articles and product comparisons
 */
export function VerdictBox({ title, verdict, rating, recommendation, className }: VerdictBoxProps) {
  return (
    <div
      className={cn(
        'verdict-box bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 my-8',
        className
      )}
      itemProp="review"
      itemScope
      itemType="https://schema.org/Review"
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <div className="flex items-center gap-3 mb-4">
        {rating && (
          <div
            className="flex items-center gap-1 text-yellow-500"
            itemProp="reviewRating"
            itemScope
            itemType="https://schema.org/Rating"
          >
            <meta itemProp="ratingValue" content={String(rating)} />
            <meta itemProp="bestRating" content="5" />
            <span className="text-2xl font-bold">{rating}</span>
            <span className="text-muted-foreground">/5</span>
          </div>
        )}
        <span itemProp="reviewAspect" className="font-semibold text-primary">
          {verdict}
        </span>
      </div>
      <p itemProp="reviewBody" className="text-muted-foreground">
        {recommendation}
      </p>
    </div>
  )
}

interface RelatedContentProps {
  items: Array<{
    title: string
    url: string
    type: 'tool' | 'blog' | 'category'
  }>
  className?: string
}

/**
 * RelatedContent component - Internal linking structure
 * Improves crawlability and topical authority
 */
export function RelatedContent({ items, className }: RelatedContentProps) {
  if (!items || items.length === 0) return null

  const getIcon = (type: string) => {
    switch (type) {
      case 'tool':
        return '🛠️'
      case 'blog':
        return '📝'
      case 'category':
        return '📁'
      default:
        return '🔗'
    }
  }

  return (
    <nav className={cn('related-content my-8', className)}>
      <h3 className="text-lg font-semibold mb-4">Related Content</h3>
      <ul className="grid sm:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.url}
              className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
              itemProp="relatedLink"
            >
              <span>{getIcon(item.type)}</span>
              <span className="text-sm font-medium">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
