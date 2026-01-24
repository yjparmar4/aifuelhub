/**
 * AI Search Engine Performance Monitoring
 * Tracks visibility and performance across AI search engines
 */

interface AISearchMetrics {
  // ChatGPT Browse metrics
  chatgpt: {
    mentions: number
    citations: number
    referralTraffic: number
    avgPosition: number
  }
  
  // Perplexity AI metrics
  perplexity: {
    mentions: number
    citations: number
    referralTraffic: number
    avgPosition: number
  }
  
  // Claude.ai metrics
  claude: {
    mentions: number
    citations: number
    referralTraffic: number
    avgPosition: number
  }
  
  // Google AI Overviews metrics
  google_ai: {
    appearances: number
    clickThroughRate: number
    referralTraffic: number
    avgPosition: number
  }
}

interface AISearchQuery {
  query: string
  engine: 'chatgpt' | 'perplexity' | 'claude' | 'google_ai'
  position: number
  url: string
  timestamp: Date
  snippet?: string
}

// AI Search Engine monitoring utilities
export class AISearchMonitor {
  private static instance: AISearchMonitor
  private metrics: AISearchMetrics = {
    chatgpt: { mentions: 0, citations: 0, referralTraffic: 0, avgPosition: 0 },
    perplexity: { mentions: 0, citations: 0, referralTraffic: 0, avgPosition: 0 },
    claude: { mentions: 0, citations: 0, referralTraffic: 0, avgPosition: 0 },
    google_ai: { appearances: 0, clickThroughRate: 0, referralTraffic: 0, avgPosition: 0 }
  }

  static getInstance(): AISearchMonitor {
    if (!AISearchMonitor.instance) {
      AISearchMonitor.instance = new AISearchMonitor()
    }
    return AISearchMonitor.instance
  }

