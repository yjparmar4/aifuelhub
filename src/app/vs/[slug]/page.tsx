import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { SITE_URL, generateMetadata as generateSeoMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { generateBreadcrumbSchema } from '@/lib/schema'
import ComparisonPage from '@/components/comparison-page'
import { PageHeader } from '@/components/page-header'
import { ContentSection } from '@/components/content-section'

function parseVsSlug(slug: string) {
  const parts = slug.split('-vs-')
  if (parts.length !== 2) return null
  const [a, b] = parts
  if (!a || !b) return null
  return { a, b }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseVsSlug(slug)

  if (!parsed) {
    return generateSeoMetadata({
      title: 'Comparison Not Found',
      description: 'Invalid comparison slug.',
      type: 'website',
      noIndex: true,
    })
  }

  const [toolA, toolB] = await Promise.all([
    db.tool.findUnique({ where: { slug: parsed.a, published: true } }),
    db.tool.findUnique({ where: { slug: parsed.b, published: true } }),
  ])

  if (!toolA || !toolB) {
    return generateSeoMetadata({
      title: 'Comparison Not Found',
      description: 'The requested comparison could not be found.',
      type: 'website',
      noIndex: true,
    })
  }

  return generateSeoMetadata({
    title: `${toolA.name} vs ${toolB.name} (2025) - Which AI Tool Is Better?`,
    description: `Compare ${toolA.name} vs ${toolB.name} across pricing, features, rating, and best use cases.`.slice(0, 155),
    type: 'article',
    canonical: `${SITE_URL}/vs/${toolA.slug}-vs-${toolB.slug}`,
  })
}

export default async function VsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const parsed = parseVsSlug(slug)
  if (!parsed) notFound()

  const [toolA, toolB] = await Promise.all([
    db.tool.findUnique({
      where: { slug: parsed.a, published: true },
      include: { category: true, tags: true },
    }),
    db.tool.findUnique({
      where: { slug: parsed.b, published: true },
      include: { category: true, tags: true },
    }),
  ])

  if (!toolA || !toolB) notFound()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: `${toolA.name} vs ${toolB.name}`, url: `${SITE_URL}/vs/${toolA.slug}-vs-${toolB.slug}` },
  ])

  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${toolA.name} vs ${toolB.name}`,
    description: `Side-by-side comparison of ${toolA.name} and ${toolB.name}.`,
    url: `${SITE_URL}/vs/${toolA.slug}-vs-${toolB.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/vs/${toolA.slug}-vs-${toolB.slug}`,
    },
  }

  const comparison = {
    id: `${toolA.slug}-vs-${toolB.slug}`,
    title: `${toolA.name} vs ${toolB.name}`,
    slug: `${toolA.slug}-vs-${toolB.slug}`,
    description: `Compare ${toolA.name} and ${toolB.name} to choose the best AI tool for your workflow.`,
    metaTitle: undefined,
    metaDescription: undefined,
    verdict: toolA.rating && toolB.rating ? (toolA.rating >= toolB.rating ? toolA.name : toolB.name) : undefined,
    verdictText:
      toolA.rating && toolB.rating
        ? `${toolA.name} is rated ${toolA.rating}/5, while ${toolB.name} is rated ${toolB.rating}/5. Choose based on your feature needs and pricing.`
        : 'Choose based on your feature needs and pricing.',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tools: [],
  } as any

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={comparisonSchema} />

      <PageHeader
        eyebrow="Tool comparison"
        title={`${toolA.name} vs ${toolB.name}`}
        description={`Compare ${toolA.name} and ${toolB.name} across pricing, ratings, and key features to choose the best fit.`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Compare', href: '/compare' },
          { name: `${toolA.name} vs ${toolB.name}`, href: `/vs/${toolA.slug}-vs-${toolB.slug}` },
        ]}
        right={
          <div className="flex flex-col gap-2 text-sm">
            <Link href={`/alternatives/${toolA.slug}`} className="text-primary hover:underline">
              {toolA.name} alternatives
            </Link>
            <Link href={`/alternatives/${toolB.slug}`} className="text-primary hover:underline">
              {toolB.name} alternatives
            </Link>
          </div>
        }
      />

      <ContentSection className="pb-6">
        <div className="glass rounded-2xl p-4 text-sm text-muted-foreground flex flex-wrap gap-2 items-center">
          <span>Reviews:</span>
          <Link href={`/tool/${toolA.slug}`} className="text-primary hover:underline">{toolA.name}</Link>
          <span className="text-muted-foreground">|</span>
          <Link href={`/tool/${toolB.slug}`} className="text-primary hover:underline">{toolB.name}</Link>
        </div>
      </ContentSection>

      <ComparisonPage
        comparison={comparison}
        tools={[toolA as any, toolB as any]}
        showBreadcrumb={false}
        showHeader={false}
      />
    </>
  )
}
