import { PageHeader } from '@/components/page-header'
import { Container } from '@/components/ui/container'
import { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'Privacy Policy | AI Fuel Hub',
    description: 'Learn about how we collect, use, and protect your information at AI Fuel Hub.',
    alternates: {
        canonical: `${SITE_URL}/privacy-policy`,
    },
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pb-20">
            <PageHeader
                title="Privacy Policy"
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: 'Privacy Policy', href: '/privacy-policy' }
                ]}
            />
            <Container className="py-12 max-w-4xl">
                <div className="prose prose-slate lg:prose-lg dark:prose-invert">
                    <p><strong>Last updated:</strong> January 8, 2026</p>

                    <p>At <strong>AI Fuel Hub</strong> ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.aifuelhub.com">aifuelhub.com</a>.</p>

                    <p>Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

                    <h3>1. Information We Collect</h3>
                    <p>We may collect information you provide directly to us, such as when you subscribe to our newsletter, submit a tool, or contact us directly. This usually includes:</p>
                    <ul>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Website URL (for tool submissions)</li>
                    </ul>

                    <h3>2. How We Use Your Information</h3>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Operate and maintain our website and services.</li>
                        <li>Send you newsletters, updates, and promotional material (if subscribed).</li>
                        <li>Respond to your comments, questions, and requests.</li>
                        <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                    </ul>

                    <h3>3. Cookies and Web Beacons</h3>
                    <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.</p>

                    <h3>4. Third-Party Advertising</h3>
                    <p>We may use third-party advertising companies (such as Google AdSense) to serve ads when you visit the Site. These companies may use information about your visits to the Site and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.</p>

                    <h3>5. Affiliate Disclosure</h3>
                    <p>Some of the links on this website are affiliate links. This means that if you click on the link and purchase an item, we may receive an affiliate commission at no extra cost to you. All opinions remain our own.</p>

                    <h3>6. Contact Us</h3>
                    <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                    <p><strong>Email:</strong> contact@aifuelhub.com</p>
                </div>
            </Container>
        </div>
    )
}