  // Track AI search engine referral traffic
  trackReferral(engine: keyof AISearchMetrics, url: string): void {
    this.metrics[engine].referralTraffic++
    
    // Store in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ai_search_referral', {
        engine,
        url,
        custom_map: { custom_parameter_1: 'ai_search_engine' }
      })
    }
  }

  // Track AI search query appearance
  trackQueryAppearance(query: AISearchQuery): void {
    const engine = query.engine as keyof AISearchMetrics
    
    if (engine === 'google_ai') {
      this.metrics.google_ai.appearances++
    } else {
      this.metrics[engine].mentions++
    }
    
    // Update average position
    const currentAvg = this.metrics[engine].avgPosition
    const totalMentions = engine === 'google_ai' ? 
      this.metrics.google_ai.appearances : 
      this.metrics[engine].mentions
    
    this.metrics[engine].avgPosition = 
      ((currentAvg * (totalMentions - 1)) + query.position) / totalMentions

    // Store for analysis
    this.storeQueryData(query)
  }

  // Generate AI search performance report
  generateReport(): AISearchMetrics & {
    totalMentions: number
    totalReferralTraffic: number
    bestPerformingEngine: string
    recommendations: string[]
  } {
    const totalMentions = Object.values(this.metrics).reduce(
      (sum, metric) => sum + ('mentions' in metric ? metric.mentions : metric.appearances), 0
    )
    
    const totalReferralTraffic = Object.values(this.metrics).reduce(
      (sum, metric) => metric.referralTraffic, 0
    )

    const enginePerformance = Object.entries(this.metrics).map(([engine, metric]) => ({
      engine,
      score: this.calculateEngineScore(metric)
    }))

    const bestPerformingEngine = enginePerformance.sort((a, b) => b.score - a.score)[0]?.engine || 'none'

    return {
      ...this.metrics,
      totalMentions,
      totalReferralTraffic,
      bestPerformingEngine,
      recommendations: this.generateRecommendations()
    }
  }

  // Calculate performance score for each engine
  private calculateEngineScore(metric: any): number {
    const mentions = 'mentions' in metric ? metric.mentions : metric.appearances
    const traffic = metric.referralTraffic
    const position = metric.avgPosition || 10
    
    // Weighted score: mentions (40%), traffic (40%), position (20%)
    const mentionScore = Math.min(mentions / 10, 1) * 0.4
    const trafficScore = Math.min(traffic / 100, 1) * 0.4
    const positionScore = Math.max(0, (11 - position) / 10) * 0.2
    
    return (mentionScore + trafficScore + positionScore) * 100
  }

  // Generate optimization recommendations
  private generateRecommendations(): string[] {
    const recommendations: string[] = []
    
    // Analyze performance and suggest improvements
    Object.entries(this.metrics).forEach(([engine, metric]) => {
      const mentions = 'mentions' in metric ? metric.mentions : metric.appearances
      
      if (mentions === 0) {
        recommendations.push(`No visibility in ${engine}. Focus on ${this.getEngineOptimizationTip(engine)}`)
      } else if (metric.avgPosition > 5) {
        recommendations.push(`${engine} position is low (${metric.avgPosition}). Improve content for ${this.getEngineOptimizationTip(engine)}`)
      }
      
      if (metric.referralTraffic < mentions * 0.1) {
        recommendations.push(`Low click-through from ${engine}. Improve meta descriptions and snippets`)
      }
    })
    
    return recommendations
  }

  // Get engine-specific optimization tips
  private getEngineOptimizationTip(engine: string): string {
    const tips = {
      chatgpt: 'expert analysis and authoritative content',
      perplexity: 'comprehensive guides and detailed comparisons',
      claude: 'nuanced analysis and balanced perspectives',
      google_ai: 'direct answers and structured data'
    }
    
    return tips[engine as keyof typeof tips] || 'general SEO optimization'
  }

  // Store query data for analysis
  private storeQueryData(query: AISearchQuery): void {
    // In production, store in database or analytics service
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('ai_search_queries') || '[]'
      const queries = JSON.parse(stored)
      queries.push(query)
      
      // Keep only last 1000 queries
      if (queries.length > 1000) {
        queries.splice(0, queries.length - 1000)
      }
      
      localStorage.setItem('ai_search_queries', JSON.stringify(queries))
    }
  }
}

// AI Search Engine detection utilities
export function detectAISearchEngine(referrer: string): keyof AISearchMetrics | null {
  const referrerLower = referrer.toLowerCase()
  
  if (referrerLower.includes('chatgpt') || referrerLower.includes('openai')) {
    return 'chatgpt'
  }
  
  if (referrerLower.includes('perplexity')) {
    return 'perplexity'
  }
  
  if (referrerLower.includes('claude') || referrerLower.includes('anthropic')) {
    return 'claude'
  }
  
  if (referrerLower.includes('google') && referrerLower.includes('ai')) {
    return 'google_ai'
  }
  
  return null
}

// Track AI search engine visitors
export function trackAISearchVisitor(): void {
  if (typeof window === 'undefined') return
  
  const monitor = AISearchMonitor.getInstance()
  const referrer = document.referrer
  
  if (referrer) {
    const engine = detectAISearchEngine(referrer)
    if (engine) {
      monitor.trackReferral(engine, window.location.href)
      
      // Track in Google Analytics
      if (window.gtag) {
        window.gtag('event', 'ai_search_visit', {
          engine,
          page: window.location.pathname,
          custom_map: { custom_parameter_2: 'ai_search_engine_type' }
        })
      }
    }
  }
}

// Initialize AI search monitoring
export function initializeAISearchMonitoring(): void {
  if (typeof window === 'undefined') return
  
  // Track current page visit
  trackAISearchVisitor()
  
  // Set up ongoing monitoring
  const observer = new MutationObserver(() => {
    trackAISearchVisitor()
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

// Export singleton instance
export const aiSearchMonitor = AISearchMonitor.getInstance()

// Type declarations for global scope
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: any) => void
  }
}
