'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

interface WebVitalMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
  id?: string
}

/**
 * Core Web Vitals Monitor
 * Tracks and reports LCP, FID, CLS, FCP, TTFB to analytics
 * Essential for world-class SEO performance
 */
export function WebVitalsMonitor() {
  const [metrics, setMetrics] = useState<WebVitalMetric[]>([])

  useEffect(() => {
    // Only run in production and on client side
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return
    }

    // Dynamically import web-vitals library with fallback
    const reportWebVitals = async () => {
      try {
        // @ts-expect-error - web-vitals may not be installed
        const webVitals = await import('web-vitals')
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals

        const sendToGoogleAnalytics = (metric: WebVitalMetric) => {
          const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-KBW050L12X'
          
          // Send to Google Analytics
          if (window.gtag) {
            window.gtag('event', metric.name, {
              event_category: 'Web Vitals',
              event_label: metric.id || metric.name,
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              non_interaction: true,
            })
          }

          // Log for debugging
          console.log(`[Web Vitals] ${metric.name}:`, {
            value: metric.value,
            rating: metric.rating,
            id: metric.id,
          })
        }

        // Register metric handlers
        getCLS(sendToGoogleAnalytics)
        getFID(sendToGoogleAnalytics)
        getFCP(sendToGoogleAnalytics)
        getLCP(sendToGoogleAnalytics)
        getTTFB(sendToGoogleAnalytics)

      } catch (error) {
        console.warn('[Web Vitals] Failed to load web-vitals library:', error)
      }
    }

    reportWebVitals()
  }, [])

  return null // This is a monitoring component, no UI needed
}

/**
 * Performance Observer for additional metrics
 * Tracks Long Tasks, Resource Timing, and Element Timing
 */
export function PerformanceObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Long Task Observer - Detects tasks blocking main thread > 50ms
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new window.PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            // Log long tasks for debugging
            if (window.gtag) {
              window.gtag('event', 'long_task', {
                event_category: 'Performance',
                event_label: 'Long Task Detected',
                value: Math.round(entry.duration),
                non_interaction: true,
              })
            }
          })
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
      } catch (e) {
        console.warn('Long Task Observer not supported')
      }
    }

    // Resource Timing Observer
    if ('PerformanceObserver' in window) {
      try {
        const resourceObserver = new window.PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            // Log slow resources (> 1s)
            if (entry.duration > 1000 && window.gtag) {
              window.gtag('event', 'slow_resource', {
                event_category: 'Performance',
                event_label: entry.name,
                value: Math.round(entry.duration),
                non_interaction: true,
              })
            }
          })
        })
        resourceObserver.observe({ entryTypes: ['resource'] })
      } catch (e) {
        console.warn('Resource Observer not supported')
      }
    }

    // Report performance metrics on page load
    const reportPerformance = () => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart
        const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart
        
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'page_load',
            value: pageLoadTime,
          })
          window.gtag('event', 'timing_complete', {
            name: 'dom_ready',
            value: domReadyTime,
          })
        }
      }
    }

    window.addEventListener('load', reportPerformance)

    return () => {
      window.removeEventListener('load', reportPerformance)
    }
  }, [])

  return null
}

/**
 * SEO Performance Optimizations Script
 * Preconnect to critical domains and resource hints
 */
export function SEOPerformanceOptimizations() {
  return (
    <>
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Prefetch critical pages */}
      <link rel="prefetch" href="/ai-tools" />
      <link rel="prefetch" href="/blog" />
    </>
  )
}

declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: any) => void
    performance?: Performance
  }
}
