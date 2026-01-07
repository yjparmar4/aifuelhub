import { Container } from '@/components/ui/container'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Affiliate Disclosure | AI Fuel Hub',
    description: 'Our commitment to transparency regarding affiliate partnerships.',
    robots: {
        index: false,
        follow: true,
    },
}

export default function AffiliateDisclosurePage() {
    return (
        <Container className="py-12 md:py-20 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Affiliate Disclosure</h1>

            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section className="mb-8">
                    <p className="text-lg font-medium">
                        AI Fuel Hub believes in transparency and honesty on the web. Therefore, we want to disclose that certain links on this website are affiliate links.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">What is an Affiliate Link?</h2>
                    <p>
                        An affiliate link is a specific URL that contains the affiliate's ID or username. In affiliate programs, advertisers use affiliate links to record the traffic that is sent to the advertiser's website. This action is all part of an affiliate program.
                    </p>
                    <p>
                        If you click on an affiliate link and make a purchase, we may receive a small commission at no extra cost to you.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Commitment</h2>
                    <p>
                        We only recommend products and services that we have personally used, tested, or thoroughly researched. Our goal is to provide you with the best AI tools and resources available. The commission we earn helps to keep AI Fuel Hub running and allows us to continue providing quality content for free.
                    </p>
                </section>

                <section className="mb-8">
                    <div className="p-6 bg-muted/50 rounded-lg border border-border">
                        <p className="font-medium">
                            Please assume that any link leading you to a product or service is an affiliate link and that we will receive commission from your purchase.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Questions?</h2>
                    <p>
                        If you have any questions regarding the above, please do not hesitate to contact us by using the contact page.
                    </p>
                </section>
            </div>
        </Container>
    )
}
