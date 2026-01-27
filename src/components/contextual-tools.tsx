'use client'

import Link from 'next/link'
import { ExternalLink, Zap, Star, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ContextualTool {
    name: string
    slug: string
    tagline?: string
    pricingType?: string
    rating?: number
}

interface ContextualToolsProps {
    tools: ContextualTool[]
    title?: string
    className?: string
}

/**
 * Displays tools mentioned in blog content as contextual recommendations
 * Improves internal linking and helps readers discover relevant tools
 */
export function ContextualTools({
    tools,
    title = "Tools Mentioned in This Article",
    className = ''
}: ContextualToolsProps) {
    if (!tools || tools.length === 0) return null

    return (
        <div className={`contextual-tools my-10 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 rounded-2xl border border-blue-200/60 dark:border-blue-800 ${className}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <Zap className="w-4 h-4 text-white" />
                </div>
                {title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tools.slice(0, 6).map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/tool/${tool.slug}`}
                        className="group flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {tool.name}
                                </h4>
                                {tool.pricingType && (
                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                        {tool.pricingType}
                                    </Badge>
                                )}
                            </div>
                            {tool.tagline && (
                                <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                    {tool.tagline}
                                </p>
                            )}
                            {tool.rating && tool.rating > 0 && (
                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    <span className="text-xs text-amber-600 dark:text-amber-400">
                                        {tool.rating.toFixed(1)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 shrink-0 mt-1 transition-colors" />
                    </Link>
                ))}
            </div>

            {tools.length > 6 && (
                <div className="mt-4 text-center">
                    <Link
                        href="/ai-tools"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        View all AI tools
                        <ExternalLink className="w-3 h-3" />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default ContextualTools
