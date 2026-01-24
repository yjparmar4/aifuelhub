import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Merriweather } from "next/font/google"; // Premium fonts
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd } from "@/components/json-ld";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";
import { initializeAISearchMonitoring } from "@/lib/ai-search-monitoring";
import { PerformanceOptimizations } from "@/components/technical-seo-monitor";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/seo";
import Script from "next/script";

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
  authors: [{ name: "AI Fuel Hub Team" }],
  creator: "AI Fuel Hub Team",
  publisher: "AI Fuel Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "AI Fuel Hub - Compare 118+ AI Tools ✓ Honest Reviews (Jan 2026)",
    description: "Compare 118+ AI tools with honest reviews. Expert-tested ChatGPT, Midjourney, Claude alternatives.",
    siteName: "AI Fuel Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Fuel Hub - AI Tools Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Fuel Hub - Compare 118+ AI Tools ✓ Honest Reviews",
    description: "Compare 118+ AI tools with honest reviews. Expert-tested ChatGPT, Midjourney, Claude alternatives.",
    images: ["/og-image.png"],
    creator: "@aifuelhub",
  },
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
        {/* Resource hints for Core Web Vitals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
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

        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3541576002060495"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

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

        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateWebSiteSchema()} />
        <PerformanceOptimizations />
        <Navbar />
        <div className="pt-24 min-h-screen">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
