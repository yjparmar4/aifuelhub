// Example: How to use AEO components in a blog post
// This file demonstrates best practices for AEO-optimized content

import { QuickAnswer, KeyTakeaways, DataPoint, ExpertQuote, FactCheck, ComparisonTable } from '@/components/aeo-components'

export default function ExampleBlogPost() {
    return (
        <article>
            <h1>ChatGPT vs Claude: Which AI Assistant is Better in 2026?</h1>

            {/* START WITH QUICK ANSWER - Critical for AEO */}
            <QuickAnswer>
                ChatGPT offers better general knowledge and web search with <DataPoint value="20" unit="$/month">$20/month</DataPoint> Plus subscription,
                while Claude excels at longer conversations and coding with a <DataPoint value="200000" unit="tokens">200K token</DataPoint> context window.
                For most users, ChatGPT Plus provides better value.
            </QuickAnswer>

            {/* KEY TAKEAWAYS - Highly cite-able */}
            <KeyTakeaways
                items={[
                    "ChatGPT Plus costs $20/month, Claude Pro costs $20/month",
                    "Claude has 4x larger context window (200K vs 50K tokens)",
                    "ChatGPT includes web search and DALL-E image generation",
                    "Claude is better for analyzing long documents and complex code"
                ]}
            />

            <p>
                The AI assistant market exploded in 2025-2026, with <DataPoint value="100" unit="million">100+ million</DataPoint> users
                worldwide choosing between ChatGPT and Claude as their primary AI tool.
            </p>

            {/* EXPERT QUOTE - Boosts E-E-A-T */}
            <ExpertQuote
                quote="Claude's 200K context window is a game-changer for software development. You can paste an entire codebase and get coherent analysis."
                author="Sarah Chen"
                role="Senior AI Engineer at Google"
            />

            {/* FACT CHECK - ClaimReview schema */}
            <FactCheck
                claim="ChatGPT can browse the web in real-time"
                verdict="True"
                explanation="ChatGPT Plus and Team subscribers have access to web browsing via Bing search integration, updated as of January 2026."
                source="OpenAI Official Documentation"
            />

            {/* COMPARISON TABLE - Structured data */}
            <ComparisonTable
                title="ChatGPT vs Claude: Feature Comparison"
                featureLabels={["Price", "Context Window", "Web Search", "Best For"]}
                items={[
                    {
                        name: "ChatGPT Plus",
                        features: {
                            "Price": "$20/month",
                            "Context Window": "50K tokens",
                            "Web Search": "✅ Yes",
                            "Best For": "General tasks, research"
                        },
                        link: "/tool/chatgpt"
                    },
                    {
                        name: "Claude Pro",
                        features: {
                            "Price": "$20/month",
                            "Context Window": "200K tokens",
                            "Web Search": "❌ No",
                            "Best For": "Coding, long documents"
                        },
                        link: "/tool/claude"
                    }
                ]}
            />

            {/* Use DataPoint for all statistics */}
            <h2>Pricing Breakdown</h2>
            <p>
                Both services offer free tiers, but serious users opt for paid plans.
                ChatGPT Plus at <DataPoint value="20" unit="USD/month" source="OpenAI">$20/month</DataPoint> and
                Claude Pro at <DataPoint value="20" unit="USD/month" source="Anthropic">$20/month</DataPoint> provide
                significant advantages over free versions.
            </p>
        </article>
    )
}

/*
AEO BEST PRACTICES:

1. START with QuickAnswer (25-50 words, direct answer)
2. ADD KeyTakeaways (3-5 bullets, scannable)
3. USE DataPoint for ALL numbers and statistics
4. ADD ExpertQuote to boost E-E-A-T
5. INCLUDE FactCheck for disputed claims
6. USE ComparisonTable for tool comparisons
7. WRAP dates in <time datetime="...">
8. CITE sources with <cite> tags
9. DEFINE technical terms with <dfn> on first use
10. LINK to related tools/categories

SCHEMA BENEFITS:
- QuickAnswer → Featured snippets
- KeyTakeaways → AI engine citations
- DataPoint → Google Knowledge Graph
- ExpertQuote → E-E-A-T boost
- FactCheck → ClaimReview schema
- ComparisonTable → Rich results
*/
