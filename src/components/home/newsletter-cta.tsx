'use client'

import { Sparkles, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export function NewsletterCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2.5rem] bg-slate-50 border border-slate-200 overflow-hidden shadow-2xl shadow-purple-900/5 transition-all hover:shadow-purple-900/10"
                >
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/60 blur-[100px] rounded-full pointer-events-none mix-blend-multiply" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/60 blur-[100px] rounded-full pointer-events-none mix-blend-multiply" />

                    <div className="relative z-10 p-10 md:p-20 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-8 shadow-sm border border-slate-100">
                            <Mail className="w-8 h-8 text-purple-600" />
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">AI Revolution</span>
                        </h2>
                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Get weekly expert reviews, tutorials, and exclusive tool comparisons delivered straight to your inbox. No spam, ever.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-white border-slate-200 rounded-xl px-6 py-7 text-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all text-slate-900 placeholder:text-slate-400 shadow-sm"
                            />
                            <Button className="h-auto rounded-xl px-10 py-4 font-bold text-lg bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5">
                                Subscribe Free
                            </Button>
                        </form>

                        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                            <span className="flex items-center gap-2 font-medium">
                                <Sparkles className="w-4 h-4 text-amber-500" /> 15,000+ Subscribers
                            </span>
                            <span className="opacity-50">•</span>
                            <span className="hover:text-purple-600 transition-colors cursor-pointer">Unsubscribe anytime</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
