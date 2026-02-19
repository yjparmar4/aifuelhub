import { NextRequest, NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/seo'

/**
 * IndexNow API Route
 * Instantly notify Bing, Yandex, Seznam, and Naver when new content is published.
 * 
 * Usage: POST /api/indexnow
 * Body: { "urls": ["https://www.aifuelhub.com/blog/new-post", ...] }
 * 
 * Or GET /api/indexnow?url=https://www.aifuelhub.com/blog/new-post
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '28a7f3e9c5d14b88a1f2e6d7c8b9a0e1'

// GET: Submit single URL for indexing
export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get('url')

    if (!url) {
        return NextResponse.json(
            { error: 'Missing "url" query parameter' },
            { status: 400 }
        )
    }

    const result = await submitToIndexNow([url])
    return NextResponse.json(result)
}

// POST: Submit multiple URLs for indexing
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const urls: string[] = body.urls || []

        if (urls.length === 0) {
            return NextResponse.json(
                { error: 'No URLs provided. Send { "urls": ["..."] }' },
                { status: 400 }
            )
        }

        if (urls.length > 10000) {
            return NextResponse.json(
                { error: 'Maximum 10,000 URLs per request' },
                { status: 400 }
            )
        }

        const result = await submitToIndexNow(urls)
        return NextResponse.json(result)
    } catch {
        return NextResponse.json(
            { error: 'Invalid JSON body' },
            { status: 400 }
        )
    }
}

async function submitToIndexNow(urls: string[]) {
    const host = new URL(SITE_URL).hostname
    const results: { engine: string; status: number | string }[] = []

    // IndexNow endpoints (Bing, Yandex, Seznam, Naver all share the protocol)
    const engines = [
        { name: 'Bing', endpoint: 'https://www.bing.com/indexnow' },
        { name: 'Yandex', endpoint: 'https://yandex.com/indexnow' },
        { name: 'IndexNow', endpoint: 'https://api.indexnow.org/indexnow' },
    ]

    for (const engine of engines) {
        try {
            const response = await fetch(engine.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify({
                    host,
                    key: INDEXNOW_KEY,
                    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
                    urlList: urls,
                }),
            })
            results.push({ engine: engine.name, status: response.status })
        } catch (error) {
            results.push({ engine: engine.name, status: 'error' })
        }
    }

    return {
        success: true,
        submitted: urls.length,
        results,
        timestamp: new Date().toISOString(),
    }
}
