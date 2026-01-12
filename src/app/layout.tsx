import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google"; // Premium fonts
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd } from "@/components/JsonLd";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Fuel Hub - Discover & Compare 118+ AI Tools | Expert Reviews 2026",
    template: "%s | AI Fuel Hub",
  },
  description: "The ultimate AI tools directory with 118+ verified tools. Find fuel for your creativity with ChatGPT, Midjourney, Claude, and more. Expert-tested, unbiased recommendations.",
  keywords: ["AI tools", "artificial intelligence", "AI directory", "ChatGPT alternatives", "Midjourney alternatives", "AI writing tools", "AI image generators", "AI coding tools", "best AI software 2026", "AEO", "GEO"],
  authors: [{ name: "AI Fuel Hub Team" }],
  creator: "AI Fuel Hub Team",
  publisher: "AI Fuel Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "AI Fuel Hub - Discover & Compare 118+ AI Tools | Expert Reviews 2026",
    description: "The ultimate AI tools directory with 118+ verified tools. Expert-tested, unbiased recommendations.",
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
    title: "AI Fuel Hub - Discover & Compare 118+ AI Tools",
    description: "The ultimate AI tools directory with 118+ verified tools. Expert-tested, unbiased recommendations.",
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "YOUR_VERIFICATION_CODE",
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} font-sans antialiased`}
      >
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${gaId}', { anonymize_ip: true });`,
              }}
            />
          </>
        ) : null}

        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <JsonLd />
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
