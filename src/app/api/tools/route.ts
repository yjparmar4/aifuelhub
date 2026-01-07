import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ToolFilters } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const category = searchParams.get('category')
    const pricingTypes = searchParams.get('pricingType')?.split(',').filter(Boolean)
    const search = searchParams.get('search')
    const featured = searchParams.get('featured') === 'true'
    const trending = searchParams.get('trending') === 'true'
    const rating = searchParams.get('rating')
    const sort = searchParams.get('sort') || 'popular'

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const tags = searchParams.get('tags')?.split(',').filter(Boolean)

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      published: true,
    }

    if (category && category !== 'all') {
      where.category = {
        slug: category,
      }
    }

    if (pricingTypes && pricingTypes.length > 0) {
      where.pricingType = {
        in: pricingTypes
      }
    }

    if (rating) {
      where.rating = {
        gte: parseFloat(rating)
      }
    }

    // Search - SQLite compatible (no mode: 'insensitive')
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { tagline: { contains: search } },
      ]
    }

    if (featured) {
      where.featured = true
    }

    if (trending) {
      where.trending = true
    }

    if (tags && tags.length > 0) {
      where.tags = {
        some: {
          slug: {
            in: tags,
          },
        },
      }
    }

    // Determine Sorting
    let orderBy: any = {}

    switch (sort) {
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'rating':
        orderBy = { rating: 'desc' }
        break
      case 'popular':
      default:
        orderBy = [
          { featured: 'desc' },
          { trending: 'desc' },
          { views: 'desc' },
        ]
        break
    }

    // Get tools with pagination
    const [tools, total] = await Promise.all([
      db.tool.findMany({
        where,
        include: {
          category: true,
          tags: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      db.tool.count({ where }),
    ])

    return NextResponse.json({
      tools,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    )
  }
}
