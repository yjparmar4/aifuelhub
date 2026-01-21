/**
 * Performance Monitoring and User Engagement Tracking
 * Tracks Core Web Vitals, user behavior, and engagement metrics
 */

export interface PerformanceMetrics {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
  tti?: number
}

export interface UserEngagementMetrics {
  timeOnPage: number
  scrollDepth: number
  clickCount: number
  linkClicks: number
  formSubmissions: number
  videoPlays: number
  videoCompletions: number
  errors: number
}

export interface PagePerformance {
  url: string
  metrics: PerformanceMetrics
  engagement: UserEngagementMetrics
  timestamp: Date
  deviceType: 'mobile' | 'tablet' | 'desktop'
  connectionType: string
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return

  // Track page load
  window.addEventListener('load', () => {
    trackPageLoad()
  })

  // Track Core Web Vitals
  trackCoreWebVitals()

  // Track user engagement
  trackUserEngagement()

  // Track errors
  trackErrors()
}

/**
 * Track page load performance
 */
function trackPageLoad() {
  if (typeof window === 'undefined') return

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

  const metrics = {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    load: navigation.loadEventEnd - navigation.loadEventStart,
    total: navigation.loadEventEnd - navigation.fetchStart
  }

  console.log('Page Load Metrics:', metrics)

  // Send to analytics
  sendToAnalytics('page_load', metrics)
}

/**
 * Track Core Web Vitals
 */
function trackCoreWebVitals() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  // LCP (Largest Contentful Paint)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lcp = entries[entries.length - 1] as PerformanceEntry
      console.log('LCP:', lcp.startTime.toFixed(2), 'ms')
      sendToAnalytics('lcp', { value: Math.round(lcp.startTime) })
    })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch (e) {
    console.warn('LCP observer not supported')
  }

  // FID (First Input Delay)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = (entry as any).processingStart - entry.startTime
        console.log('FID:', fid.toFixed(2), 'ms')
        sendToAnalytics('fid', { value: Math.round(fid) })
      }
    })
    fidObserver.observe({ type: 'first-input', buffered: true })
  } catch (e) {
    console.warn('FID observer not supported')
  }

  // CLS (Cumulative Layout Shift)
  try {
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
          console.log('CLS:', clsValue.toFixed(4))
          sendToAnalytics('cls', { value: Math.round(clsValue * 1000) })
        }
      }
    })
    clsObserver.observe({ type: 'layout-shift', buffered: true })
  } catch (e) {
    console.warn('CLS observer not supported')
  }

  // FCP (First Contentful Paint)
  try {
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime.toFixed(2), 'ms')
          sendToAnalytics('fcp', { value: Math.round(entry.startTime) })
        }
      }
    })
    fcpObserver.observe({ type: 'paint', buffered: true })
  } catch (e) {
    console.warn('FCP observer not supported')
  }
}

/**
 * Track user engagement
 */
function trackUserEngagement() {
  if (typeof window === 'undefined') return

  let startTime = Date.now()
  let scrollDepth = 0
  let clickCount = 0
  let linkClicks = 0
  let videoPlays = 0
  let videoCompletions = 0

  // Track scroll depth
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const depth = (scrollTop / docHeight) * 100

    if (depth > scrollDepth) {
      scrollDepth = Math.round(depth)
      sendToAnalytics('scroll_depth', { value: scrollDepth })
    }
  })

  // Track clicks
  document.addEventListener('click', (e) => {
    clickCount++
    sendToAnalytics('click', { count: clickCount })

    // Track link clicks
    const target = e.target as HTMLElement
    if (target.tagName === 'A' || target.closest('a')) {
      linkClicks++
      sendToAnalytics('link_click', { count: linkClicks })
    }
  })

  // Track video engagement
  document.addEventListener('play', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'VIDEO') {
      videoPlays++
      sendToAnalytics('video_play', { count: videoPlays })
    }
  }, true)

  document.addEventListener('ended', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'VIDEO') {
      videoCompletions++
      sendToAnalytics('video_complete', { count: videoCompletions })
    }
  }, true)

  // Track time on page
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000)
    sendToAnalytics('time_on_page', { value: timeOnPage })
  })

  // Track form submissions
  document.addEventListener('submit', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'FORM') {
      sendToAnalytics('form_submit', { type: target.id || 'unknown' })
    }
  })
}

