import { PageHeader } from '@/components/page-header'
import { Sparkles, Users, Target, Shield, Search, PenTool, CheckCircle } from 'lucide-react'
import { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
    title: 'About AI Fuel Hub - Our Mission, Team & Editorial Standards',
    description: 'Learn how AI Fuel Hub curates the world\'s best AI tools. Discover our rigorous review methodology, editorial guidelines, and mission to empower creators.',
    alternates: {
        canonical: `${SITE_URL}/about`,
    },
}

export default function AboutPage() {
    return (
        <div className="min-h-screen pb-20">
            <PageHeader
                title="About AI Fuel Hub"
                description="Empowering creators and businesses with verified, expert-tested AI technology."
            />

            <div className="container mx-auto px-4 py-16 max-w-7xl">

                {/* Mission Section */}
                <div className="max-w-3xl mx-auto mb-20 text-center">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        AI Fuel Hub was founded in 2024 with a singular goal: to cut through the noise of the AI explosion.
                        We believe AI is the most transformative technology of our generation, but finding the <em>right</em> tool
                        amidst thousands of daily launches is overwhelming. We exist to be your trusted filter,
                        providing a centralized, verified, and community-driven directory.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-background border-none shadow-md">
                        <CardContent className="pt-6 text-center">
                            <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Innovation First</h3>
                            <p className="text-muted-foreground">We track the bleeding edge of AI developments daily, bringing you tools before they go mainstream.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background border-none shadow-md">
                        <CardContent className="pt-6 text-center">
                            <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4">
                                <Users className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                            <p className="text-muted-foreground">Our rankings aren't just ours—they're shaped by real user reviews, votes, and feedback from the active AI community.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background border-none shadow-md">
                        <CardContent className="pt-6 text-center">
                            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Radical Transparency</h3>
                            <p className="text-muted-foreground">We don't accept payment for higher rankings. Our reviews are honest, unbiased, and critical when necessary.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Editorial Guidelines & Methodology (E-E-A-T Core) */}
                <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Search className="w-8 h-8 text-primary" />
                            Our Review Methodology
                        </h2>
                        <div className="space-y-6">
                            <p className="text-lg text-muted-foreground">
                                How do we determine which tools make the list? Our "AI Fuel Tested" badge isn't given lightly. We follow a rigorous 5-step process:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">1</span>
                                    <div>
                                        <h4 className="font-bold">Real-World Testing</h4>
                                        <p className="text-muted-foreground text-sm">We sign up, pay for subscriptions if necessary, and use the tool for its intended purpose.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">2</span>
                                    <div>
                                        <h4 className="font-bold">Feature Verification</h4>
                                        <p className="text-muted-foreground text-sm">We verify that advertised features actually work and aren't just marketing hype.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">3</span>
                                    <div>
                                        <h4 className="font-bold">Output Quality Analysis</h4>
                                        <p className="text-muted-foreground text-sm">For generative tools, we stress-test the quality, speed, and accuracy of the output.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">4</span>
                                    <div>
                                        <h4 className="font-bold">Value Assessment</h4>
                                        <p className="text-muted-foreground text-sm">We compare the pricing against competitors to determine if it offers good ROI.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <PenTool className="w-6 h-6 text-primary" />
                            Editorial Standards
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                <strong>Unbiased Recommendations:</strong> Our writers and editors maintain full editorial independence. While we may use affiliate links to support the site, these never influence our editorial scoring or rankings.
                            </p>
                            <p>
                                <strong>Human-First Content:</strong> While we love AI, our reviews are written by humans, for humans. We believe in the nuance and context that only human experience can provide.
                            </p>
                            <p>
                                <strong>Accuracy Commitment:</strong> AI moves fast. We commit to regularly updating our most popular guides to reflect the latest model updates (e.g., GPT-4o, Claude 3.5 Sonnet) and pricing changes.
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold mb-4">Meet the Team</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                AI Fuel Hub is maintained by a dedicated team of AI enthusiasts, full-stack developers, and tech journalists.
                            </p>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                <span className="text-sm font-medium">Headquartered in San Francisco, CA</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
