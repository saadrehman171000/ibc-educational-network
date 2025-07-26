import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendOrderNotificationToAdmin } from '@/lib/email'

// Generate unique order number
function generateOrderNumber() {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `IBC${timestamp.slice(-6)}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      items,
      total,
      shippingName,
      shippingEmail,
      shippingPhone,
      shippingAddress,
      shippingCity,
      shippingArea,
      shippingPostalCode,
      paymentMethod = 'cash_on_delivery'
    } = body

    // Validate required fields
    if (!items || !total || !shippingName || !shippingEmail || !shippingPhone || !shippingAddress || !shippingCity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate unique order number
    const orderNumber = generateOrderNumber()

    // Create order in database
    const order = await prisma.order.create({
      data: {
        items,
        total: parseFloat(total),
        status: 'pending',
        shippingName,
        shippingEmail,
        shippingPhone,
        shippingAddress,
        shippingCity,
        shippingArea,
        shippingPostalCode,
        orderNumber,
        paymentMethod,
        paymentStatus: 'pending'
      }
    })

    // Send email notification to admin
    const emailData = {
      orderNumber,
      customerName: shippingName,
      customerEmail: shippingEmail,
      items,
      total: parseFloat(total),
      shippingAddress,
      shippingCity,
      shippingArea
    }

    await sendOrderNotificationToAdmin(emailData)

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status
      }
    })

  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const email = searchParams.get('email') // For customer order lookup

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    // If email is provided, search by email (for customer lookup)
    if (email) {
      where.shippingEmail = email
    } else {
      // Admin search functionality
      if (status && status !== 'all') {
        where.status = status
      }
      if (search) {
        where.OR = [
          { orderNumber: { contains: search, mode: 'insensitive' } },
          { shippingName: { contains: search, mode: 'insensitive' } },
          { shippingEmail: { contains: search, mode: 'insensitive' } },
          { shippingPhone: { contains: search, mode: 'insensitive' } }
        ]
      }
    }

    // Get orders with pagination
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          orderNumber: true,
          total: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          shippingName: true,
          shippingEmail: true,
          shippingPhone: true,
          shippingAddress: true,
          shippingCity: true,
          shippingArea: true,
          paymentStatus: true,
          items: true,
          adminNotes: true,
          trackingNumber: true,
          deliveryDate: true
        }
      }),
      prisma.order.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    })

  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
} 