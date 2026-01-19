'use client'

import { ReactNode } from 'react'
import { CheckCircle2, Lightbulb, TrendingUp, Quote, AlertCircle } from 'lucide-react'

/**
 * QuickAnswer Component
 * Optimized for AI search engines - provides direct, cite-able answers
 * Place at the top of blog posts before main content
 */
interface QuickAnswerProps {
    children: ReactNode
    className?: string
}

export function QuickAnswer({ children, className = '' }: QuickAnswerProps) {
    return (
        <div
            className={`mb-8 p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 shadow-lg relative overflow-hidden ${className}`}
            itemProp="abstract"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-bold text-sm uppercase tracking-wider text-emerald-900 dark:text-emerald-100">
                        Quick Answer
                    </h3>
                </div>
                <div className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 font-medium speakable-summary">
                    {children}
                </div>
            </div>
        </div>
    )
}

/**
 * KeyTakeaways Component
 * Bulleted summary optimized for AI citations
 * Highly scannable and cite-able format
 */
interface KeyTakeawaysProps {
    items: string[]
    title?: string
    className?: string
}

export function KeyTakeaways({ items, title = 'Key Takeaways', className = '' }: KeyTakeawaysProps) {
    return (
        <div
            className={`mb-8 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-lg ${className}`}
            itemProp="summary"
        >
            <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-blue-900 dark:text-blue-100">
                    {title}
                </h3>
            </div>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-base leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

/**
 * DataPoint Component
 * Marks statistics and numerical data with semantic HTML
 * Enables AI engines to extract and cite specific data points
 */
interface DataPointProps {
    value: string | number
    unit?: string
    label?: string
    source?: string
    children?: ReactNode
    className?: string
}

export function DataPoint({ value, unit, label, source, children, className = '' }: DataPointProps) {
    return (
        <span className={`inline-flex items-baseline gap-1 ${className}`}>
            <data
                value={value}
                className="font-bold text-primary"
                itemProp="value"
            >
                {children || value}
                {unit && <span className="text-sm font-normal ml-0.5">{unit}</span>}
            </data>
            {label && <span className="text-sm text-muted-foreground ml-1">({label})</span>}
            {source && (
                <cite className="text-xs text-muted-foreground not-italic ml-1">
                    — {source}
                </cite>
            )}
        </span>
    )
}

/**
 * ExpertQuote Component
 * Quotable expert insights optimized for citations
 */
interface ExpertQuoteProps {
    quote: string
    author: string
    role?: string
    className?: string
}

export function ExpertQuote({ quote, author, role, className = '' }: ExpertQuoteProps) {
    return (
        <blockquote
            className={`my-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-l-4 border-purple-500 rounded-r-xl ${className}`}
            itemProp="citation"
        >
            <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
                <div>
                    <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 italic mb-3">
                        "{quote}"
                    </p>
                    <footer className="text-sm">
                        <cite className="not-italic font-semibold text-purple-700 dark:text-purple-300">
                            {author}
                        </cite>
                        {role && (
                            <span className="text-muted-foreground ml-2">— {role}</span>
                        )}
                    </footer>
                </div>
            </div>
        </blockquote>
    )
}

/**
 * FactCheck Component
 * Marks verified facts for ClaimReview schema
 */
interface FactCheckProps {
    claim: string
    verdict: 'True' | 'False' | 'Misleading' | 'Verified'
    explanation?: string
    source?: string
    className?: string
}

export function FactCheck({ claim, verdict, explanation, source, className = '' }: FactCheckProps) {
    const verdictColors = {
        True: 'bg-green-50 dark:bg-green-950/30 border-green-500 text-green-700 dark:text-green-300',
        Verified: 'bg-green-50 dark:bg-green-950/30 border-green-500 text-green-700 dark:text-green-300',
        False: 'bg-red-50 dark:bg-red-950/30 border-red-500 text-red-700 dark:text-red-300',
        Misleading: 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 text-amber-700 dark:text-amber-300',
    }

    const verdictIcons = {
        True: <CheckCircle2 className="w-5 h-5" />,
        Verified: <CheckCircle2 className="w-5 h-5" />,
        False: <AlertCircle className="w-5 h-5" />,
        Misleading: <AlertCircle className="w-5 h-5" />,
    }

    return (
        <div
            className={`my-6 p-5 border-l-4 rounded-r-xl ${verdictColors[verdict]} ${className}`}
            itemScope
            itemType="https://schema.org/ClaimReview"
        >
            <div className="flex items-start gap-3">
                {verdictIcons[verdict]}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-xs uppercase tracking-wider">
                            {verdict}
                        </span>
                    </div>
                    <p className="font-medium mb-2" itemProp="claimReviewed">
                        {claim}
                    </p>
                    {explanation && (
                        <p className="text-sm opacity-90" itemProp="reviewBody">
                            {explanation}
                        </p>
                    )}
                    {source && (
                        <cite className="block text-xs mt-2 not-italic opacity-75" itemProp="url">
                            Source: {source}
                        </cite>
                    )}
                </div>
            </div>
        </div>
    )
}

/**
 * ComparisonTable Component
 * Structured tool comparison optimized for schema markup
 */
interface ComparisonItem {
    name: string
    features: { [key: string]: string | number }
    link?: string
}

interface ComparisonTableProps {
    title: string
    items: ComparisonItem[]
    featureLabels: string[]
    className?: string
}

export function ComparisonTable({ title, items, featureLabels, className = '' }: ComparisonTableProps) {
    return (
        <div className={`my-10 ${className}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {title}
            </h3>
            <div className="overflow-x-auto rounded-2xl border-2 border-purple-200 dark:border-purple-800 shadow-lg">
                <table className="w-full text-sm" itemScope itemType="https://schema.org/Table">
                    <thead>
                        <tr>
                            <th className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-5 py-4 text-left font-bold uppercase text-xs tracking-wider">
                                Tool
                            </th>
                            {featureLabels.map((label) => (
                                <th
                                    key={label}
                                    className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-5 py-4 text-left font-bold uppercase text-xs tracking-wider"
                                >
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} itemScope itemType="https://schema.org/Product">
                                <td className="px-5 py-4 border-b border-purple-100 dark:border-purple-900 font-semibold">
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            className="text-primary hover:underline"
                                            itemProp="name"
                                        >
                                            {item.name}
                                        </a>
                                    ) : (
                                        <span itemProp="name">{item.name}</span>
                                    )}
                                </td>
                                {featureLabels.map((label) => (
                                    <td
                                        key={label}
                                        className="px-5 py-4 border-b border-purple-100 dark:border-purple-900 text-gray-700 dark:text-gray-300"
                                    >
                                        {item.features[label] || '—'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
