'use client'

import { Tool } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ToolCardProps {
  tool: Tool
  showRank?: boolean
  rank?: number
}

export function ToolCard({ tool, showRank, rank }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: rank ? rank * 0.05 : 0, ease: [0.4, 0, 0.2, 1] }}
      className="h-full"
    >
      <Link href={`/tool/${tool.slug}`} className="block h-full group">
        <div className="h-full bg-white border border-slate-200 hover:border-sky-300 rounded-xl overflow-hidden relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1">

          {/* Subtle Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

          <div className="p-5 flex flex-col h-full relative z-10">
            {/* Header with Icon and Badges */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-sky-50 group-hover:border-sky-100 transition-all duration-200">
                {tool.category?.icon ? (
                  <span className="text-xl">{tool.category.icon}</span>
                ) : (
                  <span className="text-lg font-bold text-sky-500">{tool.name.charAt(0)}</span>
                )}
              </div>

              <div className="flex flex-col items-end gap-1.5">
                {showRank && rank && rank <= 3 && (
                  <Badge className="bg-sky-500 text-white border-0 text-[10px] uppercase tracking-wide px-2 py-0.5 font-semibold">
                    #{rank} Trending
                  </Badge>
                )}
                {tool.featured && (
                  <Badge className="bg-cyan-50 text-cyan-600 border border-cyan-100 text-[10px] uppercase tracking-wide px-2 py-0.5 font-medium">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Tool Name & Category */}
            <div className="mb-2">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-600 transition-colors duration-150 leading-snug">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{tool.category?.name || 'Uncategorized'}</p>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1 leading-relaxed">
              {tool.tagline || tool.description}
            </p>

            {/* Footer with Price & Rating */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                {tool.pricingType && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] px-2 py-0.5 font-medium",
                      tool.pricingType === 'Free' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        tool.pricingType === 'Freemium' ? 'bg-sky-50 text-sky-600 border-sky-100' :
                          'bg-slate-50 text-slate-600 border-slate-100'
                    )}
                  >
                    {tool.pricingType}
                  </Badge>
                )}
                {tool.rating && (
                  <div className="flex items-center text-xs text-amber-500 font-medium">
                    <Star className="w-3 h-3 fill-current mr-0.5" />
                    {tool.rating}
                  </div>
                )}
              </div>

              <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-sky-500 transition-all duration-200">
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
