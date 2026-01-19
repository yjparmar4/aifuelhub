'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, CheckCircle2, MessageCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface QuickAnswerProps {
    question: string
    answer: string
    additionalPoints?: string[]
    source?: string
    readTime?: string
}

/**
 * QuickAnswer Component - AEO (Answer Engine Optimization)
 * 
 * This component creates a prominent answer box optimized for:
 * - Google Featured Snippets
 * - Voice Search answers
 * - AI-powered search engines (SGE, Perplexity)
 * 
 * The semantic markup helps search engines identify the direct answer.
 */
export function QuickAnswer({
    question,
    answer,
    additionalPoints = [],
    source,
    readTime
}: QuickAnswerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
            // Semantic attributes for featured snippets
            data-featured-snippet="true"
            role="region"
            aria-label="Quick Answer"
        >
            <Card className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 border-2 border-emerald-200 dark:border-emerald-800 shadow-lg overflow-hidden">
                {/* Header with Question */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3">
                    <div className="flex items-center gap-2 text-white">
                        <Zap className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wider">Quick Answer</span>
                        {readTime && (
                            <Badge variant="secondary" className="ml-auto bg-white/20 text-white text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {readTime}
                            </Badge>
                        )}
                    </div>
                </div>

                <CardContent className="p-5 space-y-4">
                    {/* The Question - Important for voice search */}
                    <div
                        className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                        data-question="true"
                        itemProp="name"
                    >
                        <MessageCircle className="w-5 h-5 inline mr-2 text-emerald-600" />
                        {question}
                    </div>

                    {/* The Direct Answer - Key for featured snippets */}
                    <div
                        className="text-base text-gray-700 dark:text-gray-300 leading-relaxed pl-7 border-l-3 border-emerald-400 bg-white/50 dark:bg-slate-900/50 p-4 rounded-r-lg"
                        data-answer="true"
                        itemProp="acceptedAnswer"
                    >
                        <p className="speakable-answer font-medium">
                            {answer}
                        </p>
                    </div>

                    {/* Additional Key Points */}
                    {additionalPoints.length > 0 && (
                        <div className="pl-7 space-y-2">
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                Key Points:
                            </p>
                            <ul className="space-y-2" data-key-points="true">
                                {additionalPoints.map((point, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Source attribution for E-E-A-T */}
                    {source && (
                        <div className="pt-3 border-t border-emerald-200 dark:border-emerald-800">
                            <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                                Source: {source}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}

/**
 * KeyTakeaways Component - AEO Optimization
 * 
 * Creates a scannable summary box for search engines and users.
 * Helps with featured snippets and People Also Ask results.
 */
interface KeyTakeawaysProps {
    title?: string
    takeaways: string[]
}

export function KeyTakeaways({ title = "Key Takeaways", takeaways }: KeyTakeawaysProps) {
    if (!takeaways || takeaways.length === 0) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
            data-takeaways="true"
            role="region"
            aria-label="Key Takeaways"
        >
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-900 dark:text-purple-100">
                        <Zap className="w-5 h-5 text-purple-600" />
                        {title}
                    </h3>
                    <ul className="space-y-3" data-summary-list="true">
                        {takeaways.map((point, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                            >
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">
                                    {idx + 1}
                                </span>
                                <span className="text-base">{point}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </motion.div>
    )
}

/**
 * TL;DR Component - Quick Summary for Busy Readers
 */
interface TLDRProps {
    summary: string
}

export function TLDR({ summary }: TLDRProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 p-4 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 rounded-r-lg"
            data-tldr="true"
            role="region"
            aria-label="TL;DR Summary"
        >
            <p className="font-bold text-amber-800 dark:text-amber-200 text-sm uppercase tracking-wider mb-2">
                TL;DR
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium speakable-summary">
                {summary}
            </p>
        </motion.div>
    )
}
