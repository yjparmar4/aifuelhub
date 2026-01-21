/**
 * AMP (Accelerated Mobile Pages) Configuration and Utilities
 * Enables AMP pages for faster mobile loading and better SEO
 */

export interface AMPConfig {
  enableAMP: boolean
  defaultAMPVersion: 'amp' | 'next'
  imageOptimization: boolean
  lazyLoading: boolean
  inlineCSS: boolean
  minifyHTML: boolean
}

export const ampConfig: AMPConfig = {
  enableAMP: true,
  defaultAMPVersion: 'next',
  imageOptimization: true,
  lazyLoading: true,
  inlineCSS: true,
  minifyHTML: true
}

/**
 * Generate AMP HTML boilerplate
 */
export function generateAMPBoilerplate(): string {
  return `<!DOCTYPE html>
<html ⚡ lang="en">
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
</head>
<body>
  <!-- AMP content goes here -->
</body>
</html>`
}

/**
 * Generate AMP Analytics configuration
 */
export function generateAMPAnalytics(trackingId: string): string {
  return `<amp-analytics type="gtag" data-credentials="include">
  <script type="application/json">
  {
    "vars": {
      "gtag_id": "${trackingId}",
      "config": {
        "${trackingId}": {
          "groups": "default"
        }
      }
    },
    "triggers": {
      "trackPageview": {
        "on": "visible",
        "request": "pageview"
      },
      "trackClick": {
        "on": "click",
        "selector": "a",
        "request": "event",
        "vars": {
          "event_name": "click",
          "event_category": "engagement"
        }
      }
    }
  }
  </script>
</amp-analytics>`
}

/**
 * Generate AMP Image component
 */
export function generateAMPImage({
  src,
  width,
  height,
  alt,
  layout = 'responsive'
}: {
  src: string
  width: number
  height: number
  alt: string
  layout?: 'responsive' | 'fixed' | 'fill' | 'intrinsic'
}): string {
  return `<amp-img
  src="${src}"
  width="${width}"
  height="${height}"
  alt="${alt}"
  layout="${layout}"
></amp-img>`
}

/**
 * Generate AMP Video component
 */
export function generateAMPVideo({
  src,
  width,
  height,
  poster,
  autoplay = false,
  controls = true
}: {
  src: string
  width: number
  height: number
  poster?: string
  autoplay?: boolean
  controls?: boolean
}): string {
  return `<amp-video
  src="${src}"
  width="${width}"
  height="${height}"
  ${poster ? `poster="${poster}"` : ''}
  ${autoplay ? 'autoplay' : ''}
  ${controls ? 'controls' : ''}
  layout="responsive"
></amp-video>`
}

/**
 * Generate AMP Sidebar component
 */
export function generateAMPSidebar({
  side = 'right',
  children
}: {
  side?: 'left' | 'right'
  children: string
}): string {
  return `<amp-sidebar id="sidebar" side="${side}" layout="nodisplay">
  ${children}
</amp-sidebar>`
}

/**
 * Generate AMP Accordion component
 */
export function generateAMPAccordion(items: Array<{
  header: string
  content: string
  expanded?: boolean
}>): string {
  return `<amp-accordion expand-single-section>
  ${items.map((item, index) => `
    <section expanded${item.expanded ? '' : `="${index}"`}>
      <h4>${item.header}</h4>
      <div>${item.content}</div>
    </section>
  `).join('')}
</amp-accordion>`
}

/**
 * Generate AMP Carousel component
 */
export function generateAMPCarousel({
  height,
  type = 'slides',
  children
}: {
  height: number
  type?: 'slides' | 'carousel'
  children: string
}): string {
  return `<amp-carousel
  height="${height}"
  type="${type}"
  layout="fixed-height"
>
  ${children}
</amp-carousel>`
}

/**
 * Generate AMP List component
 */
export function generateAMPList({
  items,
  renderItem
}: {
  items: any[]
  renderItem: (item: any, index: number) => string
}): string {
  const jsonData = encodeURIComponent(JSON.stringify({ items }))
  return `<amp-list
  src="data:${jsonData}"
  width="auto"
  height="100"
  layout="fixed-height"
>
  <template type="amp-mustache">
    ${'{{.}}'}
  </template>
</amp-list>`
}

/**
 * Generate AMP Form component
 */
export function generateAMPForm({
  action,
  method = 'POST',
  children
}: {
  action: string
  method?: 'POST' | 'GET'
  children: string
}): string {
  return `<form
  action-xhr="${action}"
  method="${method}"
  target="_top"
>
  ${children}
  <div submit-success>
    <template type="amp-mustache">
      Success! Thanks for submitting.
    </template>
  </div>
  <div submit-error>
    <template type="amp-mustache">
      Error! Please try again.
    </template>
  </div>
</form>`
}

/**
 * Generate AMP Social Share component
 */
