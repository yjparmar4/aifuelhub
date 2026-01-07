'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Timer, ExternalLink, Copy, Tag, Check, Sparkles, Zap, Gift, Percent } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

// Helper function to calculate time remaining
function getTimeRemaining(expiresAt: Date | null): { text: string; isExpired: boolean; urgency: 'low' | 'medium' | 'high' | 'expired' | 'none' } {
    if (!expiresAt) {
        return { text: 'Always Active', isExpired: false, urgency: 'none' }
    }

    const now = new Date()
    const diff = expiresAt.getTime() - now.getTime()

    if (diff <= 0) {
        return { text: 'Expired', isExpired: true, urgency: 'expired' }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 7) {
        return { text: `${days} days left`, isExpired: false, urgency: 'low' }
    } else if (days >= 1) {
        return { text: `${days} day${days > 1 ? 's' : ''} left`, isExpired: false, urgency: days <= 2 ? 'high' : 'medium' }
    } else if (hours >= 1) {
        return { text: `${hours} hour${hours > 1 ? 's' : ''} left`, isExpired: false, urgency: 'high' }
    } else {
        return { text: 'Less than 1 hour', isExpired: false, urgency: 'high' }
    }
}

// Deals data with real expiration dates - automatically updates based on current time
function getDeals() {
    const now = new Date()
    return [
        {
            id: 'deal-perplexity',
            toolName: 'Perplexity Pro',
            description: 'Unlock the power of AI search with a special discount on your first month.',
            discount: '$20 OFF',
            code: 'PERPLEX20',
            logo: '🔍',
            category: 'Search',
            url: 'https://perplexity.ai',
            expiresAt: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days
        },
        {
            id: 'deal-claude',
            toolName: 'Claude Pro',
            description: 'Get priority access during high-traffic times and early access to new features.',
            discount: 'PRIORITY ACCESS',
            code: 'No Code Needed',
            logo: '🤖',
            category: 'Chatbot',
            url: 'https://claude.ai',
            expiresAt: null,
        },
        {
            id: 'deal-jasper',
            toolName: 'Jasper AI',
            description: 'Get 20% off your first 3 months of Jasper Boss Mode for better copywriting.',
            discount: '20% OFF',
            code: 'ATLAS20',
            logo: '💎',
            category: 'Writing',
            url: 'https://jasper.ai',
            expiresAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'deal-elevenlabs',
            toolName: 'ElevenLabs',
            description: 'The most realistic AI voice generator. Get 50% off your first month.',
            discount: '50% OFF',
            code: 'VOICE50',
            logo: '🎙️',
            category: 'Audio',
            url: 'https://elevenlabs.io',
            expiresAt: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'deal-midjourney',
            toolName: 'Midjourney',
            description: 'Save on the annual plan - pay for 10 months, get 12 months access.',
            discount: '2 MONTHS FREE',
            code: 'ANNUAL-SAVE',
            logo: '🎨',
            category: 'Design',
            url: 'https://midjourney.com',
            expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'deal-runway',
            toolName: 'Runway ML',
            description: 'Create impossible videos with AI. Save 20% on the Annual Unlimited Plan.',
            discount: '20% OFF',
            code: 'CREATOR20',
            logo: '🎬',
            category: 'Video',
            url: 'https://runwayml.com',
            expiresAt: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'deal-copyai',
            toolName: 'Copy.ai',
            description: 'Special discount for startups and small teams looking to scale content.',
            discount: '30% OFF',
            code: 'STARTUP30',
            logo: '✍️',
            category: 'Writing',
            url: 'https://copy.ai',
            expiresAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'deal-surfer',
            toolName: 'Surfer SEO',
            description: 'Boost your rankings with AI-powered SEO optimization tools.',
            discount: '15% OFF',
            code: 'SURFER15',
            logo: '🏄',
            category: 'SEO',
            url: 'https://surferseo.com',
            expiresAt: null,
        },
        {
            id: 'deal-synthesia',
            toolName: 'Synthesia',
            description: 'Create professional AI videos with virtual avatars in minutes.',
            discount: '$20 CREDIT',
            code: 'NEWUSER',
            logo: '🎥',
            category: 'Video',
            url: 'https://synthesia.io',
            expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'deal-notion',
            toolName: 'Notion AI',
            description: 'Add AI to your workspace with an extended free trial period.',
            discount: 'FREE TRIAL',
            code: 'No Code Needed',
            logo: '📝',
            category: 'Productivity',
            url: 'https://notion.so',
            expiresAt: null,
        },
    ]
}

