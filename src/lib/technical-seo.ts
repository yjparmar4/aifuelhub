/**
 * Technical SEO Optimization Utilities
 * Core Web Vitals, performance, and technical SEO improvements
 */

// Core Web Vitals monitoring
export class CoreWebVitalsMonitor {
  private static instance: CoreWebVitalsMonitor
  private metrics: {
    lcp: number[] // Largest Contentful Paint
    fid: number[] // First Input Delay
    cls: number[] // Cumulative Layout Shift
    fcp: number[] // First Contentful Paint
    ttfb: number[] // Time to First Byte
  } = {
    lcp: [],
    fid: [],
    cls: [],
    fcp: [],
    ttfb: []
  }

  static getInstance(): CoreWebVitalsMonitor {
    if (!CoreWebVitalsMonitor.instance) {
      CoreWebVitalsMonitor.instance = new CoreWebVitalsMonitor()
    }
    return CoreWebVitalsMonitor.instance
  }

  // Record Core Web Vitals metrics
  recordMetric(name: keyof typeof this.metrics, value: number): void {
    this.metrics[name].push(value)
    
    // Keep only last 100 measurements
    if (this.metrics[name].length > 100) {
      this.metrics[name].shift()
    }

    // Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'core_web_vitals', {
        event_category: 'Web Vitals',
        event_label: name,
        value: Math.round(value),
        custom_map: { custom_parameter_1: 'metric_name' }
      })
    }
  }

  // Get performance score
  getPerformanceScore(): {
    overall: number
    lcp: number
    fid: number
    cls: number
    fcp: number
    ttfb: number
    grade: 'A' | 'B' | 'C' | 'D' | 'F'
  } {
    const calculateScore = (values: number[], thresholds: { good: number; needsImprovement: number }) => {
      if (values.length === 0) return 0
      const avg = values.reduce((a, b) => a + b, 0) / values.length
      
      if (avg <= thresholds.good) return 100
      if (avg <= thresholds.needsImprovement) return 50
      return 25
    }

    const lcpScore = calculateScore(this.metrics.lcp, { good: 2500, needsImprovement: 4000 })
    const fidScore = calculateScore(this.metrics.fid, { good: 100, needsImprovement: 300 })
    const clsScore = calculateScore(this.metrics.cls, { good: 0.1, needsImprovement: 0.25 })
    const fcpScore = calculateScore(this.metrics.fcp, { good: 1800, needsImprovement: 3000 })
    const ttfbScore = calculateScore(this.metrics.ttfb, { good: 800, needsImprovement: 1800 })

    const overall = (lcpScore + fidScore + clsScore + fcpScore + ttfbScore) / 5

    let grade: 'A' | 'B' | 'C' | 'D' | 'F'
    if (overall >= 90) grade = 'A'
    else if (overall >= 80) grade = 'B'
    else if (overall >= 70) grade = 'C'
    else if (overall >= 60) grade = 'D'
    else grade = 'F'

    return {
      overall,
      lcp: lcpScore,
      fid: fidScore,
      cls: clsScore,
      fcp: fcpScore,
      ttfb: ttfbScore,
      grade
    }
  }

  // Get recommendations
  getRecommendations(): string[] {
    const recommendations: string[] = []
    const scores = this.getPerformanceScore()

    if (scores.lcp < 80) {
      recommendations.push('Optimize Largest Contentful Paint by compressing images and reducing server response time')
    }
    if (scores.fid < 80) {
      recommendations.push('Improve First Input Delay by reducing JavaScript execution time and main thread work')
    }
    if (scores.cls < 80) {
      recommendations.push('Reduce Cumulative Layout Shift by specifying image dimensions and avoiding layout shifts')
    }
    if (scores.fcp < 80) {
      recommendations.push('Optimize First Contentful Paint by reducing server response time and render-blocking resources')
    }
    if (scores.ttfb < 80) {
      recommendations.push('Improve Time to First Byte by optimizing server performance and using CDN')
    }

    return recommendations
  }
}

