'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AdPlaceholderProps {
  type?: 'banner' | 'sidebar' | 'in-content' | 'sticky'
  size?: 'small' | 'medium' | 'large'
  label?: string
}

export function AdPlaceholder({ type = 'in-content', size = 'medium', label }: AdPlaceholderProps) {
  const sizes = {
    small: 'h-24',
    medium: 'h-64',
    large: 'h-96',
  }

  const dimensions = {
    small: '300x100',
    medium: '728x90',
    large: '300x250',
  }

  const getTypeLabel = () => {
    switch (type) {
      case 'banner':
        return 'Advertisement'
      case 'sidebar':
        return 'Sponsored'
      case 'sticky':
        return 'Ad'
      case 'in-content':
      default:
        return 'Advertisement'
    }
  }

  return (
    <Card className={`w-full ${type === 'sticky' ? 'sticky top-4' : ''} ${size === 'large' ? 'bg-gradient-to-br from-muted/20 to-muted/10' : ''}`}>
      <CardContent className="p-0">
        <div className={`relative flex items-center justify-center bg-muted/30 ${sizes[size]} border border-dashed border-muted-foreground/20`}>
          <div className="text-center space-y-2">
            <Badge variant="outline" className="bg-background">
              {label || getTypeLabel()}
            </Badge>
            <div className="text-xs text-muted-foreground">
              {dimensions[size]}
            </div>
            <div className="text-xs text-muted-foreground/50">
              Ad Space
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Inline ad component for content areas
export function InlineAd() {
  return (
    <div className="my-8">
      <AdPlaceholder type="in-content" size="medium" label="Advertisement" />
    </div>
  )
}

// Sidebar ad component
export function SidebarAd() {
  return (
    <div className="my-6">
      <AdPlaceholder type="sidebar" size="large" label="Sponsored" />
    </div>
  )
}

// Banner ad component
export function BannerAd() {
  return (
    <div className="my-6">
      <AdPlaceholder type="banner" size="medium" label="Advertisement" />
    </div>
  )
}
