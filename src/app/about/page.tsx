
import { PageHeader } from '@/components/page-header'
import { Sparkles, Users, Target } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="min-h-screen pb-20">
            <PageHeader
                title="About AI Fuel Hub"
                description="Our mission is to empower creators and businesses with the best AI technology."
            />

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto space-y-8">
                    <section className="prose prose-lg dark:prose-invert">
                        <p className="lead text-xl text-muted-foreground">
                            AI Fuel Hub is the world's leading destination for discovering, comparing, and tracking the best AI tools.
                        </p>
                        <p>
                            Founded in 2024, we recognized that the AI explosion was creating a fragmented landscape where users struggled to find the right tools for their needs. Our platform solves this by providing a centralized, verified, and community-driven directory.
                        </p>
                    </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-slate-50 rounded-2xl">
                        <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Innovation</h3>
                        <p className="text-slate-600">Tracking the latest developments in AI technology daily.</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-2xl">
                        <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Community</h3>
                        <p className="text-slate-600">Built by and for the AI community, with real user reviews.</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-2xl">
                        <Target className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Accuracy</h3>
                        <p className="text-slate-600">Unbiased, verified information you can trust.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
