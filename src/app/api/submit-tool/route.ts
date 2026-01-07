import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      description,
      longDescription,
      websiteUrl,
      pricingType,
      startingPrice,
      categoryName,
      features,
      submittedBy,
      submitterEmail,
    } = body

    // Validation
    if (!name || !description || !websiteUrl || !pricingType || !categoryName || !features) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(websiteUrl)
    } catch {
      return NextResponse.json(
        { error: 'Invalid website URL' },
        { status: 400 }
      )
    }

    // Create tool submission
    const submission = await db.toolSubmission.create({
      data: {
        name,
        description,
        longDescription,
        websiteUrl,
        pricingType,
        startingPrice,
        categoryName,
        features: Array.isArray(features) ? JSON.stringify(features) : features,
        submittedBy,
        submitterEmail,
      },
    })

    return NextResponse.json(
      {
        message: 'Tool submitted successfully for review',
        submission: {
          id: submission.id,
          name: submission.name,
          status: submission.status,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting tool:', error)
    return NextResponse.json(
      { error: 'Failed to submit tool' },
      { status: 500 }
    )
  }
}
