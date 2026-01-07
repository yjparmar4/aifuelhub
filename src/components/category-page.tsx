'use client'

import { useState } from 'react'
import { Category, Tool } from '@/types'
import { ToolCard } from '@/components/tool-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BannerAd, InlineAd } from '@/components/ad-placeholder'
import { AggressiveCTA } from '@/components/affiliate-button'
import { Sparkles, CheckCircle2, Star, Zap, TrendingUp, BookOpen, Filter, X } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function CategoryPage({ category, tools }: { category: Category; tools: Tool[] }) {
  const [filterPricing, setFilterPricing] = useState<string | null>(null) // 'Free', 'Freemium', 'Paid'
  const [filterRating, setFilterRating] = useState<number | null>(null) // 4, 3

  // Get pricing distribution
  const pricingStats = {
    Free: tools.filter(t => t.pricingType === 'Free').length,
    Freemium: tools.filter(t => t.pricingType === 'Freemium').length,
    Paid: tools.filter(t => t.pricingType === 'Paid').length,
  }

  // Get top rated tools
  const topRatedTools = tools.filter(t => t.rating && t.rating >= 4.5).slice(0, 3)
  const trendingTools = tools.filter(t => t.trending).slice(0, 3)
  const freeTools = tools.filter(t => t.pricingType === 'Free').slice(0, 3)

  const seoContent = generateCategorySEOContent(category, tools)

  // Filter Logic
  const filteredTools = tools.filter(tool => {
    if (filterPricing && tool.pricingType !== filterPricing) return false
    if (filterRating && (tool.rating || 0) < filterRating) return false
    return true
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="text-6xl mb-6 animate-bounce-slow">{category.icon || '🚀'}</div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{category.name}</span> AI Tools
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Discover {category._count?.tools || tools.length} expertly reviewed AI tools. Compare features, pricing, and ratings to find the perfect fit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#tools">
              <Button size="lg" className="rounded-full px-8 bg-purple-600 hover:bg-purple-700">
                Browse Tools
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-7xl px-4 py-12">
        {/* Intro Section Guide */}
        <section className="mb-16 max-w-4xl mx-auto text-center">
          <div className="text-slate-600 space-y-4 text-lg leading-relaxed">
            {seoContent.introParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </section>

        {/* Pricing Quick Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Free', 'Freemium', 'Paid'].map((type) => (
              <Card key={type}
                className={cn(
                  "cursor-pointer transition-all hover:scale-105 border-slate-200",
                  filterPricing === type ? "ring-2 ring-purple-500 bg-purple-50" : "hover:bg-slate-50"
                )}
                onClick={() => setFilterPricing(filterPricing === type ? null : type)}
              >
                <CardContent className="pt-6 text-center">
                  <div className={cn("text-3xl font-bold mb-2",
                    type === 'Free' ? "text-green-600" : type === 'Freemium' ? "text-blue-600" : "text-purple-600"
                  )}>
                    {pricingStats[type as keyof typeof pricingStats]}
                  </div>
                  <div className="text-slate-600 font-medium">{type} Tools</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <BannerAd />

        {/* Top Lists Sections */}
        {topRatedTools.length > 0 && !filterPricing && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-amber-500/10 rounded-lg"><Star className="w-6 h-6 text-amber-500" /></div>
              <h2 className="text-3xl font-bold">Top Rated</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topRatedTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </section>
        )}

        {trendingTools.length > 0 && !filterPricing && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-rose-500/10 rounded-lg"><TrendingUp className="w-6 h-6 text-rose-500" /></div>
              <h2 className="text-3xl font-bold">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </section>
        )}

        <InlineAd />

        {/* Main Tool Grid with Filters */}
        <section id="tools" className="mb-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              All {category.name} Tools
              <span className="text-lg font-normal text-slate-500 ml-2">({filteredTools.length})</span>
            </h2>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                <Button
                  variant={filterPricing === null ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilterPricing(null)}
                >All</Button>
                <Button
                  variant={filterPricing === 'Free' ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilterPricing(filterPricing === 'Free' ? null : 'Free')}
                >Free</Button>
                <Button
                  variant={filterPricing === 'Paid' ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilterPricing(filterPricing === 'Paid' ? null : 'Paid')}
                >Paid</Button>
              </div>

              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                <Button
                  variant={filterRating === null ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilterRating(null)}
                >Any Rating</Button>
                <Button
                  variant={filterRating === 4.5 ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilterRating(filterRating === 4.5 ? null : 4.5)}
                >4.5+</Button>
              </div>

              {(filterPricing || filterRating) && (
                <Button variant="ghost" size="sm" onClick={() => { setFilterPricing(null); setFilterRating(null); }}>
                  <X className="w-4 h-4 mr-2" /> Clear
                </Button>
              )}
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-muted-foreground">No tools match your filters.</p>
              <Button variant="link" onClick={() => { setFilterPricing(null); setFilterRating(null); }}>Clear Filters</Button>
            </div>
          )}
        </section>

        {/* SEO Content Accordion-style or Full Text */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Complete Guide to {category.name} Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {seoContent.guideSections.map((section, idx) => (
              <div key={idx} className="prose prose-slate">
                <h3 className="text-xl font-bold mb-4 text-purple-900">{section.title}</h3>
                <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                  {section.content.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links Footer */}
        <section className="border-t border-slate-200 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Popular Categories</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/categories/ai-writing" className="hover:text-purple-600">AI Writing Tools</Link></li>
                <li><Link href="/categories/ai-image-generators" className="hover:text-purple-600">AI Image Generators</Link></li>
                <li><Link href="/categories/ai-video-generators" className="hover:text-purple-600">AI Video Tools</Link></li>
                <li><Link href="/categories/ai-coding-assistants" className="hover:text-purple-600">AI Coding Tools</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Money Pages</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/best/ai-tools" className="hover:text-purple-600">Best AI Tools 2025</Link></li>
                <li><Link href="/ai-tools/free" className="hover:text-purple-600">Best Free AI Tools</Link></li>
                <li><Link href="/deals" className="hover:text-purple-600">AI Deals & Discounts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Comparisons</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/compare" className="hover:text-purple-600">Compare Tools</Link></li>
                <li><Link href="/vs/jasper-vs-copy-ai" className="hover:text-purple-600">Jasper vs Copy.ai</Link></li>
                <li><Link href="/vs/midjourney-vs-dalle" className="hover:text-purple-600">Midjourney vs DALL-E 3</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">For Tool Builders</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/submit-tool" className="hover:text-purple-600 font-semibold text-purple-600">Submit Your Tool</Link></li>
                <li><Link href="/contact" className="hover:text-purple-600">Advertise with Us</Link></li>
              </ul>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

// Programmatic SEO content generator
function generateCategorySEOContent(category: Category, tools: Tool[]) {
  const categoryName = category.name
  const categoryNameLower = category.name.toLowerCase()
  const toolCount = tools.length

  return {
    introParagraphs: [
      `Finding the right AI tools for ${categoryNameLower} can be overwhelming with so many options available. Our comprehensive directory brings you ${toolCount} expertly reviewed ${categoryNameLower} tools, helping you make informed decisions.`,
      `Whether you're a beginner just starting with AI or an experienced professional looking to upgrade your toolkit, we've curated the best ${categoryNameLower} solutions for every skill level and budget.`,
      `Our team tests and reviews each tool extensively, evaluating features, pricing, ease of use, and real-world performance. Read detailed reviews, compare alternatives, and find the perfect ${categoryNameLower} AI tool for your specific needs.`,
    ],

    guideSections: [
      {
        title: `What to Look for in ${categoryName} AI Tools`,
        content: [
          `When choosing a ${categoryNameLower} AI tool, consider your specific use case and requirements. Look for tools that offer the features you need most, whether that's automation, integration with existing systems, or specialized capabilities.`,
          `Pricing is another crucial factor. While some ${categoryNameLower} tools are completely free, others offer freemium models that let you try basic features before upgrading to paid plans. Consider your budget and expected usage when making your decision.`,
          `User experience and learning curve matter too. The best ${categoryNameLower} AI tools balance powerful features with intuitive interfaces, making them accessible to users of all skill levels.`,
        ],
      },
      {
        title: `Benefits of Using ${categoryName} AI Tools`,
        content: [
          `${categoryName} AI tools can significantly boost your productivity and efficiency. By automating repetitive tasks and providing intelligent suggestions, these tools free up your time for more important work.`,
          `Quality and consistency improve with AI assistance. ${categoryNameLower} tools help maintain high standards across your work, reducing errors and ensuring professional results every time.`,
          `Cost savings are another significant benefit. Many ${categoryNameLower} AI tools can replace or augment expensive services, providing professional-grade results at a fraction of the cost.`,
        ],
      },
      {
        title: `How We Review ${categoryName} AI Tools`,
        content: [
          `Our review process for ${categoryNameLower} AI tools is thorough and unbiased. We test each tool extensively, evaluating core features, user experience, performance, and value for money.`,
          `We consider real-world use cases and gather feedback from actual users. This helps us understand how each ${categoryNameLower} tool performs in practice, not just in theory.`,
          `Our ratings and recommendations are based on objective testing and user experiences. We don't accept payments for positive reviews, ensuring you get honest, trustworthy information.`,
        ],
      },
      {
        title: `Choosing the Right ${categoryName} AI Tool for You`,
        content: [
          `Start by identifying your specific needs and goals. Different ${categoryNameLower} AI tools excel in different areas, so understanding your requirements will help narrow down your options.`,
          `Take advantage of free trials and freemium plans. Most ${categoryNameLower} AI tools offer these options, allowing you to test the software before committing to a paid subscription.`,
          `Consider your technical expertise and available resources. Some ${categoryNameLower} tools are designed for beginners, while others require more technical knowledge. Choose one that matches your skill level and available support.`,
          `Read user reviews and compare alternatives. Our platform includes detailed reviews and side-by-side comparisons to help you make an informed decision.`,
        ],
      },
    ],
  }
}
