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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const tool = await db.tool.findUnique({
    where: { slug, published: true },
    include: { category: true },
  })

  if (!tool) {
    return generateSeoMetadata({
      title: 'Alternatives Not Found',
      description: 'The requested alternatives page could not be found.',
      type: 'website',
      noIndex: true,
    })
  }

  return generateSeoMetadata({
    title: `${tool.name} Alternatives (2025) - Best Similar AI Tools`,
    description: `Explore the best alternatives to ${tool.name}. Compare features, pricing, ratings, and pick the best tool for your workflow.`
      .slice(0, 155),
    type: 'website',
    canonical: `${SITE_URL}/alternatives/${tool.slug}`,
  })
}

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const tool = await db.tool.findUnique({
    where: { slug, published: true },
    include: { category: true, tags: true },
  })

  if (!tool) notFound()

  const alternatives = await db.tool.findMany({
    where: {
      published: true,
      categoryId: tool.categoryId,
      id: { not: tool.id },
    },
    include: { category: true, tags: true },
    take: 18,
    orderBy: [{ rating: 'desc' }, { featured: 'desc' }, { trending: 'desc' }, { views: 'desc' }],
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'AI Tools', url: `${SITE_URL}/ai-tools` },
    { name: tool.name, url: `${SITE_URL}/tool/${tool.slug}` },
    { name: 'Alternatives', url: `${SITE_URL}/alternatives/${tool.slug}` },
  ])

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tool.name} Alternatives`,
    description: `A curated list of alternatives to ${tool.name}.`,
    url: `${SITE_URL}/alternatives/${tool.slug}`,
    isPartOf: {
      '@type': 'WebSite',
      url: SITE_URL,
      name: 'ToolAtlas',
    },
    numberOfItems: alternatives.length,
    itemListElement: alternatives.map((alt, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: alt.name,
        url: `${SITE_URL}/tool/${alt.slug}`,
      },
    })),
  }

  return (
    <div className="min-h-screen">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />

      <PageHeader
        eyebrow={tool.category?.name ? `${tool.category.name} category` : 'Alternatives'}
        title={`${tool.name} Alternatives`}
        description={`Looking for a similar tool? Here are the best ${tool.category?.name || 'AI'} alternatives to ${tool.name}, ranked by ratings, popularity, and overall quality.`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'AI Tools', href: '/ai-tools' },
          { name: tool.name, href: `/tool/${tool.slug}` },
          { name: 'Alternatives', href: `/alternatives/${tool.slug}` },
        ]}
        right={
          <Link href={`/tool/${tool.slug}`} className="text-sm text-primary hover:underline">
            Read full review
          </Link>
        }
      />

      <ContentSection className="pb-16">
        <div className="glass rounded-2xl p-6 mb-10">
          <SectionHeader title="Affiliate disclosure" description="We may earn a commission when you buy through some links." />
          <div className="mt-4">
            <AffiliateDisclosure />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tool.pricingType ? (
              <Badge variant="secondary" className="bg-white/5 border border-white/10">{tool.pricingType}</Badge>
            ) : null}
            {tool.rating ? (
              <Badge variant="secondary" className="bg-white/5 border border-white/10">{tool.rating}/5 rating</Badge>
            ) : null}
            {tool.tags?.slice(0, 5).map((t) => (
              <Link key={t.id} href={`/ai-tools?tags=${t.slug}`}>
                <Badge variant="secondary" className="bg-white/5 border border-white/10 hover:bg-white/10">{t.name}</Badge>
              </Link>
            ))}
          </div>
        </div>

        {alternatives.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-2">No alternatives found yet</h2>
            <p className="text-muted-foreground">Add more tools to this category to automatically populate this page.</p>
          </div>
        ) : (
          <>
            <SectionHeader
              title="Best similar tools"
              description="These are the strongest options in the same category."
              right={
                <Link href="/ai-tools" className="text-sm text-muted-foreground hover:text-foreground">
                  Browse all tools
                </Link>
              }
            />

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {alternatives.map((alt) => (
                <ToolCard key={alt.id} tool={alt as any} />
              ))}
            </div>

            <div className="mt-10 glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2">Compare two tools</h3>
              <p className="text-muted-foreground mb-4">You can compare any two tools using a dedicated versus page.</p>
              {alternatives[0] ? (
                <Link href={`/vs/${tool.slug}-vs-${alternatives[0].slug}`} className="text-primary hover:underline">
                  Compare {tool.name} vs {alternatives[0].name}
                </Link>
              ) : null}
            </div>
          </>
        )}
      </ContentSection>
    </div>
  )
}
