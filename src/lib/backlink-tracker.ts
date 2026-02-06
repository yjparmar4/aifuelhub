/**
 * Backlink Tracking System
 * Track, monitor, and analyze backlinks for SEO
 */

export interface Backlink {
  id: string
  url: string
  domain: string
  pageUrl: string
  anchorText: string
  status: 'active' | 'lost' | 'pending' | 'rejected'
  domainAuthority: number
  pageAuthority: number
  traffic: number
  type: 'guest-post' | 'resource-page' | 'broken-link' | 'skyscraper' | 'pr' | 'partner' | 'community' | 'other'
  source: string
  dateAdded: Date
  dateFound?: Date
  dateLost?: Date
  notes?: string
  outreachStatus: 'not-started' | 'contacted' | 'followed-up' | 'responded' | 'secured' | 'rejected'
  outreachCount: number
  lastOutreachDate?: Date
  referralTraffic?: number
  value: 'high' | 'medium' | 'low'
}

export interface OutreachCampaign {
  id: string
  name: string
  targetCount: number
  completedCount: number
  securedCount: number
  status: 'active' | 'paused' | 'completed'
  startDate: Date
  endDate?: Date
  templates: string[]
}

export interface BacklinkMetrics {
  totalBacklinks: number
  activeBacklinks: number
  lostBacklinks: number
  pendingBacklinks: number
  averageDomainAuthority: number
  totalReferralTraffic: number
  backlinksByType: Record<string, number>
  backlinksByValue: Record<string, number>
  monthlyGrowth: number
  linkVelocity: number
}

/**
 * Calculate backlink value based on domain authority and traffic
 */
export function calculateBacklinkValue(domainAuthority: number, traffic: number): 'high' | 'medium' | 'low' {
  if (domainAuthority >= 50 && traffic >= 1000) return 'high'
  if (domainAuthority >= 30 && traffic >= 100) return 'medium'
  return 'low'
}

/**
 * Calculate overall backlink score
 */
export function calculateBacklinkScore(backlink: Backlink): number {
  let score = 0

  // Domain authority (0-30 points)
  score += Math.min(backlink.domainAuthority, 30)

  // Traffic (0-20 points)
  score += Math.min(Math.floor(backlink.traffic / 100), 20)

  // Type bonus (0-10 points)
  const typeBonus: Record<string, number> = {
    'guest-post': 10,
    'pr': 9,
    'resource-page': 8,
    'skyscraper': 8,
    'broken-link': 7,
    'partner': 6,
    'community': 5,
    'other': 3,
  }
  score += typeBonus[backlink.type] || 3

  // Status bonus (0-10 points)
  if (backlink.status === 'active') score += 10
  else if (backlink.status === 'pending') score += 5

  return Math.min(score, 100)
}

/**
 * Generate backlink metrics
 */
export function generateBacklinkMetrics(backlinks: Backlink[]): BacklinkMetrics {
  const activeBacklinks = backlinks.filter(b => b.status === 'active')
  const lostBacklinks = backlinks.filter(b => b.status === 'lost')
  const pendingBacklinks = backlinks.filter(b => b.status === 'pending')

  const totalDomainAuthority = activeBacklinks.reduce((sum, b) => sum + b.domainAuthority, 0)
  const averageDomainAuthority = activeBacklinks.length > 0 
    ? totalDomainAuthority / activeBacklinks.length 
    : 0

  const totalReferralTraffic = activeBacklinks.reduce((sum, b) => sum + (b.referralTraffic || 0), 0)

  const backlinksByType: Record<string, number> = {}
  const backlinksByValue: Record<string, number> = {}

  backlinks.forEach(backlink => {
    backlinksByType[backlink.type] = (backlinksByType[backlink.type] || 0) + 1
    backlinksByValue[backlink.value] = (backlinksByValue[backlink.value] || 0) + 1
  })

  // Calculate monthly growth (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const newBacklinks = backlinks.filter(b => b.dateAdded >= thirtyDaysAgo).length
  const monthlyGrowth = backlinks.length > 0 ? (newBacklinks / backlinks.length) * 100 : 0

  // Calculate link velocity (backlinks per week)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const weeklyBacklinks = backlinks.filter(b => b.dateAdded >= sevenDaysAgo).length
  const linkVelocity = weeklyBacklinks

  return {
    totalBacklinks: backlinks.length,
    activeBacklinks: activeBacklinks.length,
    lostBacklinks: lostBacklinks.length,
    pendingBacklinks: pendingBacklinks.length,
    averageDomainAuthority,
    totalReferralTraffic,
    backlinksByType,
    backlinksByValue,
    monthlyGrowth,
    linkVelocity,
  }
}

/**
 * Identify lost backlinks
 */
export function identifyLostBacklinks(backlinks: Backlink[]): Backlink[] {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  return backlinks.filter(backlink => {
    if (backlink.status === 'active' && backlink.dateFound) {
      const daysSinceFound = Math.floor((Date.now() - backlink.dateFound.getTime()) / (1000 * 60 * 60 * 24))
      return daysSinceFound > 30
    }
    return false
  })
}

