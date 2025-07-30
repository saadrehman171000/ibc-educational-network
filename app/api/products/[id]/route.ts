import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products/[id] - Get a single product by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Try to find by ID first (for backward compatibility)
    let product = await prisma.product.findUnique({
      where: { id },
    })

    // If not found by ID, try to find by slug
    if (!product) {
      product = await prisma.product.findUnique({
        where: { slug: id },
      })
    }

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      isNewCollection,
      isFeatured,
    } = body

    // Validate price if provided
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      )
    }

    // If title is being updated, regenerate slug
    let updateData: any = {
      ...(title && { title }),
      ...(description && { description }),
      ...(category && { category }),
      ...(subject && { subject }),
      ...(series && { series }),
      ...(type && { type }),
      ...(price !== undefined && { price }),
      ...(discount !== undefined && { discount }),
      ...(imageUrl && { imageUrl }),
      ...(isNewCollection !== undefined && { isNewCollection }),
      ...(isFeatured !== undefined && { isFeatured }),
    }

    // If title is being updated, regenerate slug
    if (title) {
      const { generateUniqueSlug } = await import('@/lib/slugify')
      
      // Get existing slugs to ensure uniqueness
      const existingSlugs = await prisma.product.findMany({
        select: { slug: true }
      }).then(products => products.map(p => p.slug).filter(Boolean))
      
      const newSlug = await generateUniqueSlug(title, existingSlugs)
      updateData.slug = newSlug
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
} 