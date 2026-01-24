/**
 * Technical SEO Monitoring Component
 * Real-time Core Web Vitals and performance monitoring
 */

'use client'

import React, { useEffect, useState } from 'react'
import { webVitalsMonitor } from '@/lib/technical-seo'

interface PerformanceMetrics {
  overall: number
  lcp: number
  fid: number
  cls: number
  fcp: number
  ttfb: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
}

export function TechnicalSEOMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    overall: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
    ttfb: 0,
    grade: 'F'
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development or for admin users
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true)
      
      // Update metrics every 5 seconds
      const interval = setInterval(() => {
        const currentMetrics = webVitalsMonitor.getPerformanceScore()
        setMetrics(currentMetrics)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [])

  if (!isVisible) return null

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-50'
      case 'B': return 'text-blue-600 bg-blue-50'
      case 'C': return 'text-yellow-600 bg-yellow-50'
      case 'D': return 'text-orange-600 bg-orange-50'
      case 'F': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    if (score >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  const recommendations = webVitalsMonitor.getRecommendations()

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-80 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Technical SEO Monitor
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ×
        </button>
      </div>

      {/* Overall Grade */}
      <div className={`text-center p-3 rounded-lg mb-3 ${getGradeColor(metrics.grade)}`}>
        <div className="text-2xl font-bold">{metrics.grade}</div>
        <div className="text-xs">Overall Performance</div>
      </div>

      {/* Individual Metrics */}
      <div className="space-y-2 mb-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">LCP</span>
          <span className={`text-xs font-medium ${getScoreColor(metrics.lcp)}`}>
            {metrics.lcp.toFixed(0)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">FID</span>
          <span className={`text-xs font-medium ${getScoreColor(metrics.fid)}`}>
            {metrics.fid.toFixed(0)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">CLS</span>
          <span className={`text-xs font-medium ${getScoreColor(metrics.cls)}`}>
            {metrics.cls.toFixed(0)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">FCP</span>
          <span className={`text-xs font-medium ${getScoreColor(metrics.fcp)}`}>
            {metrics.fcp.toFixed(0)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">TTFB</span>
          <span className={`text-xs font-medium ${getScoreColor(metrics.ttfb)}`}>
            {metrics.ttfb.toFixed(0)}
          </span>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Recommendations
          </h4>
          <div className="space-y-1">
            {recommendations.slice(0, 2).map((rec, index) => (
              <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                • {rec}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Core Web Vitals initialization script
export function initializeWebVitals() {
  if (typeof window === 'undefined') return

  // Basic web vitals monitoring without external library
  const observePerformanceEntries = () => {
    if ('PerformanceObserver' in window) {
      // Observe Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry
        webVitalsMonitor.recordMetric('lcp', lastEntry.startTime)
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Observe First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (entry.processingStart) {
            const fid = entry.processingStart - entry.startTime
            webVitalsMonitor.recordMetric('fid', fid)
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Observe Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            webVitalsMonitor.recordMetric('cls', clsValue)
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }

    // Get First Contentful Paint and Time to First Byte from navigation timing
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0]
        webVitalsMonitor.recordMetric('fcp', navEntry.responseStart - navEntry.fetchStart)
        webVitalsMonitor.recordMetric('ttfb', navEntry.responseStart - navEntry.fetchStart)
      }
    }
  }

  // Start observing when page is fully loaded
  if (document.readyState === 'complete') {
    observePerformanceEntries()
  } else {
    window.addEventListener('load', observePerformanceEntries)
  }
}

// Performance optimization component
export function PerformanceOptimizations() {
  useEffect(() => {
    // Initialize Core Web Vitals monitoring
    initializeWebVitals()

    // Optimize images with lazy loading
    const images = document.querySelectorAll('img[data-src]')
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src!
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach(img => imageObserver.observe(img))

    // Preload critical resources
    const criticalResources = [
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2' },
      { href: '/logo.svg', as: 'image' }
    ]

    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource.href
      link.as = resource.as
      if (resource.type) link.type = resource.type
      document.head.appendChild(link)
    })

    return () => {
      imageObserver.disconnect()
    }
  }, [])

  return null
}
