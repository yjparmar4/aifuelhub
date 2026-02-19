/**
 * Global CDN and Edge Optimization Headers
 * World-class performance optimization for global traffic delivery
 * Implements best practices for CDN, caching, and edge computing
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Cache configuration for different content types
export const CACHE_CONFIG = {
  // Static assets - long cache
  static: {
    'max-age': 31536000,
    'stale-while-revalidate': 86400,
    'stale-if-error': 604800
  },
  // Dynamic content - short cache
  dynamic: {
    'max-age': 60,
    'stale-while-revalidate': 300,
    'stale-if-error': 3600
  },
  // API responses - minimal cache
  api: {
    'max-age': 0,
    'stale-while-revalidate': 0,
    'stale-if-error': 60
  },
  // Images - medium cache
  images: {
    'max-age': 604800,
    'stale-while-revalidate': 86400,
    'stale-if-error': 259200
  }
}

// Security headers configuration
export const SECURITY_HEADERS = {
  // Basic security
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https: blob:",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; '),
  
  // HSTS for HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Permissions Policy
  'Permissions-Policy': [
    'geolocation=()',
    'microphone=()',
    'camera=()',
    'payment=()',
    'usb=()',
    'vr=()'
  ].join(', '),
  
  // Additional security
  'X-Permitted-Cross-Domain-Policies': 'none',
  'X-DNS-Prefetch-Control': 'on'
}

// CDN optimization headers
export const CDN_HEADERS = {
  // Surrogate control for CDN
  'Surrogate-Control': 'public, max-age=86400',
  
  // Vary for proper caching
  'Vary': 'Accept-Encoding, Accept-Language, Cookie',
  
  // Early hints for preload
  'Link': '</fonts.css>; rel=preload; as=style, </main.js>; rel=preload; as=script'
}

// Performance optimization headers
export const PERFORMANCE_HEADERS = {
  // Resource hints
  'Link': [
    '<https://aifuelhub.com>; rel=preconnect',
    '<https://fonts.googleapis.com>; rel=preconnect',
    '<https://fonts.gstatic.com>; rel=preconnect',
    '<https://www.google-analytics.com>; rel=preconnect'
  ].join(', '),
  
  // Timing allow origin
  'Timing-Allow-Origin': '*',
  
  // Accept-CH for client hints
  'Accept-CH': 'Device-Memory, Downlink, ECT, RTT, Save-Data'
}

// Generate headers for different content types
export function getHeadersForContentType(
  contentType: 'static' | 'dynamic' | 'api' | 'images'
): Record<string, string> {
  const config = CACHE_CONFIG[contentType]
  
  return {
    // Cache headers
    'Cache-Control': `public, max-age=${config['max-age']}, stale-while-revalidate=${config['stale-while-revalidate']}, stale-if-error=${config['stale-if-error']}`,
    'CDN-Cache-Control': `public, max-age=${config['max-age']}, s-maxage=${config['stale-while-revalidate']}`,
    
    // Security headers (always apply)
    ...SECURITY_HEADERS,
    
    // CDN headers
    ...CDN_HEADERS,
    
    // Performance headers
    ...PERFORMANCE_HEADERS
  }
}

// Apply headers to response
export function applyOptimizationHeaders(
  response: NextResponse,
  contentType: 'static' | 'dynamic' | 'api' | 'images' = 'dynamic'
): NextResponse {
  const headers = getHeadersForContentType(contentType)
  
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  return response
}

// Middleware for edge optimization
export function edgeOptimizationMiddleware(request: NextRequest): NextResponse {
  const response = NextResponse.next()
  
  // Get content type from URL
  let contentType: 'static' | 'dynamic' | 'api' | 'images' = 'dynamic'
  
  const url = request.nextUrl.pathname
  if (url.match(/\.(js|css|woff|woff2|ttf|eot)$/)) {
    contentType = 'static'
  } else if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
    contentType = 'images'
  } else if (url.startsWith('/api/')) {
    contentType = 'api'
  }
  
  return applyOptimizationHeaders(response, contentType)
}

// Generate preload headers for critical resources
export function generatePreloadHeaders(resources: Array<{
  url: string
  as: 'script' | 'style' | 'font' | 'image'
  crossorigin?: boolean
}>): string {
  return resources
    .map(resource => {
      const crossorigin = resource.crossorigin ? " crossorigin" : ""
      return `<${resource.url}>; rel=preload; as=${resource.as}${crossorigin}`
    })
    .join(', ')
}

// Generate HTTP/2 push headers
export function generateHTTP2PushHeaders(resources: Array<{
  url: string
  as: 'script' | 'style' | 'font' | 'image'
}>): Record<string, string> {
  const linkHeader = resources
    .map(resource => `<${resource.url}>; rel=preload; as=${resource.as}`)
    .join(', ')
  
  return {
    'Link': linkHeader
  }
}

// Global edge locations for CDN
export const EDGE_LOCATIONS = [
  { region: 'us-east', location: 'Virginia', coordinates: { lat: 39.04, lon: -77.48 } },
  { region: 'us-west', location: 'California', coordinates: { lat: 37.77, lon: -122.41 } },
  { region: 'eu-west', location: 'Ireland', coordinates: { lat: 53.14, lon: -7.69 } },
  { region: 'eu-central', location: 'Frankfurt', coordinates: { lat: 50.11, lon: 8.68 } },
  { region: 'ap-northeast', location: 'Tokyo', coordinates: { lat: 35.68, lon: 139.69 } },
  { region: 'ap-southeast', location: 'Singapore', coordinates: { lat: 1.35, lon: 103.81 } },
  { region: 'ap-south', location: 'Mumbai', coordinates: { lat: 19.07, lon: 72.87 } },
  { region: 'sa-east', location: 'São Paulo', coordinates: { lat: -23.55, lon: -46.63 } },
  { region: 'af-south', location: 'Cape Town', coordinates: { lat: -33.92, lon: 18.42 } },
  { region: 'au-east', location: 'Sydney', coordinates: { lat: -33.86, lon: 151.20 } }
]

// Generate geo-routing headers
export function generateGeoRoutingHeaders(country: string, region: string): Record<string, string> {
  return {
    'Cloudfront-Viewer-Country': country,
    'Cloudfront-Viewer-Country-Name': country,
    'X-Geo-Region': region,
    'X-Geo-Latitude': '',
    'X-Geo-Longitude': '',
    'X-Geo-Timezone': ''
  }
}

// Compression recommendations
export const COMPRESSION_CONFIG = {
  // Supported encodings (in preference order)
  encodings: ['br', 'gzip', 'deflate'],
  
  // Minimum sizes for compression
  minSize: {
    text: 100,
    html: 100,
    css: 100,
    js: 100,
    json: 100,
    svg: 500,
    image: 0, // Don't re-compress images
    font: 100
  },
  
  // MIME types to compress
  compressibleTypes: [
    'text/html',
    'text/css',
    'text/javascript',
    'application/javascript',
    'application/json',
    'application/xml',
    'text/xml',
    'image/svg+xml',
    'font/woff2',
    'font/woff',
    'font/ttf'
  ]
}

// Generate optimized response with all headers
export function createOptimizedResponse(
  content: string,
  contentType: string,
  options?: {
    cache?: boolean
    compress?: boolean
    headers?: Record<string, string>
  }
): NextResponse {
  const headers = new Headers()
  headers.set('Content-Type', contentType)
  headers.set('Cache-Control', options?.cache !== false ? 'public, max-age=3600' : 'no-cache')
  if (options?.compress) {
    headers.set('Content-Encoding', 'gzip')
  }
  
  // Add security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    headers.set(key, value)
  })
  
  // Add CDN headers
  Object.entries(CDN_HEADERS).forEach(([key, value]) => {
    headers.set(key, value)
  })
  
  // Add custom headers
  if (options?.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers.set(key, value)
    })
  }
  
  return new NextResponse(content, {
    status: 200,
    headers
  })
}

// Performance monitoring headers
export function generatePerformanceHeaders(metrics: {
  ttfb: number
  fcp: number
  lcp: number
  fid: number
  cls: number
}): Record<string, string> {
  return {
    'Server-Timing': `origin; dur=${metrics.ttfb}, cache; desc=HIT, cdn; desc=CDN`,
    'X-Performance-TTFB': `${metrics.ttfb}ms`,
    'X-Performance-FCP': `${metrics.fcp}ms`,
    'X-Performance-LCP': `${metrics.lcp}ms`,
    'X-Performance-FID': `${metrics.fid}ms`,
    'X-Performance-CLS': metrics.cls.toString()
  }
}

// Mobile optimization headers
export const MOBILE_OPTIMIZATION_HEADERS = {
  // Viewport meta equivalent
  'Viewport-Width': 'device-width',
  
  // Mobile-friendly signal
  'Mobile-Web-App-Capable': 'yes',
  
  // PWA support
  'X-UA-Compatible': 'IE=edge',
  
  // Touch optimization
  '-webkit-text-size-adjust': '100%'
}

// Accessibility headers
export const ACCESSIBILITY_HEADERS = {
  'Accept-Patch': 'text/plain; charset=utf-8',
  'Allow': 'GET, POST, PUT, DELETE, OPTIONS, PATCH'
}
