/**
 * Entity Graph Builder for GEO Optimization
 * Creates @graph structure linking all entities (Organization, Tools, Authors, Content)
 */

import { SITE_URL } from '@/lib/seo'
import { Author } from '@/lib/authors'
import { Tool } from '@/types'

/**
 * External knowledge base links (sameAs) for entity resolution
 * Helps AI engines verify and understand entities
 */
export const TOOL_SAME_AS_LINKS: Record<string, string[]> = {
    'chatgpt': [
        'https://en.wikipedia.org/wiki/ChatGPT',
        'https://www.wikidata.org/wiki/Q115564437',
        'https://www.crunchbase.com/organization/openai',
    ],
    'claude': [
        'https://en.wikipedia.org/wiki/Claude_(language_model)',
        'https://www.crunchbase.com/organization/anthropic',
    ],
    'midjourney': [
        'https://en.wikipedia.org/wiki/Midjourney',
        'https://www.crunchbase.com/organization/midjourney',
    ],
    'github-copilot': [
        'https://en.wikipedia.org/wiki/GitHub_Copilot',
        'https://www.crunchbase.com/organization/github',
    ],
    'gemini': [
        'https://en.wikipedia.org/wiki/Gemini_(chatbot)',
        'https://www.crunchbase.com/organization/google',
    ],
    // Add more as needed
}

/**
 * Generate full @graph with entity relationships
 */
export function generateEntityGraph(options: {
    pageType: 'article' | 'tool' | 'category' | 'home'
    pageUrl: string
    author?: Author
    tool?: Tool
    relatedTools?: Tool[]
    category?: { name: string; slug: string }
}) {
    const { pageType, pageUrl, author, tool, relatedTools = [], category } = options

    const graph: any[] = []

    // 1. Organization (Website Publisher)
    const organization = {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'AI Fuel Hub',
        url: SITE_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.svg`,
            width: 512,
            height: 512,
        },
        sameAs: [
            'https://twitter.com/aifuelhub',
            'https://linkedin.com/company/aifuelhub',
            'https://github.com/aifuelhub',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@aifuelhub.com',
            contactType: 'customer support',
        },
    }
    graph.push(organization)

    // 2. WebSite
    const website = {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'AI Fuel Hub',
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }
    graph.push(website)

    // 3. Author (Person) if provided
    if (author) {
        const authorEntity = {
            '@type': 'Person',
            '@id': `${SITE_URL}/authors/${author.slug}#person`,
            name: author.name,
            url: `${SITE_URL}/authors/${author.slug}`,
            description: author.bio,
            jobTitle: author.expertise[0],
            worksFor: { '@id': `${SITE_URL}/#organization` },
            ...(author.credentials && {
                alumniOf: author.credentials
                    .filter(c => c.includes('PhD') || c.includes('MS') || c.includes('Stanford') || c.includes('MIT') || c.includes('Oxford'))
                    .map(c => ({ '@type': 'EducationalOrganization', name: c })),
            }),
            ...(author.socialLinks && {
                sameAs: Object.values(author.socialLinks).filter(Boolean),
            }),
            knowsAbout: author.expertise,
        }
        graph.push(authorEntity)
    }

    // 4. Main Page Entity
    const mainEntity: any = {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageType,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        ...(author && { author: { '@id': `${SITE_URL}/authors/${author.slug}#person` } }),
    }

    // 5. Tool Entity if provided
    if (tool) {
        const toolEntity: any = {
            '@type': 'SoftwareApplication',
            '@id': `${SITE_URL}/tool/${tool.slug}#software`,
            name: tool.name,
            description: tool.description,
            url: `${SITE_URL}/tool/${tool.slug}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            ...(tool.websiteUrl && { sameAs: [tool.websiteUrl] }),
        }

        // Add external sameAs links if available
        if (TOOL_SAME_AS_LINKS[tool.slug]) {
            toolEntity.sameAs = [
                ...(toolEntity.sameAs || []),
                ...TOOL_SAME_AS_LINKS[tool.slug],
            ]
        }

        graph.push(toolEntity)
        mainEntity.mainEntity = { '@id': `${SITE_URL}/tool/${tool.slug}#software` }

        // Add related tools as mentions
        if (relatedTools.length > 0) {
            mainEntity.mentions = relatedTools.map(rt => ({
                '@type': 'SoftwareApplication',
                '@id': `${SITE_URL}/tool/${rt.slug}#software`,
                name: rt.name,
            }))
        }
    }

    // 6. Category if provided
    if (category) {
        const categoryEntity = {
            '@type': 'Thing',
            '@id': `${SITE_URL}/categories/${category.slug}#category`,
            name: category.name,
            url: `${SITE_URL}/categories/${category.slug}`,
        }
        graph.push(categoryEntity)
        mainEntity.about = { '@id': `${SITE_URL}/categories/${category.slug}#category` }
    }

    graph.push(mainEntity)

    return {
        '@context': 'https://schema.org',
        '@graph': graph,
    }
}

/**
 * Generate enhanced Article schema with @graph integration
 */
export function generateArticleWithGraph(options: {
    title: string
    description: string
    url: string
    author: Author
    publishedAt: string
    updatedAt: string
    wordCount: number
    category?: { name: string; slug: string }
    tags?: string[]
    toolsMentioned?: Array<{ name: string; slug: string }>
}) {
    const {
        title,
        description,
        url,
        author,
        publishedAt,
        updatedAt,
        wordCount,
        category,
        tags = [],
        toolsMentioned = [],
    } = options

    const graph: any[] = []

    // Organization
    graph.push({
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'AI Fuel Hub',
        logo: `${SITE_URL}/logo.svg`,
    })

    // Author
    graph.push({
        '@type': 'Person',
        '@id': `${SITE_URL}/authors/${author.slug}#person`,
        name: author.name,
        jobTitle: author.expertise[0],
        worksFor: { '@id': `${SITE_URL}/#organization` },
    })

    // Article
    const article: any = {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: title,
        description: description,
        url: url,
        datePublished: publishedAt,
        dateModified: updatedAt,
        wordCount: wordCount,
        author: { '@id': `${SITE_URL}/authors/${author.slug}#person` },
        publisher: { '@id': `${SITE_URL}/#organization` },
    }

    // Add category
    if (category) {
        article.about = {
            '@type': 'Thing',
            '@id': `${SITE_URL}/categories/${category.slug}#category`,
            name: category.name,
        }
    }

    // Add tags as keywords
    if (tags.length > 0) {
        article.keywords = tags.join(', ')
    }

    // Add tool mentions
    if (toolsMentioned.length > 0) {
        article.mentions = toolsMentioned.map(tool => ({
            '@type': 'SoftwareApplication',
            '@id': `${SITE_URL}/tool/${tool.slug}#software`,
            name: tool.name,
        }))
    }

    graph.push(article)

    return {
        '@context': 'https://schema.org',
        '@graph': graph,
    }
}