/**
 * Get backlink opportunities
 */
export function getBacklinkOpportunities(backlinks: Backlink[]): {
  highValue: Backlink[]
  mediumValue: Backlink[]
  quickWins: Backlink[]
} {
  const highValue = backlinks.filter(b => b.value === 'high' && b.status === 'pending')
  const mediumValue = backlinks.filter(b => b.value === 'medium' && b.status === 'pending')
  const quickWins = backlinks.filter(b => 
    b.outreachStatus === 'contacted' && 
    b.outreachCount < 2 && 
    b.status === 'pending'
  )

  return { highValue, mediumValue, quickWins }
}

/**
 * Generate backlink report
 */
export function generateBacklinkReport(backlinks: Backlink[]): {
  summary: BacklinkMetrics
  topBacklinks: Backlink[]
  recentBacklinks: Backlink[]
  lostBacklinks: Backlink[]
  opportunities: ReturnType<typeof getBacklinkOpportunities>
  recommendations: string[]
} {
  const metrics = generateBacklinkMetrics(backlinks)
  const topBacklinks = [...backlinks]
    .sort((a, b) => calculateBacklinkScore(b) - calculateBacklinkScore(a))
    .slice(0, 10)

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const recentBacklinks = backlinks
    .filter(b => b.dateAdded >= thirtyDaysAgo)
    .sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime())
    .slice(0, 10)

  const lostBacklinks = identifyLostBacklinks(backlinks)
  const opportunities = getBacklinkOpportunities(backlinks)

  const recommendations: string[] = []

  if (metrics.lostBacklinks > 5) {
    recommendations.push(`${metrics.lostBacklinks} backlinks lost in the last 30 days. Consider reclaiming these links.`)
  }

  if (metrics.linkVelocity < 5) {
    recommendations.push('Link velocity is low. Increase outreach efforts to maintain natural growth.')
  }

  if (metrics.averageDomainAuthority < 30) {
    recommendations.push('Average domain authority is below 30. Focus on higher-authority sites.')
  }

  if (opportunities.highValue.length > 0) {
    recommendations.push(`You have ${opportunities.highValue.length} high-value pending backlinks. Prioritize these.`)
  }

  if (opportunities.quickWins.length > 0) {
    recommendations.push(`You have ${opportunities.quickWins.length} quick wins. Follow up on these opportunities.`)
  }

  return {
    summary: metrics,
    topBacklinks,
    recentBacklinks,
    lostBacklinks,
    opportunities,
    recommendations,
  }
}

/**
 * Track backlink outreach
 */
export function trackOutreach(
  backlink: Backlink,
  status: 'contacted' | 'followed-up' | 'responded' | 'secured' | 'rejected'
): Backlink {
  const updatedBacklink = { ...backlink }

  if (status === 'contacted' && backlink.outreachStatus === 'not-started') {
    updatedBacklink.outreachStatus = 'contacted'
    updatedBacklink.outreachCount = 1
    updatedBacklink.lastOutreachDate = new Date()
  } else if (status === 'followed-up') {
    updatedBacklink.outreachStatus = 'followed-up'
    updatedBacklink.outreachCount += 1
    updatedBacklink.lastOutreachDate = new Date()
  } else if (status === 'responded') {
    updatedBacklink.outreachStatus = 'responded'
  } else if (status === 'secured') {
    updatedBacklink.outreachStatus = 'secured'
    updatedBacklink.status = 'active'
    updatedBacklink.dateFound = new Date()
  } else if (status === 'rejected') {
    updatedBacklink.outreachStatus = 'rejected'
    updatedBacklink.status = 'rejected'
  }

  return updatedBacklink
}

/**
 * Generate outreach schedule
 */
export function generateOutreachSchedule(backlinks: Backlink[]): Array<{
  backlink: Backlink
  action: string
  date: Date
}> {
  const schedule: Array<{ backlink: Backlink; action: string; date: Date }> = []
  const today = new Date()

  backlinks.forEach(backlink => {
    if (backlink.status === 'pending') {
      if (backlink.outreachStatus === 'not-started') {
        schedule.push({
          backlink,
          action: 'Initial outreach',
          date: today,
        })
      } else if (backlink.outreachStatus === 'contacted' && backlink.outreachCount === 1) {
        const followUpDate = new Date(today)
        followUpDate.setDate(followUpDate.getDate() + 4)
        schedule.push({
          backlink,
          action: 'First follow-up',
          date: followUpDate,
        })
      } else if (backlink.outreachStatus === 'followed-up' && backlink.outreachCount === 2) {
        const followUpDate = new Date(today)
        followUpDate.setDate(followUpDate.getDate() + 8)
        schedule.push({
          backlink,
          action: 'Second follow-up',
          date: followUpDate,
        })
      } else if (backlink.outreachStatus === 'followed-up' && backlink.outreachCount === 3) {
        const finalDate = new Date(today)
        finalDate.setDate(finalDate.getDate() + 12)
        schedule.push({
          backlink,
          action: 'Final follow-up',
          date: finalDate,
        })
      }
    } else if (backlink.status === 'active') {
      // Schedule check for link health
      const checkDate = new Date(today)
      checkDate.setDate(checkDate.getDate() + 30)
      schedule.push({
        backlink,
        action: 'Check link health',
        date: checkDate,
      })
    }
  })

  return schedule.sort((a, b) => a.date.getTime() - b.date.getTime())
}

