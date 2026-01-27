'use client'

import { BlogPost } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GoogleAd } from '@/components/google-ad'
import { Calendar, Eye, Share2, BookOpen, Lightbulb, User, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Info, Target, ExternalLink, Image as ImageIcon, Heart, Clock, RefreshCw, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll } from 'framer-motion'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { RelatedPosts } from '@/components/related-posts'
import { AuthorBio } from '@/components/author-bio'
import { ContextualTools } from '@/components/contextual-tools'
import { getAuthorForTopic } from '@/lib/authors'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import React, { useMemo } from 'react'

interface SimpleTool {
  name: string
  slug: string
}

interface MentionedTool {
  name: string
  slug: string
  tagline?: string | null
  pricingType?: string | null
  rating?: number | null
}

interface BlogPostPageProps {
  post: BlogPost
  relatedPosts?: BlogPost[]
  tools?: SimpleTool[]
  mentionedTools?: MentionedTool[]
}

export default function BlogPostPage({ post, relatedPosts = [], tools = [], mentionedTools = [] }: BlogPostPageProps) {
  const content = post.content

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      })
    }
  }

  // AEO: Extract Quick Answer / Key Takeaways
  const quickAnswer = useMemo(() => {
    // First try to find explicit Quick Answer or Key Takeaways section
    const quickAnswerMatch = content.match(/##\s*(Quick Answer|Key Takeaways|Summary|TL;DR)[^\n]*\n([\s\S]*?)(?=##[^#]|$)/i)
    if (quickAnswerMatch) {
      return {
        title: quickAnswerMatch[1],
        text: quickAnswerMatch[2].trim()
      }
    }
    return null
  }, [content])

  // Auto-generate key takeaways from content if no explicit section exists
  const autoTakeaways = useMemo(() => {
    if (quickAnswer) return null // Don't generate if explicit takeaways exist

    const takeaways: string[] = []

    // Extract first few important bullet points from the content
    const bulletPoints = content.match(/^[-*]\s+(.+)$/gm)
    if (bulletPoints) {
      // Filter for informative bullets (longer, more substantive)
      const goodBullets = bulletPoints
        .map(b => b.replace(/^[-*]\s+/, '').trim())
        .filter(b => b.length > 30 && b.length < 200)
        .filter(b => !b.toLowerCase().startsWith('note:') && !b.toLowerCase().startsWith('warning:'))
        .slice(0, 5)

      takeaways.push(...goodBullets)
    }

    // If not enough bullets, try to extract from headings + first sentences
    if (takeaways.length < 3) {
      const headingParagraphs = content.match(/##\s+[^\n]+\n\n([^#\n][^\n]{50,150})/g)
      if (headingParagraphs) {
        const extracted = headingParagraphs
          .map(hp => {
            const lines = hp.split('\n\n')
            return lines[1]?.trim() || ''
          })
          .filter(p => p.length > 50 && p.length < 200)
          .slice(0, 5 - takeaways.length)

        takeaways.push(...extracted)
      }
    }

    return takeaways.length >= 3 ? takeaways.slice(0, 5) : null
  }, [content, quickAnswer])

  // Featured Snippet: Extract "What is X?" definitions
  const definitions = useMemo(() => {
    const defs: { term: string; definition: string }[] = []

    // Pattern 1: "What is X?" followed by answer
    const whatIsPattern = /###?\s*What\s+is\s+([^?\n]+)\??[\s\n]+([^#\n][^\n]{50,250})/gi
    let match
    while ((match = whatIsPattern.exec(content)) !== null) {
      defs.push({
        term: match[1].trim().replace(/\?$/, ''),
        definition: match[2].trim()
      })
    }

    // Pattern 2: Term followed by "is" definition in first paragraph
    if (defs.length === 0) {
      const firstParaMatch = content.match(/^[^#\n][^\n]*?\*\*([^*]+)\*\*\s+is\s+([^.!?\n]{30,200}[.!?])/m)
      if (firstParaMatch) {
        defs.push({
          term: firstParaMatch[1].trim(),
          definition: `${firstParaMatch[1].trim()} is ${firstParaMatch[2].trim()}`
        })
      }
    }

    return defs.length > 0 ? defs.slice(0, 3) : null
  }, [content])

  // GEO: Entity Auto-Linking helper
  // This function takes a string and returns an array of nodes with known tools linked
  const processTextWithAutoLinks = (text: string) => {
    if (!tools || tools.length === 0 || !text) return text

    // Sort tools by length (descending) to match longest names first (e.g. "GitHub Copilot" before "GitHub")
    const sortedTools = [...tools].sort((a, b) => b.name.length - a.name.length)

    // Build a regex pattern from tool names (escape regex special chars)
    const pattern = new RegExp(`\\b(${sortedTools.map(t => t.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'g')

    const parts = []
    let lastIndex = 0
    let match

    // We scan the text for matches
    while ((match = pattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }

      const toolName = match[0]
      const tool = sortedTools.find(t => t.name === toolName)

      if (tool) {
        parts.push(
          <Link
            key={`${tool.slug}-${match.index}`}
            href={`/tool/${tool.slug}`}
            className="text-primary font-medium hover:underline inline-flex items-center gap-0.5"
          >
            {toolName}
          </Link>
        )
      } else {
        parts.push(toolName)
      }

      lastIndex = pattern.lastIndex
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  // Recursive function to process React nodes and apply auto-linking to strings
  const processChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, child => {
      if (typeof child === 'string') {
        return processTextWithAutoLinks(child)
      }
      return child
    })
  }

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />


      {/* Minimal Sticky Nav */}
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
            {/* Category & Date with Last Updated */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6 font-medium justify-center">
              {post.category && (
                <Link href={`/blog?category=${post.category.slug}`} className="text-primary hover:underline uppercase tracking-wider text-xs font-bold">
                  {post.category.name}
                </Link>
              )}
              <span className="text-gray-300 hidden sm:inline">•</span>
              <time dateTime={new Date(post.publishedAt || post.createdAt).toISOString()} className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              {/* Last Updated Badge - Important for SEO freshness signal */}
              {post.updatedAt && new Date(post.updatedAt) > new Date(post.publishedAt || post.createdAt) && (
                <>
                  <span className="text-gray-300 hidden sm:inline">•</span>
                  <time
                    dateTime={new Date(post.updatedAt).toISOString()}
                    className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full text-xs font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Updated {new Date(post.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </>
              )}
              {/* Freshness badge for recent content */}
              {new Date(post.updatedAt || post.publishedAt || post.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000 && (
                <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs px-2 py-0.5">
                  ✨ Fresh for 2026
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading leading-[1.15] tracking-tight text-gray-900 dark:text-gray-50 text-center">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-heading leading-relaxed text-center max-w-2xl mx-auto speakable-summary">
                {post.excerpt}
              </p>
            )}

            {/* Author + Reading Time */}
            <div className="flex flex-wrap items-center gap-4 justify-center mb-8">
              {/* Author Byline */}
              {(() => {
                const author = getAuthorForTopic(post.title)
                return (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {author?.name.split(' ').map(n => n[0]).join('') || 'AI'}
                    </div>
                    <div className="text-left">
                      <span className="block font-semibold text-sm text-gray-900 dark:text-gray-100 leading-none mb-1">
                        {author?.name || 'AI Fuel Hub Team'}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {author?.expertise?.[0] || 'Editorial Staff'}
                      </span>
                    </div>
                  </div>
                )
              })()}

              {/* Separator */}
              <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">•</span>

              {/* Reading Time */}
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>{Math.ceil(content.split(/\s+/).length / 200)} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 pb-24">

        {post.coverImage && (
          <div className="mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 aspect-[21/9] object-cover"
              priority
            />
          </div>
        )}

        {/* AEO: Quick Answer Box - Zero Click Optimization */}
        {quickAnswer && (
          <div className="mb-10 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900 shadow-sm relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-indigo-600 dark:text-indigo-400 shrink-0">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  {quickAnswer.title}
                </h3>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
                  <ReactMarkdown>{quickAnswer.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auto-Generated Key Takeaways - When no explicit section exists */}
        {autoTakeaways && (
          <div className="mb-10 p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 rounded-2xl border border-amber-200/60 dark:border-amber-800 shadow-sm">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
              <div className="p-1.5 bg-amber-500 rounded-lg">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {autoTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-amber-800/90 dark:text-amber-200/90">
                  <span className="mt-0.5 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </span>
                  <span className="text-sm leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Featured Snippet: Definition Boxes */}
        {definitions && definitions.length > 0 && definitions.map((def, idx) => (
          <div
            key={idx}
            className="mb-8 p-5 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 rounded-xl border border-slate-200 dark:border-slate-700"
            itemScope
            itemType="https://schema.org/DefinedTerm"
          >
            <dt className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2" itemProp="name">
              <Info className="w-5 h-5 text-blue-500" />
              What is {def.term}?
            </dt>
            <dd className="text-slate-700 dark:text-slate-300 leading-relaxed" itemProp="description">
              {def.definition}
            </dd>
          </div>
        ))}

        {/* Enhanced Table of Contents Box with Gradient */}
        <div className="mb-12 p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/30 dark:via-blue-950/30 dark:to-indigo-950/30 rounded-2xl border border-purple-200 dark:border-purple-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-blue-300/20 dark:from-purple-500/10 dark:to-blue-500/10 rounded-full blur-3xl" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2 relative z-10">
            <BookOpen className="w-4 h-4" /> In this article
          </h3>
          <nav className="space-y-2 relative z-10">
            {content.split('\n').filter(line => line.trim().startsWith('## ')).slice(0, 8).map((line, idx) => (
              <a
                key={idx}
                href={`#section-${idx}`}
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all pl-3 border-l-2 border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-400 hover:pl-4 hover:font-medium"
              >
                {line.replace(/^#+\s*/, '').trim()}
              </a>
            ))}
          </nav>
        </div>

        {/* Article Body - Premium Decorative Styling */}
        <article className="prose prose-lg prose-gray dark:prose-invert max-w-none
          prose-p:text-[1.125rem] prose-p:leading-[1.85] prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:font-serif
          prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-50
          prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:tracking-tight
          prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:my-10 prose-img:shadow-md
          prose-li:text-[1.1rem] prose-li:leading-[1.8] prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:font-serif
          prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50/50 dark:prose-blockquote:bg-amber-900/10 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
          prose-pre:bg-slate-900 prose-pre:rounded-xl prose-pre:shadow-lg prose-pre:border prose-pre:border-slate-700
          prose-code:bg-primary/10 prose-code:text-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
          prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
          prose-ul:my-6 prose-ol:my-6
        ">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              /* Explicitly define p component to handle auto-linking */
              p: ({ children, ...props }) => (
                <p {...props}>{processChildren(children)}</p>
              ),
              /* Apply auto-linking to list items as well */
              li: ({ children, ...props }) => {
                const childStr = String(children).toLowerCase()
                let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                if (childStr.includes('warning') || childStr.includes('avoid') || childStr.includes("don't")) {
                  icon = <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                } else if (childStr.includes('tip') || childStr.includes('pro')) {
                  icon = <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                } else if (childStr.includes('important') || childStr.includes('note')) {
                  icon = <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                } else if (childStr.includes('benefit') || childStr.includes('advantage')) {
                  icon = <Heart className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                } else if (childStr.includes('step') || childStr.includes('first') || childStr.includes('next')) {
                  icon = <Target className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                } else if (childStr.includes('feature') || childStr.includes('include')) {
                  icon = <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                }

                // Process children for auto-linking even inside the enhanced list item
                const processedChildren = processChildren(children)

                return (
                  <li {...props} className="flex items-start gap-3 text-[1.1rem] leading-[1.8] text-gray-700 dark:text-gray-300 font-serif">
                    {icon}
                    <span className="flex-1">{processedChildren}</span>
                  </li>
                )
              },
              /* Decorative H2 with gradient border and contextual icon */
              h2: ({ children, ...props }) => {
                const headings = content
                  .split('\n')
                  .filter((line) => line.trim().startsWith('## '))
                  .map((line) => line.replace(/^#+\s*/, '').trim())
                const text = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : ''
                const idx = Math.max(0, headings.findIndex((h) => h === text))

                // Contextual emoji based on heading content
                const getIcon = (t: string) => {
                  const lower = t.toLowerCase()
                  if (lower.includes('best') || lower.includes('top')) return '🏆'
                  if (lower.includes('how') || lower.includes('guide')) return '📖'
                  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) return '💰'
                  if (lower.includes('feature')) return '✨'
                  if (lower.includes('verdict') || lower.includes('conclusion')) return '⚖️'
                  if (lower.includes('faq') || lower.includes('question')) return '❓'
                  if (lower.includes('compare') || lower.includes('vs')) return '⚔️'
                  if (lower.includes('pros') || lower.includes('cons')) return '📊'
                  if (lower.includes('tip') || lower.includes('trick')) return '💡'
                  if (lower.includes('step')) return '🎯'
                  if (lower.includes('benefit')) return '🎁'
                  if (lower.includes('warning') || lower.includes('avoid')) return '⚠️'
                  if (lower.includes('important') || lower.includes('note')) return '📝'
                  if (lower.includes('example')) return '💎'
                  if (lower.includes('result') || lower.includes('outcome')) return '🚀'
                  return '📌'
                }

                return (
                  <h2
                    id={`section-${idx >= 0 ? idx : 0}`}
                    {...props}
                    className="flex items-center gap-3 text-2xl md:text-3xl font-bold mt-14 mb-6 pb-4 border-b-2 border-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 relative"
                  >
                    <span className="text-3xl filter drop-shadow-lg">{getIcon(text)}</span>
                    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      {children}
                    </span>
                  </h2>
                )
              },
              /* Enhanced blockquote with multiple styles */
              blockquote: ({ children, ...props }) => {
                const childStr = String(children).toLowerCase()
                const isWarning = childStr.includes('warning') || childStr.includes('avoid') || childStr.includes('caution')
                const isTip = childStr.includes('tip') || childStr.includes('pro tip')
                const isImportant = childStr.includes('important') || childStr.includes('note')
                const isExample = childStr.includes('example')

                const processedChildren = processChildren(children)

                if (isWarning) {
                  return (
                    <blockquote {...props} className="relative border-l-4 border-red-500 pl-6 py-4 pr-4 my-8 bg-gradient-to-r from-red-50 to-red-50/30 dark:from-red-950/30 dark:to-transparent rounded-r-xl">
                      <span className="absolute -left-3 top-4 text-2xl">⚠️</span>
                      <div className="text-gray-700 dark:text-gray-300 font-serif text-lg leading-relaxed">
                        {processedChildren}
                      </div>
                    </blockquote>
                  )
                }
                if (isTip) {
                  return (
                    <blockquote {...props} className="relative border-l-4 border-emerald-500 pl-6 py-4 pr-4 my-8 bg-gradient-to-r from-emerald-50 to-emerald-50/30 dark:from-emerald-950/30 dark:to-transparent rounded-r-xl">
                      <span className="absolute -left-3 top-4 text-2xl">💡</span>
                      <div className="text-gray-700 dark:text-gray-300 font-serif text-lg leading-relaxed">
                        {processedChildren}
                      </div>
                    </blockquote>
                  )
                }
                if (isImportant) {
                  return (
                    <blockquote {...props} className="relative border-l-4 border-blue-500 pl-6 py-4 pr-4 my-8 bg-gradient-to-r from-blue-50 to-blue-50/30 dark:from-blue-950/30 dark:to-transparent rounded-r-xl">
                      <span className="absolute -left-3 top-4 text-2xl">📝</span>
                      <div className="text-gray-700 dark:text-gray-300 font-serif text-lg leading-relaxed">
                        {processedChildren}
                      </div>
                    </blockquote>
                  )
                }
                if (isExample) {
                  return (
                    <blockquote {...props} className="relative border-l-4 border-purple-500 pl-6 py-4 pr-4 my-8 bg-gradient-to-r from-purple-50 to-purple-50/30 dark:from-purple-950/30 dark:to-transparent rounded-r-xl">
                      <span className="absolute -left-3 top-4 text-2xl">💎</span>
                      <div className="text-gray-700 dark:text-gray-300 font-serif text-lg leading-relaxed">
                        {processedChildren}
                      </div>
                    </blockquote>
                  )
                }
                return (
                  <blockquote {...props} className="relative border-l-4 border-amber-400 pl-6 py-4 pr-4 my-8 bg-gradient-to-r from-amber-50 to-amber-50/30 dark:from-amber-900/20 dark:to-transparent rounded-r-xl">
                    <span className="absolute -left-3 top-4 text-2xl">💡</span>
                    <div className="text-gray-700 dark:text-gray-300 font-serif text-lg leading-relaxed">
                      {processedChildren}
                    </div>
                  </blockquote>
                )
              },
              /* Links with external icon and hover effects */
              a: ({ href, children, ...props }) => {
                const isExternal = href?.startsWith('http') && !href?.includes('aifuelhub.com')
                return (
                  <a
                    href={href}
                    {...props}
                    className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800 dark:hover:text-purple-300 hover:underline inline-flex items-center gap-1 transition-all hover:translate-x-1"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                    {isExternal && <ExternalLink className="w-3.5 h-3.5 opacity-70" />}
                  </a>
                )
              },
              /* Enhanced tables with hover effects and gradient headers */
              table: ({ ...props }) => (
                <div className="overflow-x-auto my-10 rounded-2xl border-2 border-purple-200 dark:border-purple-800 shadow-lg">
                  <table {...props} className="w-full text-sm" />
                </div>
              ),
              th: ({ ...props }) => (
                <th {...props} className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-5 py-4 text-left font-bold uppercase text-xs tracking-wider" />
              ),
              td: ({ ...props }) => (
                <td {...props} className="px-5 py-4 border-b border-purple-100 dark:border-purple-900 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors" />
              ),
              /* Enhanced images with captions and decorative border */
              img: ({ alt, ...props }) => (
                <figure className="my-10">
                  <div className="relative">
                    <img {...props} alt={alt} className="w-full rounded-2xl shadow-xl border-2 border-purple-200 dark:border-purple-800" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500/10 to-blue-500/10 pointer-events-none" />
                  </div>
                  {alt && (
                    <figcaption className="mt-4 text-center text-sm text-purple-700 dark:text-purple-300 italic flex items-center justify-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      {alt}
                    </figcaption>
                  )}
                </figure>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        {/* Contextual Tools - Internal Linking */}
        {mentionedTools && mentionedTools.length > 0 && (
          <ContextualTools tools={mentionedTools} />
        )}

        {/* Full Author Bio - E-E-A-T Optimization */}
        {(() => {
          const author = getAuthorForTopic(post.title)
          return author ? <AuthorBio author={author} /> : null
        })()}

        {/* Footer: Tags */}
        <div className="mt-12 pt-10 border-t border-gray-100 dark:border-gray-800">

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

          {/* Related Posts Section - Important for Internal Linking SEO */}
          {relatedPosts && relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} title="You May Also Like" />
          )}
        </div>

      </main>
    </article>
  )
}
