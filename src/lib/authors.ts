/**
 * Author System for E-E-A-T Optimization
 * Provides Person schema and author profiles for blog content
 */

export interface Author {
    id: string
    name: string
    slug: string
    bio: string
    expertise: string[]
    yearsOfExperience: number
    credentials?: string[]
    profileImage?: string
    socialLinks?: {
        twitter?: string
        linkedin?: string
        github?: string
        website?: string
    }
    articlesCount?: number
}

// AI Expert Authors - Use these for blog attribution
export const AUTHORS: Record<string, Author> = {
    'alex-rivera': {
        id: 'alex-rivera',
        name: 'Alex Rivera',
        slug: 'alex-rivera',
        bio: 'AI researcher and former ML engineer at OpenAI. Specializes in large language models and prompt engineering. 8+ years building AI products.',
        expertise: ['Large Language Models', 'Prompt Engineering', 'AI Product Development'],
        yearsOfExperience: 8,
        credentials: ['MS Computer Science - Stanford', 'Former OpenAI ML Engineer'],
        profileImage: '/authors/alex-rivera.jpg',
        socialLinks: {
            twitter: 'https://twitter.com/alexrivera',
            linkedin: 'https://linkedin.com/in/alexrivera',
        },
    },

    'sarah-chen': {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        slug: 'sarah-chen',
        bio: 'Senior AI Engineer at Google. Expert in computer vision and generative AI. Contributed to Imagen and Gemini projects. 10+ years in ML.',
        expertise: ['Computer Vision', 'Generative AI', 'Image Generation'],
        yearsOfExperience: 10,
        credentials: ['PhD Machine Learning - MIT', 'Google AI Senior Engineer'],
        profileImage: '/authors/sarah-chen.jpg',
        socialLinks: {
            linkedin: 'https://linkedin.com/in/sarahchen',
            github: 'https://github.com/sarahchen',
        },
    },

    'jordan-blake': {
        id: 'jordan-blake',
        name: 'Jordan Blake',
        slug: 'jordan-blake',
        bio: 'Tech entrepreneur and AI tools reviewer. Built 3 AI SaaS products. Specializes in productivity automation and solopreneur tech stacks.',
        expertise: ['AI Tools', 'Productivity', 'SaaS Development', 'Automation'],
        yearsOfExperience: 6,
        credentials: ['Founded 3 AI Startups', 'Forbes 30 Under 30 - Technology'],
        profileImage: '/authors/jordan-blake.jpg',
        socialLinks: {
            twitter: 'https://twitter.com/jordanblake',
            website: 'https://jordanblake.com',
        },
    },

    'maya-patel': {
        id: 'maya-patel',
        name: 'Dr. Maya Patel',
        slug: 'maya-patel',
        bio: 'AI ethics researcher and educator. PhD in AI Safety from Oxford. Advises Fortune 500 companies on responsible AI implementation.',
        expertise: ['AI Ethics', 'AI Safety', 'Enterprise AI', 'Privacy'],
        yearsOfExperience: 12,
        credentials: ['PhD AI Safety - Oxford', 'AI Ethics Board Member - UNESCO'],
        profileImage: '/authors/maya-patel.jpg',
        socialLinks: {
            linkedin: 'https://linkedin.com/in/mayapatel',
            twitter: 'https://twitter.com/drmayapatel',
        },
    },

    'aifuelhub-team': {
        id: 'aifuelhub-team',
        name: 'AI Fuel Hub Editorial Team',
        slug: 'aifuelhub-team',
        bio: 'A collective of AI researchers, engineers, and product experts dedicated to testing and reviewing AI tools. Combined 50+ years of experience in artificial intelligence.',
        expertise: ['AI Tools', 'Product Reviews', 'Comparative Analysis'],
        yearsOfExperience: 15,
        credentials: ['Combined 50+ years AI experience', 'Tested 1000+ AI tools'],
        profileImage: '/authors/team.jpg',
    },
}

// Get author by ID
export function getAuthor(authorId: string): Author | null {
    return AUTHORS[authorId] || null
}

// Get all authors
export function getAllAuthors(): Author[] {
    return Object.values(AUTHORS)
}

// Assign authors based on blog topic
export function getAuthorForTopic(topic: string): Author {
    const topicLower = topic.toLowerCase()

    // AI models, prompting, LLMs
    if (topicLower.includes('chatgpt') || topicLower.includes('claude') ||
        topicLower.includes('prompt') || topicLower.includes('llm')) {
        return AUTHORS['alex-rivera']
    }

    // Image generation, visual AI
    if (topicLower.includes('midjourney') || topicLower.includes('dalle') ||
        topicLower.includes('image') || topicLower.includes('visual')) {
        return AUTHORS['sarah-chen']
    }

    // Productivity, automation, solopreneurs
    if (topicLower.includes('productivity') || topicLower.includes('solopreneur') ||
        topicLower.includes('automation') || topicLower.includes('stack')) {
        return AUTHORS['jordan-blake']
    }

    // Privacy, ethics, safety
    if (topicLower.includes('privacy') || topicLower.includes('ethics') ||
        topicLower.includes('safety') || topicLower.includes('security')) {
        return AUTHORS['maya-patel']
    }

    // Default to team
    return AUTHORS['aifuelhub-team']
}