/**
 * Calculate backlink ROI
 */
export function calculateBacklinkROI(backlinks: Backlink[]): {
  totalValue: number
  securedValue: number
  potentialValue: number
  roi: number
} {
  const securedBacklinks = backlinks.filter(b => b.status === 'active')
  const pendingBacklinks = backlinks.filter(b => b.status === 'pending')

  const securedValue = securedBacklinks.reduce((sum, b) => sum + calculateBacklinkScore(b), 0)
  const potentialValue = pendingBacklinks.reduce((sum, b) => sum + calculateBacklinkScore(b), 0)
  const totalValue = securedValue + potentialValue

  // Assume each point is worth $10 in SEO value
  const securedMonetaryValue = securedValue * 10
  const potentialMonetaryValue = potentialValue * 10
  const totalMonetaryValue = totalValue * 10

  // ROI calculation (assuming 100 hours of outreach work at $50/hour = $5000 investment)
  const investment = 5000
  const roi = ((securedMonetaryValue - investment) / investment) * 100

  return {
    totalValue,
    securedValue,
    potentialValue,
    roi,
  }
}

/**
 * Export backlinks to CSV
 */
export function exportBacklinksToCSV(backlinks: Backlink[]): string {
  const headers = [
    'URL',
    'Domain',
    'Page URL',
    'Anchor Text',
    'Status',
    'Domain Authority',
    'Traffic',
    'Type',
    'Value',
    'Date Added',
    'Outreach Status',
    'Outreach Count',
  ]

  const rows = backlinks.map(backlink => [
    backlink.url,
    backlink.domain,
    backlink.pageUrl,
    backlink.anchorText,
    backlink.status,
    backlink.domainAuthority,
    backlink.traffic,
    backlink.type,
    backlink.value,
    backlink.dateAdded.toISOString(),
    backlink.outreachStatus,
    backlink.outreachCount,
  ])

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
}

/**
 * Import backlinks from CSV
 */
export function importBacklinksFromCSV(csv: string): Backlink[] {
  const lines = csv.split('\n')
  const headers = lines[0].split(',')
  const backlinks: Backlink[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    const backlink: Backlink = {
      id: `backlink-${Date.now()}-${i}`,
      url: values[0],
      domain: values[1],
      pageUrl: values[2],
      anchorText: values[3],
      status: values[4] as any,
      domainAuthority: parseInt(values[5]) || 0,
      pageAuthority: 0,
      traffic: parseInt(values[6]) || 0,
      type: values[7] as any,
      source: 'import',
      value: values[8] as any,
      dateAdded: new Date(values[9]),
      outreachStatus: values[10] as any,
      outreachCount: parseInt(values[11]) || 0,
    }
    backlinks.push(backlink)
  }

  return backlinks
}

/**
 * Get backlink trends
 */
export function getBacklinkTrends(backlinks: Backlink[]): {
  monthly: Array<{ month: string; count: number }>
  byType: Record<string, Array<{ month: string; count: number }>>
  byValue: Record<string, Array<{ month: string; count: number }>>
} {
  const monthlyData: Record<string, number> = {}
  const byTypeData: Record<string, Record<string, number>> = {}
  const byValueData: Record<string, Record<string, number>> = {}

  backlinks.forEach(backlink => {
    const month = backlink.dateAdded.toISOString().slice(0, 7) // YYYY-MM

    monthlyData[month] = (monthlyData[month] || 0) + 1

    if (!byTypeData[backlink.type]) {
      byTypeData[backlink.type] = {}
    }
    byTypeData[backlink.type][month] = (byTypeData[backlink.type][month] || 0) + 1

    if (!byValueData[backlink.value]) {
      byValueData[backlink.value] = {}
    }
    byValueData[backlink.value][month] = (byValueData[backlink.value][month] || 0) + 1
  })

  const months = Object.keys(monthlyData).sort()

  const monthly = months.map(month => ({
    month,
    count: monthlyData[month],
  }))

  const byType: Record<string, Array<{ month: string; count: number }>> = {}
  Object.keys(byTypeData).forEach(type => {
    byType[type] = months.map(month => ({
      month,
      count: byTypeData[type][month] || 0,
    }))
  })

  const byValue: Record<string, Array<{ month: string; count: number }>> = {}
  Object.keys(byValueData).forEach(value => {
    byValue[value] = months.map(month => ({
      month,
      count: byValueData[value][month] || 0,
    }))
  })

  return {
    monthly,
    byType,
    byValue,
  }
}
