import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    rules: [
      // General crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/static/',
          '/private/',
        ],
      },
      // Google's main crawler - priority access
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
        crawlDelay: 1,
      },
      // Google Discover crawler - full access for Discover traffic
      {
        userAgent: 'Googlebot-News',
        allow: '/',
      },
      // Bing crawler
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
        crawlDelay: 2,
      },
      // AI Crawlers for GEO (Generative Engine Optimization)
      // OpenAI GPTBot - Allow for AI search visibility
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/blog/',
          '/tool/',
          '/ai-tools/',
          '/categories/',
          '/llms.txt',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      // Anthropic Claude crawler
      {
        userAgent: 'ClaudeBot',
        allow: [
          '/',
          '/blog/',
          '/tool/',
          '/ai-tools/',
          '/llms.txt',
        ],
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
      // Perplexity AI crawler
      {
        userAgent: 'PerplexityBot',
        allow: [
          '/',
          '/blog/',
          '/tool/',
          '/llms.txt',
        ],
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
      // Google AI crawler (Bard/Gemini)
      {
        userAgent: 'Google-Extended',
        allow: [
          '/',
          '/blog/',
          '/tool/',
          '/ai-tools/',
        ],
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
      // Common Crawl for open datasets
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

