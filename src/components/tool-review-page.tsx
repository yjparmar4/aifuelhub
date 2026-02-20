'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tool } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ExternalLink, Star, Check, X, ArrowRight, BookOpen, Users, Tag, Share2, TrendingUp, Award, Zap, Clock } from 'lucide-react'
import { AggressiveCTA, VerifiedCTA, SoftCTA } from '@/components/affiliate-button'
import { InlineAd, BannerAd } from '@/components/ad-placeholder'
import { motion } from 'framer-motion'
import { Tooltip } from '@/components/ui/tooltip'
import { AffiliateDisclosure } from '@/components/affiliate-disclosure'
import { PageHeader } from '@/components/page-header'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { expertiseBadges, getLastUpdatedDate } from '@/lib/eeat-enhancements'

export default function ToolReviewPage({ tool, relatedTools }: { tool: Tool, relatedTools?: Tool[] }) {
  const safeParseList = (str: string | undefined | null, fallback: any[] = []) => {
    if (!str) return fallback;
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch { return fallback; }
  };
  const features = safeParseList(tool.features);
  const pros = safeParseList(tool.pros);
  const cons = safeParseList(tool.cons);
  const useCases = safeParseList(tool.useCases);
  const faqs = safeParseList(tool.faqs);
  const defaultCompare = relatedTools && relatedTools.length > 0 ? relatedTools[0] : undefined

  const takeaways: string[] = [
    tool.pricingType === 'Free'
      ? 'Free to use (no paid plan required to get started).'
      : (tool.startingPrice && tool.startingPrice !== 'undefined')
        ? `Pricing starts at ${tool.startingPrice}.`
        : 'Paid pricing (see official site for latest plans).',
    tool.rating ? `User rating: ${tool.rating}/5 (${tool.reviewCount} reviews).` : 'Ratings: not enough public data yet.',
    ...(Array.isArray(features) ? features.slice(0, 2) : []),
  ].filter(Boolean)

  const bestFor: string[] = [
    ...(Array.isArray(useCases) ? useCases.slice(0, 3) : []),
  ]

  const quickFaqs = Array.isArray(faqs) ? faqs.slice(0, 2) : []

  const pricingColor = {
    Free: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    Freemium: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    Paid: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  }[tool.pricingType]

  return (
    <div className="min-h-screen">

      <PageHeader
        eyebrow={tool.category?.name || 'AI Tool'}
        title={tool.name}
        description={tool.tagline || tool.description}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'AI Tools', href: '/ai-tools' },
          ...(tool.category?.slug && tool.category?.name
            ? [{ name: tool.category.name, href: `/ai-tools/${tool.category.slug}` }]
            : []),
          { name: tool.name, href: `/tool/${tool.slug}` },
        ]}
        right={
          <div className="space-y-3 w-[320px] max-w-full">
            <div className="flex flex-wrap gap-2">
              <Badge className={pricingColor} variant="outline">
                {tool.pricingType}
              </Badge>
              {tool.startingPrice ? <Badge variant="secondary">{tool.startingPrice}</Badge> : null}
              {tool.featured ? (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </Badge>
              ) : null}
              {tool.trending ? (
                <Badge variant="outline" className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              ) : null}
              {tool.sponsored ? (
                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                  <Award className="w-3 h-3 mr-1" />
                  Sponsored
                </Badge>
              ) : null}
              {/* E-E-A-T Expert Badges */}
              <Badge variant="outline" className={`${expertiseBadges['expert-tested'].color} text-white border-none`}>
                <Check className="w-3 h-3 mr-1" />
                {expertiseBadges['expert-tested'].label}
              </Badge>
              <Badge variant="outline" className={`${expertiseBadges['verified-review'].color} text-white border-none`}>
                <Check className="w-3 h-3 mr-1" />
                {expertiseBadges['verified-review'].label}
              </Badge>
            </div>

            {/* Freshness Signal */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/30 px-2 py-1 rounded-md w-fit">
              <Clock className="w-3 h-3" />
              Last {getLastUpdatedDate(new Date(tool.createdAt || Date.now()), new Date(tool.updatedAt || Date.now()), 'long')}
            </div>

            {tool.rating ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(tool.rating!) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'}`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-foreground">{tool.rating}</span>
                <span>({tool.reviewCount} reviews)</span>
              </div>
            ) : null}

            <div className="glass rounded-2xl p-4">
              <VerifiedCTA
                href={tool.affiliateLink || tool.websiteUrl}
                text={tool.affiliateCTA || 'Try Now'}
                rating={tool.rating || undefined}
              />
              <div className="mt-3">
                <AffiliateDisclosure />
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <Link href={`/alternatives/${tool.slug}`} className="text-sm text-primary hover:underline">
                  View {tool.name} alternatives
                </Link>
                {defaultCompare ? (
                  <Link href={`/vs/${tool.slug}-vs-${defaultCompare.slug}`} className="text-sm text-primary hover:underline">
                    Compare vs {defaultCompare.name}
                  </Link>
                ) : null}
              </div>
              <Link href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="block mt-3">
                <Button variant="outline" className="w-full">
                  Visit Official Website
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        }
      />

      <div className="container mx-auto max-w-7xl px-4 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Key takeaways</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {takeaways.slice(0, 4).map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Best for</CardTitle>
            </CardHeader>
            <CardContent>
              {bestFor.length > 0 ? (
                <ul className="space-y-2">
                  {bestFor.map((u: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              ) : tool.targetAudience ? (
                <p className="text-muted-foreground">{tool.targetAudience}</p>
              ) : (
                <p className="text-muted-foreground">Creators, marketers, founders, and teams evaluating AI tools.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {quickFaqs.length > 0 ? (
          <div className="mt-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">Quick FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickFaqs.map((faq: any, idx: number) => (
                  <div key={idx} className="space-y-1">
                    <div className="font-semibold">{faq.question}</div>
                    <div className="text-muted-foreground">{faq.answer}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>

      <main className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {/* What is Tool Name */}
            <section>
              <h2 className="text-3xl font-bold mb-6">What is {tool.name}?</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-4">{tool.description}</p>
                {tool.longDescription && (
                  <div className="text-muted-foreground whitespace-pre-line">
                    {tool.longDescription}
                  </div>
                )}
              </div>
            </section>

            <BannerAd />

            {/* Key Features */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                Key Features
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Pricing */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Pricing</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className={`${pricingColor} text-base px-4 py-2`} variant="outline">
                      {tool.pricingType}
                    </Badge>
                    {tool.startingPrice && (
                      <div className="text-2xl font-bold">{tool.startingPrice}</div>
                    )}
                  </div>
                  <p className="text-muted-foreground">
                    {tool.pricingType === 'Free' && `${tool.name} is completely free to use with no hidden costs.`}
                    {tool.pricingType === 'Freemium' && `${tool.name} offers a free tier with limited features. ${tool.startingPrice && tool.startingPrice !== 'undefined' ? `Upgrade to unlock advanced capabilities starting at ${tool.startingPrice}.` : 'Upgrade options available for advanced capabilities.'}`}
                    {tool.pricingType === 'Paid' && `${tool.name} requires a subscription${tool.startingPrice && tool.startingPrice !== 'undefined' ? ` starting at ${tool.startingPrice}` : ''}. Various pricing plans are available to suit different needs.`}
                  </p>
                </CardContent>
              </Card>
            </section>

            <InlineAd />

            {/* Who Should Use It */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                Who Should Use {tool.name}?
              </h2>
              {tool.targetAudience && (
                <p className="text-lg text-muted-foreground mb-6">{tool.targetAudience}</p>
              )}

              {useCases.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Best Use Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {useCases.map((useCase: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0" />
                          <span>{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* Pros & Cons */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Pros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pros.map((pro: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                        <span className="text-muted-foreground">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-rose-500/20">
                <CardHeader>
                  <CardTitle className="text-rose-600 dark:text-rose-400 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    Cons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {cons.map((con: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-1" />
                        <span className="text-muted-foreground">{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Monetized CTA */}
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-purple-500/10 border-primary/20">
              <CardContent className="py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Try {tool.name}?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Join thousands of users who are already using {tool.name} to boost their productivity.
                </p>
                <AggressiveCTA href={tool.affiliateLink || tool.websiteUrl} text={`Get Started with ${tool.name} Now`} />
              </CardContent>
            </Card>

            {/* Alternatives */}
            {relatedTools && relatedTools.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  Top Alternatives to {tool.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedTools.map(alt => (
                    <Link key={alt.id} href={`/tool/${alt.slug}`} className="block h-full">
                      <Card className="h-full hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {alt.name}
                            <Badge variant="secondary" className="text-xs font-normal ml-auto">{alt.pricingType}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {alt.description}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                            {alt.rating || 'N/A'}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {faqs.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  Frequently Asked Questions
                </h2>
                <Card>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible>
                      {faqs.map((faq: any, idx: number) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Final Verdict */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Final Verdict</h2>
              <Card className="bg-gradient-to-br from-primary/5 to-background">
                <CardContent className="pt-6">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg mb-4">
                      {tool.name} is a{' '}
                      {tool.rating && tool.rating >= 4.5 ? 'top-tier' : tool.rating && tool.rating >= 4 ? 'solid' : tool.rating && tool.rating >= 3 ? 'capable' : 'promising'}
                      {' '}{tool.category?.name?.toLowerCase()} tool that{' '}
                      {tool.rating && tool.rating >= 4 ? 'delivers excellent value' : 'offers good capabilities'}.
                    </p>
                    <p className="text-muted-foreground">
                      With its {tool.pricingType.toLowerCase()} pricing model{' '}
                      {(tool.startingPrice && tool.startingPrice !== 'undefined') ? `starting at ${tool.startingPrice}` : ''}, it's{' '}
                      {tool.pricingType === 'Free' ? 'accessible to everyone' :
                        tool.pricingType === 'Freemium' ? 'great for getting started' :
                          'worth the investment for serious users'}.
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <AggressiveCTA
                      href={tool.affiliateLink || tool.websiteUrl}
                      text={`Try ${tool.name} ${tool.pricingType === 'Free' ? 'for Free' : 'Now'}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <NewsletterSignup
                source={`tool:${tool.slug}`}
                title="Get new tools & deals weekly"
                description="Join AI Fuel Hub for weekly AI tool updates, comparisons, and discounts."
              />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-4 space-y-6">
              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Pricing</div>
                    <Badge className={pricingColor} variant="outline">
                      {tool.pricingType}
                    </Badge>
                    {tool.startingPrice && (
                      <div className="text-sm font-medium mt-1">{tool.startingPrice}</div>
                    )}
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Rating</div>
                    {tool.rating ? (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{tool.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({tool.reviewCount})
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No ratings yet</span>
                    )}
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Category</div>
                    <Link href={`/ai-tools/${tool.category?.slug}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        {tool.category?.icon} {tool.category?.name}
                      </Badge>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Main CTA */}
              <Card className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-xl font-bold mb-3">Try {tool.name}</h3>
                  <p className="text-sm mb-4 text-primary-foreground/80">
                    Get started with the {tool.pricingType.toLowerCase()} plan today
                  </p>
                  <AggressiveCTA
                    href={tool.affiliateLink || tool.websiteUrl}
                    text={tool.affiliateCTA || 'Get Started'}
                  />
                </CardContent>
              </Card>

              <InlineAd />

              {/* Tags */}
              {tool.tags && tool.tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <Link key={tag.id} href={`/ai-tools?tags=${tag.slug}`}>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                            {tag.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Popular Alternatives (SEO Links) */}
              {relatedTools && relatedTools.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Popular Alternatives
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {relatedTools.slice(0, 4).map(alt => (
                      <div key={alt.id} className="flex flex-col text-sm">
                        <Link href={`/tool/${alt.slug}`} className="font-medium hover:underline">
                          {alt.name}
                        </Link>
                        <Link href={`/alternatives/${alt.slug}`} className="text-xs text-muted-foreground hover:text-primary">
                          View {alt.name} alternatives →
                        </Link>
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <Link href={`/alternatives/${tool.slug}`} className="block text-center text-sm font-medium text-primary hover:underline">
                      See all {tool.name} alternatives
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Share */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: tool.name,
                          url: window.location.href,
                        })
                      }
                    }}
                  >
                    Share this review
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
