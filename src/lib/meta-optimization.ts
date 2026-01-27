/**
 * Meta Optimization Utilities for High CTR
 * 
 * This module provides utilities to generate optimized meta titles and descriptions
 * that improve click-through rates in search results.
 */

// Power words proven to increase CTR
export const POWER_WORDS = [
    'Ultimate', 'Complete', 'Proven', 'Essential', 'Expert',
    'Definitive', 'Comprehensive', 'Exclusive', 'Insider', 'Powerful'
] as const

// Urgency words for time-sensitive content
export const URGENCY_WORDS = [
    'Now', '2026', 'Today', 'Updated', 'Latest', 'New', 'Fresh'
] as const

// Trust signals for credibility
export const TRUST_SIGNALS = [
    '✓ Tested', '★ Expert', '⚡ Fast', '🏆 Proven', '📊 Data-Backed'
] as const

// Number prefixes that increase CTR
export const NUMBER_HOOKS = [
    '5', '7', '10', '15', '21', '50', '100'
] as const

/**
 * Title templates with proven high CTR patterns
 * {variables} are replaced dynamically
 */
export const TITLE_TEMPLATES = {
    comparison: '{tool1} vs {tool2}: Which is Better? ({year} Review)',
    howTo: 'How to {action} in {year}: Step-by-Step Guide',
    list: '{number} Best {topic} in {year} ({qualifier})',
    review: '{tool} Review {year}: Pros, Cons & Is It Worth It?',
    guide: 'The Complete Guide to {topic} ({year} Edition)',
    tutorial: '{topic} Tutorial: From Beginner to Pro ({year})',
    free: '{number} Best FREE {topic} in {year} (No Sign-up Required)',
    alternative: '{number} Best {tool} Alternatives in {year} (Free & Paid)'
} as const

/**
 * Meta description templates with CTAs
 */
export const DESCRIPTION_TEMPLATES = {
    comparison: 'Compare {tool1} vs {tool2} in this honest {year} review. We tested both tools to help you pick the right one. ✓ Pros & Cons ✓ Pricing ✓ Verdict',
    howTo: 'Learn how to {action} with our step-by-step guide. Expert tips and practical examples included. Start {action} today! →',
    list: 'Discover the {number} best {topic} in {year}. We tested each tool to bring you honest recommendations. Find your perfect match! →',
    review: 'Is {tool} worth it in {year}? Read our hands-on review with real pros, cons, pricing breakdown, and alternatives. →',
    guide: 'Everything you need to know about {topic}. A complete, up-to-date guide with expert insights and actionable tips. →',
    free: 'Looking for free {topic}? We found {number} excellent options that don\'t cost a dime. No credit card required! →'
} as const

/**
 * Calculate estimated reading time
 */
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).filter(Boolean).length
    return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Extract the primary action/topic from content for meta generation
 */
export function extractKeyAction(content: string): string {
    // Look for the first "how to" phrase or main heading
    const howToMatch = content.match(/how to ([^.!?\n]+)/i)
    if (howToMatch) return howToMatch[1].trim().toLowerCase()

    // Look for the main H1/H2 heading
    const headingMatch = content.match(/^#+ (.+)/m)
    if (headingMatch) return headingMatch[1].trim().toLowerCase()

    return 'get started'
}

/**
 * Enhance a title for better CTR
 */
export function enhanceTitle(title: string, options?: {
    addYear?: boolean
    addEmoji?: boolean
    maxLength?: number
}): string {
    const { addYear = true, addEmoji = false, maxLength = 60 } = options || {}

    let enhanced = title

    // Add year if not present
    if (addYear && !enhanced.includes('2026') && !enhanced.includes('2025')) {
        enhanced = enhanced.replace(/(\))?$/, ' (2026)$1')
    }

    // Add emoji if requested and not present
    if (addEmoji && !/[\u{1F300}-\u{1F9FF}]/u.test(enhanced)) {
        const emojis = ['🚀', '✨', '💡', '🎯', '⚡']
        enhanced = `${emojis[Math.floor(Math.random() * emojis.length)]} ${enhanced}`
    }

    // Truncate if too long (preserve last word)
    if (enhanced.length > maxLength) {
        enhanced = enhanced.substring(0, maxLength - 3).trim() + '...'
    }

    return enhanced
}

/**
 * Enhance a meta description for better CTR
 */
export function enhanceDescription(description: string, options?: {
    addCTA?: boolean
    addTrustSignal?: boolean
    maxLength?: number
}): string {
    const { addCTA = true, addTrustSignal = true, maxLength = 155 } = options || {}

    let enhanced = description

    // Add trust signal if not present
    if (addTrustSignal && !TRUST_SIGNALS.some(signal => enhanced.includes(signal))) {
        const signal = TRUST_SIGNALS[Math.floor(Math.random() * TRUST_SIGNALS.length)]
        enhanced = `${signal} ${enhanced}`
    }

    // Add CTA if not present
    if (addCTA && !enhanced.includes('→') && !enhanced.includes('...')) {
        if (enhanced.length < maxLength - 5) {
            enhanced = `${enhanced} →`
        }
    }

    // Truncate if too long
    if (enhanced.length > maxLength) {
        enhanced = enhanced.substring(0, maxLength - 3).trim() + '...'
    }

    return enhanced
}

/**
 * Generate SEO-optimized slug from title
 */
export function generateOptimizedSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Remove duplicate hyphens
        .replace(/^-|-$/g, '') // Trim hyphens from ends
        .substring(0, 60) // Limit length
}

/**
 * Extract headings from markdown content for ToC generation
 */
export function extractHeadings(content: string): Array<{
    level: number
    text: string
    id: string
}> {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm
    const headings: Array<{ level: number; text: string; id: string }> = []

    let match
    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length
        const text = match[2].replace(/[*_`#]/g, '').trim()
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')

        headings.push({ level, text, id })
    }

    return headings
}

/**
 * Format date for display with freshness signal
 */
export function formatFreshnessDate(date: Date): string {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return '🔄 Updated today'
    if (diffDays === 1) return '🔄 Updated yesterday'
    if (diffDays < 7) return `🔄 Updated ${diffDays} days ago`
    if (diffDays < 30) return `🔄 Updated ${Math.floor(diffDays / 7)} weeks ago`

    return `🔄 Updated ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
}
