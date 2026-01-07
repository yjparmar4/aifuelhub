import { Metadata } from 'next'
import { generateMetadata as generateSeoMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { db } from '@/lib/db'
import { generateCategorySchema, generateBreadcrumbSchema } from '@/lib/schema'
import { notFound } from 'next/navigation'
import CategoryPage from '@/components/category-page'
import { SITE_URL } from '@/lib/seo'
import { Category, Tool } from '@/types'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = await db.category.findUnique({
    where: { slug, published: true },
  })

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return generateSeoMetadata({
    title: `Best ${category.name} AI Tools 2025 - Top Rated & Reviewed`,
    description: `Discover the best AI tools for ${category.name.toLowerCase()}. Expert reviews, comparisons, and guides to help you find the perfect ${category.name.toLowerCase()} software.`,
    type: 'website',
    canonical: `${SITE_URL}/ai-tools/${category.slug}`,
  })
}

export async function generateStaticParams() {
  const categories = await db.category.findMany({
    where: { published: true },
    select: { slug: true },
  })

  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const category = await db.category.findUnique({
    where: { slug, published: true },
    include: {
      _count: {
        select: { tools: true },
      },
    },
  })

  if (!category) {
    notFound()
  }

  const tools = await db.tool.findMany({
    where: {
      categoryId: category.id,
      published: true,
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: [
      { featured: 'desc' },
      { trending: 'desc' },
      { rating: 'desc' },
      { views: 'desc' },
    ],
  })

  const categoryForSchema: Category = {
    ...category,
    icon: category.icon || undefined,
  } as unknown as Category

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

  const categorySchema = generateCategorySchema(categoryForSchema, toolsForSchema)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'AI Tools', url: `${SITE_URL}/ai-tools` },
    { name: category.name, url: `${SITE_URL}/ai-tools/${category.slug}` },
  ])

  return (
    <>
      <JsonLd data={categorySchema} />
      <JsonLd data={breadcrumbSchema} />
      <CategoryPage category={categoryForSchema} tools={toolsForSchema} />
    </>
  )
}