// Image optimization utilities
export const imageOptimization = {
  // Generate responsive image sizes
  generateSrcSet: (baseUrl: string, widths: number[]): string => {
    return widths
      .map(width => `${baseUrl}?w=${width} ${width}w`)
      .join(', ')
  },

  // Generate lazy loading attributes
  generateLazyLoading: (priority: 'high' | 'normal' | 'low' = 'normal') => {
    return {
      loading: priority === 'high' ? 'eager' : 'lazy',
      decoding: 'async',
      fetchpriority: priority
    }
  },

  // Optimize image format
  getOptimalFormat: (imagePath: string): string => {
    const supportedFormats = ['avif', 'webp', 'jpg', 'png']
    // In production, check browser support and serve optimal format
    return 'webp' // Default to WebP for modern browsers
  }
}

// Font optimization utilities
export const fontOptimization = {
  // Generate font display strategy
  getFontDisplay: (fontType: 'display' | 'body' | 'heading'): 'swap' | 'fallback' | 'optional' => {
    switch (fontType) {
      case 'display': return 'swap'
      case 'body': return 'swap'
      case 'heading': return 'swap'
      default: return 'swap'
    }
  },

  // Generate font preload hints
  generatePreloadHints: (fonts: Array<{ family: string; weight: string; style?: string }>) => {
    return fonts.map(font => ({
      rel: 'preload',
      href: `/fonts/${font.family}-${font.weight}.woff2`,
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    }))
  }
}

// Critical CSS optimization
export const criticalCSS = {
  // Generate critical CSS for above-the-fold content
  generateCriticalCSS: (content: string): string => {
    // In production, use tools like Critical or Penthouse to extract critical CSS
    return `
      /* Critical CSS for above-the-fold content */
      body { font-family: system-ui, -apple-system, sans-serif; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
      .hero { min-height: 80vh; display: flex; align-items: center; }
    `
  },

  // Generate non-critical CSS loading strategy
  generateNonCriticalCSS: (cssPath: string): string => {
    return `
      <link rel="preload" href="${cssPath}" as="style" onload="this.onload=null;this.rel='stylesheet'">
      <noscript><link rel="stylesheet" href="${cssPath}"></noscript>
    `
  }
}

// Resource optimization utilities
export const resourceOptimization = {
  // Generate resource hints
  generateResourceHints: (resources: {
    preconnect?: string[]
    dnsPrefetch?: string[]
    preload?: Array<{ href: string; as: string; type?: string }>
    prefetch?: Array<{ href: string; as?: string }>
  }) => {
    const hints: string[] = []

    // Preconnect hints
    if (resources.preconnect) {
      resources.preconnect.forEach(url => {
        hints.push(`<link rel="preconnect" href="${url}">`)
      })
    }

    // DNS prefetch hints
    if (resources.dnsPrefetch) {
      resources.dnsPrefetch.forEach(url => {
        hints.push(`<link rel="dns-prefetch" href="${url}">`)
      })
    }

    // Preload hints
    if (resources.preload) {
      resources.preload.forEach(resource => {
        const typeAttr = resource.type ? ` type="${resource.type}"` : ''
        hints.push(`<link rel="preload" href="${resource.href}" as="${resource.as}"${typeAttr}>`)
      })
    }

    // Prefetch hints
    if (resources.prefetch) {
      resources.prefetch.forEach(resource => {
        const asAttr = resource.as ? ` as="${resource.as}"` : ''
        hints.push(`<link rel="prefetch" href="${resource.href}"${asAttr}>`)
      })
    }

    return hints.join('\n')
  },

  // Generate cache control headers
  generateCacheControl: (resourceType: 'static' | 'api' | 'image' | 'font'): string => {
    switch (resourceType) {
      case 'static':
        return 'public, max-age=31536000, immutable'
      case 'api':
        return 'public, max-age=3600, must-revalidate'
      case 'image':
        return 'public, max-age=86400, immutable'
      case 'font':
        return 'public, max-age=31536000, immutable'
      default:
        return 'public, max-age=3600'
    }
  }
}

