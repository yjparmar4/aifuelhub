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
import { Star, Check, X, ThumbsUp, MessageSquare } from 'lucide-react'
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
            title: 'Review Not Found',
            noIndex: true
        })
    }

    return generateSeoMetadata({
        title: `${tool.name} Review 2025: Is it Legit? (Honest Verdict)`,
        description: `Read our in-depth review of ${tool.name}. We analyze features, pros & cons, user ratings, and decide if it's the best AI tool for you.`,
        type: 'article',
        canonical: `${SITE_URL}/review/${tool.slug}`,
    })
}

export async function generateStaticParams() {
    const tools = await db.tool.findMany({ select: { slug: true } })
    return tools.map((tool) => ({ slug: tool.slug }))
}

export default async function ToolReviewSpecificPage({
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

    const safeParseList = (str: string | undefined | null, fallback: any[] = []) => {
        if (!str) return fallback;
        try {
            const parsed = JSON.parse(str);
            return Array.isArray(parsed) ? parsed : fallback;
        } catch { return fallback; }
    };
    const pros = safeParseList(tool.pros);
    const cons = safeParseList(tool.cons);
    const features = safeParseList(tool.features);

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Reviews', url: `${SITE_URL}/ai-tools` }, // Broad parent
        { name: `${tool.name} Review`, url: `${SITE_URL}/review/${tool.slug}` },
    ])

    return (
        <div className="min-h-screen">
            <JsonLd data={breadcrumbSchema} />

            <PageHeader
                eyebrow="Editorial Review"
                title={`${tool.name} Review`}
                description={`Our honest take on ${tool.name}. We tested its features, pricing, and usability so you don't have to.`}
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: 'Reviews', href: '#' },
                    { name: tool.name, href: `/review/${tool.slug}` },
                ]}
            />

            <ContentSection className="pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {/* Verdict Card */}
                        <Card className="bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ThumbsUp className="w-5 h-5 text-primary" />
                                    Our Verdict
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg leading-relaxed mb-6">
                                    {tool.longDescription || tool.description}
                                </p>
                                <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl border">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-primary">{tool.rating || '4.5'}</div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Rating</div>
                                    </div>
                                    <div className="h-10 w-px bg-border"></div>
                                    <div>
                                        <div className="font-semibold">{tool.name} is {tool.rating && tool.rating > 4 ? 'Highly Recommended' : 'Worth Checking Out'}</div>
                                        <div className="text-sm text-muted-foreground">Based on features, utility, and price.</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pros & Cons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-emerald-500/20">
                                <CardHeader><CardTitle className="text-emerald-600 flex items-center gap-2"><Check className="w-5 h-5" /> What we liked</CardTitle></CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {pros.length > 0 ? pros.map((p: string, i: number) => (
                                            <li key={i} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> {p}</li>
                                        )) : <li className="text-muted-foreground italic">No specific pros listed.</li>}
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="border-rose-500/20">
                                <CardHeader><CardTitle className="text-rose-600 flex items-center gap-2"><X className="w-5 h-5" /> What could be better</CardTitle></CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {cons.length > 0 ? cons.map((c: string, i: number) => (
                                            <li key={i} className="flex gap-2 text-sm"><X className="w-4 h-4 text-rose-500 shrink-0" /> {c}</li>
                                        )) : <li className="text-muted-foreground italic">No specific cons listed.</li>}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Features List */}
                        <Card>
                            <CardHeader><CardTitle>Key Features Tested</CardTitle></CardHeader>
                            <CardContent>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {features.map((f: string, i: number) => (
                                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/20">
                                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                            <span className="text-sm">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-8">
                            <AffiliateDisclosure />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Tool Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Rating</span>
                                    <div className="flex items-center text-amber-500 font-bold">
                                        {tool.rating}<Star className="w-4 h-4 ml-1 fill-current" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Reviews</span>
                                    <span>{tool.reviewCount}</span>
                                </div>
                                <div className="pt-4">
                                    <AggressiveCTA href={tool.affiliateLink || tool.websiteUrl} text="Visit Website" />
                                </div>
                                <Link href={`/pricing/${tool.slug}`} className="block text-center text-sm text-primary hover:underline">
                                    View Pricing Details
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </ContentSection>
        </div>
    )
}
