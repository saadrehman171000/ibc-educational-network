import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendOrderApprovedEmail, sendOutForDeliveryEmail, sendOrderDeliveredEmail } from '@/lib/email'

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const order = await prisma.order.findUnique({
      where: { id }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(order)

  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, adminNotes, trackingNumber } = body

    // Get current order
    const currentOrder = await prisma.order.findUnique({
      where: { id }
    })

    if (!currentOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {
      status,
      updatedAt: new Date()
    }

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes
    }

    if (trackingNumber !== undefined) {
      updateData.trackingNumber = trackingNumber
    }

    // If status is delivered, set delivery date
    if (status === 'delivered') {
      updateData.deliveryDate = new Date()
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData
    })

    // Send appropriate email based on status change
    const emailData = {
      orderNumber: currentOrder.orderNumber,
      customerName: currentOrder.shippingName,
      customerEmail: currentOrder.shippingEmail,
      customerPhone: currentOrder.shippingPhone,
      items: currentOrder.items as any[],
      total: currentOrder.total,
      shippingAddress: currentOrder.shippingAddress,
      shippingCity: currentOrder.shippingCity,
      shippingArea: currentOrder.shippingArea || undefined,
      trackingNumber: updatedOrder.trackingNumber || undefined,
      deliveryDate: updatedOrder.deliveryDate || undefined,
      adminNotes: updatedOrder.adminNotes || undefined
    }

    // Send email notifications based on status
    if (status === 'approved' && currentOrder.status !== 'approved') {
      await sendOrderApprovedEmail(emailData)
    } else if (status === 'out_for_delivery' && currentOrder.status !== 'out_for_delivery') {
      await sendOutForDeliveryEmail(emailData)
    } else if (status === 'delivered' && currentOrder.status !== 'delivered') {
      await sendOrderDeliveredEmail(emailData)
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder
    })

  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const order = await prisma.order.findUnique({
      where: { id }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    await prisma.order.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    )
  }
} 