import Link from 'next/link'
import { Metadata } from 'next'
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

export const metadata: Metadata = generateSeoMetadata({
  title: 'Best AI Tools (2025) - Top Rated & Most Popular',
  description:
    'Explore the best AI tools across writing, design, video, SEO, marketing, coding, automation, and productivity. Rankings based on popularity, ratings, and trends.',
  type: 'website',
  canonical: `${SITE_URL}/best-ai-tools`,
})

export default async function BestAiToolsPage() {
  const [topTools, categories] = await Promise.all([
    db.tool.findMany({
      where: { published: true },
      include: { category: true, tags: true },
      take: 36,
      orderBy: [{ featured: 'desc' }, { trending: 'desc' }, { rating: 'desc' }, { views: 'desc' }],
    }),
    db.category.findMany({
      where: { published: true },
      include: { _count: { select: { tools: true } } },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      take: 24,
    }),
  ])

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Best AI Tools', url: `${SITE_URL}/best-ai-tools` },
  ])

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best AI Tools',
    description:
      'A curated collection of the best AI tools across categories, ranked by popularity, ratings, and trends.',
    url: `${SITE_URL}/best-ai-tools`,
    numberOfItems: topTools.length,
    itemListElement: topTools.map((tool, index) => ({
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
        eyebrow="Programmatic SEO hub"
        title="Best AI Tools"
        description="Browse the top AI tools across categories. This hub is designed to help you find the right tool faster (and discover high-quality alternatives)."
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Best AI Tools', href: '/best-ai-tools' },
        ]}
        right={
          <Link href="/ai-tools" className="text-sm text-primary hover:underline">
            View full directory
          </Link>
        }
      />

      <ContentSection className="pb-16">
        <div className="glass rounded-2xl p-6 mb-10">
          <SectionHeader title="Popular categories" description="Jump into high-intent category pages." />
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/ai-tools/${cat.slug}`}>
                <Badge variant="secondary" className="bg-white/5 border border-white/10 hover:bg-white/10">
                  {cat.icon ? <span className="mr-1">{cat.icon}</span> : null}
                  {cat.name}
                  <span className="ml-2 text-muted-foreground">({cat._count.tools})</span>
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <SectionHeader
          title="Top picks"
          description="Updated automatically based on ratings & popularity."
        />

        <div className="mt-5 mb-6">
          <AffiliateDisclosure />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {topTools.map((tool, idx) => (
            <ToolCard key={tool.id} tool={tool as any} showRank rank={idx + 1} />
          ))}
        </div>

        <div className="mt-10 glass rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-2">Looking for something specific?</h3>
          <p className="text-muted-foreground mb-4">Use the directory filters to narrow by pricing, rating, and category.</p>
          <Link href="/ai-tools" className="text-primary hover:underline">
            Go to AI Tools Directory
          </Link>
        </div>
      </ContentSection>
    </div>
  )
}
