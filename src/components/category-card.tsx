'use client'

import { Category } from '@/types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface CategoryCardProps {
  category: Category
  toolCount?: number
}

export function CategoryCard({ category, toolCount = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="h-full"
    >
      <Link href={`/categories/${category.slug}`} className="block group h-full">
        <div className="h-full bg-white border border-slate-200 hover:border-sky-300 p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative overflow-hidden">

          {/* Subtle Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:bg-sky-500 group-hover:text-white transition-all duration-200">
                {category.icon || '🚀'}
              </div>
              <div className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-xs font-medium text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:border-sky-100 transition-all duration-150">
                {toolCount} tools
              </div>
            </div>

            {/* Content */}
            <div className="mb-auto">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-600 transition-colors duration-150 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center text-xs font-medium text-sky-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              Browse Category
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
