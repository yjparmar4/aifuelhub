import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || SITE_URL).replace(/\/$/, '')

  return {
    rules: [
      // =============================================
      // GENERAL CRAWLERS — Full access with protected areas
      // =============================================
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/draft/',
          '/preview/',
          '/login/',
          '/register/',
          '/account/',
          '/dashboard/',
          '/_next/',
          '/404/',
          '/500/',
        ],
      },

      // =============================================
      // GOOGLE — All Googlebots (Priority access)
      // =============================================
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/blog/images/', '/public/', '/images/'],
      },
      {
        userAgent: 'Googlebot-Video',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/blog/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        // Google AI training and Bard/Gemini
      },
      {
        userAgent: 'Storebot-Google',
        allow: '/',
      },

      // =============================================
      // MICROSOFT BING — All Bingbots
      // =============================================
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'BingPreview',
        allow: '/',
      },
      {
        userAgent: 'MSNBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'adidxbot',
        allow: '/',
      },

      // =============================================
      // AI SEARCH ENGINES — OpenAI
      // =============================================
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/blog/', '/tool/', '/ai-tools/', '/categories/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },

      // =============================================
      // AI SEARCH ENGINES — Anthropic (Claude)
      // =============================================
      {
        userAgent: 'ClaudeBot',
        allow: ['/', '/blog/', '/tool/', '/ai-tools/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },

      // =============================================
      // AI SEARCH ENGINES — Perplexity
      // =============================================
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/blog/', '/tool/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },

      // =============================================
      // AI SEARCH ENGINES — Meta AI
      // =============================================
      {
        userAgent: 'FacebookBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'meta-externalagent',
        allow: '/',
      },

      // =============================================
      // AI SEARCH ENGINES — Other Major AI
      // =============================================
      {
        userAgent: 'Bytespider',
        allow: '/',
        // ByteDance/TikTok AI
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        // Common Crawl (used by many AI models)
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      {
        userAgent: 'DeepSeekBot',
        allow: '/',
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      {
        userAgent: 'YouBot',
        allow: '/',
      },
      {
        userAgent: 'Diffbot',
        allow: '/',
      },

      // =============================================
      // GLOBAL SEARCH ENGINES
      // =============================================
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
      },
      // Baidu (China #1)
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Baiduspider-image',
        allow: ['/images/', '/blog/images/'],
      },
      // Yandex (Russia #1)
      {
        userAgent: 'YandexBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'YandexImages',
        allow: ['/images/', '/blog/images/'],
      },
      // Naver (South Korea)
      {
        userAgent: 'Yeti',
        allow: '/',
        crawlDelay: 1,
      },
      // Seznam (Czech Republic)
      {
        userAgent: 'SeznamBot',
        allow: '/',
        crawlDelay: 2,
      },
      // Sogou (China)
      {
        userAgent: 'Sogou',
        allow: '/',
        crawlDelay: 2,
      },
      // Qwant (EU)
      {
        userAgent: 'Qwantbot',
        allow: '/',
      },

      // =============================================
      // SOCIAL MEDIA CRAWLERS
      // =============================================
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      {
        userAgent: 'Slackbot',
        allow: '/',
      },
      {
        userAgent: 'Discordbot',
        allow: '/',
      },
      {
        userAgent: 'Redditbot',
        allow: '/',
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
      },
      {
        userAgent: 'TelegramBot',
        allow: '/',
      },

      // =============================================
      // SEO TOOLS — Throttled access
      // =============================================
      {
        userAgent: 'AhrefsBot',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'SemrushBot',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'Rogerbot',
        allow: '/',
        crawlDelay: 5,
      },

      // =============================================
      // BLOCK BAD BOTS & SCRAPERS
      // =============================================
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'DotBot',
        disallow: '/',
      },
      {
        userAgent: 'BLEXBot',
        disallow: '/',
      },
      {
        userAgent: 'MegaIndex',
        disallow: '/',
      },
      {
        userAgent: 'MauiBot',
        disallow: '/',
      },
      {
        userAgent: 'AhrefsSiteAudit',
        disallow: '/',
      },
      {
        userAgent: 'serpstatbot',
        disallow: '/',
      },
      {
        userAgent: 'DataForSeoBot',
        disallow: '/',
      },
      {
        userAgent: 'HTTrack',
        disallow: '/',
      },
      {
        userAgent: 'WebCopier',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