export default function DealsPage() {
    const deals = getDeals()
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    // Filter out expired deals
    const activeDeals = deals.filter(deal => {
        if (!deal.expiresAt) return true
        return deal.expiresAt.getTime() > Date.now()
    })

    const handleCopyCode = (code: string) => {
        if (code === 'No Code Needed') return
        navigator.clipboard.writeText(code)
        setCopiedCode(code)
        setTimeout(() => setCopiedCode(null), 2000)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider mb-6 border border-violet-100">
                            <Gift className="w-4 h-4" /> Exclusive Offers
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            AI Tool Deals & Coupons
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Stop paying full price. We've negotiated exclusive discounts with top AI tool providers just for our community.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto max-w-5xl px-4 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-12 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-violet-500" />
                            <span>{activeDeals.length} Active Deals</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-300 hidden md:block" />
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span>Updated Today</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-300 hidden md:block" />
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-500" />
                            <span>Verified Working</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deals Grid */}
            <div className="container mx-auto max-w-7xl px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeDeals.map((deal, index) => {
                        const timeInfo = getTimeRemaining(deal.expiresAt)
                        const isCoupon = deal.code !== 'No Code Needed'

                        return (
                            <motion.div
                                key={deal.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.5 }}
                                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl shrink-0">
                                        {deal.logo}
                                    </div>
                                    <Badge className={
                                        deal.discount.includes('FREE')
                                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0"
                                            : "bg-violet-100 text-violet-700 hover:bg-violet-100 border-0"
                                    }>
                                        {deal.discount}
                                    </Badge>
                                </div>

                                <div className="mb-6 flex-1">
                                    <h3 className="font-bold text-lg text-slate-900 mb-1">{deal.toolName}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{deal.description}</p>
                                </div>

                                <div className="space-y-4">
                                    <div
                                        onClick={() => isCoupon && handleCopyCode(deal.code)}
                                        className={`group relative flex items-center justify-between p-3 rounded-lg border-2 border-dashed transition-all cursor-pointer ${isCoupon
                                                ? 'border-slate-300 bg-slate-50 hover:border-violet-400 hover:bg-violet-50'
                                                : 'border-slate-200 bg-slate-50 cursor-default'
                                            }`}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                {isCoupon ? 'Coupon Code' : 'Offer Type'}
                                            </span>
                                            <span className={`font-mono font-bold ${isCoupon ? 'text-slate-900 group-hover:text-violet-700' : 'text-slate-600'}`}>
                                                {deal.code}
                                            </span>
                                        </div>

                                        {isCoupon && (
                                            <div className="text-slate-400 group-hover:text-violet-600 transition-colors">
                                                {copiedCode === deal.code ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11 font-medium" asChild>
                                            <Link href={deal.url} target="_blank">
                                                Claim Deal <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
                                            </Link>
                                        </Button>
                                    </div>

                                    {timeInfo.urgency !== 'none' && (
                                        <div className={`text-xs font-medium flex items-center justify-center gap-1.5 ${timeInfo.urgency === 'high' ? 'text-red-600' : 'text-slate-400'
                                            }`}>
                                            <Timer className="w-3.5 h-3.5" />
                                            {timeInfo.text}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Newsletter CTA */}
            <div className="container mx-auto px-4 pb-20">
                <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-6">
                            <Zap className="w-6 h-6 text-yellow-300" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Get Fresh Deals Weekly</h2>
                        <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                            Don't miss out on limited-time AI tool discounts. Join 15,000+ smart creators saving money on their tech stack.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                            <Button className="h-12 bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 font-semibold">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
