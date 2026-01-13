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
    <article className="min-h-screen bg-gradient-to-b from-background to-slate-50/50">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 z-50 origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />

      {/* Sticky Breadcrumb */}
      <nav className="py-4 px-4 border-b bg-white/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap overflow-hidden">
            <Link href="/" className="hover:text-primary hover:underline transition-all">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/blog" className="hover:text-primary hover:underline transition-all">Blog</Link>
            <span className="text-slate-300">/</span>
            <span className="text-foreground font-medium truncate">{post.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="relative py-16 md:py-20 px-4 overflow-hidden bg-gradient-to-b from-purple-50/50 to-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 bg-gradient-to-b from-purple-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.category && (
                <Link href={`/blog?category=${post.category.slug}`}>
                  <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200 hover:from-purple-200 hover:to-blue-200 transition-all font-semibold px-4 py-1.5">
                    {post.category.name}
                  </Badge>
                </Link>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading leading-tight tracking-tight text-foreground">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg md:text-xl text-muted-foreground mb-8 font-light leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground border-t border-border/50 pt-6">
              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-foreground">AI Fuel Hub Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span>
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              {post.views > 100 && (
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              )}
              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                className="ml-auto hover:bg-purple-50 hover:text-purple-600 transition-all"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto max-w-3xl px-4 pb-24">
        {/* Top Banner Ad */}
        <div className="mb-10">
          <GoogleAd slot="1234567890" style={{ height: '90px' }} className="w-full flex justify-center" />
        </div>

        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative overflow-hidden rounded-2xl mb-10 shadow-xl shadow-purple-500/10 border border-border/50"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full object-cover aspect-video"
            />
          </motion.div>
        )}

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 shadow-md"
        >
          <h3 className="font-bold mb-4 flex items-center gap-3 text-sm uppercase tracking-wide text-muted-foreground">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            Quick Navigation
          </h3>
          <nav className="grid gap-2">
            {content.split('\n').filter(line => line.trim().startsWith('## ')).slice(0, 8).map((line, idx) => (
              <a
                key={idx}
                href={`#section-${idx}`}
                className="text-sm text-foreground/80 hover:text-primary hover:pl-1 truncate transition-all duration-200 py-1.5 block border-l-2 border-slate-200 hover:border-purple-500 pl-3"
              >
                {line.replace(/^#+\s*/, '').trim()}
              </a>
            ))}
          </nav>
        </motion.div>
@@
        {/* Main Article Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg prose-slate dark:prose-invert max-w-none
            prose-headings:font-heading prose-headings:font-bold prose-headings:scroll-mt-24
            prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary/80
            prose-img:rounded-xl prose-img:shadow-lg
            prose-p:text-[1.0625rem] prose-p:leading-8 prose-p:font-serif
            prose-li:text-[1.02rem] prose-li:leading-7 prose-li:font-serif
            prose-strong:text-foreground dark:prose-strong:text-slate-100 prose-strong:font-semibold
            prose-blockquote:not-italic prose-blockquote:font-serif
            prose-code:font-mono
            prose-pre:rounded-xl prose-pre:border prose-pre:border-border/50
          "
        >
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
                  <h2
                    id={`section-${idx >= 0 ? idx : 0}`}
                    {...props}
                    className="text-2xl font-bold mt-14 mb-6 font-heading text-foreground border-l-4 border-purple-500 pl-4 -ml-4"
                  >
                    {children}
                  </h2>
                )
              },
              blockquote: ({ children, ...props }) => (
                <blockquote
                  {...props}
                  className="relative border-l-4 border-amber-400 bg-amber-50/50 pl-6 pr-4 py-4 my-8 text-base text-slate-700 rounded-r-lg font-serif"
                >
                  <Lightbulb className="absolute -left-3 top-4 w-6 h-6 text-amber-500 bg-white rounded-full p-0.5" />
                  {children}
                </blockquote>
              ),
              li: ({ ...props }) => (
                <li {...props} className="pl-1" />
              ),
              table: ({ ...props }) => (
                <div className="overflow-x-auto my-8 rounded-lg border border-border">
                  <table {...props} className="w-full text-sm" />
                </div>
              ),
              th: ({ ...props }) => (
                <th {...props} className="bg-slate-100 px-4 py-3 text-left font-semibold text-foreground border-b" />
              ),
              td: ({ ...props }) => (
                <td {...props} className="px-4 py-3 border-b border-border/50 text-slate-600" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </motion.div>

        {/* Author Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-border/50 flex flex-col sm:flex-row items-start gap-5"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-1">Written by AI Fuel Hub Team</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our editorial team rigorously tests and reviews AI tools to bring you trustworthy, up-to-date insights. We're passionate about helping you discover the best AI solutions for your workflow.
            </p>
            <Link href="/about" className="text-sm text-primary font-medium mt-3 inline-flex items-center gap-1 hover:underline">
              Learn more about us <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 pt-8 border-t border-border/50"
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/blog?tags=${tag.slug}`}>
                  <Badge className="px-3 py-1.5 bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-all font-medium text-xs">
                    # {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Posts Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-14"
        >
          <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-500" />
            Continue Reading
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog" className="group p-4 rounded-xl border border-border/50 hover:border-purple-200 hover:bg-purple-50/30 transition-all">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Explore More AI Guides</span>
              <p className="text-xs text-muted-foreground mt-1">Discover our latest articles on AI tools and trends.</p>
            </Link>
            <Link href="/ai-tools" className="group p-4 rounded-xl border border-border/50 hover:border-purple-200 hover:bg-purple-50/30 transition-all">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Browse AI Tools Directory</span>
              <p className="text-xs text-muted-foreground mt-1">Find the perfect AI tool for your needs.</p>
            </Link>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 p-8 md:p-10 text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-20" />
            <div className="relative z-10">
              <NewsletterSignup source={`blog:${post.slug}`} />
            </div>
          </div>
        </motion.div>

        {/* Bottom Banner Ad */}
        <div className="mt-12">
          <GoogleAd slot="5555555555" style={{ height: '250px' }} format="rectangle" />
        </div>
      </main>
    </article>
  )
}
