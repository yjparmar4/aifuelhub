import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { db } from '@/lib/db'
import ToolSubmissionForm from '@/components/tool-submission-form'

export const metadata: Metadata = generateMetadata({
  title: 'Submit AI Tool - List Your Tool on Our Directory',
  description: 'Submit your AI tool to be featured in our directory. Reach thousands of users looking for AI-powered software solutions.',
  type: 'website',
})

export default async function SubmitToolPage() {
  const categories = await db.category.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  })

  return <ToolSubmissionForm categories={categories} />
}