export function generateAMPSocialShare({
  url,
  title
}: {
  url: string
  title: string
}): string {
  return `<amp-social-share type="twitter"></amp-social-share>
<amp-social-share type="linkedin"></amp-social-share>
<amp-social-share type="email"></amp-social-share>
<amp-social-share type="system"></amp-social-share>`
}

/**
 * Generate AMP Ad component
 */
export function generateAMPAd({
  width,
  height,
  type,
  dataSlot
}: {
  width: number
  height: number
  type: string
  dataSlot: string
}): string {
  return `<amp-ad
  width="${width}"
  height="${height}"
  type="${type}"
  data-ad-client="ca-pub-3541576002060495"
  data-ad-slot="${dataSlot}"
></amp-ad>`
}

/**
 * Generate AMP Story component
 */
export function generateAMPStory({
  pages
}: {
  pages: Array<{
    image: string
    text: string
    duration?: number
  }>
}): string {
  return `<amp-story standalone>
  ${pages.map(page => `
    <amp-story-page id="page-${Math.random().toString(36).substr(2, 9)}">
      <amp-story-grid-layer template="fill">
        <amp-img src="${page.image}" width="720" height="1280" layout="responsive"></amp-img>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical">
        <h1>${page.text}</h1>
      </amp-story-grid-layer>
    </amp-story-page>
  `).join('')}
</amp-story>`
}

/**
 * Generate AMP Install Service Worker
 */
export function generateAMPServiceWorker(): string {
  return `<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful');
    }).catch(function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  }
</script>`
}

/**
 * Generate AMP Custom CSS
 */
export function generateAMPCSS(): string {
  return `<style amp-custom>
  /* Base styles */
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 0;
  }

  /* Container */
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 16px;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.2;
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h5 { font-size: 1rem; }
  h6 { font-size: 0.875rem; }

  p { margin-bottom: 16px; }

  /* Links */
  a {
    color: #0066cc;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: 8px 16px;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #0052a3;
  }

  /* Cards */
  .card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }

  /* Lists */
  ul, ol {
    margin-bottom: 16px;
    padding-left: 24px;
  }

  li { margin-bottom: 8px; }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
  }

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  th {
    background-color: #f5f5f5;
    font-weight: 600;
  }

  /* Utility classes */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  .mt-1 { margin-top: 8px; }
  .mt-2 { margin-top: 16px; }
  .mt-3 { margin-top: 24px; }
  .mt-4 { margin-top: 32px; }

  .mb-1 { margin-bottom: 8px; }
  .mb-2 { margin-bottom: 16px; }
  .mb-3 { margin-bottom: 24px; }
  .mb-4 { margin-bottom: 32px; }

  .p-1 { padding: 8px; }
  .p-2 { padding: 16px; }
  .p-3 { padding: 24px; }
  .p-4 { padding: 32px; }

  .hidden { display: none; }
</style>`
}

/**
 * Check if page should have AMP version
 */
export function shouldHaveAMP(path: string): boolean {
  const ampExcludedPaths = [
    '/admin',
    '/api',
    '/auth',
    '/dashboard'
  ]

  return !ampExcludedPaths.some(excluded => path.startsWith(excluded))
}

/**
 * Generate AMP canonical URL
 */
export function generateAMPCanonicalUrl(url: string): string {
  if (url.endsWith('/amp')) {
    return url.replace('/amp', '')
  }
  return `${url}/amp`
}

/**
 * Generate AMP link rel tags
 */
export function generateAMPLinkTags(url: string): string {
  const canonicalUrl = url.replace('/amp', '')
  const ampUrl = `${canonicalUrl}/amp`

  return `
<link rel="canonical" href="${canonicalUrl}">
<link rel="amphtml" href="${ampUrl}">
`
}

/**
 * Minify HTML for AMP
 */
export function minifyHTML(html: string): string {
  return html
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s*({|}|\[|\]|;|:|,)\s*/g, '$1')
    .trim()
}

/**
 * Validate AMP HTML
 */
export function validateAMP(html: string): boolean {
  // Basic AMP validation checks
  const requiredElements = [
    '<!DOCTYPE html>',
    '<html ⚡',
    '<script async src="https://cdn.ampproject.org/v0.js"></script>',
    '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">'
  ]

  return requiredElements.every(element => html.includes(element))
}

/**
 * Generate AMP error page
 */
export function generateAMPErrorPage({
  title,
  message,
  statusCode
}: {
  title: string
  message: string
  statusCode: number
}): string {
  return `<!DOCTYPE html>
<html ⚡ lang="en">
<head>
  <meta charset="utf-8">
  <title>Error ${statusCode} - ${title}</title>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
</head>
<body>
  <div class="container">
    <h1>Error ${statusCode}</h1>
    <p>${message}</p>
    <a href="/">Go Home</a>
  </div>
</body>
</html>`
}
