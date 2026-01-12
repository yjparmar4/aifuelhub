import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { SITE_URL, generateMetadata as generateSeoMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, X, DollarSign, ExternalLink, HelpCircle } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { ContentSection } from '@/components/content-section'
import { AffiliateDisclosure } from '@/components/affiliate-disclosure'
import { AggressiveCTA } from '@/components/affiliate-button'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const tool = await db.tool.findUnique({
        where: { slug, published: true },
    })

    if (!tool) {
        return generateSeoMetadata({
            title: 'Pricing Not Found',
            description: 'The requested pricing page could not be found.',
            type: 'website',
            noIndex: true,
        })
    }

    return generateSeoMetadata({
        title: `${tool.name} Pricing (2025) - Cost & Plans Explained`,
        description: `How much does ${tool.name} cost? Detailed breakdown of ${tool.name} pricing, free plans, subscriptions, and whether it's worth the money.`,
        type: 'article',
        canonical: `${SITE_URL}/pricing/${tool.slug}`,
    })
}

export async function generateStaticParams() {
    const tools = await db.tool.findMany({
        where: { published: true },
        select: { slug: true },
    })
    return tools.map((tool) => ({ slug: tool.slug }))
}

export default async function ToolPricingPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const tool = await db.tool.findUnique({
        where: { slug, published: true },
        include: { category: true },
    })

    if (!tool) notFound()

    // SEO Schema
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'AI Tools', url: `${SITE_URL}/ai-tools` },
        { name: tool.name, url: `${SITE_URL}/tool/${tool.slug}` },
        { name: 'Pricing', url: `${SITE_URL}/pricing/${tool.slug}` },
    ])

    // Simple pricing analysis logic
    const isFree = tool.pricingType === 'Free'
    const isFreemium = tool.pricingType === 'Freemium'

    return (
        <div className="min-h-screen">
            <JsonLd data={breadcrumbSchema} />

            <PageHeader
                eyebrow="Pricing Guide"
                title={`${tool.name} Pricing`}
                description={`Everything you need to know about ${tool.name} costs, plans, and value for money.`}
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: 'Pricing', href: '#' },
                    { name: tool.name, href: `/pricing/${tool.slug}` },
                ]}
                right={
                    <Link href={tool.affiliateLink || tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/25 border-0">
                            Check Current Prices
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                }
            />

            <ContentSection className="pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {/* Main Pricing Insight */}
                        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    <DollarSign className="w-6 h-6 text-primary" />
                                    How much is {tool.name}?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-4xl font-bold">
                                    {tool.startingPrice ? (
                                        tool.startingPrice === 'undefined' ? (
                                            <span>Variable Pricing</span>
                                        ) : (
                                            <span>{tool.startingPrice}<span className="text-lg font-normal text-muted-foreground"> / start</span></span>
                                        )
                                    ) : (
                                        <span>{isFree ? 'Free' : 'Contact for pricing'}</span>
                                    )}
                                </div>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {isFree && `${tool.name} is completely free to use.`}
                                    {isFreemium && `${tool.name} allows you to get started for free, but limits some features found in the paid plans.`}
                                    {!isFree && !isFreemium && `${tool.name} is a paid tool.`}
                                    {' '}
                                    {tool.description}
                                </p>

                                <div className="pt-4">
                                    <AffiliateDisclosure />
                                </div>
                            </CardContent>
                        </Card>

                        {/* FAQ Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-muted-foreground" />
                                    Pricing FAQ
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Is {tool.name} free?</h3>
                                    <p className="text-muted-foreground">
                                        {isFree
                                            ? `Yes, ${tool.name} is free to use.`
                                            : isFreemium
                                                ? `Partially. ${tool.name} has a free version or free trial, but you will need to pay for advanced features.`
                                                : `No, ${tool.name} typically requires a paid subscription, though they may offer a trial period.`
                                        }
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Do I need a credit card to sign up?</h3>
                                    <p className="text-muted-foreground">
                                        {isFree || isFreemium
                                            ? "Usually, free tiers do not require a credit card."
                                            : "Most paid tools require a payment method to start a subscription or trial."
                                        }
                                        {' '}Check their <a href={tool.websiteUrl} target="_blank" className="text-primary hover:underline">official site</a> to be sure.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-8">
                            <Link href={`/tool/${tool.slug}`}>
                                <Button variant="outline" className="w-full">
                                    Read Full {tool.name} Review
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing Model</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Badge className="w-full justify-center py-2 text-base mb-4" variant={isFree ? 'default' : 'secondary'}>
                                    {tool.pricingType}
                                </Badge>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Starting Price</span>
                                        <span className="font-medium">{tool.startingPrice || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Category</span>
                                        <span className="font-medium">{tool.category?.name}</span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <AggressiveCTA
                                        href={tool.affiliateLink || tool.websiteUrl}
                                        text={isFree ? "Use for Free" : "View Plans"}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </ContentSection>
        </div>
    )
}
