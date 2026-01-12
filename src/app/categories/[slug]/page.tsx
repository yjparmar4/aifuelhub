import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { ToolCard } from '@/components/tool-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { Tool } from '@/types'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const category = await db.category.findUnique({ where: { slug } })
    if (!category) return { title: 'Category Not Found' }
    return {
        title: `Best ${category.name} AI Tools (2025) | AI Fuel Hub`,
        description: category.description || `Discover and compare the best ${category.name} AI tools to boost your productivity.`,
    }
}

export async function generateStaticParams() {
    const categories = await db.category.findMany({ select: { slug: true } })
    return categories.map(c => ({ slug: c.slug }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const category = await db.category.findUnique({
        where: { slug },
        include: {
            tools: {
                where: { published: true },
                orderBy: [
                    { featured: 'desc' },
                    { views: 'desc' },
                ],
                include: {
                    category: true
                }
            }
        }
    })

    if (!category) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden mesh-background-deep">
                <div className="absolute inset-0 bg-white/40 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-multiply opacity-60" />
                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/categories" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-6xl drop-shadow-sm">{category.icon || '⚡'}</span>
                                <Badge variant="outline" className="text-lg px-4 py-1 border-purple-200 bg-purple-50 text-purple-700">
                                    {category.tools.length} Tools Available
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">
                                Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{category.name}</span> AI Tools
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                {category.description || `Explore our curated selection of the best ${category.name} tools powered by AI. Compare features, pricing, and reviews to find the perfect fit for your needs.`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tool Grid */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    {category.tools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.tools.map((tool) => (
                                <div key={tool.id} className="h-full">
                                    <ToolCard
                                        tool={{
                                            ...tool,
                                            category: category // Ensure category is attached
                                        } as unknown as Tool}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/10 rounded-3xl border border-white/5">
                            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-2">No tools found yet</h2>
                            <p className="text-muted-foreground mb-6">We haven't added any tools to this category yet. Check back soon!</p>
                            <Link href="/ai-tools">
                                <Button>Browse All Tools</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
