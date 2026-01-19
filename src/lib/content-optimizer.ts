/**
 * Content Optimizer for AEO
 * Analyzes existing blog content and generates QuickAnswer and KeyTakeaways
 * Uses OpenAI API to extract concise answers from long-form content
 */

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

interface BlogPost {
    title: string
    content: string
    slug: string
    excerpt?: string
}

interface AEOEnhancements {
    quickAnswer: string
    keyTakeaways: string[]
    dataPoints: Array<{
        value: string
        unit?: string
        context: string
    }>
    entityMentions: string[]
}

/**
 * Analyze blog content and generate AEO components
 */
export async function generateAEOComponents(
    post: BlogPost
): Promise<AEOEnhancements> {
    const prompt = `Analyze the following blog post and extract AEO-optimized content:

TITLE: ${post.title}

CONTENT:
${post.content}

Please provide:
1. A QuickAnswer (25-50 words, direct answer to the main question/topic)
2. 3-5 Key Takeaways (scannable bullet points)
3. All data points with numbers/statistics (value, unit, context)
4. AI tools/companies mentioned

Format as JSON:
{
  "quickAnswer": "...",
  "keyTakeaways": ["...", "..."],
  "dataPoints": [{"value": "20", "unit": "$/month", "context": "ChatGPT Plus subscription"}],
  "entityMentions": ["ChatGPT", "Midjourney"]
}`

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an SEO and AEO expert. Extract concise, cite-able content optimized for AI search engines.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.3, // Lower temperature for consistent extraction
        })

        const result = JSON.parse(response.data.choices[0].message?.content || '{}')
        return result as AEOEnhancements
    } catch (error) {
        console.error('Error generating AEO components:', error)
        // Fallback to manual extraction
        return extractManually(post)
    }
}

/**
 * Fallback: Extract AEO components manually without AI
 */
function extractManually(post: BlogPost): AEOEnhancements {
    const quickAnswer = post.excerpt || post.content.substring(0, 150).trim() + '...'

    // Extract headings as key takeaways
    const headings = post.content.match(/^##\s+(.+)$/gm) || []
    const keyTakeaways = headings
        .slice(0, 5)
        .map(h => h.replace('## ', '').trim())

    // Extract numbers as data points
    const numberMatches = post.content.match(/\$?\d+[,.]?\d*\s*(\/month|%|K|million|tokens)?/gi) || []
    const dataPoints = numberMatches.slice(0, 5).map(match => ({
        value: match.replace(/[^\d.]/g, ''),
        unit: match.match(/\/month|%|K|million|tokens/i)?.[0],
        context: 'Mentioned in content'
    }))

    // Extract entity mentions
    const aiTools = ['ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'Gemini', 'Perplexity']
    const entityMentions = aiTools.filter(tool =>
        post.content.toLowerCase().includes(tool.toLowerCase())
    )

    return {
        quickAnswer,
        keyTakeaways,
        dataPoints,
        entityMentions,
    }
}

/**
 * Insert AEO components into blog content
 */
export function insertAEOComponents(
    content: string,
    enhancements: AEOEnhancements
): string {
    // Find the first H2 heading
    const firstH2Match = content.match(/^##\s+/m)
    const insertIndex = firstH2Match ? content.indexOf(firstH2Match[0]) : 0

    let aeoContent = ''

    // Add QuickAnswer
    aeoContent += `<QuickAnswer>\n${enhancements.quickAnswer}\n</QuickAnswer>\n\n`

    // Add KeyTakeaways
    if (enhancements.keyTakeaways.length > 0) {
        const takeawaysArray = enhancements.keyTakeaways
            .map(item => `"${item}"`)
            .join(', ')
        aeoContent += `<KeyTakeaways items={[${takeawaysArray}]} />\n\n`
    }

    // Insert before first H2 or at the beginning
    if (insertIndex > 0) {
        return content.slice(0, insertIndex) + aeoContent + content.slice(insertIndex)
    } else {
        return aeoContent + content
    }
}

/**
 * Add DataPoint components to numbers in content
 */
export function enhanceDataPoints(
    content: string,
    dataPoints: AEOEnhancements['dataPoints']
): string {
    let enhancedContent = content

    for (const dataPoint of dataPoints) {
        // Find the first occurrence of this number
        const regex = new RegExp(`\\$?${dataPoint.value}${dataPoint.unit || ''}`, 'i')
        const match = enhancedContent.match(regex)

        if (match) {
            const original = match[0]
            const enhanced = `<DataPoint value="${dataPoint.value}" unit="${dataPoint.unit || ''}">${original}</DataPoint>`
            enhancedContent = enhancedContent.replace(regex, enhanced)
        }
    }

    return enhancedContent
}

// Export for CLI usage
export { openai }