/**
 * Track errors
 */
function trackErrors() {
  if (typeof window === 'undefined') return

  window.addEventListener('error', (e) => {
    console.error('Error:', e.error)
    sendToAnalytics('error', {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno
    })
  })

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason)
    sendToAnalytics('promise_rejection', {
      reason: String(e.reason)
    })
  })
}

/**
 * Send data to analytics
 */
function sendToAnalytics(event: string, data: any) {
  if (typeof window === 'undefined') return

  // Send to Google Analytics
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', event, {
      ...data,
      event_category: 'Performance'
    })
  }

  // Send to custom analytics endpoint
  if (typeof fetch === 'function') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event,
        data,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      })
    }).catch(err => console.warn('Failed to send analytics:', err))
  }
}

/**
 * Get device type
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'

  const width = window.innerWidth

  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

/**
 * Get connection type
 */
export function getConnectionType(): string {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown'
  }

  const connection = (navigator as any).connection
  return connection.effectiveType || 'unknown'
}

/**
 * Calculate performance score
 */
export function calculatePerformanceScore(metrics: PerformanceMetrics): number {
  const scores: number[] = []

  if (metrics.lcp) {
    scores.push(metrics.lcp <= 2.5 ? 100 : metrics.lcp <= 4.0 ? 75 : 50)
  }

  if (metrics.fid) {
    scores.push(metrics.fid <= 100 ? 100 : metrics.fid <= 300 ? 75 : 50)
  }

  if (metrics.cls) {
    scores.push(metrics.cls <= 0.1 ? 100 : metrics.cls <= 0.25 ? 75 : 50)
  }

  if (metrics.fcp) {
    scores.push(metrics.fcp <= 1.8 ? 100 : metrics.fcp <= 3.0 ? 75 : 50)
  }

  if (metrics.ttfb) {
    scores.push(metrics.ttfb <= 800 ? 100 : metrics.ttfb <= 1800 ? 75 : 50)
  }

  return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
}

/**
 * Calculate engagement score
 */
export function calculateEngagementScore(engagement: UserEngagementMetrics): number {
  let score = 0

  // Time on page (max 30 points)
  score += Math.min(30, engagement.timeOnPage / 10)

  // Scroll depth (max 25 points)
  score += Math.min(25, engagement.scrollDepth / 4)

  // Clicks (max 15 points)
  score += Math.min(15, engagement.clickCount)

  // Link clicks (max 15 points)
  score += Math.min(15, engagement.linkClicks)

  // Video engagement (max 15 points)
  score += Math.min(15, (engagement.videoPlays + engagement.videoCompletions) * 3)

  return Math.round(score)
}

/**
 * Track custom event
 */
export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  if (typeof window === 'undefined') return

  sendToAnalytics(eventName, {
    ...properties,
    deviceType: getDeviceType(),
    connectionType: getConnectionType()
  })
}

/**
 * Track page view
 */
export function trackPageView(path: string) {
  if (typeof window === 'undefined') return

  sendToAnalytics('page_view', {
    page: path,
    title: document.title,
    referrer: document.referrer
  })
}

/**
 * Track conversion
 */
export function trackConversion(conversionType: string, value?: number) {
  if (typeof window === 'undefined') return

  sendToAnalytics('conversion', {
    type: conversionType,
    value,
    currency: 'USD'
  })
}

/**
 * Get performance report
 */
