'use client'

import { BlogPost } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface RelatedPostsProps {
    posts: BlogPost[]
    title?: string
}

export function RelatedPosts({ posts, title = "You May Also Like" }: RelatedPostsProps) {
    if (!posts || posts.length === 0) return null

    return (
        <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    {title}
                </h2>
            </div>

            {/* Related Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(0, 3).map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <Link href={`/blog/${post.slug}`} className="block group h-full">
                            <Card className="h-full overflow-hidden border-2 border-gray-100 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 bg-white dark:bg-slate-950">
                                {/* Cover Image */}
                                {post.coverImage && (
                                    <div className="relative h-40 overflow-hidden">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        {post.category && (
                                            <Badge className="absolute bottom-3 left-3 bg-purple-600 hover:bg-purple-700 text-white text-xs">
                                                {post.category.name}
                                            </Badge>
                                        )}
                                    </div>
                                )}

                                <CardContent className="p-5">
                                    {/* Title */}
                                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-heading">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    {post.excerpt && (
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    {/* Footer */}
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>
                                                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-2 transition-all">
                                            <span>Read More</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* View All Link */}
            <div className="mt-8 text-center">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                >
                    <span>View All Articles</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    )
}

// Compact version for sidebars
export function RelatedPostsCompact({ posts, title = "Related Articles" }: RelatedPostsProps) {
    if (!posts || posts.length === 0) return null

    return (
        <div className="bg-gradient-to-br from-gray-50 to-purple-50/50 dark:from-slate-900 dark:to-purple-950/20 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-4 font-heading flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                {title}
            </h3>
            <div className="space-y-4">
                {posts.slice(0, 4).map((post) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="flex items-start gap-3 group"
                    >
                        {post.coverImage && (
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {post.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
