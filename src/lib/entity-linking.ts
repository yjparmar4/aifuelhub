// Entity Auto-Linking Helper for AEO
// Automatically detects and links tool mentions in blog content

import { db } from '@/lib/db'

interface EntityLink {
    text: string
    url: string
    type: 'tool' | 'category' | 'company'
}

// Cache for tool slugs (loaded once)
let toolsCache: Map<string, string> | null = null
let categoriesCache: Map<string, string> | null = null

/**
 * Load all tools and categories into cache for fast lookups
 */
async function loadEntityCache() {
    if (!toolsCache) {
        const tools = await db.tool.findMany({
            where: { published: true },
            select: { name: true, slug: true },
        })
        toolsCache = new Map(tools.map(t => [t.name.toLowerCase(), t.slug]))
    }

    if (!categoriesCache) {
        const categories = await db.category.findMany({
            select: { name: true, slug: true },
        })
        categoriesCache = new Map(categories.map(c => [c.name.toLowerCase(), c.slug]))
    }

    return { tools: toolsCache, categories: categoriesCache }
}

/**
 * Common AI tool and company names to detect
 */
const KNOWN_ENTITIES = {
    tools: [
        'ChatGPT', 'GPT-4', 'GPT-3.5', 'Claude', 'Midjourney', 'DALL-E', 'Stable Diffusion',
        'Gemini', 'Bard', 'Perplexity', 'Jasper', 'Copy.ai', 'Writesonic', 'Grammarly',
        'Notion AI', 'GitHub Copilot', 'Cursor', 'V0', 'Vercel AI', 'Anthropic Claude',
        'Hugging Face', 'Replicate', 'RunwayML', 'Synthesia', 'ElevenLabs', 'Murf AI',
        'Pictory', 'Descript', 'Otter.ai', 'Fireflies', 'Tome', 'Beautiful.ai',
        'Canva', 'Adobe Firefly', 'Leonardo.ai', 'Playground AI', 'NightCafe',
        'Flux', 'Pika', 'Sora', 'Kling', 'HeyGen', 'D-ID'
    ],
    companies: [
        'OpenAI', 'Anthropic', 'Google', 'Microsoft', 'Meta', 'Stability AI',
        'Midjourney Inc', 'Cohere', 'AI21 Labs', 'Inflection AI'
    ]
}

/**
 * Auto-link tool mentions in content
 * Detects tool names and wraps them with links
 */
export async function autoLinkEntities(content: string): Promise<string> {
    const { tools, categories } = await loadEntityCache()
    let linkedContent = content

    // Sort entities by length (longest first) to avoid partial matches
    const allEntities = [...tools.keys(), ...KNOWN_ENTITIES.tools]
        .sort((a, b) => b.length - a.length)

    for (const entityName of allEntities) {
        const slug = tools.get(entityName.toLowerCase())

        // Create regex to match whole words only, case-insensitive
        // Avoid matching inside existing links or code blocks
        const regex = new RegExp(
            `(?<!\\[)\\b(${escapeRegex(entityName)})\\b(?!\\]|\\))(?![^<]*>)(?![^\\`]*\\`)`,
            'gi'
        )

        // Only link first 3 occurrences to avoid over-optimization
        let matchCount = 0
        linkedContent = linkedContent.replace(regex, (match) => {
            matchCount++
            if (matchCount > 3) return match

            if (slug) {
                // Link to our tool page
                return `[${match}](/tool/${slug})`
            } else {
                // Just bold it if we don't have a page
                return `**${match}**`
            }
        })
    }

    return linkedContent
}

/**
 * Extract entities mentioned in content for schema markup
 */
export function extractEntities(content: string): EntityLink[] {
    const entities: EntityLink[] = []
    const seen = new Set<string>()

    for (const toolName of KNOWN_ENTITIES.tools) {
        const regex = new RegExp(`\\b${escapeRegex(toolName)}\\b`, 'i')
        if (regex.test(content) && !seen.has(toolName.toLowerCase())) {
            seen.add(toolName.toLowerCase())
            entities.push({
                text: toolName,
                url: `/tool/${slugify(toolName)}`,
                type: 'tool'
            })
        }
    }

    return entities
}

/**
 * Generate entity mentions for schema markup
 */
export function generateEntityMentionsSchema(entities: EntityLink[]) {
    return entities.map(entity => ({
        '@type': entity.type === 'tool' ? 'SoftwareApplication' : 'Organization',
        name: entity.text,
        url: `https://aifuelhub.com${entity.url}`
    }))
}

/**
 * Add entity mentions to blog post schema
 */
export function enhanceSchemaWithEntities(schema: any, content: string) {
    const entities = extractEntities(content)

    if (entities.length > 0) {
        const parsedSchema = JSON.parse(schema)
        parsedSchema.mentions = generateEntityMentionsSchema(entities)
        return JSON.stringify(parsedSchema)
    }

    return schema
}

// Helper functions
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}
