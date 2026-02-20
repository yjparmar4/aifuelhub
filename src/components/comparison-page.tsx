'use client'

import { Comparison, Tool } from '@/types'
import { ComparisonTable } from '@/components/comparison-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AggressiveCTA } from '@/components/affiliate-button'
import { InlineAd } from '@/components/ad-placeholder'
import { CheckCircle2, XCircle, Scale, Trophy, ArrowRight, BookOpen, Star, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ComparisonPage({
  comparison,
  tools,
  showBreadcrumb = true,
  showHeader = true,
}: {
  comparison: Comparison
  tools: Tool[]
  showBreadcrumb?: boolean
  showHeader?: boolean
}) {
  // Generate common features for comparison table
  const commonFeatures = [
    'User Interface',
    'API Access',
    'Integration Options',
    'Mobile Support',
    'Free Trial',
    'Customer Support',
    'Customization',
    'Security Features',
  ]

  const safeParseList = (str: string | null | undefined): string[] => {
    if (!str) return []
    try {
      const parsed = JSON.parse(str)
      return Array.isArray(parsed) ? parsed : []
    } catch { return [] }
  }

  // Determine winner based on ratings
  const winner = tools.reduce((prev, current) => {
    if (!prev.rating) return current
    if (!current.rating) return prev
    return (current.rating || 0) > (prev.rating || 0) ? current : prev
  }, tools[0])

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      {showBreadcrumb ? (
        <nav className="py-4 px-4 bg-muted/30 border-b">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href="/ai-tools" className="hover:text-foreground">AI Tools</Link>
              <span>/</span>
              <span className="text-foreground">Comparisons</span>
            </div>
          </div>
        </nav>
      ) : null}

      {/* Visual VS Header */}
      {showHeader ? (
        <section className="py-20 px-4 relative overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/20 to-slate-900/90 pointer-events-none" />
          {/* Abstract Shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-600/30 rounded-full blur-[120px]" />
            <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            >
              {/* Tool A */}
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white shadow-2xl shadow-purple-900/20 flex items-center justify-center text-4xl md:text-5xl font-bold text-slate-800 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-2deg]">
                  {tools[0].name[0]}
                </div>
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold">{tools[0].name}</h2>
                  {tools[0].rating && (
                    <div className="flex items-center justify-center gap-1 mt-2 text-amber-400">
                      <Star className="w-5 h-5 fill-amber-400" />
                      <span className="font-bold text-lg text-white">{tools[0].rating}</span>
                      <span className="text-slate-400 text-sm">/5</span>
                    </div>
                  )}
                </div>
              </div>

              {/* VS Badge */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl mb-2">
                  <span className="font-black text-xl md:text-2xl italic tracking-wider">VS</span>
                </div>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-white/10">
                  Detailed Comparison
                </Badge>
              </div>

              {/* Tool B */}
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white shadow-2xl shadow-blue-900/20 flex items-center justify-center text-4xl md:text-5xl font-bold text-slate-800 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[2deg]">
                  {tools[1].name[0]}
                </div>
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold">{tools[1].name}</h2>
                  {tools[1].rating && (
                    <div className="flex items-center justify-center gap-1 mt-2 text-amber-400">
                      <Star className="w-5 h-5 fill-amber-400" />
                      <span className="font-bold text-lg text-white">{tools[1].rating}</span>
                      <span className="text-slate-400 text-sm">/5</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <div className="text-center mt-12 max-w-2xl mx-auto">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                {comparison.title}
              </h1>
              {comparison.description && (
                <p className="text-lg text-slate-300">
                  {comparison.description}
                </p>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="space-y-16">

          {/* Quick Stats Grid - Moved from Sidebar */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Total Reviews</span>
                <span className="text-3xl font-bold text-slate-900">{tools.reduce((sum, t) => sum + t.reviewCount, 0)}</span>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Winner Rating</span>
                <span className="text-3xl font-bold text-amber-500">{winner?.rating || 'N/A'}</span>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-slate-200 md:col-span-2">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold block">Our Top Pick</span>
                  <span className="text-2xl font-bold text-slate-900">{winner?.name || 'TBD'}</span>
                </div>
                {winner && (
                  <Link href={`/tool/${winner.slug}`}>
                    <Button className="rounded-full">
                      Read Review <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Tools Overview */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">At a Glance</h2>
              <p className="text-slate-600 mt-2">Quick summary of what each tool offers.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tools.map((tool) => (
                <Card key={tool.id} className="border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center justify-between">
                      {tool.name}
                      {tool.rating && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200">
                          <Star className="w-3 h-3 fill-amber-700 mr-1" /> {tool.rating}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-slate-600 leading-relaxed min-h-[80px]">
                      {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Badge variant="outline" className={
                        tool.pricingType === 'Free' ? 'bg-green-50 text-green-700 border-green-200' :
                          tool.pricingType === 'Freemium' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-purple-50 text-purple-700 border-purple-200'
                      }>
                        {tool.pricingType}
                      </Badge>
                      {tool.startingPrice && (
                        <Badge variant="outline" className="bg-slate-50">
                          Starts at {tool.startingPrice}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <InlineAd />

          {/* Comparison Table */}
          <section className="scroll-mt-20" id="comparison-table">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Feature Comparison</h2>
              <p className="text-slate-600 mt-2">In-depth look at capabilities and specs.</p>
            </div>
            <div className="shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden border border-slate-200">
              <ComparisonTable tools={tools} features={commonFeatures} />
            </div>
          </section>

          {/* Detailed Analysis Cards */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Deep Dive</h2>
              <p className="text-slate-600 mt-2">Pros, cons, and detailed breakdowns.</p>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {tools.map((tool) => (
                <Card key={tool.id} className="overflow-hidden border-slate-200">
                  <div className="h-2 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
                  <CardHeader>
                    <CardTitle className="text-2xl">{tool.name} Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2 text-emerald-700">
                          <CheckCircle2 className="w-5 h-5" /> What we like
                        </h4>
                        {tool.pros ? (
                          <ul className="space-y-3">
                            {safeParseList(tool.pros).map((pro: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        ) : <p className="text-muted-foreground italic">No pros listed.</p>}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2 text-rose-700">
                          <XCircle className="w-5 h-5" /> Drawbacks
                        </h4>
                        {tool.cons ? (
                          <ul className="space-y-3">
                            {safeParseList(tool.cons).map((con: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        ) : <p className="text-muted-foreground italic">No cons listed.</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Final Verdict Section */}
          <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
              <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-300 border-none px-4 py-1 text-sm font-bold">
                OFFICIAL VERDICT
              </Badge>

              <h2 className="text-3xl md:text-5xl font-bold">
                The Winner: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">{winner?.name || 'Tie'}</span>
              </h2>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                {comparison.verdictText || `After comparing features, pricing, and performance, ${winner?.name} stands out as the better choice for most users.`}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                {winner && (
                  <Link href={winner.affiliateLink || winner.websiteUrl} target="_blank" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-bold h-14 px-8 rounded-full">
                      Get {winner.name} Now <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                )}
                <Link href="/compare" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 h-14 px-8 rounded-full">
                    Compare Others
                  </Button>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
