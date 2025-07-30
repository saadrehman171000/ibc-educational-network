import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products - Get all products with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const categoryFilter = searchParams.get('category')
    const subjectFilter = searchParams.get('subject')
    const seriesFilter = searchParams.get('series')
    const newCollection = searchParams.get('newCollection')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (categoryFilter) {
      where.category = categoryFilter
    }

    if (subjectFilter) {
      where.subject = subjectFilter
    }

    if (seriesFilter) {
      where.series = seriesFilter
    }

    if (newCollection === 'true') {
      where.isNewCollection = true
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Get products with pagination
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      products,
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
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      category,
      subject,
      series,
      type,
      price,
      discount,
      imageUrl,
      isNewCollection = false,
      isFeatured = false,
    } = body

    // Validate required fields
    if (!title || !description || !category || !series || !price || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate price
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      )
    }

    // Generate unique slug from title
    const { slugify, generateUniqueSlug } = await import('@/lib/slugify')
    
    // Get existing slugs to ensure uniqueness
    const existingSlugs = await prisma.product.findMany({
      select: { slug: true }
    }).then(products => products.map(p => p.slug).filter(Boolean))
    
    const slug = await generateUniqueSlug(title, existingSlugs)

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        category,
        subject,
        series,
        type,
        price,
        discount,
        imageUrl,
        isNewCollection,
        isFeatured,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
} 