import React from 'react'
import { cn } from '@/lib/utils'

interface QuickAnswerProps {
    question: string
    answer: string
    className?: string
}

/**
 * QuickAnswer Component for Featured Snippet Optimization
 * 
 * Displays a prominent, structured answer designed to be crawled
 * by Google for featured snippets (Position 0).
 * 
 * Best Practices:
 * - Keep answer between 40-60 words
 * - Use clear, concise language
 * - Answer the question directly in first sentence
 * - Place at top of blog post content
 */
export function QuickAnswer({ question, answer, className }: QuickAnswerProps) {
    return (
        <div
            className={cn(
                "quick-answer bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
                "p-6 rounded-lg border-l-4 border-blue-500 shadow-sm",
                "mb-8",
                className
            )}
            itemScope
            itemType="https://schema.org/Question"
        >
            <h2
                className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100"
                itemProp="name"
            >
                {question}
            </h2>
            <div
                className="text-base leading-relaxed text-slate-700 dark:text-slate-300"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
            >
                <div itemProp="text">
                    {answer}
                </div>
            </div>
        </div>
    )
}

/**
 * KeyTakeaways Component for AEO/GEO Optimization
 * 
 * Displays key points at the start of content for AI engines
 * to extract and summarize.
 */
interface KeyTakeawaysProps {
    points: string[]
    className?: string
}

export function KeyTakeaways({ points, className }: KeyTakeawaysProps) {
    return (
        <div
            className={cn(
                "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
                "p-6 rounded-lg border-l-4 border-amber-500 shadow-sm",
                "mb-8",
                className
            )}
        >
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>🔑</span>
                <span>Key Takeaways</span>
            </h3>
            <ul className="space-y-2">
                {points.map((point, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                    >
                        <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">✓</span>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

/**
 * DefinitionTerm Component for Semantic SEO
 * 
 * Structured definition list for key terms
 */
interface DefinitionTermProps {
    term: string
    definition: string
    className?: string
}

export function DefinitionTerm({ term, definition, className }: DefinitionTermProps) {
    return (
        <dl
            className={cn("mb-6", className)}
            itemScope
            itemType="https://schema.org/DefinedTerm"
        >
            <dt
                className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2"
                itemProp="name"
            >
                {term}
            </dt>
            <dd
                className="text-slate-700 dark:text-slate-300 pl-4 border-l-2 border-slate-300 dark:border-slate-600"
                itemProp="description"
            >
                {definition}
            </dd>
        </dl>
    )
}
