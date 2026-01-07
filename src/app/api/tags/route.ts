import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const tags = await db.tag.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, slug: true },
    })

    return NextResponse.json(
      { tags },
      {
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
  }
}
