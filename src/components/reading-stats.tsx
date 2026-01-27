'use client'

import { Clock, Calendar, RefreshCw, Eye } from 'lucide-react'

interface ReadingStatsProps {
    content: string
    publishedAt?: Date | null
    updatedAt?: Date | null
    views?: number
    className?: string
}

/**
 * Calculate reading time based on word count
 * Average reading speed is ~200-250 words per minute
 */
function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

/**
 * Format date with freshness indicator
 */
function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

/**
 * Get freshness badge based on how recently updated
 */
function getFreshnessBadge(updatedAt: Date): { label: string; color: string } | null {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays <= 7) {
        return { label: 'Just Updated', color: 'bg-green-100 text-green-700 border-green-200' }
    }
    if (diffDays <= 30) {
        return { label: 'Recently Updated', color: 'bg-blue-100 text-blue-700 border-blue-200' }
    }
    if (diffDays <= 90) {
        return { label: 'Updated', color: 'bg-slate-100 text-slate-600 border-slate-200' }
    }
    return null
}

export function ReadingStats({
    content,
    publishedAt,
    updatedAt,
    views,
    className = ''
}: ReadingStatsProps) {
    const readingTime = calculateReadingTime(content)
    const freshnessBadge = updatedAt ? getFreshnessBadge(new Date(updatedAt)) : null

    return (
        <div className={`reading-stats flex flex-wrap items-center gap-4 text-sm text-slate-600 ${className}`}>
            {/* Reading Time */}
            <div className="flex items-center gap-1.5" title="Estimated reading time">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>{readingTime} min read</span>
            </div>

            {/* Published Date */}
            {publishedAt && (
                <div className="flex items-center gap-1.5" title="Published date">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{formatDate(new Date(publishedAt))}</span>
                </div>
            )}

            {/* Updated Date with Freshness Badge */}
            {updatedAt && (
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-green-600" title="Last updated">
                        <RefreshCw className="w-4 h-4" />
                        <span>Updated {formatDate(new Date(updatedAt))}</span>
                    </div>
                    {freshnessBadge && (
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${freshnessBadge.color}`}>
                            {freshnessBadge.label}
                        </span>
                    )}
                </div>
            )}

            {/* Views (if available) */}
            {views !== undefined && views > 0 && (
                <div className="flex items-center gap-1.5" title="Total views">
                    <Eye className="w-4 h-4 text-slate-400" />
                    <span>{views.toLocaleString()} views</span>
                </div>
            )}
        </div>
    )
}

/**
 * Compact version for card displays
 */
export function ReadingTimeCompact({ content }: { content: string }) {
    const readingTime = calculateReadingTime(content)

    return (
        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            {readingTime} min
        </span>
    )
}

export default ReadingStats
