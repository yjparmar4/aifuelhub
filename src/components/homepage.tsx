'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Sparkles, TrendingUp, Star, ArrowRight, Zap, BarChart3, Target, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ToolCard } from '@/components/tool-card'
import { CategoryCard } from '@/components/category-card'
import { AggressiveCTA } from '@/components/affiliate-button'
import { InlineAd, BannerAd } from '@/components/ad-placeholder'
import { Tool, Category, BlogPost } from '@/types'
import { motion } from 'framer-motion'

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [trendingTools, setTrendingTools] = useState<Tool[]>([])
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([])
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, trendingRes, featuredRes, postsRes] = await Promise.all([
          fetch('/api/categories?includeToolCount=true'),
          fetch('/api/tools?limit=6&featured=true'),
          fetch('/api/tools?limit=6&trending=true'),
          fetch('/api/blog?limit=3'),
        ])

        const [categoriesData, trendingData, featuredData, postsData] = await Promise.all([
          categoriesRes.json(),
          trendingRes.json(),
          trendingRes.json(),
          postsRes.json(),
        ])

        setCategories(categoriesData.categories || [])
        setFeaturedTools(featuredData.tools || [])
        setTrendingTools(trendingData.tools || [])
        setLatestPosts(postsData.posts || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/ai-tools?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-5xl relative z-10"
        >
          <div className="text-center space-y-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Discover 1000+ AI Tools
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Discover the Best{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                AI Tools
              </span>{' '}
              for Every Task
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert reviews, detailed comparisons, and comprehensive guides to help you find the perfect AI-powered software for your needs.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search AI tools by name, category, or use case..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-14 text-lg"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8">
                  Search
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {['ChatGPT', 'Midjourney', 'Claude', 'GitHub Copilot'].map((term) => (
                <Link key={term} href={`/ai-tools?search=${encodeURIComponent(term)}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    {term}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { icon: Zap, label: 'Tools Reviewed', value: '1,000+' },
              { icon: Star, label: 'Expert Reviews', value: '5,000+' },
              { icon: TrendingUp, label: 'Categories', value: '50+' },
              { icon: CheckCircle2, label: 'Verified Tools', value: '100%' },
            ].map((stat, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Featured Categories */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Categories</h2>
              <p className="text-muted-foreground">Browse AI tools by category to find exactly what you need</p>
            </div>
            <Link href="/ai-tools">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category, idx) => (
              <CategoryCard key={category.id} category={category} toolCount={category._count?.tools || 0} />
            ))}
          </div>
        </section>

        {/* Ad Banner */}
        <BannerAd />

        {/* Trending Tools */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Trending AI Tools</h2>
                <p className="text-muted-foreground">Hot tools everyone is using right now</p>
              </div>
            </div>
            <Link href="/ai-tools?trending=true">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTools.slice(0, 6).map((tool, idx) => (
              <ToolCard key={tool.id} tool={tool} showRank rank={idx + 1} />
            ))}
          </div>
        </section>

        {/* Monetized CTA Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-purple-500/10 border-primary/20">
            <CardContent className="py-12 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4">Find Your Perfect AI Tool Today</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our expert reviews and comparisons help you make informed decisions. Save time and money by choosing the right AI tool from the start.
              </p>
              <Link href="/ai-tools">
                <AggressiveCTA href="/ai-tools" text="Explore All AI Tools" />
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Featured Tools */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Tools</h2>
                <p className="text-muted-foreground">Hand-picked tools our editors recommend</p>
              </div>
            </div>
            <Link href="/ai-tools?featured=true">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Latest Blog Posts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest from the Blog</h2>
              <p className="text-muted-foreground">Expert insights and guides for AI-powered productivity</p>
            </div>
            <Link href="/blog">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                      <Badge variant="secondary">{post.category?.name}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose AI Tools Directory?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're dedicated to helping you find the best AI tools with unbiased reviews and expert insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                title: 'Expert Reviews',
                description: 'Our team tests and reviews every tool to give you honest, in-depth assessments.',
              },
              {
                icon: BarChart3,
                title: 'Detailed Comparisons',
                description: 'Side-by-side comparisons help you see the differences and make the right choice.',
              },
              {
                icon: Target,
                title: 'User-Focused',
                description: 'We prioritize tools that deliver real value and solve actual user problems.',
              },
            ].map((feature, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <feature.icon className="w-10 h-10 mb-4 text-primary" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section>
          <Card className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated with AI Tools</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/80">
                Get weekly updates on new tools, exclusive reviews, and expert tips delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-background text-foreground"
                />
                <Button size="lg" variant="secondary" className="flex-1">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
