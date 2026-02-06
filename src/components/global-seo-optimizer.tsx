'use client'

/**
 * Global SEO Optimizer Component
 * Automatically optimizes content for global SEO, AEO, and GEO
 */

import { useEffect } from 'react'
import { generateAdvancedHreflangTags, generateComprehensiveGeoSchema } from '@/lib/global-seo-enhancements'

interface GlobalSEOOptimizerProps {
  path: string
  title: string
  description: string
}

export function GlobalSEOOptimizer({ path, title, description }: GlobalSEOOptimizerProps) {
  useEffect(() => {
    // Inject hreflang tags
    const hreflangTags = generateAdvancedHreflangTags(path)
    
    hreflangTags.forEach(tag => {
      const link = document.createElement('link')
      link.rel = tag.rel
      link.hreflang = tag.hrefLang
      link.href = tag.href
      document.head.appendChild(link)
    })

    // Inject geo targeting schema
    const geoSchema = generateComprehensiveGeoSchema()
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(geoSchema)
    script.id = 'geo-targeting-schema'
    document.head.appendChild(script)

    return () => {
      // Cleanup
      const links = document.querySelectorAll('link[rel="alternate"][hreflang]')
      links.forEach(link => link.remove())
      
      const geoScript = document.getElementById('geo-targeting-schema')
      if (geoScript) geoScript.remove()
    }
  }, [path])

  return null
}

/**
 * Region-specific content wrapper
 */
export function RegionContent({ 
  region, 
  children 
}: { 
  region: string
  children: React.ReactNode 
}) {
  return (
    <div data-region={region} className="region-content">
      {children}
    </div>
  )
}

/**
 * Multilingual content wrapper
 */
export function MultilingualContent({ 
  language, 
  children 
}: { 
  language: string
  children: React.ReactNode 
}) {
  return (
    <div data-language={language} className="multilingual-content">
      {children}
    </div>
  )
}

/**
 * Global SEO metadata component
 */
export function GlobalSEOMetadata({ 
  path, 
  title, 
  description 
}: { 
  path: string
  title: string
  description: string
}) {
  return (
    <>
      <GlobalSEOOptimizer path={path} title={title} description={description} />
    </>
  )
}
