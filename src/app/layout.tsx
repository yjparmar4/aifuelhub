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
import { generateHreflangTags, generateGeoTargetingSchema } from "@/lib/international-seo";

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
    default: "AI Fuel Hub - Compare 118+ AI Tools ✓ Honest Reviews (Jan 2026)",
    template: "%s | AI Fuel Hub",
  },
  description: "Compare 118+ AI tools with honest reviews. Expert-tested ChatGPT, Midjourney, Claude alternatives. Find the best tool for your needs.",
  keywords: ["best AI tools 2026", "AI tool reviews", "ChatGPT alternatives free", "Midjourney alternatives", "AI writing tools comparison", "AI image generators free", "AI coding tools", "Ahrefs alternatives free", "Moz Pro alternatives"],
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
    url: SITE_URL,
    title: "AI Fuel Hub - Compare 118+ AI Tools ✓ Honest Reviews (Jan 2026)",
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
      },
      {
        url: "/og-image-square.png",
        width: 600,
        height: 600,
        alt: "AI Fuel Hub - AI Tools Directory",
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
    creatorId: "1234567890",
    site: "@aifuelhub",
    siteId: "1234567890",
  },
  other: {
    "linkedin:owner": "AI Fuel Hub",
    "fb:app_id": "your-facebook-app-id",
    "pinterest-rich-pin": "true",
    "telegram:channel": "@aifuelhub",
    "whatsapp:share": "true",
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
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google1b97f335783a2de5',
    other: {
      "msvalidate.01": "YOUR_BING_VERIFICATION_CODE", // Optional
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-KBW050L12X';

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

        {/* AdSense Script removed - ads will be added later */}

        {/* AI Search Monitoring */}
        <Script
          id="ai-search-monitoring"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize AI search monitoring
              if (typeof window !== 'undefined') {
                // Track AI search engine referrals
                function trackAISearchReferral() {
                  const referrer = document.referrer;
                  const engines = {
                    'chatgpt.com': 'ChatGPT',
                    'openai.com': 'ChatGPT',
                    'perplexity.ai': 'Perplexity',
                    'claude.ai': 'Claude',
                    'anthropic.com': 'Claude'
                  };
                  
                  for (const [domain, engine] of Object.entries(engines)) {
                    if (referrer.includes(domain)) {
                      if (window.gtag) {
                        window.gtag('event', 'ai_search_referral', {
                          engine: engine,
                          page_location: window.location.href
                        });
                      }
                      break;
                    }
                  }
                }
                
                // Track immediately and on page load
                trackAISearchReferral();
                document.addEventListener('DOMContentLoaded', trackAISearchReferral);
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
