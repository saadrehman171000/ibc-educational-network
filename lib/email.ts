import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface OrderEmailData {
  orderNumber: string
  customerName: string
  customerEmail: string
  items: any[]
  total: number
  shippingAddress: string
  shippingCity: string
  shippingArea?: string
  trackingNumber?: string
  deliveryDate?: Date
  adminNotes?: string
}

// Email to admin when new order is placed
export async function sendOrderNotificationToAdmin(orderData: OrderEmailData) {
  try {
    const itemsList = orderData.items.map((item: any) => 
      `• ${item.title} - Rs. ${item.price} x ${item.quantity}`
    ).join('\n')

    await resend.emails.send({
      from: 'IBC Educational Network <orders@ibc-educational.com>',
      to: ['saadrehman1710000@gmail.com', 'mateeqsahil@gmail.com'], // Admin emails
      subject: `New Order #${orderData.orderNumber} - ${orderData.customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Order Received
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
            <p><strong>Customer:</strong> ${orderData.customerName}</p>
            <p><strong>Email:</strong> ${orderData.customerEmail}</p>
            <p><strong>Total Amount:</strong> Rs. ${orderData.total}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Shipping Address</h3>
            <p>${orderData.shippingAddress}</p>
            <p>${orderData.shippingCity}${orderData.shippingArea ? `, ${orderData.shippingArea}` : ''}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Order Items</h3>
            <div style="white-space: pre-line; font-family: monospace;">${itemsList}</div>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders" 
               style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Order in Admin Panel
            </a>
          </div>
        </div>
      `
    })

    console.log('Order notification sent to admin')
    return { success: true }
  } catch (error) {
    console.error('Error sending order notification to admin:', error)
    return { success: false, error }
  }
}

// Email to customer when order is approved
export async function sendOrderApprovedEmail(orderData: OrderEmailData) {
  try {
    await resend.emails.send({
      from: 'IBC Educational Network <orders@ibc-educational.com>',
      to: [orderData.customerEmail],
      subject: `Order #${orderData.orderNumber} Approved - IBC Educational Network`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            Order Approved! 🎉
          </h2>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #1f2937; margin-top: 0;">Great News!</h3>
            <p>Your order <strong>#${orderData.orderNumber}</strong> has been approved and is being processed.</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Order Summary</h3>
            <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
            <p><strong>Total Amount:</strong> Rs. ${orderData.total}</p>
            <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Approved</span></p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">What's Next?</h3>
            <ul style="color: #374151;">
              <li>We're preparing your educational materials</li>
              <li>You'll receive another email when your order is out for delivery</li>
              <li>Payment will be collected upon delivery</li>
            </ul>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">📞 Need Help?</h3>
            <p style="color: #92400e;">If you have any questions, please contact us:</p>
            <p style="color: #92400e;">Email: support@ibc-educational.com</p>
            <p style="color: #92400e;">Phone: +92 XXX XXX XXXX</p>
          </div>

          <div style="text-align: center; margin-top: 30px; color: #6b7280;">
            <p>Thank you for choosing IBC Educational Network!</p>
          </div>
        </div>
      `
    })

    console.log('Order approved email sent to customer')
    return { success: true }
  } catch (error) {
    console.error('Error sending order approved email:', error)
    return { success: false, error }
  }
}

// Email to customer when order is out for delivery
export async function sendOutForDeliveryEmail(orderData: OrderEmailData) {
  try {
    await resend.emails.send({
      from: 'IBC Educational Network <orders@ibc-educational.com>',
      to: [orderData.customerEmail],
      subject: `Order #${orderData.orderNumber} Out for Delivery - IBC Educational Network`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            🚚 Your Order is Out for Delivery!
          </h2>
          
          <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #1f2937; margin-top: 0;">Exciting News!</h3>
            <p>Your order <strong>#${orderData.orderNumber}</strong> is now out for delivery and should arrive soon!</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Delivery Details</h3>
            <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
            <p><strong>Status:</strong> <span style="color: #f59e0b; font-weight: bold;">Out for Delivery</span></p>
            ${orderData.trackingNumber ? `<p><strong>Tracking Number:</strong> ${orderData.trackingNumber}</p>` : ''}
            <p><strong>Delivery Address:</strong></p>
            <p style="margin-left: 20px;">${orderData.shippingAddress}</p>
            <p style="margin-left: 20px;">${orderData.shippingCity}${orderData.shippingArea ? `, ${orderData.shippingArea}` : ''}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">What to Expect</h3>
            <ul style="color: #374151;">
              <li>Delivery within 24-48 hours</li>
              <li>Please have the exact amount ready for payment</li>
              <li>Someone should be available to receive the package</li>
              <li>You'll receive a confirmation email once delivered</li>
            </ul>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">📞 Need Help?</h3>
            <p style="color: #92400e;">If you have any questions about delivery:</p>
            <p style="color: #92400e;">Email: support@ibc-educational.com</p>
            <p style="color: #92400e;">Phone: +92 XXX XXX XXXX</p>
          </div>

          <div style="text-align: center; margin-top: 30px; color: #6b7280;">
            <p>Thank you for choosing IBC Educational Network!</p>
          </div>
        </div>
      `
    })

    console.log('Out for delivery email sent to customer')
    return { success: true }
  } catch (error) {
    console.error('Error sending out for delivery email:', error)
    return { success: false, error }
  }
}

// Email to customer when order is delivered
export async function sendOrderDeliveredEmail(orderData: OrderEmailData) {
  try {
    await resend.emails.send({
      from: 'IBC Educational Network <orders@ibc-educational.com>',
      to: [orderData.customerEmail],
      subject: `Order #${orderData.orderNumber} Delivered - IBC Educational Network`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            ✅ Order Delivered Successfully!
          </h2>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #1f2937; margin-top: 0;">Delivery Complete!</h3>
            <p>Your order <strong>#${orderData.orderNumber}</strong> has been successfully delivered!</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Delivery Summary</h3>
            <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
            <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Delivered</span></p>
            <p><strong>Delivery Date:</strong> ${orderData.deliveryDate ? new Date(orderData.deliveryDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p><strong>Total Amount:</strong> Rs. ${orderData.total}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">What's Next?</h3>
            <ul style="color: #374151;">
              <li>Please check all items in your order</li>
              <li>Keep your educational materials in good condition</li>
              <li>Start your learning journey with IBC materials</li>
              <li>Consider leaving a review of your experience</li>
            </ul>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">📚 Learning Resources</h3>
            <p style="color: #92400e;">Explore more educational materials:</p>
            <p style="color: #92400e;">• Visit our website for additional resources</p>
            <p style="color: #92400e;">• Check out our latest collections</p>
            <p style="color: #92400e;">• Join our educational programs</p>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">📞 Support</h3>
            <p style="color: #92400e;">If you have any questions or need assistance:</p>
            <p style="color: #92400e;">Email: support@ibc-educational.com</p>
            <p style="color: #92400e;">Phone: +92 XXX XXX XXXX</p>
          </div>

          <div style="text-align: center; margin-top: 30px; color: #6b7280;">
            <p>Thank you for choosing IBC Educational Network!</p>
            <p>Happy Learning! 📖✨</p>
          </div>
        </div>
      `
    })

    console.log('Order delivered email sent to customer')
    return { success: true }
  } catch (error) {
    console.error('Error sending order delivered email:', error)
    return { success: false, error }
  }
} 