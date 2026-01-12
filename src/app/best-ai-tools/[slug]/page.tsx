import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { SITE_URL, generateMetadata as generateSeoMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { ToolCard } from '@/components/tool-card'
import { Badge } from '@/components/ui/badge'
import { AffiliateDisclosure } from '@/components/affiliate-disclosure'
import { PageHeader } from '@/components/page-header'
import { ContentSection } from '@/components/content-section'
import { SectionHeader } from '@/components/section-header'

// Utilities to clean up slugs for display
function formatSlugToTitle(slug: string) {
    return slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params

    // Try to find tag
    const tag = await db.tag.findUnique({
        where: { slug: slug.replace('for-', '') }, // Handle "for-students" -> "students" if needed, or just match exact slug
    })

    // If no tag found, checking if it matches a "target audience" or "use case" via full-text search 
    // might be too complex for a dynamic route without a dedicated model. 
    // For now, we strictly assume these map to Tags.

    if (!tag) {
        // Fallback: Check if the slug starts with 'for-' and try again
        if (slug.startsWith('for-')) {
            const cleanSlug = slug.replace('for-', '')
            const cleanTag = await db.tag.findUnique({ where: { slug: cleanSlug } })
            if (cleanTag) {
                return generateSeoMetadata({
                    title: `Best AI Tools for ${cleanTag.name} (2025)`,
                    description: `Discover the best AI tools for ${cleanTag.name}. Curated list of top-rated software to improve your workflow.`,
                    type: 'website',
                    canonical: `${SITE_URL}/best-ai-tools/${slug}`,
                })
            }
        }

        return generateSeoMetadata({
            title: 'Topic Not Found',
            description: 'The requested topic could not be found.',
            type: 'website',
            noIndex: true,
        })
    }

    return generateSeoMetadata({
        title: `Best AI Tools for ${tag.name} (2025) - Top Picks`,
        description: `Discover the best AI tools for ${tag.name}. Browse our curated list of top-rated software designed for ${tag.name}.`,
        type: 'website',
        canonical: `${SITE_URL}/best-ai-tools/${slug}`,
    })
}

export async function generateStaticParams() {
    const tags = await db.tag.findMany({
        select: { slug: true },
    })

    // also generate "for-[slug]" variants? 
    // Let's stick to strict tag slugs first to avoid bloat, 
    // user can name their tag "students" and route will be /best-ai-tools/students
    // which reads "Best AI Tools > Students". 

    return tags.map((tag) => ({
        slug: tag.slug,
    }))
}

export default async function BestAiToolsDynamicPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    // Logic: 
    // 1. Exact tag match
    // 2. "for-[tag]" match

    let tag = await db.tag.findUnique({
        where: { slug },
    })

    if (!tag && slug.startsWith('for-')) {
        tag = await db.tag.findUnique({
            where: { slug: slug.replace('for-', '') }
        })
    }

    if (!tag) notFound()

    const tools = await db.tool.findMany({
        where: {
            published: true,
            tags: {
                some: {
                    id: tag.id
                }
            }
        },
        include: { category: true, tags: true },
        orderBy: [{ rating: 'desc' }, { views: 'desc' }],
        take: 50,
    })

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Best AI Tools', url: `${SITE_URL}/best-ai-tools` },
        { name: `For ${tag.name}`, url: `${SITE_URL}/best-ai-tools/${slug}` },
    ])

    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Best AI Tools for ${tag.name}`,
        description: `A curated list of the best AI tools for ${tag.name}.`,
        url: `${SITE_URL}/best-ai-tools/${slug}`,
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: tool.name,
                url: `${SITE_URL}/tool/${tool.slug}`,
            },
        })),
    }

    return (
        <div className="min-h-screen">
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={collectionSchema} />

            <PageHeader
                eyebrow="Curated Collection"
                title={`Best AI Tools for ${tag.name}`}
                description={`We've curated the best AI tools for ${tag.name} to help you work smarter. Compare features, pricing, and ratings.`}
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: 'Best AI Tools', href: '/best-ai-tools' },
                    { name: `For ${tag.name}`, href: `/best-ai-tools/${slug}` },
                ]}
            />

            <ContentSection className="pb-16">
                <div className="glass rounded-2xl p-6 mb-10">
                    <SectionHeader title="Affiliate disclosure" description="We may earn a commission when you buy through some links." />
                    <div className="mt-4">
                        <AffiliateDisclosure />
                    </div>
                </div>

                {tools.length === 0 ? (
                    <div className="glass rounded-2xl p-10 text-center">
                        <h2 className="text-2xl font-bold mb-2">No tools found</h2>
                        <p className="text-muted-foreground">We haven't tagged any tools for {tag.name} yet. Check back soon!</p>
                        <Link href="/ai-tools" className="mt-4 inline-block text-primary hover:underline">Browse all tools</Link>
                    </div>
                ) : (
                    <>
                        <SectionHeader
                            title={`Top rated tools`}
                            description={`Ranked by community ratings and popularity.`}
                            right={
                                <span className="text-sm text-muted-foreground">{tools.length} tools found</span>
                            }
                        />

                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {tools.map((tool, idx) => (
                                <ToolCard key={tool.id} tool={tool as any} showRank rank={idx + 1} />
                            ))}
                        </div>
                    </>
                )}
            </ContentSection>
        </div>
    )
}
