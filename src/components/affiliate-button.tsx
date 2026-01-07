'use client'

import { Button } from '@/components/ui/button'
import { ExternalLink, Zap, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AffiliateButtonProps {
  href: string
  text?: string
  variant?: 'primary' | 'secondary' | 'soft'
  size?: 'default' | 'lg' | 'xl'
  icon?: boolean
  className?: string
}

export function AffiliateButton({
  href,
  text = 'Try Now',
  variant = 'primary',
  size = 'default',
  icon = true,
  className = '',
}: AffiliateButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground',
    secondary: 'bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground',
    soft: 'bg-muted hover:bg-muted/80 text-foreground border border-border',
  }

  const sizes = {
    default: 'h-10 px-4',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg font-semibold',
  }

  return (
    <Link href={href} target="_blank" rel="nofollow sponsored noopener noreferrer">
      <Button
        className={`${variants[variant]} ${sizes[size]} ${className} group`}
      >
        {text}
        {icon && (
          <ExternalLink className={`w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform ${size === 'xl' ? 'w-5 h-5' : ''}`} />
        )}
      </Button>
    </Link>
  )
}

// Aggressive CTA for high-intent placements
export function AggressiveCTA({ href, text = 'Get Started Now' }: { href: string; text?: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="block">
      <Button
        size="lg"
        className="w-full h-14 px-8 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-bold text-lg group shadow-lg hover:shadow-xl transition-all"
      >
        <Zap className="w-5 h-5 mr-2 fill-yellow-300 text-yellow-300" />
        {text}
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>
  )
}

// Soft CTA for lower-intent placements
export function SoftCTA({ href, text = 'Learn More' }: { href: string; text?: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="block">
      <Button
        variant="outline"
        size="lg"
        className="w-full group hover:border-primary hover:text-primary transition-all"
      >
        {text}
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>
  )
}

// Verified CTA with trust indicators
export function VerifiedCTA({
  href,
  text = 'Try for Free',
  verified = true,
  rating,
}: {
  href: string
  text?: string
  verified?: boolean
  rating?: number
}) {
  return (
    <div className="space-y-3">
      <Link href={href} target="_blank" rel="nofollow sponsored noopener noreferrer" className="block">
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold group shadow-md hover:shadow-lg transition-all"
        >
          {text}
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
      {verified && (
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Verified & Trusted</span>
        </div>
      )}
      {rating && (
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <span className="text-amber-500 font-semibold">{rating}/5</span>
          <span>★ Rating</span>
        </div>
      )}
    </div>
  )
}
