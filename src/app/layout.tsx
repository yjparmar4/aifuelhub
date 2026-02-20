import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Merriweather } from "next/font/google"; // Premium fonts
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd } from "@/components/json-ld";
import { generateOrganizationSchema, generateWebSiteSchema, generateSiteNavigationSchema } from "@/lib/schema";
import { initializeAISearchMonitoring } from "@/lib/ai-search-monitoring";
import { PerformanceOptimizations } from "@/components/technical-seo-monitor";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WebVitalsMonitor, PerformanceObserver, SEOPerformanceOptimizations } from "@/components/web-vitals-monitor";
import { SITE_URL } from "@/lib/seo";
import { AnalyticsProvider } from "@/components/analytics-provider";
import Script from "next/script";
import { generateHreflangTags, generateGeoTargetingSchema, SUPPORTED_LOCALES } from "@/lib/international-seo";
import { generateCompleteKnowledgeGraph } from "@/lib/knowledge-graph-optimization";
import { ULTIMATE_SEO_CONFIG, generateUltimateSchema } from "@/lib/ultimate-seo";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Fuel Hub - Compare 118+ AI Tools ✓ Honest Reviews (2026)",
    template: "%s | AI Fuel Hub",
  },
  description: "Compare 118+ AI tools with honest reviews. Expert-tested ChatGPT, Midjourney, Claude alternatives. Find the best tool for your needs.",
  keywords: [
    "best AI tools 2026", "AI tool reviews", "ChatGPT alternatives free", "Midjourney alternatives",
    "AI writing tools comparison", "AI image generators free", "AI coding tools", "Ahrefs alternatives free",
    "Moz Pro alternatives", "artificial intelligence software", "machine learning tools",
    "AI productivity", "best AI software", "herramientas IA", "outils IA", "KI Werkzeuge",
    "人工智能工具", "AIツール", "AI 도구", "ferramentas IA", "инструменты ИИ"
  ],
  authors: [{ name: "AI Fuel Hub Team", url: "https://aifuelhub.com/about" }],
  creator: "AI Fuel Hub Team",
  publisher: "AI Fuel Hub",
  category: "Technology",
  classification: "AI Tools Directory",
  applicationName: "AI Fuel Hub",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ULTIMATE_SEO_CONFIG.locales,
    url: SITE_URL,
    title: "AI Fuel Hub - Compare 118+ AI Tools ✓ Honest Reviews (2026)",
    description: "Compare 118+ AI tools with honest reviews. Expert-tested ChatGPT, Midjourney, Claude alternatives.",
    siteName: "AI Fuel Hub",
    emails: ["hello@aifuelhub.com"],
    phoneNumbers: [],
    faxNumbers: [],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Fuel Hub - AI Tools Directory and Reviews",
        type: "image/png",
      },
      {
        url: "/og-image-square.png",
        width: 600,
        height: 600,
        alt: "AI Fuel Hub - AI Tools Directory",
        type: "image/png",
      },
    ],
    countryName: "United States",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Fuel Hub - Compare 118+ AI Tools ✓ Honest Reviews",
    description: "Compare 118+ AI tools with honest reviews. Expert-tested ChatGPT, Midjourney, Claude alternatives.",
    images: ["/og-image.png"],
    creator: "@aifuelhub",
    site: "@aifuelhub",
  },
  other: {
    // AI Search Optimization
    "ai-search-optimized": "true",
    "ai-crawl-allowed": "true",
    "chatgpt-optimize": "true",
    "perplexity-optimize": "true",
    "claude-optimize": "true",
    "gemini-optimize": "true",
    "copilot-optimize": "true",
    // Trust Signals
    "entity-type": "AI Tools Directory",
    "trust-score": "4.8",
    "expert-reviewed": "true",
    "content-rating": "general",
    // Global SEO
    "content-language": "en",
    "target-market": "global",
    "geo.region": "US",
    // Social
    "linkedin:owner": "AI Fuel Hub",

    "pinterest-rich-pin": "true",
    "telegram:channel": "@aifuelhub",
    "whatsapp:share": "true",
    // Google AI
    "Google-Extended": "index, follow",
    // Platform specific
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AI Fuel Hub",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.png",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  archives: ["https://aifuelhub.com/sitemap.xml"],
  assets: ["https://aifuelhub.com/public"],
  bookmarks: ["https://aifuelhub.com"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      "notranslate": false,
      "noimageindex": false,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google1b97f335783a2de5',
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_VERIFICATION || "",
      "baidu-site-verification": process.env.BAIDU_VERIFICATION || "",
      "naver-site-verification": process.env.NAVER_VERIFICATION || "",
      "p:domain_verify": process.env.PINTEREST_VERIFICATION || "",
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'x-default': SITE_URL,
      ...Object.fromEntries(
        SUPPORTED_LOCALES.map((locale) => [
          locale.code,
          `${SITE_URL}?lang=${locale.code}`,
        ])
      ),
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-KBW050L12X';
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-0000000000000000';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SEOPerformanceOptimizations />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${merriweather.variable} font-sans antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`,
          }}
        />

        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* AI Search Monitoring - Comprehensive */}
        <Script
          id="ai-search-monitoring"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize comprehensive AI search monitoring
              if (typeof window !== 'undefined') {
                // Track AI search engine referrals - All major AI engines
                function trackAISearchReferral() {
                  const referrer = document.referrer;
                  const engines = {
                    'chatgpt.com': 'ChatGPT',
                    'openai.com': 'ChatGPT',
                    'perplexity.ai': 'Perplexity',
                    'claude.ai': 'Claude',
                    'anthropic.com': 'Claude',
                    'gemini.google.com': 'Gemini',
                    'copilot.microsoft.com': 'Copilot',
                    'bing.com': 'Bing AI',
                    'you.com': 'You.com',
                    'phind.com': 'Phind',
                    'komo.ai': 'Komo',
                    'andisearch.com': 'Andi',
                    'deepseek.com': 'DeepSeek',
                    'meta.ai': 'Meta AI',
                    'x.ai': 'Grok'
                  };
                  
                  for (const [domain, engine] of Object.entries(engines)) {
                    if (referrer.includes(domain)) {
                      if (window.gtag) {
                        window.gtag('event', 'ai_search_referral', {
                          engine: engine,
                          page_location: window.location.href,
                          page_title: document.title,
                          traffic_source: 'ai_search'
                        });
                      }
                      console.log('AI Search Referral:', engine);
                      break;
                    }
                  }
                }
                
                // Track voice search queries
                function trackVoiceSearch() {
                  const urlParams = new URLSearchParams(window.location.search);
                  const voiceQuery = urlParams.get('voice') || urlParams.get('vs');
                  if (voiceQuery && window.gtag) {
                    window.gtag('event', 'voice_search', {
                      query: voiceQuery,
                      page_location: window.location.href
                    });
                  }
                }
                
                // Track immediately and on page load
                trackAISearchReferral();
                trackVoiceSearch();
                document.addEventListener('DOMContentLoaded', () => {
                  trackAISearchReferral();
                  trackVoiceSearch();
                });
                
                // Track page visibility for AI content consumption
                document.addEventListener('visibilitychange', () => {
                  if (document.visibilityState === 'hidden' && window.gtag) {
                    window.gtag('event', 'content_consumed', {
                      page_location: window.location.href,
                      time_on_page: Math.round(performance.now() / 1000)
                    });
                  }
                });
              }
            `,
          }}
        />

        {/* Web Vitals Monitoring */}
        <WebVitalsMonitor />
        <PerformanceObserver />



        {/* Enhanced structured data for world-class SEO */}
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateWebSiteSchema()} />
        <JsonLd data={generateSiteNavigationSchema()} />
        <JsonLd data={generateGeoTargetingSchema()} />
        <JsonLd data={generateCompleteKnowledgeGraph()} />
        <PerformanceOptimizations />
        <Navbar />
        <div className="pt-24 min-h-screen">
          {children}
        </div>
        <Footer />
        <AnalyticsProvider />
        <Toaster />
      </body>
    </html>
  );
}
