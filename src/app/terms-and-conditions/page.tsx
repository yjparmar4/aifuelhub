
import { PageHeader } from '@/components/page-header'

export default function TermsPage() {
    return (
        <div className="min-h-screen pb-20">
            <PageHeader
                title="Terms of Service"
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: 'Terms of Service', href: '/terms' }
                ]}
            />
            <div className="container mx-auto px-4 max-w-4xl prose prose-slate lg:prose-lg">
                <p>Last updated: January 2026</p>
                <p>Please read these Terms of Service carefully before using ToolAtlas.</p>

                <h3>1. Acceptance of Terms</h3>
                <p>By accessing or using our website, you agree to be bound by these Terms.</p>

                <h3>2. User Responsibilities</h3>
                <p>You agree to use the website only for lawful purposes and in accordance with these Terms.</p>

                <h3>3. Affiliate Disclosure</h3>
                <p>ToolAtlas participates in various affiliate marketing programs. We may earn commissions on purchases made through our links.</p>

                <h3>4. Disclaimer</h3>
                <p>The information on this website is for informational purposes only. We make no warranties about the accuracy or completeness of the content.</p>
            </div>
        </div>
    )
}
