import { Metadata } from 'next'
import { generateWorldClassMetadata } from '@/lib/world-class-seo'
import { JsonLd } from '@/components/json-ld'
import { AISearchOptimizedContent } from '@/components/ai-search-optimized-content'
import { GoogleSEOOptimizedContent, SEOScoreDisplay, GoogleFAQSection } from '@/components/google-seo-optimized-content'
import { db } from '@/lib/db'
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { generateEntityGraph } from '@/lib/entity-graph'
import { analyzeSEOContent, generateGoogleFAQSchema } from '@/lib/google-seo-optimization'
import { notFound } from 'next/navigation'
import ToolReviewPage from '@/components/tool-review-page'
import { Tool, Category } from '@/types'
import { SITE_URL } from '@/lib/seo'
import { getRelatedContent, generateInternalLinks as injectInternalLinks } from '@/lib/internal-linking'

import { unstable_cache } from 'next/cache'

// Cached data fetcher for tool details
const getTool = unstable_cache(
  async (slug: string) => {
    return db.tool.findUnique({
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
  },
  ['tool-by-slug'],
  { revalidate: 3600, tags: ['tool'] }
)

// Cached data fetcher for related tools
const getRelatedTools = unstable_cache(
  async (categoryId: string, excludeId: string) => {
    return db.tool.findMany({
      where: {
        categoryId,
        id: { not: excludeId },
        published: true,
      },
      take: 3,
      orderBy: { views: 'desc' },
      include: {
        category: true,
      }
    })
  },
  ['related-tools'],
  { revalidate: 3600, tags: ['tool', 'related'] }
)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await getTool(slug)

  if (!tool) {
    return {
      title: 'Tool Not Found',
    }
  }

  return generateWorldClassMetadata({
    title: tool.metaTitle || `${tool.name} Review 2026: Features, Pricing & Alternatives`,
    description: tool.metaDescription || tool.description,
    path: `/tool/${tool.slug}`,
    contentType: 'tool',
    keywords: tool.tags?.map(t => t.name),
    imageUrl: `${SITE_URL}/logo.svg`, // Fallback, real implementation might use tool screenshot
    updatedAt: new Date(tool.updatedAt).toISOString(),
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
  let tool;
  try {
    tool = await getTool(slug)
  } catch (e) {
    console.error(`ERROR IN GETTOOL FOR ${slug}:`, e)
    throw e
  }

  if (!tool) {
    notFound()
  }

  // Fetch related content using the advanced library
  let relatedContent;
  try {
    relatedContent = await getRelatedContent(
      'tool',
      tool.slug,
      tool.tags?.map(t => t.name) || [],
      tool.categoryId || undefined
    )
  } catch (e) {
    console.error(`ERROR IN GETRELATEDCONTENT FOR ${slug}:`, e)
    throw e
  }

  const relatedTools = relatedContent
    .filter(item => item.type === 'tool')
    .slice(0, 4)
    .map(item => ({
      ...item,
      name: item.title,
      categoryId: tool.categoryId, // Fallback for type compatibility
    })) as unknown as Tool[]

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

  // Inject internal links into the description
  const optimizedDescription = injectInternalLinks(toolData.description || '', relatedContent, 3)
  const toolWithLinks = {
    ...toolData,
    description: optimizedDescription,
    createdAt: new Date(toolData.createdAt),
    updatedAt: new Date(toolData.updatedAt)
  }

  const relatedToolsData = relatedTools.map(t => ({
    ...t,
    tagline: t.tagline || undefined,
    // Add other nullable fields if necessary for ToolCard
    rating: t.rating || undefined,
    createdAt: new Date(t.createdAt),
    updatedAt: new Date(t.updatedAt),
    category: t.category ? { ...t.category, icon: t.category.icon || undefined } : undefined
  })) as unknown as Tool[]



  // Generate interconnected Entity Graph Schema (AEO)
  const toolSchema = generateEntityGraph({
    pageType: 'tool',
    pageUrl: `${SITE_URL}/tool/${toolData.slug}`,
    tool: toolData,
    relatedTools: relatedToolsData,
    category: toolData.category ? { name: toolData.category.name, slug: toolData.category.slug } : undefined
  })

  let faqSchema: string | null = null
  let parsedFaqs: any = null
  if (toolData.faqs) {
    try {
      const faqsList = JSON.parse(toolData.faqs)
      if (Array.isArray(faqsList) && faqsList.length > 0) {
        faqSchema = generateFAQSchema(faqsList)
        parsedFaqs = faqsList
      }
    } catch (e) {
      // Invalid FAQ data
      parsedFaqs = null
    }
  }

  return (
    <GoogleSEOOptimizedContent type="tool" data={toolWithLinks}>
      <AISearchOptimizedContent type="tool" data={toolWithLinks}>
        <JsonLd data={toolSchema} />
        {faqSchema && <JsonLd data={faqSchema} />}
        <JsonLd
          data={generateBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Categories', url: `${SITE_URL}/categories` },
            ...(toolData.category
              ? [{ name: toolData.category.name, url: `${SITE_URL}/categories/${toolData.category.slug}` }]
              : []),
            { name: toolData.name, url: `${SITE_URL}/tool/${toolData.slug}` },
          ])}
        />

        {/* SEO Score Display */}
        <div className="container mx-auto max-w-7xl px-4 pt-6">
          <div className="mb-4">
            <SEOScoreDisplay score={analyzeSEOContent(toolData.description || '').seoScore} />
          </div>

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

        <ToolReviewPage tool={toolWithLinks} relatedTools={relatedTools} />

        {/* Google FAQ Section */}
        {parsedFaqs && (
          <div className="container mx-auto max-w-7xl px-4 pt-8">
            <GoogleFAQSection
              faqs={parsedFaqs}
              title={`Frequently Asked Questions about ${toolData.name}`}
            />
          </div>
        )}
      </AISearchOptimizedContent>
    </GoogleSEOOptimizedContent>
  )
}