export function getPerformanceReport(): PagePerformance {
  if (typeof window === 'undefined') {
    throw new Error('Performance report can only be generated in browser')
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

  return {
    url: window.location.href,
    metrics: {
      lcp: getMetric('largest-contentful-paint'),
      fid: getMetric('first-input'),
      cls: getMetric('layout-shift'),
      fcp: getMetric('first-contentful-paint'),
      ttfb: navigation.responseStart - navigation.requestStart
    },
    engagement: {
      timeOnPage: 0,
      scrollDepth: 0,
      clickCount: 0,
      linkClicks: 0,
      formSubmissions: 0,
      videoPlays: 0,
      videoCompletions: 0,
      errors: 0
    },
    timestamp: new Date(),
    deviceType: getDeviceType(),
    connectionType: getConnectionType()
  }
}

/**
 * Get specific metric value
 */
function getMetric(type: string): number | undefined {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return undefined
  }

  try {
    const entries = performance.getEntriesByType(type)
    if (entries.length === 0) return undefined

    const entry = entries[entries.length - 1]
    return entry.startTime
  } catch (e) {
    return undefined
  }
}

/**
 * Initialize A/B testing
 */
export function initABTesting(testName: string, variants: string[]): string {
  if (typeof window === 'undefined') return variants[0]

  // Check for existing assignment
  const stored = localStorage.getItem(`ab_test_${testName}`)
  if (stored) return stored

  // Random assignment
  const variant = variants[Math.floor(Math.random() * variants.length)]
  localStorage.setItem(`ab_test_${testName}`, variant)

  // Track assignment
  trackEvent('ab_test_assignment', {
    testName,
    variant
  })

  return variant
}

/**
 * Track A/B test conversion
 */
export function trackABTestConversion(testName: string, variant: string) {
  trackEvent('ab_test_conversion', {
    testName,
    variant
  })
}

/**
 * Initialize heat map tracking
 */
export function initHeatMapTracking() {
  if (typeof window === 'undefined') return

  document.addEventListener('click', (e) => {
    const x = e.clientX
    const y = e.clientY
    const element = e.target as HTMLElement

    trackEvent('heatmap_click', {
      x,
      y,
      element: element.tagName.toLowerCase(),
      elementId: element.id || null,
      elementClass: element.className || null
    })
  })
}

/**
 * Initialize session recording
 */
export function initSessionRecording() {
  if (typeof window === 'undefined') return

  let sessionData: any[] = []
  const sessionId = crypto.randomUUID()

  // Track page changes
  const originalPushState = history.pushState
  history.pushState = function(...args) {
    originalPushState.apply(history, args)
    sessionData.push({
      type: 'navigation',
      url: window.location.href,
      timestamp: Date.now()
    })
  }

  // Track user interactions
  document.addEventListener('click', (e) => {
    sessionData.push({
      type: 'click',
      x: e.clientX,
      y: e.clientY,
      element: (e.target as HTMLElement).tagName,
      timestamp: Date.now()
    })
  })

  // Send session data periodically
  setInterval(() => {
    if (sessionData.length > 0) {
      sendToAnalytics('session_data', {
        sessionId,
        data: sessionData
      })
      sessionData = []
    }
  }, 30000) // Every 30 seconds
}

/**
 * Get performance insights
 */
export function getPerformanceInsights(metrics: PerformanceMetrics): string[] {
  const insights: string[] = []

  if (metrics.lcp && metrics.lcp > 2.5) {
    insights.push('LCP is slow. Consider optimizing largest contentful paint by reducing image sizes and deferring non-critical JavaScript.')
  }

  if (metrics.fid && metrics.fid > 100) {
    insights.push('FID is high. Reduce JavaScript execution time and minimize main thread work.')
  }

  if (metrics.cls && metrics.cls > 0.1) {
    insights.push('CLS is poor. Reserve space for dynamic content and avoid layout shifts.')
  }

  if (metrics.fcp && metrics.fcp > 1.8) {
    insights.push('FCP is slow. Optimize critical rendering path and reduce server response time.')
  }

  if (metrics.ttfb && metrics.ttfb > 800) {
    insights.push('TTFB is high. Improve server performance and use CDN for faster delivery.')
  }

  if (insights.length === 0) {
    insights.push('Your site performance is excellent! Keep monitoring for any regressions.')
  }

  return insights
}
