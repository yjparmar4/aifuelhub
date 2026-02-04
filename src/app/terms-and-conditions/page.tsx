import { PageHeader } from '@/components/page-header'
import { Container } from '@/components/ui/container'
import { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'Terms of Service | AI Fuel Hub',
    description: 'Our terms and conditions for using the AI Fuel Hub directory and services.',
    alternates: {
        canonical: `${SITE_URL}/terms-and-conditions`,
    },
}

export default function TermsPage() {
    return (
        <div className="min-h-screen pb-20">
            <PageHeader
                title="Terms of Service"
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: 'Terms of Service', href: '/terms-and-conditions' }
                ]}
            />
            <Container className="py-12 max-w-4xl">
                <div className="prose prose-slate lg:prose-lg dark:prose-invert">
                    <p><strong>Last updated:</strong> January 8, 2026</p>

                    <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the <a href="https://www.aifuelhub.com">aifuelhub.com</a> website (the "Service") operated by <strong>AI Fuel Hub</strong> ("us", "we", or "our").</p>

                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

                    <h3>2. Accounts</h3>
                    <p>When you subscribe or submit a tool, you guarantee that the information you provide to us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate rejection of your submission.</p>

                    <h3>3. Links To Other Web Sites</h3>
                    <p>Our Service contains links to third-party web sites or services that are not owned or controlled by AI Fuel Hub.</p>
                    <p>AI Fuel Hub has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that AI Fuel Hub shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

                    <h3>4. Affiliate Disclosure</h3>
                    <p>AI Fuel Hub participates in various affiliate marketing programs, which means we may get paid commissions on editorially chosen products purchased through our links to retailer sites. This comes at no extra cost to you and helps support our site.</p>

                    <h3>5. Limitation of Liability</h3>
                    <p>In no event shall AI Fuel Hub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                    <h3>6. Changes</h3>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

                    <h3>7. Contact Us</h3>
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <p><strong>Email:</strong> contact@aifuelhub.com</p>
                </div>
            </Container>
        </div>
    )
}