// Mobile optimization utilities
export const mobileOptimization = {
  // Generate viewport meta tag
  generateViewportMeta: () => {
    return {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
      viewportFit: 'cover'
    }
  },

  // Generate mobile-specific optimizations
  generateMobileOptimizations: () => {
    return {
      // Touch optimization
      touchAction: 'manipulation',
      // Prevent zoom on input focus
      maximumScale: 1,
      // Enable proper rendering
      shrinkToFit: 'no'
    }
  }
}

// Schema markup optimization
export const schemaOptimization = {
  // Generate comprehensive schema markup
  generateComprehensiveSchema: (type: 'tool' | 'blog' | 'category', data: any) => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type === 'tool' ? 'SoftwareApplication' : 
              type === 'blog' ? 'Article' : 'CollectionPage',
      name: data.name || data.title,
      description: data.description,
      url: `https://www.aifuelhub.com/${type}/${data.slug}`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.aifuelhub.com/${type}/${data.slug}`
      }
    }

    // Add additional schema types based on content
    const additionalSchemas: any[] = []

    if (type === 'tool') {
      additionalSchemas.push({
        '@type': 'Review',
        author: {
          '@type': 'Organization',
          name: 'AI Fuel Hub'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: data.rating || 4.5,
          bestRating: 5,
          worstRating: 1
        }
      })
    }

    return [baseSchema, ...additionalSchemas]
  }
}

// SEO audit utilities
export const seoAudit = {
  // Perform comprehensive SEO audit
  performAudit: (pageContent: string, pageUrl: string) => {
    const audit = {
      technical: {
        titleLength: 0,
        metaDescriptionLength: 0,
        h1Count: 0,
        imageAltCount: 0,
        internalLinkCount: 0,
        externalLinkCount: 0
      },
      content: {
        wordCount: 0,
        readabilityScore: 0,
        keywordDensity: 0,
        headingStructure: [] as string[]
      },
      performance: {
        loadTime: 0,
        pageSize: 0,
        requestCount: 0
      },
      recommendations: [] as string[]
    }

    // Technical SEO checks
    const titleMatch = pageContent.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch) {
      audit.technical.titleLength = titleMatch[1].length
      if (audit.technical.titleLength < 30 || audit.technical.titleLength > 60) {
        audit.recommendations.push('Title length should be between 30-60 characters')
      }
    }

    const metaDescMatch = pageContent.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    if (metaDescMatch) {
      audit.technical.metaDescriptionLength = metaDescMatch[1].length
      if (audit.technical.metaDescriptionLength < 120 || audit.technical.metaDescriptionLength > 160) {
        audit.recommendations.push('Meta description should be between 120-160 characters')
      }
    }

    const h1Matches = pageContent.match(/<h1[^>]*>/gi)
    audit.technical.h1Count = h1Matches ? h1Matches.length : 0
    if (audit.technical.h1Count !== 1) {
      audit.recommendations.push('Page should have exactly one H1 tag')
    }

    const imgMatches = pageContent.match(/<img[^>]*>/gi)
    if (imgMatches) {
      const imgsWithAlt = pageContent.match(/<img[^>]*alt=["'][^"']*["'][^>]*>/gi)
      audit.technical.imageAltCount = imgsWithAlt ? imgsWithAlt.length : 0
      if (audit.technical.imageAltCount < imgMatches.length) {
        audit.recommendations.push('All images should have alt attributes')
      }
    }

    // Content analysis
    const textContent = pageContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    audit.content.wordCount = textContent.split(' ').length
    if (audit.content.wordCount < 300) {
      audit.recommendations.push('Content should be at least 300 words for better SEO')
    }

    // Heading structure analysis
    const headingMatches = pageContent.match(/<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/gi)
    if (headingMatches) {
      audit.content.headingStructure = headingMatches.map(match => {
        const level = match.match(/<h([1-6])/)?.[1] || '0'
        const text = match.match(/>([^<]+)</)?.[1] || ''
        return `H${level}: ${text}`
      })
    }

    return audit
  }
}

// Export singleton instances
export const webVitalsMonitor = CoreWebVitalsMonitor.getInstance()
