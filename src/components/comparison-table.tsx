'use client'

import { Tool } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, X, Star, ExternalLink, Zap, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ComparisonTableProps {
  tools: Tool[]
  features: string[] // Kept for interface compatibility but we'll use intelligent parsing
}

export function ComparisonTable({ tools }: ComparisonTableProps) {
  const getList = (jsonString: string | null | undefined) => {
    try {
      const parsed = JSON.parse(jsonString || '[]')
      return Array.isArray(parsed) ? parsed as string[] : []
    } catch {
      return []
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      {/* Central "VS" line for desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-1/2 z-0" />

      {tools.map((tool, index) => {
        const features = getList(tool.features)
        const pros = getList(tool.pros)
        const cons = getList(tool.cons)

        return (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-8 relative z-10"
          >
            {/* Header Card */}
            <div className="glass-panel p-8 rounded-3xl border border-white/20 shadow-lg shadow-primary/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-primary/20">
                  {tool.name[0]}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {tool.featured && <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-0">Featured</Badge>}
                  <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded-full border border-black/5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-sm">{tool.rating || 'N/A'}</span>
                    <span className="text-xs text-muted-foreground">({tool.reviewCount})</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
              <p className="text-muted-foreground mb-6 line-clamp-2 min-h-[3rem]">{tool.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="px-3 py-1.5 text-sm font-medium">
                  {tool.pricingType}
                </Badge>
                <span className="text-lg font-bold text-slate-700 dark:text-slate-200">
                  {tool.startingPrice || 'Custom Pricing'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link href={`/tool/${tool.slug}`} className="w-full">
                  <Button variant="outline" className="w-full rounded-xl h-11 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                    Review
                  </Button>
                </Link>
                <Link href={tool.affiliateLink || tool.websiteUrl} target="_blank" className="w-full">
                  <Button className="w-full rounded-xl h-11 shadow-lg shadow-primary/20">
                    Visit Site <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="space-y-6">
              <div className="bg-emerald-500/5 rounded-3xl p-6 border border-emerald-500/10">
                <h4 className="font-semibold flex items-center gap-2 mb-4 text-emerald-700 dark:text-emerald-400">
                  <ThumbsUp className="w-5 h-5" /> Pros
                </h4>
                <ul className="space-y-3">
                  {pros.length > 0 ? pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {pro}
                    </li>
                  )) : (
                    <li className="text-sm text-muted-foreground italic">No pros listed</li>
                  )}
                </ul>
              </div>

              <div className="bg-rose-500/5 rounded-3xl p-6 border border-rose-500/10">
                <h4 className="font-semibold flex items-center gap-2 mb-4 text-rose-700 dark:text-rose-400">
                  <ThumbsDown className="w-5 h-5" /> Cons
                </h4>
                <ul className="space-y-3">
                  {cons.length > 0 ? cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <X className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                      {con}
                    </li>
                  )) : (
                    <li className="text-sm text-muted-foreground italic">No cons listed</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Features List */}
            <div className="glass-panel p-6 rounded-3xl border border-white/20">
              <h4 className="font-semibold flex items-center gap-2 mb-4 text-primary">
                <Zap className="w-5 h-5" /> Key Features
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {features.length > 0 ? features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/50 dark:border-white/5 transition-all hover:scale-[1.01]">
                    <div className="w-2 h-2 rounded-full bg-primary/50" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground italic">No specific features listed</p>
                )}
              </div>
            </div>

          </motion.div>
        )
      })}
    </div>
  )
}


interface ComparisonTableProps {
  tools: Tool[]
  features: string[]
}


