'use client'

/**
 * Backlink Monitoring Dashboard
 * Track, monitor, and analyze backlinks for SEO
 */

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  AlertCircleIcon,
} from 'lucide-react'
import type { Backlink, BacklinkMetrics } from '@/lib/backlink-tracker'

interface BacklinkDashboardProps {
  backlinks: Backlink[]
}

export function BacklinkDashboard({ backlinks }: BacklinkDashboardProps) {
  const [metrics, setMetrics] = useState<BacklinkMetrics | null>(null)
  const [selectedTab, setSelectedTab] = useState('overview')

  useEffect(() => {
    // Calculate metrics from backlinks
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

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const newBacklinks = backlinks.filter(b => b.dateAdded >= thirtyDaysAgo).length
    const monthlyGrowth = backlinks.length > 0 ? (newBacklinks / backlinks.length) * 100 : 0

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const weeklyBacklinks = backlinks.filter(b => b.dateAdded >= sevenDaysAgo).length
    const linkVelocity = weeklyBacklinks

    setMetrics({
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
    })
  }, [backlinks])

  if (!metrics) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Backlink Dashboard</h2>
          <p className="text-muted-foreground">Track and monitor your backlink profile</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button>Add Backlink</Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
          <TabsTrigger value="outreach">Outreach</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Backlinks"
              value={metrics.totalBacklinks.toString()}
              change={metrics.monthlyGrowth}
              icon={<TrendingUpIcon className="h-4 w-4" />}
            />
            <MetricCard
              title="Active Backlinks"
              value={metrics.activeBacklinks.toString()}
              change={null}
              icon={<CheckCircleIcon className="h-4 w-4" />}
            />
            <MetricCard
              title="Avg Domain Authority"
              value={metrics.averageDomainAuthority.toFixed(1)}
              change={null}
              icon={<ArrowUpIcon className="h-4 w-4" />}
            />
            <MetricCard
              title="Referral Traffic"
              value={metrics.totalReferralTraffic.toString()}
              change={null}
              icon={<ArrowUpIcon className="h-4 w-4" />}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Backlink Status</CardTitle>
                <CardDescription>Distribution of backlink statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <StatusItem
                    label="Active"
                    value={metrics.activeBacklinks}
                    total={metrics.totalBacklinks}
                    color="bg-green-500"
                  />
                  <StatusItem
                    label="Pending"
                    value={metrics.pendingBacklinks}
                    total={metrics.totalBacklinks}
                    color="bg-yellow-500"
                  />
                  <StatusItem
                    label="Lost"
                    value={metrics.lostBacklinks}
                    total={metrics.totalBacklinks}
                    color="bg-red-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backlink Quality</CardTitle>
                <CardDescription>Distribution by value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <StatusItem
                    label="High Value"
                    value={metrics.backlinksByValue.high || 0}
                    total={metrics.totalBacklinks}
                    color="bg-purple-500"
                  />
                  <StatusItem
                    label="Medium Value"
                    value={metrics.backlinksByValue.medium || 0}
                    total={metrics.totalBacklinks}
                    color="bg-blue-500"
                  />
                  <StatusItem
                    label="Low Value"
                    value={metrics.backlinksByValue.low || 0}
                    total={metrics.totalBacklinks}
                    color="bg-gray-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Link Velocity</CardTitle>
              <CardDescription>Backlinks acquired per week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Weekly Backlinks</span>
                  <span className="text-2xl font-bold">{metrics.linkVelocity}</span>
                </div>
                <Progress value={Math.min(metrics.linkVelocity * 10, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {metrics.linkVelocity >= 5 ? 'Healthy growth rate' : 'Increase outreach efforts'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backlinks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Backlinks</CardTitle>
              <CardDescription>Manage and monitor your backlinks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>DA</TableHead>
                    <TableHead>Traffic</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backlinks.slice(0, 10).map((backlink) => (
                    <TableRow key={backlink.id}>
                      <TableCell className="font-medium">{backlink.domain}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{backlink.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={backlink.status} />
                      </TableCell>
                      <TableCell>{backlink.domainAuthority}</TableCell>
                      <TableCell>{backlink.traffic}</TableCell>
                      <TableCell>
                        <ValueBadge value={backlink.value} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outreach" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outreach Status</CardTitle>
              <CardDescription>Track your outreach campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backlinks
                  .filter(b => b.status === 'pending')
                  .slice(0, 10)
                  .map((backlink) => (
                    <OutreachCard key={backlink.id} backlink={backlink} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backlink Types</CardTitle>
              <CardDescription>Distribution by acquisition method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(metrics.backlinksByType).map(([type, count]) => (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{type.replace('-', ' ')}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                    <Progress value={(count / metrics.totalBacklinks) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  icon,
}: {
  title: string
  value: string
  change: number | null
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== null && (
          <p className="text-xs text-muted-foreground">
            {change >= 0 ? (
              <span className="text-green-600 flex items-center">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                {change.toFixed(1)}%
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <ArrowDownIcon className="h-3 w-3 mr-1" />
                {Math.abs(change).toFixed(1)}%
              </span>
            )}
            {' '}from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function StatusItem({
  label,
  value,
  total,
  color,
}: {
  label: string
  value: number
  total: number
  color: string
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <Progress value={percentage} className="h-2">
        <div className={color} />
      </Progress>
      <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'active':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Active
        </Badge>
      )
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <ClockIcon className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    case 'lost':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircleIcon className="h-3 w-3 mr-1" />
          Lost
        </Badge>
      )
    case 'rejected':
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          <XCircleIcon className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function ValueBadge({ value }: { value: string }) {
  switch (value) {
    case 'high':
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          High
        </Badge>
      )
    case 'medium':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Medium
        </Badge>
      )
    case 'low':
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          Low
        </Badge>
      )
    default:
      return <Badge variant="outline">{value}</Badge>
  }
}

function OutreachCard({ backlink }: { backlink: Backlink }) {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">{backlink.domain}</span>
          <Badge variant="outline">{backlink.type}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{backlink.pageUrl}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>DA: {backlink.domainAuthority}</span>
          <span>Traffic: {backlink.traffic}</span>
          <span>Outreach: {backlink.outreachCount}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <OutreachStatusBadge status={backlink.outreachStatus} />
        <Button variant="outline" size="sm">Follow Up</Button>
      </div>
    </div>
  )
}

function OutreachStatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'not-started':
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          Not Started
        </Badge>
      )
    case 'contacted':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <ClockIcon className="h-3 w-3 mr-1" />
          Contacted
        </Badge>
      )
    case 'followed-up':
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <AlertCircleIcon className="h-3 w-3 mr-1" />
          Followed Up
        </Badge>
      )
    case 'responded':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Responded
        </Badge>
      )
    case 'secured':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Secured
        </Badge>
      )
    case 'rejected':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircleIcon className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
