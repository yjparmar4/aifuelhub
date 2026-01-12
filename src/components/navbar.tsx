'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Menu, X, Zap, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'AI Tools', href: '/ai-tools' },
        { name: 'Compare', href: '/compare' },
        { name: 'Blog', href: '/blog' },
        { name: 'Deals', href: '/deals' },
    ]

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 w-full z-50 transition-all duration-200 border-b",
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-sm"
                        : "bg-white py-4 border-transparent"
                )}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 via-primary to-violet-600 flex items-center justify-center shadow-sm">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                AI<span className="text-gradient">Fuel</span>Hub
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-slate-600 hover:text-indigo-600 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Search & Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-9 h-9 w-48 bg-slate-50 border-slate-200 focus:w-56 transition-all text-sm"
                                />
                            </div>
                            <Button asChild className="h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm border-0 shadow-sm">
                                <Link href="/submit">Submit Tool</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-slate-600"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden fixed inset-0 top-[60px] bg-white/98 backdrop-blur-md z-40 overflow-y-auto border-t border-slate-200"
                    >
                        <nav className="container mx-auto px-4 py-6 flex flex-col gap-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-base font-medium p-3 hover:bg-slate-50 rounded-lg text-slate-700 hover:text-indigo-600 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <Link href="/submit" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">
                                        Submit Tool
                                    </Button>
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}


