import { Metadata } from 'next'
import { generateMetadata as generateSeoMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { db } from '@/lib/db'
import { generateToolSchema, generateFAQSchema } from '@/lib/schema'
import { notFound } from 'next/navigation'
import ToolReviewPage from '@/components/tool-review-page'
import { Tool } from '@/types'
import { SITE_URL } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await db.tool.findUnique({
    where: { slug, published: true },
    include: { category: true },
  })

  if (!tool) {
    return {
      title: 'Tool Not Found',
    }
  }

  return generateSeoMetadata({
    title: tool.metaTitle || `${tool.name} Review 2025: Features, Pricing & Alternatives`,
    description: tool.metaDescription || tool.description,
    type: 'review',
    canonical: `${SITE_URL}/tool/${tool.slug}`,
  })
}

export async function generateStaticParams() {
  const tools = await db.tool.findMany({
    where: { published: true },
    select: { slug: true },
  })

  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const tool = await db.tool.findUnique({
    where: { slug, published: true },
    include: {
      category: true,
      tags: true,
      reviews: {
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })

  if (!tool) {
    notFound()
  }

  // Fetch related tools (Alternatives)
  const relatedTools = await db.tool.findMany({
    where: {
      categoryId: tool.categoryId,
      id: { not: tool.id },
      published: true,
    },
    take: 3,
    orderBy: { views: 'desc' },
    include: {
      category: true,
    }
  })

  const defaultVsTarget = relatedTools[0]?.slug

  // Cast types to avoid null vs undefined issues
  const toolData = {
    ...tool,
    tagline: tool.tagline || undefined,
    longDescription: tool.longDescription || undefined,
    metaTitle: tool.metaTitle || undefined,
    metaDescription: tool.metaDescription || undefined,
    startingPrice: tool.startingPrice || undefined,
    affiliateLink: tool.affiliateLink || undefined,
    affiliateCTA: tool.affiliateCTA || undefined,
    rating: tool.rating || undefined,
    sponsoredBy: tool.sponsoredBy || undefined,
    pros: tool.pros || undefined,
    cons: tool.cons || undefined,
    useCases: tool.useCases || undefined,
    faqs: tool.faqs || undefined,
    targetAudience: tool.targetAudience || undefined,
    category: tool.category ? { ...tool.category, icon: tool.category.icon || undefined } : undefined,
  } as unknown as Tool

  const relatedToolsData = relatedTools.map(t => ({
    ...t,
    tagline: t.tagline || undefined,
    // Add other nullable fields if necessary for ToolCard
    rating: t.rating || undefined,
    category: t.category ? { ...t.category, icon: t.category.icon || undefined } : undefined
  })) as unknown as Tool[]

  const toolSchema = generateToolSchema(toolData)

  let faqSchema: string | null = null
  if (toolData.faqs) {
    try {
      const faqs = JSON.parse(toolData.faqs)
      if (Array.isArray(faqs) && faqs.length > 0) {
        faqSchema = generateFAQSchema(faqs)
      }
    } catch (e) {
      // Invalid FAQ data
    }
  }

  return (
    <>
      <JsonLd data={toolSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <div className="container mx-auto max-w-7xl px-4 pt-6">
        <div className="glass rounded-2xl p-4 text-sm text-muted-foreground flex flex-wrap gap-2 items-center">
          <span>More:</span>
          <a href={`/alternatives/${tool.slug}`} className="text-primary hover:underline">
            {tool.name} alternatives
          </a>
          {defaultVsTarget ? (
            <>
              <span className="text-muted-foreground">|</span>
              <a href={`/vs/${tool.slug}-vs-${defaultVsTarget}`} className="text-primary hover:underline">
                Compare vs {relatedTools[0].name}
              </a>
            </>
          ) : null}
        </div>
      </div>
      <ToolReviewPage tool={toolData} relatedTools={relatedToolsData} />
    </>
  )
}
