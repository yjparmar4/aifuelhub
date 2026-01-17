'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { Search, Calendar, Clock, ArrowRight, BookOpen, X, TrendingUp, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BlogPageProps {
  initialPosts: any[]
  categories?: any[]
}

export default function BlogPage({ initialPosts }: BlogPageProps) {
  const [posts, setPosts] = useState<any[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setPosts(initialPosts)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/blog?search=${encodeURIComponent(query)}`)
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error searching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setPosts(initialPosts)
  }

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content?.split(/\s+/).length || 0
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-32">
      <PageHeader
        title="Insights & Updates"
        description="Latest news, reviews, and guides on AI tools."
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }]}
        eyebrow="Blog"
        right={
          <div className="relative w-full md:w-96 group">
            <div className="relative flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl px-5 py-3 border border-slate-200/60 dark:border-slate-700/60 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/50 shadow-sm focus-within:shadow-lg transition-all duration-300">
              <Search className="w-5 h-5 text-muted-foreground mr-3" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground/60 py-1"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-1 transition-colors">
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </div>
        }
      />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center"
            >
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" />
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Searching articles...</p>
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-24 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No articles found</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search terms</p>
              <Button onClick={clearSearch} variant="outline" className="rounded-xl">
                Clear search
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-6 md:gap-8 md:grid-cols-2"
            >
              {posts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -4 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="relative bg-white dark:bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-700/60 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full flex flex-col">
                      <div className="relative overflow-hidden h-48 shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                        <Image
                          src={post.coverImage || '/placeholder-blog.jpg'}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>

                      <div className="flex-1 p-6 flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium">
                            {post.category?.name || 'Uncategorized'}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                            <Clock className="w-3 h-3" />
                            {getReadTime(post.content)}
                          </span>
                          {idx === 0 && (
                            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                              <TrendingUp className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                        </div>

                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed text-sm flex-grow">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1.5 text-primary font-medium text-sm group-hover:gap-2.5 transition-all duration-300">
                            <span>Read</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
