import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      published: true,
    }

    if (category) {
      where.category = {
        slug: category,
      }
    }

    if (featured) {
      where.featured = true
    }

    // Get blog posts with pagination
    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        include: {
          category: true,
          tags: true,
        },
        orderBy: [
          { publishedAt: 'desc' },
          { featured: 'desc' },
          { views: 'desc' },
        ],
        skip,
        take: limit,
      }),
      db.blogPost.count({ where }),
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
