import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const type = searchParams.get('type') || 'all' // all, tools, blog, categories
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const results: any = {
      tools: [],
      blog: [],
      categories: [],
    }

    // Search tools
    if (type === 'all' || type === 'tools') {
      const tools = await db.tool.findMany({
        where: {
          published: true,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { tagline: { contains: query, mode: 'insensitive' } },
            { features: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: {
          category: true,
        },
        take: type === 'tools' ? limit : 5,
        orderBy: { views: 'desc' },
      })
      results.tools = tools
    }

    // Search blog posts
    if (type === 'all' || type === 'blog') {
      const blogPosts = await db.blogPost.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: {
          category: true,
        },
        take: type === 'blog' ? limit : 5,
        orderBy: { views: 'desc' },
      })
      results.blog = blogPosts
    }

    // Search categories
    if (type === 'all' || type === 'categories') {
      const categories = await db.category.findMany({
        where: {
          published: true,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: type === 'categories' ? limit : 5,
        orderBy: { order: 'asc' },
      })
      results.categories = categories
    }

    return NextResponse.json({
      query,
      results,
      total: results.tools.length + results.blog.length + results.categories.length,
    })
  } catch (error) {
    console.error('Error performing search:', error)
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    )
  }
}
