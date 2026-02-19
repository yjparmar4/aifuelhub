/**
 * Advanced Robots Meta and Crawling Directives
 * World-class SEO crawling optimization for all search engines
 * Implements intelligent crawling, indexing, and directive management
 */

import { SITE_URL } from '@/lib/seo'

// Page-specific robots directives
export interface RobotsDirective {
  index: boolean
  follow: boolean
  archive?: boolean
  imageIndex?: boolean
  translate?: boolean
  snippet?: boolean
  odp?: boolean
  noimageindex?: boolean
  unavailableAfter?: string
  maxSnippet?: number
  maxImagePreview?: 'none' | 'small' | 'large' | 'standard'
  maxVideoPreview?: number
  noai?: boolean
}

// Search engine specific configurations
export const SEARCH_ENGINE_CONFIG = {
  // Google
  google: {
    name: 'Google',
    botName: 'Googlebot',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive', 'nosnippet', 
               'noimageindex', 'unavailable_after', 'max-snippet', 'max-image-preview', 
               'max-video-preview', 'notranslate', 'noai'],
    crawlDelay: false,
    crawlRate: 'dynamic'
  },

  // Bing
  bing: {
    name: 'Bing',
    botName: 'Bingbot',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive', 'nosnippet',
               'noimageindex', 'max-snippet', 'notranslate'],
    crawlDelay: true,
    crawlRate: 'adaptive'
  },

  // Yahoo
  yahoo: {
    name: 'Yahoo',
    botName: 'Slurp',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive'],
    crawlDelay: true,
    crawlRate: 'moderate'
  },

  // Yandex
  yandex: {
    name: 'Yandex',
    botName: 'YandexBot',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive', 'nosnippet',
               'noimageindex', 'max-snippet', 'notranslate'],
    crawlDelay: true,
    crawlRate: 'respects crawl-delay'
  },

  // Baidu
  baidu: {
    name: 'Baidu',
    botName: 'Baiduspider',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive'],
    crawlDelay: true,
    crawlRate: 'moderate'
  },

  // DuckDuckGo
  duckduckgo: {
    name: 'DuckDuckGo',
    botName: 'DuckDuckBot',
    supports: ['index', 'follow', 'noindex', 'nofollow'],
    crawlDelay: false,
    crawlRate: 'respects robots'
  },

  // Naver (Korean)
  naver: {
    name: 'Naver',
    botName: 'Yeti',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive'],
    crawlDelay: true,
    crawlRate: 'moderate'
  },

  // Seznam (Czech)
  seznam: {
    name: 'Seznam',
    botName: 'SeznamBot',
    supports: ['index', 'follow', 'noindex', 'nofollow'],
    crawlDelay: true,
    crawlRate: 'moderate'
  },

  // Exalead
  exalead: {
    name: 'Exalead',
    botName: 'Exabot',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive'],
    crawlDelay: false,
    crawlRate: 'standard'
  },

  // Apple (Siri)
  apple: {
    name: 'Apple',
    botName: 'Applebot',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive', 'noimageindex'],
    crawlDelay: false,
    crawlRate: 'respects robots'
  },

  // AI Search Engines
  chatgpt: {
    name: 'ChatGPT',
    botName: 'ChatGPT-User',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive'],
    crawlDelay: false,
    crawlRate: 'respects robots'
  },

  perplexity: {
    name: 'Perplexity',
    botName: 'PerplexityBot',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive'],
    crawlDelay: false,
    crawlRate: 'respects robots'
  },

  claude: {
    name: 'Claude',
    botName: 'ClaudeBot',
    supports: ['index', 'follow', 'noindex', 'nofollow', 'noarchive'],
    crawlDelay: false,
    crawlRate: 'respects robots'
  }
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  const lines: string[] = [
    '# AI Fuel Hub Robots.txt - World-Class SEO Configuration',
    '# Generated for maximum search engine visibility',
    '',
    `# User-agent: ${Object.values(SEARCH_ENGINE_CONFIG).map(c => c.botName).join(', ')}`,
    'Allow: /',
    '',
    '# Sitemap locations',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Sitemap: ${SITE_URL}/sitemap-news.xml`,
    `Sitemap: ${SITE_URL}/sitemap-images.xml`,
    `Sitemap: ${SITE_URL}/sitemap-videos.xml`,
    '',
    '# Crawl-delay for respectful crawling (Bing, Yahoo, Yandex)',
    'Crawl-delay: 1',
    '',
    '# Google-specific directives',
    'User-agent: Googlebot',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /admin/',
    'Disallow: /*?utm_',
    'Disallow: /*?ref=',
    '',
    '# Google Image bot',
    'User-agent: Googlebot-Image',
    'Allow: /',
    'Allow: /images/',
    'Disallow: /private/',
    '',
    '# Google News bot',
    'User-agent: Googlebot-News',
    'Allow: /blog/',
    'Allow: /news/',
    'Disallow: /',
    '',
    '# Google Video bot',
    'User-agent: Googlebot-Video',
    'Allow: /videos/',
    'Allow: /blog/',
    'Disallow: /',
    '',
    '# Bing-specific',
    'User-agent: Bingbot',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /admin/',
    '',
    '# AI Search Engine bots',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    '# Yahoo',
    'User-agent: Slurp',
    'Allow: /',
    '',
    '# Yandex',
    'User-agent: YandexBot',
    'Allow: /',
    'Clean-param: utm_source&utm_medium&utm_campaign',
    '',
    '# Baidu',
    'User-agent: Baiduspider',
    'Allow: /',
    '',
    '# Apple (Siri)',
    'User-agent: Applebot',
    'Allow: /',
    '',
    '# Privacy and admin areas - no crawling',
    'User-agent: *',
    'Disallow: /api/',
    'Disallow: /admin/',
    'Disallow: /private/',
    'Disallow: /_next/',
    'Disallow: /*.json$',
    'Disallow: /*?utm_*',
    'Disallow: /*?ref=*',
    ''
  ]

  return lines.join('\n')
}

// Generate meta robots tag
export function generateRobotsMeta(directive: RobotsDirective): string {
  const directives: string[] = []

  if (directive.index === false) directives.push('noindex')
  if (directive.follow === false) directives.push('nofollow')
  if (directive.archive === false) directives.push('noarchive')
  if (directive.imageIndex === false) directives.push('noimageindex')
  if (directive.translate === false) directives.push('notranslate')
  if (directive.snippet === false) directives.push('nosnippet')
  if (directive.noimageindex) directives.push('noimageindex')

  if (directive.unavailableAfter) {
    directives.push(`unavailable_after: ${directive.unavailableAfter}`)
  }

  if (directive.maxSnippet !== undefined) {
    directives.push(`max-snippet:${directive.maxSnippet}`)
  }

  if (directive.maxImagePreview) {
    directives.push(`max-image-preview:${directive.maxImagePreview}`)
  }

  if (directive.maxVideoPreview !== undefined) {
    directives.push(`max-video-preview:${directive.maxVideoPreview}`)
  }

  if (directive.noai) {
    directives.push('noai')
  }

  return directives.join(', ')
}

// Page-specific directive configurations
export const PAGE_DIRECTIVES: Record<string, RobotsDirective> = {
  // Public pages - fully indexable
  '/': {
    index: true,
    follow: true,
    archive: true,
    imageIndex: true,
    translate: true,
    snippet: true,
    maxSnippet: 160,
    maxImagePreview: 'large'
  },
  '/ai-tools': {
    index: true,
    follow: true,
    archive: true,
    imageIndex: true,
    maxSnippet: 160,
    maxImagePreview: 'large'
  },
  '/tool/*': {
    index: true,
    follow: true,
    archive: true,
    imageIndex: true,
    maxSnippet: 300,
    maxImagePreview: 'large'
  },
  '/blog': {
    index: true,
    follow: true,
    archive: true,
    imageIndex: true,
    maxSnippet: 200,
    maxImagePreview: 'large'
  },
  '/blog/*': {
    index: true,
    follow: true,
    archive: true,
    imageIndex: true,
    maxSnippet: 300,
    maxImagePreview: 'large'
  },
  '/categories': {
    index: true,
    follow: true,
    archive: true,
    maxSnippet: 160
  },
  '/compare': {
    index: true,
    follow: true,
    archive: true,
    maxSnippet: 200
  },
  '/about': {
    index: true,
    follow: true,
    archive: true
  },
  '/contact': {
    index: true,
    follow: true,
    archive: true
  },
  // No index - technical pages
  '/api/*': {
    index: false,
    follow: false,
    archive: false
  },
  '/admin/*': {
    index: false,
    follow: false,
    archive: false
  },
  '/search': {
    index: false,
    follow: true,
    archive: false
  },
  '/404': {
    index: false,
    follow: false,
    archive: false
  },
  '/500': {
    index: false,
    follow: false,
    archive: false
  }
}

// Get directive for a given path
export function getDirectiveForPath(path: string): RobotsDirective {
  // Check for exact match first
  if (PAGE_DIRECTIVES[path]) {
    return PAGE_DIRECTIVES[path]
  }

  // Check for pattern matches
  for (const [pattern, directive] of Object.entries(PAGE_DIRECTIVES)) {
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$')
      if (regex.test(path)) {
        return directive
      }
    }
  }

  // Default directive for unknown paths
  return {
    index: true,
    follow: true,
    archive: true,
    imageIndex: true
  }
}

// Generate canonical URL
export function generateCanonicalUrl(path: string, params?: Record<string, string>): string {
  const baseUrl = `${SITE_URL}${path}`
  
  if (!params || Object.keys(params).length === 0) {
    return baseUrl
  }

  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value)
  })

  return `${baseUrl}?${searchParams.toString()}`
}

// Generate alternate links for hreflang
export function generateAlternateLinks(
  path: string,
  locales: Array<{ code: string; region?: string; url: string }>
): Array<{ rel: string; hreflang: string; href: string }> {
  const links: Array<{ rel: string; hreflang: string; href: string }> = []

  // Add self-referencing link
  links.push({
    rel: 'alternate',
    hreflang: 'en',
    href: `${SITE_URL}${path}`
  })

  // Add alternate locales
  locales.forEach(locale => {
    links.push({
      rel: 'alternate',
      hreflang: locale.code,
      href: locale.url || `${SITE_URL}/${locale.code}${path}`
    })
  })

  // Add x-default
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${SITE_URL}${path}`
  })

  return links
}

