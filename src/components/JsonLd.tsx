import React from 'react';
import { SITE_URL } from '@/lib/seo';

export const JsonLd = () => {
  const siteUrl = SITE_URL;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "AI Fuel Hub",
        "description": "Premium AI-powered tools for content creation and SEO.",
        "publisher": {
          "@id": `${siteUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "AI Fuel Hub",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.svg`,
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://twitter.com/aifuelhub",
          "https://facebook.com/aifuelhub"
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
