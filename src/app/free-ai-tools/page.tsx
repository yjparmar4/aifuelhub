import { db } from '@/lib/db'
import { ToolCard } from '@/components/tool-card'
import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Best Free AI Tools (2025) - Use AI for Free',
    description: 'Discover the best completely free and open-source AI tools. No credit card required.',
}

export default async function FreeAiToolsPage() {
    const tools = await db.tool.findMany({
        where: {
            published: true,
            OR: [
                { pricingType: 'Free' },
                { pricingType: 'Freemium' } // Include Freemium but maybe filter later or label clearly
            ]
        },
        orderBy: { views: 'desc' },
        include: { category: true }
    })

    // Prioritize purely Free tools
    const purelyFree = tools.filter(t => t.pricingType === 'Free')
    const freemium = tools.filter(t => t.pricingType === 'Freemium')

    return (
        <div className="min-h-screen">
            <PageHeader
                eyebrow="Community Favorites"
                title="Best Free AI Tools"
                description="A curated collection of the best AI tools you can use for free. No credit card required for most options."
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: 'Free AI Tools', href: '/free-ai-tools' }
                ]}
            />

            <div className="container mx-auto px-4 max-w-7xl pb-20">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6 border border-green-200">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">100% Verified Free Options</span>
                    </div>
                    <p className="text-xl text-slate-600">
                        Don't want to pay monthly subscriptions? We've found {purelyFree.length} completely free tools and {freemium.length} generous freemium options.
                    </p>
                </div>

                {/* Purely Free Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-green-500" />
                        Completely Free AI Tools
                    </h2>
                    {purelyFree.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {purelyFree.map(tool => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500">No completely free tools found yet.</p>
                    )}
                </section>

                {/* Freemium Section */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-blue-500" />
                        Top Freemium Tools (Free Tiers)
                    </h2>
                    {freemium.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {freemium.map(tool => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500">No freemium tools found yet.</p>
                    )}
                </section>

                <div className="mt-20 text-center">
                    <h3 className="text-2xl font-bold mb-4">Want more options?</h3>
                    <Link href="/ai-tools">
                        <Button size="lg" variant="outline">Browse All AI Tools</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
