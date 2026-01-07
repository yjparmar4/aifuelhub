import { Metadata } from 'next'
import { generateMetadata as generateSeoMetadata } from '@/lib/seo'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import ComparisonPage from '@/components/comparison-page'
import { Tool, Comparison } from '@/types'
import { SITE_URL } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { PageHeader } from '@/components/page-header'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const comparison = await db.comparison.findUnique({
    where: { slug, published: true },
    include: {
      tools: {
        include: {
          tool: true,
        },
      },
    },
  })

  if (!comparison) {
    return {
      title: 'Comparison Not Found',
    }
  }

  const toolNames = comparison.tools
    ?.map(ct => ct.tool?.name)
    .filter(Boolean)
    .join(' vs ')

  return generateSeoMetadata({
    title: `${toolNames} Comparison 2025: Which is Best?`,
    description: comparison.description || `Compare ${toolNames} side-by-side. Features, pricing, and our expert verdict to help you choose.`,
    type: 'article',
    canonical: `${SITE_URL}/compare/${comparison.slug}`,
  })
}

export default async function ComparisonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const comparison = await db.comparison.findUnique({
    where: { slug, published: true },
    include: {
      tools: {
        include: {
          tool: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  })

  if (!comparison) {
    notFound()
  }

  const tools = comparison.tools?.map(ct => ({
    ...ct.tool!,
    tagline: ct.tool!.tagline || undefined,
    longDescription: ct.tool!.longDescription || undefined,
    metaTitle: ct.tool!.metaTitle || undefined,
    metaDescription: ct.tool!.metaDescription || undefined,
    startingPrice: ct.tool!.startingPrice || undefined,
    affiliateLink: ct.tool!.affiliateLink || undefined,
    affiliateCTA: ct.tool!.affiliateCTA || undefined,
    rating: ct.tool!.rating || undefined,
    sponsoredBy: ct.tool!.sponsoredBy || undefined,
    pros: ct.tool!.pros || undefined,
    cons: ct.tool!.cons || undefined,
    useCases: ct.tool!.useCases || undefined,
    faqs: ct.tool!.faqs || undefined,
    targetAudience: ct.tool!.targetAudience || undefined,
    category: ct.tool!.category ? { ...ct.tool!.category, icon: ct.tool!.category.icon || undefined } : undefined,
  })) as unknown as Tool[] || []

  const comparisonData = {
    ...comparison,
    description: comparison.description || undefined,
    verdict: comparison.verdict || undefined,
    verdictText: comparison.verdictText || undefined,
  } as unknown as Comparison

  const toolA = tools[0]
  const toolB = tools[1]

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: comparisonData.title, url: `${SITE_URL}/compare/${comparisonData.slug}` },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PageHeader
        eyebrow="Comparison"
        title={comparisonData.title}
        description={comparisonData.description || 'Side-by-side comparison to help you choose the best tool.'}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Compare', href: '/compare' },
          { name: comparisonData.title, href: `/compare/${comparisonData.slug}` },
        ]}
        right={
          <div className="flex flex-col gap-2 text-sm">
            {toolA ? (
              <Link href={`/tool/${toolA.slug}`} className="text-primary hover:underline">
                Read {toolA.name} review
              </Link>
            ) : null}
            {toolB ? (
              <Link href={`/tool/${toolB.slug}`} className="text-primary hover:underline">
                Read {toolB.name} review
              </Link>
            ) : null}
          </div>
        }
      />
      <ComparisonPage comparison={comparisonData} tools={tools} showBreadcrumb={false} showHeader={false} />
    </>
  )
}
