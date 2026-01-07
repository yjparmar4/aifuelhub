import Link from 'next/link'
import { Zap, Mail, ArrowRight } from 'lucide-react'

export function Footer() {
    return (
        <footer className="relative bg-[#02040a] text-white pt-24 pb-12 overflow-hidden">
            {/* Top Border Gradient */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

            {/* Ambient Background Glow */}
            <div className="absolute bottom-[-20%] left-[-20%] w-[50%] h-[50%] bg-violet-900/5 blur-[150px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                    {/* Column 1: About & Newsletter */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 via-rose-600 to-amber-600 flex items-center justify-center shadow-md">
                                <Zap className="w-5 h-5 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                <span className="text-white">AI</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-rose-400">Fuel</span>
                                <span className="text-white">Hub</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
                            Discover the best AI tools to supercharge your workflow. We curate, review, and compare the latest software to help you make informed decisions.
                        </p>

                        {/* Newsletter Mini Form */}
                        <div className="pt-6">
                            <p className="text-sm font-medium text-white mb-3">Stay updated with AI insights</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                                />
                                <button className="bg-gradient-to-r from-violet-600 via-rose-600 to-amber-600 hover:opacity-90 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Top Categories */}
                    <div>
                        <h3 className="font-semibold mb-6 text-white tracking-wide">Top Categories</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/ai-tools?category=copywriting" className="text-gray-400 hover:text-violet-400 transition-colors">Copywriting AI</Link></li>
                            <li><Link href="/ai-tools?category=image-generators" className="text-gray-400 hover:text-violet-400 transition-colors">Image Generators</Link></li>
                            <li><Link href="/ai-tools?category=video-editing" className="text-gray-400 hover:text-violet-400 transition-colors">Video Editing</Link></li>
                            <li><Link href="/ai-tools?category=social-media" className="text-gray-400 hover:text-violet-400 transition-colors">Social Media</Link></li>
                            <li><Link href="/ai-tools?category=coding" className="text-gray-400 hover:text-violet-400 transition-colors">Code Assistants</Link></li>
                            <li>
                                <Link href="/categories" className="inline-flex items-center text-violet-400 hover:text-violet-300 font-medium transition-colors group">
                                    View All <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Popular Tools */}
                    <div>
                        <h3 className="font-semibold mb-6 text-white tracking-wide">Popular Tools</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/tool/chatgpt" className="text-gray-400 hover:text-violet-400 transition-colors">ChatGPT</Link></li>
                            <li><Link href="/tool/midjourney" className="text-gray-400 hover:text-violet-400 transition-colors">Midjourney</Link></li>
                            <li><Link href="/tool/jasper" className="text-gray-400 hover:text-violet-400 transition-colors">Jasper AI</Link></li>
                            <li><Link href="/tool/notion-ai" className="text-gray-400 hover:text-violet-400 transition-colors">Notion AI</Link></li>
                            <li><Link href="/tool/canva" className="text-gray-400 hover:text-violet-400 transition-colors">Canva Magic</Link></li>
                            <li>
                                <Link href="/ai-tools?trending=true" className="inline-flex items-center text-violet-400 hover:text-violet-300 font-medium transition-colors group">
                                    View Trending <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Company & Legal */}
                    <div>
                        <h3 className="font-semibold mb-6 text-white tracking-wide">Company</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/about" className="text-gray-400 hover:text-violet-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-violet-400 transition-colors">Contact</Link></li>
                            <li><Link href="/submit-tool" className="text-gray-400 hover:text-violet-400 transition-colors">Submit a Tool</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-violet-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-violet-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/disclaimer" className="text-gray-400 hover:text-violet-400 transition-colors">Affiliate Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">
                    <p>© {new Date().getFullYear()} AI Fuel Hub. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <span className="text-violet-400 animate-pulse">💜</span> for the AI Community
                    </p>
                </div>
            </div>
        </footer>
    )
}
