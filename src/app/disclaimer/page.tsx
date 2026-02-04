import { Container } from '@/components/ui/container'
import { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'Disclaimer | AI Fuel Hub',
    description: 'Disclaimer for AI Fuel Hub regarding informational purposes and warranties.',
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: `${SITE_URL}/disclaimer`,
    },
}

export default function DisclaimerPage() {
    return (
        <Container className="py-12 md:py-20 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Disclaimer</h1>

            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">General Information</h2>
                    <p>
                        The information provided by AI Fuel Hub ("we," "us," or "our") on aifuelhub.com (the "Site") is for general informational purposes only.
                        All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied,
                        regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">External Links Disclaimer</h2>
                    <p>
                        The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties
                        or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for
                        accuracy, adequacy, validity, reliability, availability, or completeness by us.
                    </p>
                    <p>
                        We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party
                        websites linked through the site or any website or feature linked in any banner or other advertising. We will not be a party to or in any
                        way be responsible for monitoring any transaction between you and third-party providers of products or services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Professional Disclaimer</h2>
                    <p>
                        The Site cannot and does not contain professional advice. The information is provided for general informational and educational purposes
                        only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage
                        you to consult with the appropriate professionals. We do not provide any kind of professional advice. The use or reliance of any information
                        contained on the Site is solely at your own risk.
                    </p>
                </section>
            </div>
        </Container>
    )
}
