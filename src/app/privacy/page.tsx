
import { PageHeader } from '@/components/page-header'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pb-20">
            <PageHeader
                title="Privacy Policy"
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: 'Privacy Policy', href: '/privacy' }
                ]}
            />
            <div className="container mx-auto px-4 max-w-4xl prose prose-slate lg:prose-lg">
                <p>Last updated: January 2026</p>
                <p>At ToolAtlas, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>

                <h3>1. Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you subscribe to our newsletter, submit a tool, or contact us.</p>

                <h3>2. How We Use Your Information</h3>
                <p>We use your information to provide and improve our services, send you updates, and respond to your inquiries.</p>

                <h3>3. Cookies</h3>
                <p>We use cookies to enhance your experience on our website. You can control cookies through your browser settings.</p>

                <h3>4. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us.</p>
            </div>
        </div>
    )
}
