import Link from 'next/link';
import { ArrowRight, Star, Target, Shield, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/json-ld';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import { PremiumHero } from '@/components/home/premium-hero';
import { NewsletterCTA } from '@/components/home/newsletter-cta';
import { CategoryCard } from '@/components/category-card';
import { ToolCard } from '@/components/tool-card';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/ui/motion-wrapper';
import { TrustBackground } from '@/components/home/trust-background';
import { generateEntitySchema } from '@/lib/geo-schema';

export const metadata: Metadata = {
  title: 'AI Fuel Hub - Discover & Compare 118+ AI Tools | Expert Reviews 2026',
  description: 'Compare 118+ AI tools with honest reviews. Expert-tested ChatGPT, Midjourney, Claude alternatives. Find the best tool for your needs.',
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

import { unstable_cache } from 'next/cache';

const getHomepageData = unstable_cache(
  async () => {
    const [categories, featuredTools] = await Promise.all([
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
      })
    ]);

    return { categories, featuredTools };
  },
  ['homepage-data'],
  { revalidate: 3600, tags: ['homepage'] }
);

export default async function Home() {
  const { categories, featuredTools } = await getHomepageData();

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

  return (
    <div className="min-h-screen bg-transparent">
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateEntitySchema()} />

      {/* 1. Premium Hero Section */}
      <PremiumHero />

      {/* 2. Top Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white via-indigo-50/20 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <FadeIn>
            <div className="flex items-center justify-between mb-16">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-4">
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

      {/* 3. Featured Tools Section (Minimalist) */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-100/20 via-transparent to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-slate-100/20 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <FadeIn delay={0.3}>
            <div>
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg shadow-md">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold mb-2">
                      ✨ EDITOR'S PICKS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">Featured Tools</h2>
                    <p className="text-lg text-muted-foreground mt-1 max-w-xl">Hand-picked tools recommended by our expert editors</p>
                  </div>
                </div>
                <Link href="/ai-tools?featured=true">
                  <Button variant="outline" className="hidden sm:flex text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-md border-2">
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
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white relative overflow-hidden">
        {/* Animated Background Orbs */}
        <TrustBackground />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Why Trust AI Fuel Hub?</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
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
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mb-5 shadow-md">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-300 leading-relaxed text-base">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* 5. Newsletter CTA */}
      <NewsletterCTA />

    </div>
  );
}
