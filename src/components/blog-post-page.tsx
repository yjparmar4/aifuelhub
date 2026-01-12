'use client'

import { BlogPost } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GoogleAd } from '@/components/google-ad'
import { Calendar, Eye, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { NewsletterSignup } from '@/components/newsletter-signup'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

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
      {/* Premium Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 z-50 origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />

      {/* Premium Breadcrumb */}
      <nav className="py-5 px-4 border-b bg-white/70 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap overflow-hidden">
            <Link href="/" className="hover:text-primary hover:underline transition-all">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/blog" className="hover:text-primary hover:underline transition-all">Blog</Link>
            <span className="text-slate-300">/</span>
            <span className="text-foreground font-medium truncate">{post.title}</span>
          </div>
        </div>
      </nav>

      {/* Premium Article Header */}
      <header className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-b from-purple-50/50 to-transparent">
        {/* Decorative Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-purple-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {post.category && (
                <Link href={`/blog?category=${post.category.slug}`}>
                  <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200 hover:from-purple-200 hover:to-blue-200 transition-all font-semibold px-4 py-1.5">
                    {post.category.name}
                  </Badge>
                </Link>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-heading leading-tight tracking-tight text-gradient">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border/50 pt-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                <span className="font-medium">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              {post.views > 100 && (
                <>
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{post.views} views</span>
                </>
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

      {/* Premium Article Content */}
      <main className="container mx-auto max-w-4xl px-4 pb-24">
        {/* Top Banner Ad */}
        <div className="mb-12">
          <GoogleAd slot="1234567890" style={{ height: '90px' }} className="w-full flex justify-center" />
        </div>
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative overflow-hidden rounded-3xl mb-12 shadow-2xl shadow-purple-500/10 border border-border/50"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full object-cover aspect-video"
            />
          </motion.div>
        )}

        {/* Premium Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-white to-purple-50/30 border-2 border-purple-100 shadow-lg shadow-purple-500/5"
        >
          <h3 className="font-bold mb-6 flex items-center gap-3 text-sm uppercase tracking-wide text-muted-foreground">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            In this article
          </h3>
          <nav className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {content.split('\n').filter(line => line.trim().startsWith('#')).slice(0, 8).map((line, idx) => {
              const level = line.match(/^#+/)?.[0].length || 0;
              if (level > 2) return null;
              return (
                <a
                  key={idx}
                  href={`#heading-${idx}`}
                  className="text-sm text-foreground/80 hover:text-primary hover:pl-2 truncate transition-all duration-300 py-2 block border-l-2 border-transparent hover:border-purple-500 pl-3"
                >
                  {line.replace(/^#+\s*/, '').trim()}
                </a>
              )
            })}
          </nav>
        </motion.div>

        {/* Sidebar Ad (visible on desktop) */}
        <div className="hidden lg:block float-right ml-8 mb-8 w-[300px]">
          <GoogleAd slot="9876543210" style={{ height: '600px', width: '300px' }} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg prose-slate dark:prose-invert max-w-none
            prose-headings:font-heading prose-headings:font-bold prose-headings:scroll-mt-24
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-img:rounded-2xl prose-img:shadow-xl
            prose-p:text-lg prose-p:leading-8 prose-p:text-slate-700
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-gradient
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
            prose-strong:text-foreground prose-strong:font-semibold
            prose-blockquote:not-italic prose-blockquote:text-lg
          "
        >
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ ...props }) => <h2 id={`heading-${props.children?.toString().length}`} {...props} className="text-3xl font-bold mt-12 mb-6" />,
              h3: ({ ...props }) => <h3 id={`heading-${props.children?.toString().length}`} {...props} className="text-2xl font-semibold mt-8 mb-4 text-foreground/90" />,
              p: ({ ...props }) => <p {...props} className="leading-8 text-muted-foreground/90 mb-6" />,
              blockquote: ({ ...props }) => (
                <blockquote {...props} className="border-l-4 border-primary pl-6 py-2 my-8 italic text-lg text-muted-foreground bg-muted/20 pr-4 rounded-r-lg" />
              ),
              ul: ({ ...props }) => <ul {...props} className="my-6 space-y-2 list-disc pl-6 text-muted-foreground" />,
              li: ({ ...props }) => <li {...props} className="pl-1" />,
            }}
          >
            {content}
          </ReactMarkdown>
        </motion.div>

        {/* Premium Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 pt-10 border-t border-border/50"
          >
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/blog?tags=${tag.slug}`}>
                  <Badge className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-200 hover:from-purple-100 hover:to-blue-100 hover:border-purple-300 transition-all font-semibold">
                    # {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Premium Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 p-10 md:p-12 text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-20" />
            <div className="relative z-10">
              <NewsletterSignup source={`blog:${post.slug}`} />
            </div>
          </div>
        </motion.div>

        {/* Bottom Banner Ad */}
        <div className="mt-16">
          <GoogleAd slot="5555555555" style={{ height: '280px' }} format="rectangle" />
        </div>
      </main>
    </article>
  )
}
