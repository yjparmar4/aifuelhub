import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import AIToolsDirectory from '@/components/ai-tools-directory'
import { db } from '@/lib/db'
import { generateCategorySchema } from '@/lib/schema'
import { Tool } from '@/types'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'AI Tools Directory - Find & Compare AI Tools',
  description: 'Browse AI Fuel Hub to discover, filter, and compare the best AI tools by category, pricing, and rating.',
  type: 'website',
  canonical: `${SITE_URL}/ai-tools`,
})

export default async function AIToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  let tools: any[] = []

  try {
    // Fetch initial data for SEO
    tools = await db.tool.findMany({
      where: { published: true },
      include: { category: true },
      take: 12,
      orderBy: { views: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching tools for SEO:', error)
    // Fallback to empty array, the client component will try to fetch again
  }

  const toolsForSchema: Tool[] = tools.map((t) =>
    ({
      ...t,
      tagline: t.tagline || undefined,
      longDescription: t.longDescription || undefined,
      metaTitle: t.metaTitle || undefined,
      metaDescription: t.metaDescription || undefined,
      startingPrice: t.startingPrice || undefined,
      affiliateLink: t.affiliateLink || undefined,
      affiliateCTA: t.affiliateCTA || undefined,
      rating: t.rating || undefined,
      sponsoredBy: t.sponsoredBy || undefined,
      pros: t.pros || undefined,
      cons: t.cons || undefined,
      useCases: t.useCases || undefined,
      faqs: t.faqs || undefined,
      targetAudience: t.targetAudience || undefined,
      category: t.category ? { ...t.category, icon: t.category.icon || undefined } : undefined,
    }) as unknown as Tool
  )

  return (
    <>
      <JsonLd data={generateCategorySchema(
        {
          id: 'all',
          name: 'AI Tools Directory',
          slug: 'ai-tools',
          description: 'Browse all AI tools and software',
          order: 0,
          published: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        toolsForSchema
      )} />
      <AIToolsDirectory searchParams={resolvedSearchParams} />
    </>
  )
}
