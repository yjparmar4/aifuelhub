import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const includeToolCount = searchParams.get('includeToolCount') === 'true'

    const categories = await db.category.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      ...(includeToolCount && {
        include: {
          _count: {
            select: { tools: true },
          },
        },
      }),
    })

    return NextResponse.json(
      { categories },
      {
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
