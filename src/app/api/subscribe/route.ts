import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const source = typeof body?.source === 'string' ? body.source.trim().slice(0, 120) : null

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const existing = await db.subscriber.findUnique({ where: { email } })

    if (existing) {
      if (!existing.active) {
        await db.subscriber.update({
          where: { email },
          data: { active: true, source: source ?? existing.source },
        })
      }

      return NextResponse.json({ ok: true, alreadySubscribed: true })
    }

    await db.subscriber.create({
      data: {
        email,
        source,
        active: true,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error subscribing:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