// Generate noindex headers for specific responses
export function generateNoindexHeaders(): Record<string, string> {
  return {
    'X-Robots-Tag': 'noindex, nofollow',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Pragma': 'no-cache'
  }
}

// Generate index headers for public content
export function generateIndexHeaders(): Record<string, string> {
  return {
    'X-Robots-Tag': 'index, follow',
    'Cache-Control': 'public, max-age=3600',
    'Link': `<${SITE_URL}>; rel=preconnect`
  }
}

// Sitemap priority configurations
export const SITEMAP_PRIORITIES = {
  homepage: 1.0,
  mainPages: 0.9,
  categoryPages: 0.8,
  toolPages: 0.8,
  blogPosts: 0.7,
  tagPages: 0.6,
  searchPages: 0.3,
  adminPages: 0.0
}

// Sitemap change frequency
export const CHANGE_FREQUENCIES = {
  always: 'always',
  hourly: 'hourly',
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
  yearly: 'yearly',
  never: 'never'
}

// Generate URL priority based on path
export function getUrlPriority(path: string): number {
  if (path === '/' || path === '') return SITEMAP_PRIORITIES.homepage
  if (path.startsWith('/ai-tools') && !path.includes('/tool/')) return SITEMAP_PRIORITIES.mainPages
  if (path.startsWith('/tool/')) return SITEMAP_PRIORITIES.toolPages
  if (path.startsWith('/blog') && !path.includes('/tag/')) return SITEMAP_PRIORITIES.blogPosts
  if (path.startsWith('/categories')) return SITEMAP_PRIORITIES.categoryPages
  if (path.startsWith('/compare')) return SITEMAP_PRIORITIES.mainPages
  if (path.includes('/tag/')) return SITEMAP_PRIORITIES.tagPages
  if (path.includes('/search')) return SITEMAP_PRIORITIES.searchPages
  if (path.startsWith('/api') || path.startsWith('/admin')) return SITEMAP_PRIORITIES.adminPages
  
  return SITEMAP_PRIORITIES.mainPages
}

// Generate change frequency based on content type
export function getChangeFrequency(path: string): string {
  if (path === '/' || path === '') return CHANGE_FREQUENCIES.daily
  if (path.startsWith('/blog')) return CHANGE_FREQUENCIES.weekly
  if (path.startsWith('/tool/')) return CHANGE_FREQUENCIES.monthly
  if (path.startsWith('/categories')) return CHANGE_FREQUENCIES.weekly
  if (path.startsWith('/compare')) return CHANGE_FREQUENCIES.weekly
  if (path.startsWith('/api')) return CHANGE_FREQUENCIES.never
  
  return CHANGE_FREQUENCIES.weekly
}
