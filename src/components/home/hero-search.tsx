'use client'

import { useState } from 'react'
import { Search, Sparkles, Zap, Star, TrendingUp, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroSearch() {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            window.location.href = `/ai-tools?search=${encodeURIComponent(searchQuery)}`
        }
    }

    return (
        <section className="relative py-28 px-4 overflow-hidden min-h-[85vh] flex items-center justify-center bg-white">
            {/* Soft Blue Gradient Accent at Top */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-sky-50/80 via-white to-white" />

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] z-0 opacity-50" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto max-w-5xl relative z-10"
            >
                <div className="text-center space-y-6 mb-16">
                    {/* Announcement Badge - Clean */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 px-4 py-1.5 rounded-full text-sm font-medium text-sky-700"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                        </span>
                        <span>Updated Daily</span>
                    </motion.div>

                    {/* Main Headline - Dark with Sky Gradient */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900">
                        Discover the Best <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">
                            AI Tools
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Compare features, pricing, and reviews of <span className="text-slate-900 font-semibold">118+ AI tools</span>. Expert-tested, unbiased recommendations.
                    </p>

                    {/* Search Bar - Clean White */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto pt-6">
                        <div className="flex gap-3 p-2 bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-200/50">
                            <div className="relative flex-1 group/input">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/input:text-sky-500 transition-colors" />
                                <Input
                                    type="text"
                                    placeholder="Search AI tools..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 h-12 text-base border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0"
                                />
                            </div>
                            <Button type="submit" size="lg" className="h-12 px-6 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-sm">
                                Search
                            </Button>
                        </div>
                    </form>

                    {/* Popular Tags - Clean */}
                    <div className="flex flex-wrap justify-center items-center gap-2 pt-4">
                        <span className="text-sm text-slate-500">Popular:</span>
                        {['ChatGPT', 'Claude', 'Midjourney', 'Gemini'].map((term) => (
                            <Link key={term} href={`/ai-tools?search=${encodeURIComponent(term)}`}>
                                <Badge variant="secondary" className="cursor-pointer bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600 border-0 px-3 py-1 text-xs font-medium">
                                    {term}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Stats Section - Clean Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                >
                    {[
                        { icon: Zap, label: 'Tools', value: '2,500+', color: 'text-sky-500' },
                        { icon: Star, label: 'Reviews', value: '10k+', color: 'text-amber-500' },
                        { icon: TrendingUp, label: 'Comparisons', value: '1.2M', color: 'text-emerald-500' },
                        { icon: CheckCircle2, label: 'Free Tools', value: '800+', color: 'text-cyan-500' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-5 text-center border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
                            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}


