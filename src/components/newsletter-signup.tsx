'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function NewsletterSignup({
  title = 'Get the latest AI insights',
  description = 'Subscribe for weekly updates on AI tools, comparisons, and productivity tips.',
  source = 'site',
  className = '',
}: {
  title?: string
  description?: string
  source?: string
  className?: string
}) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')

  const submit = async () => {
    const trimmed = email.trim()
    if (!trimmed) {
      setStatus('error')
      setMessage('Please enter your email.')
      return
    }

    setLoading(true)
    setStatus('idle')
    setMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus('error')
        setMessage(data?.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setMessage(data?.alreadySubscribed ? 'You are already subscribed.' : 'Subscribed! Please check your inbox.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`bg-gradient-to-br from-primary to-purple-600 text-primary-foreground border-white/10 ${className}`}>
      <CardContent className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-6 text-primary-foreground/80">{description}</p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-background text-foreground"
          />
          <Button size="lg" variant="secondary" className="sm:w-40" onClick={submit} disabled={loading}>
            {loading ? 'Subscribing…' : 'Subscribe'}
          </Button>
        </div>

        {message ? (
          <div className={`mt-4 text-sm ${status === 'error' ? 'text-rose-200' : 'text-emerald-200'}`}>
            {message}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
