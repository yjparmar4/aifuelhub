'use client'

import { Lightbulb, CheckCircle, Zap } from 'lucide-react'

interface KeyTakeaway {
    text: string
    icon?: React.ReactNode
}

interface KeyTakeawaysProps {
    takeaways: string[] | KeyTakeaway[]
    title?: string
    className?: string
}

/**
 * Key Takeaways Box - Improves content scannability and AEO optimization
 * Displays at the top of articles to give readers instant value
 */
export function KeyTakeaways({
    takeaways,
    title = 'Key Takeaways',
    className = ''
}: KeyTakeawaysProps) {
    if (!takeaways || takeaways.length === 0) {
        return null
    }

    return (
        <div className={`key-takeaways my-8 p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl border-2 border-amber-200/60 shadow-sm ${className}`}>
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-amber-500 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-white" />
                </div>
                {title}
            </h3>
            <ul className="space-y-3">
                {takeaways.map((item, index) => {
                    const text = typeof item === 'string' ? item : item.text
                    const icon = typeof item === 'string' ? null : item.icon

                    return (
                        <li key={index} className="flex items-start gap-3 text-amber-800/90">
                            <span className="mt-0.5 shrink-0">
                                {icon || <CheckCircle className="w-5 h-5 text-amber-600" />}
                            </span>
                            <span>{text}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

interface QuickAnswerProps {
    question?: string
    answer: string
    className?: string
}

/**
 * Quick Answer Box - Optimized for featured snippets and AI search
 * Provides direct answer to the main query at the top of content
 */
export function QuickAnswer({
    question,
    answer,
    className = ''
}: QuickAnswerProps) {
    return (
        <div
            className={`quick-answer my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-500 shadow-sm ${className}`}
            itemScope
            itemType="https://schema.org/Answer"
        >
            {question && (
                <div className="text-sm font-medium text-blue-600 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Quick Answer
                </div>
            )}
            <p className="text-lg text-slate-900 leading-relaxed" itemProp="text">
                {answer}
            </p>
        </div>
    )
}

interface DefinitionBoxProps {
    term: string
    definition: string
    className?: string
}

/**
 * Definition Box - Optimized for "What is X" featured snippets
 */
export function DefinitionBox({
    term,
    definition,
    className = ''
}: DefinitionBoxProps) {
    return (
        <div
            className={`definition-box my-6 p-5 bg-slate-50 rounded-xl border border-slate-200 ${className}`}
            itemScope
            itemType="https://schema.org/DefinedTerm"
        >
            <dt className="font-bold text-slate-900 mb-2" itemProp="name">
                What is {term}?
            </dt>
            <dd className="text-slate-700" itemProp="description">
                {definition}
            </dd>
        </div>
    )
}

export default KeyTakeaways
