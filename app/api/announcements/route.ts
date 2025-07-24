import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/announcements - Get all announcements with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')

    const skip = (page - 1) * limit

    const where: any = {}
    if (featured === 'true') {
      where.isFeatured = true
    }
    if (category && category !== 'All') {
      where.category = category
    }

    const [announcements, totalCount] = await Promise.all([
      prisma.announcement.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.announcement.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      announcements,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    )
  }
}

// POST /api/announcements - Create a new announcement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Map the incoming data to match the schema
    const announcementData = {
      title: body.title,
      summary: body.summary,
      content: body.content,
      category: body.category,
      author: body.author || 'IBC Editorial Team',
      isFeatured: body.isFeatured || false,
    }
    
    const announcement = await prisma.announcement.create({
      data: announcementData,
    })

    return NextResponse.json({ announcement }, { status: 201 })
  } catch (error) {
    console.error('Error creating announcement:', error)
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    )
  }
} 