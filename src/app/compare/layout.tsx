import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
    title: 'AI Tool Comparison - Compare Features & Pricing',
    description: 'Compare multiple AI tools side-by-side. Uncover differences in features, pricing, and performance to choose the best software for your needs.',
    type: 'website',
    url: '/compare',
})

export default function CompareLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
