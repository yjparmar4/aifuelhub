 'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export function AffiliateDisclosure({ className = '' }: { className?: string }) {
  return (
    <Card className={`border-white/10 bg-white/5 ${className}`}>
      <CardContent className="py-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Affiliate disclosure:</strong> Some links on this page are affiliate links.
        If you click and purchase, we may earn a commission at no extra cost to you. This helps us keep ToolAtlas free.
        <span className="ml-2">
          <Link href="/disclaimer" className="text-primary hover:underline">
            Learn more
          </Link>
        </span>
      </CardContent>
    </Card>
  )
}
