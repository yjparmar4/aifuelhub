/**
 * Enhanced Person Schema Generator with E-E-A-T signals
 * Replaces Organization-only authorship with real Person entities
 */

import { Author } from '@/lib/authors'
import { SITE_URL } from '@/lib/seo'

export function generatePersonSchema(author: Author) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE_URL}/authors/${author.slug}#person`,
        name: author.name,
        url: `${SITE_URL}/authors/${author.slug}`,
        description: author.bio,

        // E-E-A-T: Experience
        ...(author.yearsOfExperience && {
            hasOccupation: {
                '@type': 'Occupation',
                name: author.expertise[0],
                experienceRequirements: `${author.yearsOfExperience}+ years`,
            },
        }),

        // E-E-A-T: Expertise
        knowsAbout: author.expertise,

        // E-E-A-T: Authoritativeness (credentials)
        ...(author.credentials && author.credentials.length > 0 && {
            hasCredential: author.credentials.map(credential => ({
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: credential.includes('PhD') ? 'Doctorate' :
                    credential.includes('MS') || credential.includes('Master') ? 'Master' :
                        'Professional',
                name: credential,
            })),
        }),

        // E-E-A-T: Trustworthiness (social proof)
        ...(author.socialLinks && Object.keys(author.socialLinks).length > 0 && {
            sameAs: Object.values(author.socialLinks).filter(Boolean),
        }),

        // Organizational affiliation
        worksFor: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'AI Fuel Hub',
        },

        // Job title from primary expertise
        jobTitle: author.expertise[0],
    }

    return JSON.stringify(schema)
}

/**
 * Generate enhanced Article schema with Person author (not Organization)
 */
export function generateArticleWithPersonAuthor(options: {
    title: string
    description: string
    url: string
    image: string
    publishedAt: string
    updatedAt: string
    author: Author
    wordCount?: number
    category?: { name: string; slug: string }
    keywords?: string
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: options.title,
        description: options.description,
        image: options.image,
        url: options.url,
        datePublished: options.publishedAt,
        dateModified: options.updatedAt,

        // Person author (E-E-A-T signal)
        author: {
            '@type': 'Person',
            '@id': `${SITE_URL}/authors/${options.author.slug}#person`,
            name: options.author.name,
            url: `${SITE_URL}/authors/${options.author.slug}`,
            jobTitle: options.author.expertise[0],
            knowsAbout: options.author.expertise,
        },

        // Publisher (Organization)
        publisher: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'AI Fuel Hub',
            url: SITE_URL,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.svg`,
            },
        },

        // E-E-A-T signals
        ...(options.wordCount && { wordCount: options.wordCount }),
        ...(options.category && {
            about: {
                '@type': 'Thing',
                name: options.category.name,
                url: `${SITE_URL}/categories/${options.category.slug}`,
            },
        }),
        ...(options.keywords && { keywords: options.keywords }),

        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': options.url,
        },
    }

    return JSON.stringify(schema)
}
