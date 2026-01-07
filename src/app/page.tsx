import Link from 'next/link';
import { ArrowRight, Star, TrendingUp, BarChart3, Target, Shield, Zap, BookOpen, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import { PremiumHero } from '@/components/home/premium-hero';
import { NewsletterCTA } from '@/components/home/newsletter-cta';
import { CategoryCard } from '@/components/category-card';
import { ToolCard } from '@/components/tool-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/ui/motion-wrapper';
import { TrustBackground } from '@/components/home/trust-background';
import { FAQSection } from '@/components/home/faq-section';
import { generateEntitySchema } from '@/lib/geo-schema';

export const metadata: Metadata = {
  title: 'AI Fuel Hub - Discover & Compare 118+ AI Tools | Expert Reviews 2026',
  description: 'The ultimate AI tools directory with 118+ verified tools. Compare features, pricing, and reviews of ChatGPT, Midjourney, Claude, and more. Expert-tested, unbiased recommendations.',
  keywords: 'AI tools, artificial intelligence, AI directory, ChatGPT alternatives, Midjourney alternatives, AI writing tools, AI image generators, AI coding tools, best AI software 2026',
  authors: [{ name: 'AI Fuel Hub Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.aifuelhub.com',
    siteName: 'AI Fuel Hub',
    title: 'AI Fuel Hub - Discover & Compare 118+ AI Tools | Expert Reviews 2026',
    description: 'The ultimate AI tools directory with 118+ verified tools. Compare features, pricing, and reviews of ChatGPT, Midjourney, Claude, and more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Fuel Hub - AI Tools Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Fuel Hub - Discover & Compare 118+ AI Tools',
    description: 'The ultimate AI tools directory with 118+ verified tools. Expert-tested, unbiased recommendations.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

async function getHomepageData() {
  const [categories, featuredTools, trendingTools, latestComparisons, latestPosts] = await Promise.all([
    // Top Categories (by tool count or priority)
    db.category.findMany({
      take: 8,
      orderBy: { tools: { _count: 'desc' } },
      include: {
        _count: {
          select: { tools: true },
        },
      },
    }),
    // Featured Tools
    db.tool.findMany({
      where: { published: true, featured: true },
      take: 6,
      include: { category: true },
      orderBy: { views: 'desc' },
    }),
    // Trending Tools
    db.tool.findMany({
      where: { published: true, trending: true },
      take: 6,
      include: { category: true },
      orderBy: { updatedAt: 'desc' },
    }),
    // Latest Comparisons
    db.comparison.findMany({
      where: { published: true },
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: {
        tools: {
          include: {
            tool: true
          }
        }
      }
    }),
    // Latest Blog Posts
    db.blogPost.findMany({
      where: { published: true },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      include: { category: true },
    }),
  ]);

  return { categories, featuredTools, trendingTools, latestComparisons, latestPosts };
}

export default async function Home() {
  const { categories, featuredTools, trendingTools, latestComparisons, latestPosts } = await getHomepageData();

  // Comprehensive Schema Markup for SEO/AEO/GEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Fuel Hub",
    "url": "https://www.aifuelhub.com",
    "logo": "https://www.aifuelhub.com/logo.png",
    "description": "The ultimate AI tools directory with 118+ verified tools. Expert-tested, unbiased recommendations for AI-powered software.",
    "founders": [
      {
        "@type": "Person",
        "name": "AI Fuel Hub Team"
      }
    ],
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/aifuelhub",
      "https://linkedin.com/company/aifuelhub",
      "https://github.com/aifuelhub"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@aifuelhub.com",
      "url": "https://www.aifuelhub.com/contact"
    }
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Fuel Hub",
    "url": "https://www.aifuelhub.com",
    "description": "Discover and compare 118+ AI tools with expert reviews. The ultimate AI tools directory.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.aifuelhub.com/ai-tools?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Fuel Hub",
      "url": "https://www.aifuelhub.com"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.aifuelhub.com"
      }
    ]
  };

  const articleSchema = latestPosts.map(post => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "url": `https://www.aifuelhub.com/blog/${post.slug}`,
    "datePublished": post.publishedAt?.toISOString(),
    "dateModified": post.updatedAt?.toISOString(),
    "author": {
      "@type": "Organization",
      "name": "AI Fuel Hub"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Fuel Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aifuelhub.com/logo.png"
      }
    }
  }));

  return (
    <div className="min-h-screen bg-transparent">
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateEntitySchema()} />
      {articleSchema.map((schema, i) => <JsonLd key={i} data={schema} />)}

      {/* 1. Premium Hero Section */}
      <PremiumHero />

      {/* 2. Top Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white via-violet-50/20 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <FadeIn>
            <div className="flex items-center justify-between mb-16">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-rose-100 text-violet-700 text-sm font-semibold mb-4">
                  <Target className="w-4 h-4" />
                  Browse by Category
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Explore Categories</h2>
                <p className="text-lg text-muted-foreground max-w-2xl">Browse tools by use case to find exactly what you need.</p>
              </div>
              <Link href="/categories">
                <Button variant="outline" className="hidden sm:flex group rounded-xl border-2 hover:bg-accent">
                  View All Categories
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          <StaggerChildren delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <StaggerItem key={category.id}>
                  <CategoryCard
                    category={category as any}
                    toolCount={category._count.tools}
                  />
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>

          <FadeIn delay={0.5}>
            <div className="mt-12 text-center sm:hidden">
              <Link href="/categories">
                <Button variant="outline" className="w-full rounded-xl border-2">
                  View All Categories
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Trending & Featured Tools Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-violet-100/20 via-transparent to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-rose-100/20 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">

          {/* Trending Row */}
          <FadeIn>
            <div className="mb-28">
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-violet-600 to-violet-700 rounded-lg shadow-md">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold mb-2">
                      🔥 HOT RIGHT NOW
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">Trending Tools</h2>
                    <p className="text-lg text-muted-foreground mt-1 max-w-xl">Most popular AI tools this week based on user engagement</p>
                  </div>
                </div>
                <Link href="/ai-tools?trending=true">
                  <Button variant="outline" className="hidden sm:flex text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-md border-2">
                    See All Trending <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <StaggerChildren delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {trendingTools.map((tool, idx) => (
                    <StaggerItem key={tool.id}>
                      <ToolCard tool={tool as any} showRank rank={idx + 1} />
                    </StaggerItem>
                  ))}
                </div>
              </StaggerChildren>
            </div>
          </FadeIn>

          {/* Featured Row */}
          <FadeIn delay={0.3}>
            <div>
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-rose-600 to-rose-700 rounded-lg shadow-md">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-2">
                      ✨ EDITOR'S PICKS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">Featured Tools</h2>
                    <p className="text-lg text-muted-foreground mt-1 max-w-xl">Hand-picked tools recommended by our expert editors</p>
                  </div>
                </div>
                <Link href="/ai-tools?featured=true">
                  <Button variant="outline" className="hidden sm:flex text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-md border-2">
                    See All Featured <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <StaggerChildren delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredTools.map((tool) => (
                    <StaggerItem key={tool.id}>
                      <ToolCard tool={tool as any} />
                    </StaggerItem>
                  ))}
                </div>
              </StaggerChildren>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* 4. Why Trust This Platform */}
      <section className="py-24 bg-gradient-to-br from-violet-900 via-violet-800 to-rose-900 text-white relative overflow-hidden">
        {/* Animated Background Orbs */}
        <TrustBackground />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Why Trust AI Fuel Hub?</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                We are different. We don't just list tools; we test, verify, and compare them to save you hours of research.
              </p>
            </div>
          </FadeIn>

          <StaggerChildren delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Unbiased Reviews", desc: "Our editors test tools manually to provide honest pros and cons, not just marketing copy." },
                { icon: Target, title: "Curated Selection", desc: "We filter out low-quality tools. Only the most useful and reliable AI software makes the cut." },
                { icon: BarChart3, title: "Data-Driven Ranks", desc: "Our rankings are based on real user reviews, traffic data, and community feedback." }
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center mb-5 shadow-md">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-violet-100 leading-relaxed text-base">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* 5. Best AI Tools (Money Pages Links) */}
      <section className="py-20 border-b border-gray-200 bg-gradient-to-b from-white to-violet-50/20 relative overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-violet-100/20 to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <FadeIn>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-rose-100 text-violet-700 text-sm font-semibold mb-4">
                <Star className="w-4 h-4" />
                Curated Collections
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Best AI Tools by Category</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Detailed rankings and reviews for specific use cases</p>
            </div>
          </FadeIn>

          <StaggerChildren delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Best AI Video Editors",
                  url: "/best/ai-video-editors",
                  icon: "🎥",
                  desc: "Create professional videos in minutes with AI.",
                  color: "from-violet-500 to-violet-600"
                },
                {
                  title: "Best AI Image Generators",
                  url: "/best/ai-image-generators",
                  icon: "🎨",
                  desc: "Turn text into stunning art and photorealistic images.",
                  color: "from-rose-500 to-rose-600"
                },
                {
                  title: "Best AI Writing Assistants",
                  url: "/best/ai-writing",
                  icon: "✍️",
                  desc: "Write blogs, emails, and copy 10x faster.",
                  color: "from-violet-600 to-violet-700"
                },
                {
                  title: "Best AI Coding Tools",
                  url: "/best/ai-coding-tools",
                  icon: "💻",
                  desc: "Autofill code, debug, and build apps rapidly.",
                  color: "from-rose-600 to-rose-700"
                },
                {
                  title: "Best AI for Marketing",
                  url: "/best/marketing",
                  icon: "📈",
                  desc: "Scale your marketing efforts with automation.",
                  color: "from-amber-500 to-amber-600"
                },
                {
                  title: "Best Free AI Tools",
                  url: "/free-ai-tools",
                  icon: "🎁",
                  desc: "Top-rated tools that don't cost a dime.",
                  color: "from-violet-700 to-rose-700"
                }
              ].map((link, i) => (
                <StaggerItem key={i}>
                  <Link href={link.url} className="group block h-full">
                    <div className="relative bg-white rounded-xl p-6 h-full flex flex-col items-center text-center border-2 border-transparent hover:border-violet-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md overflow-hidden">
                      {/* Hover Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${link.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${link.color} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-${link.color.split('-')[1]}-500/30 relative z-10`}>
                        {link.icon}
                      </div>
                      <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-gradient transition-all relative z-10">{link.title}</h3>
                      <p className="text-muted-foreground leading-relaxed relative z-10">{link.desc}</p>

                      {/* Arrow Icon on Hover */}
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500">
                        <ArrowRight className="w-5 h-5 text-violet-400" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* 6. Latest Comparisons */}
      {latestComparisons.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-soft-gradient to-background relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100/20 via-transparent to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <FadeIn>
              <div className="flex items-center justify-between mb-16">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
                    <BarChart3 className="w-4 h-4" />
                    Side-by-Side Analysis
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Head-to-Head Comparisons</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl">See how top tools stack up against each other with detailed feature comparisons.</p>
                </div>
                <Link href="/compare">
                  <Button variant="outline" className="hidden sm:flex group rounded-xl border-2 hover:bg-accent">
                    View All Comparisons
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <StaggerChildren delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {latestComparisons.map((comp) => (
                  <StaggerItem key={comp.id}>
                    <Link href={`/vs/${comp.slug}`} className="group block">
                      <div className="relative bg-white rounded-xl p-6 overflow-hidden border-2 border-transparent hover:border-violet-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                        {/* Hover Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-8">
                            {/* Tool 1 */}
                            <div className="flex flex-col items-center gap-3 w-1/3">
                              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-violet-100 to-rose-100 flex items-center justify-center text-2xl font-bold text-violet-700 shadow-md group-hover:scale-105 transition-transform duration-300">
                                {comp.tools[0]?.tool.name[0]}
                              </div>
                              <span className="font-bold text-foreground text-center text-lg">{comp.tools[0]?.tool.name}</span>
                            </div>

                            {/* VS Badge */}
                            <div className="flex flex-col items-center justify-center shrink-0">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center z-10 shadow-md group-hover:scale-105 transition-transform duration-300">
                                <span className="font-black text-xs text-white">VS</span>
                              </div>
                              <div className="h-[2px] w-24 bg-gradient-to-r from-violet-200 to-rose-200 -mt-6"></div>
                            </div>

                            {/* Tool 2 */}
                            <div className="flex flex-col items-center gap-3 w-1/3">
                              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-rose-100 to-violet-100 flex items-center justify-center text-2xl font-bold text-rose-700 shadow-md group-hover:scale-105 transition-transform duration-300">
                                {comp.tools[1]?.tool.name[0]}
                              </div>
                              <span className="font-bold text-foreground text-center text-lg">{comp.tools[1]?.tool.name}</span>
                            </div>
                          </div>

                          <div className="text-center pt-4 border-t border-border/50">
                            <span className="text-violet-600 font-bold text-sm group-hover:underline flex items-center justify-center gap-2">
                              Read Full Comparison
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </StaggerChildren>

            <FadeIn delay={0.5}>
              <div className="mt-10 text-center sm:hidden">
                <Link href="/compare">
                  <Button variant="outline" className="w-full rounded-xl border-2">
                    View All Comparisons
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* 7. Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-violet-100/30 to-transparent blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <FadeIn>
              <div className="flex items-center justify-between mb-16">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-rose-100 text-violet-700 text-sm font-semibold mb-4">
                    <BookOpen className="w-4 h-4" />
                    Latest Insights
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">From Our Blog</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl">Stay updated with the latest AI trends, tool reviews, and expert insights.</p>
                </div>
                <Link href="/blog">
                  <Button variant="outline" className="hidden sm:flex group rounded-xl border-2 hover:bg-accent">
                    View All Posts
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <StaggerChildren delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestPosts.map((post) => (
                  <StaggerItem key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="relative bg-white rounded-xl overflow-hidden border-2 border-transparent hover:border-violet-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full flex flex-col">
                        {/* Cover Image */}
                        {post.coverImage && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        )}

                        <div className="p-6 flex-1 flex flex-col">
                          {/* Category Badge */}
                          {post.category && (
                            <Badge className="w-fit bg-gradient-to-r from-violet-100 to-rose-100 text-violet-700 border-violet-200 hover:from-violet-200 hover:to-rose-200 transition-all font-semibold mb-3">
                              {post.category.name}
                            </Badge>
                          )}

                          {/* Title */}
                          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gradient transition-all line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center gap-4 pt-4 border-t border-border/50 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-violet-500" />
                              <span className="font-medium">
                                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-violet-500" />
                              <span className="font-medium">{post.views} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </StaggerChildren>

            <FadeIn delay={0.5}>
              <div className="mt-10 text-center sm:hidden">
                <Link href="/blog">
                  <Button variant="outline" className="w-full rounded-xl border-2">
                    View All Posts
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* 8. Newsletter CTA */}
      <NewsletterCTA />

      {/* 9. FAQ Section with AEO Schema */}
      <FAQSection />

    </div>
  );
}
