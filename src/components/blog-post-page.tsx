'use client'

import { BlogPost } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GoogleAd } from '@/components/google-ad'
import { Calendar, Eye, Share2, BookOpen, Lightbulb, User, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { NewsletterSignup } from '@/components/newsletter-signup'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export default function BlogPostPage({ post }: { post: BlogPost }) {
  const content = post.content

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      })
    }
  }

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />

      /* Minimal Sticky Nav */
      <nav className="border-b bg-white/90 dark:bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 transition-all">
        <div className="container mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Blog
          </Link>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleShare}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="pt-12 pb-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Category & Date */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6 font-medium">
              {post.category && (
                <Link href={`/blog?category=${post.category.slug}`} className="text-primary hover:underline uppercase tracking-wider text-xs font-bold">
                  {post.category.name}
                </Link>
              )}
              <span className="text-gray-300">•</span>
              <span>
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading leading-[1.15] tracking-tight text-gray-900 dark:text-gray-50 text-center">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-heading leading-relaxed text-center max-w-2xl mx-auto">
                {post.excerpt}
              </p>
            )}

            {/* Author Minimal */}
            <div className="flex items-center gap-3 justify-center mb-8">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div className="text-left">
                <span className="block font-semibold text-sm text-gray-900 dark:text-gray-100 leading-none mb-1">AI Fuel Hub Team</span>
                <span className="block text-xs text-muted-foreground">Editorial Staff</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 pb-24">

        {post.coverImage && (
          <div className="mb-12">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 aspect-[21/9] object-cover"
            />
          </div>
        )}

        {/* Minimal Table of Contents Box */}
        <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border-l-4 border-gray-300 dark:border-gray-700">
          <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> In this article
          </h3>
          <nav className="space-y-2">
            {content.split('\n').filter(line => line.trim().startsWith('## ')).slice(0, 8).map((line, idx) => (
              <a
                key={idx}
                href={`#section-${idx}`}
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors pl-2 border-l border-gray-200 hover:border-primary"
              >
                {line.replace(/^#+\s*/, '').trim()}
              </a>
            ))}
          </nav>
        </div>

        {/* Article Body */}
        <article className="prose prose-lg prose-gray dark:prose-invert max-w-none
          prose-p:text-[1.125rem] prose-p:leading-[1.8] prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-p:font-serif
          prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-50
          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:tracking-tight
          prose-h2:border-l-0 prose-h2:pl-0
          prose-a:text-primary prose-a:no-underline prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-primary hover:prose-a:bg-primary/5
          prose-img:rounded-lg prose-img:my-8
          prose-li:text-[1.125rem] prose-li:leading-[1.7] prose-li:text-gray-800 dark:prose-li:text-gray-300 prose-li:font-serif
          prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-transparent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
          prose-pre:bg-slate-900 prose-pre:rounded-lg prose-pre:shadow-lg
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-primary
        ">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children, ...props }) => {
                const headings = content
                  .split('\n')
                  .filter((line) => line.trim().startsWith('## '))
                  .map((line) => line.replace(/^#+\s*/, '').trim())
                const text = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : ''
                const idx = Math.max(0, headings.findIndex((h) => h === text))
                return (
                  <h2 id={`section-${idx >= 0 ? idx : 0}`} {...props}>
                    {children}
                  </h2>
                )
              },
              blockquote: ({ children, ...props }) => (
                <blockquote {...props} className="border-l-4 border-amber-400 pl-4 py-2 italic my-6 text-gray-700 dark:text-gray-300 bg-amber-50 dark:bg-transparent pr-2 rounded-r">
                  {children}
                </blockquote>
              ),
              /* Ensure tables are scrollable */
              table: ({ ...props }) => (
                <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 dark:border-gray-800">
                  <table {...props} className="w-full text-sm" />
                </div>
              ),
              th: ({ ...props }) => (
                <th {...props} className="bg-gray-50 dark:bg-gray-900 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100 border-b dark:border-gray-800" />
              ),
              td: ({ ...props }) => (
                <td {...props} className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        {/* Footer: Newsletter & Related */}
        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 text-center mb-12">
            <h3 className="text-xl font-bold mb-2">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground mb-6">Get the latest AI tools and reviews delivered to your inbox.</p>
            <div className="max-w-md mx-auto">
              <NewsletterSignup source={`blog:${post.slug}`} />
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/blog?tags=${tag.slug}`}>
                  <Badge variant="secondary" className="px-3 py-1 font-normal text-xs uppercase tracking-wide">
                    # {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>

      </main>
    </article>
  )
}
