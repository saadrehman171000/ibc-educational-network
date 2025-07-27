import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface OrderEmailData {
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
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
      `<tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: left;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${item.title}</div>
          <div style="font-size: 14px; color: #6b7280;">${item.grade || 'N/A'} • ${item.subject || 'N/A'}</div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #1f2937;">
          Rs. ${item.price}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #1f2937;">
          Rs. ${(item.price * item.quantity).toFixed(0)}
        </td>
      </tr>`
    ).join('')

    const totalItems = orderData.items.reduce((sum: number, item: any) => sum + item.quantity, 0)

    await resend.emails.send({
      from: 'IBC Educational Network <orders@ibcedu.com>',
      to: ['info@ibcedu.com'],
      subject: `🆕 New Order #${orderData.orderNumber} - ${orderData.customerName}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order Notification</title>
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); padding: 30px; text-align: center; }
            .logo { width: 120px; height: auto; margin-bottom: 20px; }
            .header-title { color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header-subtitle { color: #dbeafe; font-size: 16px; margin: 10px 0 0 0; }
            .content { padding: 40px 30px; }
            .alert-box { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
            .alert-title { color: #1e40af; font-size: 18px; font-weight: 700; margin: 0 0 10px 0; }
            .alert-text { color: #1e3a8a; font-size: 16px; margin: 0; line-height: 1.5; }
            .section { margin-bottom: 30px; }
            .section-title { color: #1f2937; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .info-item { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .info-label { color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 5px; }
            .info-value { color: #1f2937; font-size: 16px; font-weight: 600; }
            .items-table { width: 100%; border-collapse: collapse; margin-top: 15px; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .items-table th { background: #f8fafc; padding: 15px 12px; text-align: left; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb; }
            .items-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .total-section { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 20px; border-radius: 8px; margin-top: 20px; }
            .total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
            .total-label { color: #0c4a6e; font-size: 16px; font-weight: 600; }
            .total-value { color: #0c4a6e; font-size: 18px; font-weight: 700; }
            .grand-total { border-top: 2px solid #0ea5e9; padding-top: 15px; margin-top: 15px; }
            .grand-total .total-label { font-size: 18px; }
            .grand-total .total-value { font-size: 24px; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; text-align: center; margin-top: 20px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25); transition: all 0.3s ease; }
            .cta-button:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3); }
            .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer-text { color: #6b7280; font-size: 14px; margin: 0; }
            .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
            .stat-item { background: #ffffff; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #e5e7eb; }
            .stat-number { color: #1e40af; font-size: 24px; font-weight: 700; margin-bottom: 5px; }
            .stat-label { color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; }
            @media (max-width: 600px) {
              .info-grid { grid-template-columns: 1fr; }
              .stats-grid { grid-template-columns: 1fr; }
              .content { padding: 20px; }
              .header { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <img src="https://ibcedu.com/images/ibc-logo.png" alt="IBC Educational Network" class="logo">
              <h1 class="header-title">New Order Received</h1>
              <p class="header-subtitle">A customer has placed a new order on your website</p>
            </div>

            <!-- Content -->
            <div class="content">
              <!-- Alert Box -->
              <div class="alert-box">
                <h2 class="alert-title">🎉 New Order Alert!</h2>
                <p class="alert-text">
                  A new order has been placed on your IBC Educational Network website. 
                  Please review the details below and take appropriate action.
                </p>
              </div>

              <!-- Order Statistics -->
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-number">#${orderData.orderNumber}</div>
                  <div class="stat-label">Order Number</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">${totalItems}</div>
                  <div class="stat-label">Total Items</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">Rs. ${orderData.total.toFixed(0)}</div>
                  <div class="stat-label">Total Amount</div>
                </div>
              </div>

              <!-- Customer Information -->
              <div class="section">
                <h2 class="section-title">👤 Customer Information</h2>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Customer Name</div>
                    <div class="info-value">${orderData.customerName}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Email Address</div>
                    <div class="info-value">${orderData.customerEmail}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Phone Number</div>
                    <div class="info-value">${orderData.customerPhone}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Order Date</div>
                    <div class="info-value">${new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Order Status</div>
                    <div class="info-value" style="color: #f59e0b; font-weight: 700;">⏳ Pending</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Total Amount</div>
                    <div class="info-value">Rs. ${orderData.total.toFixed(0)}</div>
                  </div>
                </div>
              </div>

              <!-- Shipping Address -->
              <div class="section">
                <h2 class="section-title">📍 Shipping Address</h2>
                <div class="info-item" style="grid-column: 1 / -1;">
                  <div class="info-label">Delivery Address</div>
                  <div class="info-value">
                    ${orderData.shippingAddress}<br>
                    ${orderData.shippingCity}${orderData.shippingArea ? `, ${orderData.shippingArea}` : ''}
                  </div>
                </div>
              </div>

              <!-- Order Items -->
              <div class="section">
                <h2 class="section-title">📚 Order Items</h2>
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th style="text-align: center;">Qty</th>
                      <th style="text-align: right;">Price</th>
                      <th style="text-align: right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsList}
                  </tbody>
                </table>

                <!-- Order Total -->
                <div class="total-section">
                  <div class="total-row">
                    <span class="total-label">Subtotal:</span>
                    <span class="total-value">Rs. ${orderData.total.toFixed(0)}</span>
                  </div>
                  <div class="total-row">
                    <span class="total-label">Shipping:</span>
                    <span class="total-value">Free</span>
                  </div>
                  <div class="total-row grand-total">
                    <span class="total-label">Grand Total:</span>
                    <span class="total-value">Rs. ${orderData.total.toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders" class="cta-button">
                  📋 View Order in Admin Panel
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p class="footer-text">
                This is an automated notification from IBC Educational Network.<br>
                Please do not reply to this email. For support, contact info@ibcedu.com
              </p>
            </div>
          </div>
        </body>
        </html>
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
    const itemsList = orderData.items.map((item: any) => 
      `<tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: left;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${item.title}</div>
          <div style="font-size: 14px; color: #6b7280;">${item.grade || 'N/A'} • ${item.subject || 'N/A'}</div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #1f2937;">
          Rs. ${item.price}
        </td>
      </tr>`
    ).join('')

    await resend.emails.send({
      from: 'IBC Educational Network <orders@ibcedu.com>',
      to: [orderData.customerEmail],
      subject: `Order #${orderData.orderNumber} Approved - IBC Educational Network`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Approved</title>
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; }
            .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); padding: 40px; text-align: center; }
            .logo { width: 180px; height: auto; margin-bottom: 25px; }
            .header-title { color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header-subtitle { color: #dbeafe; font-size: 18px; margin: 15px 0 0 0; }
            .content { padding: 50px 40px; }
            .status-box { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 5px solid #3b82f6; padding: 30px; border-radius: 10px; margin-bottom: 40px; text-align: center; }
            .status-icon { font-size: 56px; margin-bottom: 20px; }
            .status-title { color: #1e40af; font-size: 24px; font-weight: 700; margin: 0 0 15px 0; }
            .status-text { color: #1e3a8a; font-size: 18px; margin: 0; line-height: 1.6; }
            .section { margin-bottom: 40px; }
            .section-title { color: #1f2937; font-size: 22px; font-weight: 700; margin: 0 0 25px 0; border-bottom: 3px solid #e5e7eb; padding-bottom: 15px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 25px; }
            .info-item { background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb; }
            .info-label { color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px; }
            .info-value { color: #1f2937; font-size: 18px; font-weight: 600; }
            .status-badge { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 10px 20px; border-radius: 25px; font-weight: 600; font-size: 16px; }
            .items-table { width: 100%; border-collapse: collapse; margin-top: 20px; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .items-table th { background: #f8fafc; padding: 18px 15px; text-align: left; font-weight: 700; color: #374151; border-bottom: 3px solid #e5e7eb; }
            .items-table td { padding: 15px; border-bottom: 1px solid #e5e7eb; }
            .next-steps { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 30px; border-radius: 10px; margin: 25px 0; }
            .next-steps h3 { color: #0c4a6e; margin: 0 0 20px 0; font-size: 20px; }
            .next-steps ul { margin: 0; padding-left: 25px; }
            .next-steps li { color: #0c4a6e; margin-bottom: 12px; line-height: 1.6; font-size: 16px; }
            .support-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 30px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #f59e0b; }
            .support-title { color: #92400e; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; }
            .support-text { color: #92400e; margin: 0 0 15px 0; font-size: 16px; }
            .support-contact { color: #92400e; font-weight: 600; font-size: 16px; }
            .footer { background: #f8fafc; padding: 40px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer-text { color: #6b7280; font-size: 16px; margin: 0; }
            @media (max-width: 600px) {
              .info-grid { grid-template-columns: 1fr; }
              .content { padding: 30px 20px; }
              .header { padding: 30px 20px; }
              .logo { width: 140px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <img src="https://ibcedu.com/images/ibc-logo.png" alt="IBC Educational Network" class="logo">
              <h1 class="header-title">Order Approved</h1>
              <p class="header-subtitle">Your order has been approved and is being processed</p>
            </div>

            <!-- Content -->
            <div class="content">
              <!-- Status Box -->
              <div class="status-box">
                <div class="status-icon">✓</div>
                <h2 class="status-title">Order Approved Successfully</h2>
                <p class="status-text">
                  Your order <strong>#${orderData.orderNumber}</strong> has been approved and is now being processed. 
                  We're preparing your educational materials with the highest quality standards.
                </p>
              </div>

              <!-- Order Summary -->
              <div class="section">
                <h2 class="section-title">Order Summary</h2>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Order Number</div>
                    <div class="info-value">#${orderData.orderNumber}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Order Status</div>
                    <div class="info-value">
                      <span class="status-badge">Approved</span>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Total Amount</div>
                    <div class="info-value">Rs. ${orderData.total.toFixed(0)}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Payment Method</div>
                    <div class="info-value">Cash on Delivery</div>
                  </div>
                </div>
              </div>

              <!-- Order Items -->
              <div class="section">
                <h2 class="section-title">Order Items</h2>
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th style="text-align: center;">Quantity</th>
                      <th style="text-align: right;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsList}
                  </tbody>
                </table>
              </div>

              <!-- What's Next -->
              <div class="next-steps">
                <h3>Next Steps</h3>
                <ul>
                  <li><strong>Processing:</strong> We're carefully preparing your educational materials</li>
                  <li><strong>Quality Check:</strong> Each item is being reviewed for quality assurance</li>
                  <li><strong>Packaging:</strong> Your order will be securely packaged for safe delivery</li>
                  <li><strong>Delivery Notification:</strong> You'll receive an email when your order is out for delivery</li>
                  <li><strong>Payment:</strong> Payment will be collected upon delivery</li>
                </ul>
              </div>

              <!-- Delivery Information -->
              <div class="section">
                <h2 class="section-title">Delivery Information</h2>
                <div class="info-item" style="grid-column: 1 / -1;">
                  <div class="info-label">Delivery Address</div>
                  <div class="info-value">
                    ${orderData.shippingAddress}<br>
                    ${orderData.shippingCity}${orderData.shippingArea ? `, ${orderData.shippingArea}` : ''}
                  </div>
                </div>
              </div>

              <!-- Support Box -->
              <div class="support-box">
                <h3 class="support-title">Need Assistance?</h3>
                <p class="support-text">If you have any questions about your order, please contact us:</p>
                <p class="support-contact">Email: support@ibcedu.com</p>
                <p class="support-contact">Phone: +92 XXX XXX XXXX</p>
                <p class="support-text" style="margin-top: 20px; font-size: 14px;">
                  Our support team is available Monday to Friday, 9:00 AM - 6:00 PM (PKT)
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p class="footer-text">
                Thank you for choosing IBC Educational Network!<br>
                We're committed to providing quality educational materials for your learning journey.
              </p>
            </div>
          </div>
        </body>
        </html>
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
    const itemsList = orderData.items.map((item: any) => 
      `<tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: left;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${item.title}</div>
          <div style="font-size: 14px; color: #6b7280;">${item.grade || 'N/A'} • ${item.subject || 'N/A'}</div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #1f2937;">
          Rs. ${item.price}
        </td>
      </tr>`
    ).join('')

    await resend.emails.send({
      from: 'IBC Educational Network <orders@ibcedu.com>',
      to: [orderData.customerEmail],
      subject: `🚚 Order #${orderData.orderNumber} Out for Delivery - IBC Educational Network`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Out for Delivery</title>
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center; }
            .logo { width: 120px; height: auto; margin-bottom: 20px; }
            .header-title { color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header-subtitle { color: #fef3c7; font-size: 16px; margin: 10px 0 0 0; }
            .content { padding: 40px 30px; }
            .delivery-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 25px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
            .delivery-icon { font-size: 48px; margin-bottom: 15px; }
            .delivery-title { color: #92400e; font-size: 20px; font-weight: 700; margin: 0 0 10px 0; }
            .delivery-text { color: #a16207; font-size: 16px; margin: 0; line-height: 1.5; }
            .section { margin-bottom: 30px; }
            .section-title { color: #1f2937; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .info-item { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .info-label { color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 5px; }
            .info-value { color: #1f2937; font-size: 16px; font-weight: 600; }
            .status-badge { display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; }
            .items-table { width: 100%; border-collapse: collapse; margin-top: 15px; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .items-table th { background: #f8fafc; padding: 15px 12px; text-align: left; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb; }
            .items-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .expectations { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 8px; margin: 20px 0; }
            .expectations h3 { color: #0c4a6e; margin: 0 0 15px 0; font-size: 18px; }
            .expectations ul { margin: 0; padding-left: 20px; }
            .expectations li { color: #0c4a6e; margin-bottom: 8px; line-height: 1.5; }
            .support-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
            .support-title { color: #92400e; font-size: 18px; font-weight: 700; margin: 0 0 15px 0; }
            .support-text { color: #92400e; margin: 0 0 10px 0; }
            .support-contact { color: #92400e; font-weight: 600; }
            .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer-text { color: #6b7280; font-size: 14px; margin: 0; }
            .tracking-info { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
            .tracking-title { color: #065f46; font-size: 16px; font-weight: 700; margin: 0 0 10px 0; }
            .tracking-text { color: #047857; margin: 0; }
            @media (max-width: 600px) {
              .info-grid { grid-template-columns: 1fr; }
              .content { padding: 20px; }
              .header { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <img src="https://ibcedu.com/images/ibc-logo.png" alt="IBC Educational Network" class="logo">
              <h1 class="header-title">🚚 Your Order is Out for Delivery!</h1>
              <p class="header-subtitle">Your educational materials are on their way to you</p>
            </div>

            <!-- Content -->
            <div class="content">
              <!-- Delivery Box -->
              <div class="delivery-box">
                <div class="delivery-icon">🚚</div>
                <h2 class="delivery-title">Exciting News!</h2>
                <p class="delivery-text">
                  Your order <strong>#${orderData.orderNumber}</strong> is now out for delivery and should arrive soon! 
                  Our delivery team is bringing your educational materials directly to your doorstep.
                </p>
              </div>

              <!-- Delivery Details -->
              <div class="section">
                <h2 class="section-title">📦 Delivery Details</h2>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Order Number</div>
                    <div class="info-value">#${orderData.orderNumber}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Delivery Status</div>
                    <div class="info-value">
                      <span class="status-badge">🚚 Out for Delivery</span>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Total Amount</div>
                    <div class="info-value">Rs. ${orderData.total.toFixed(0)}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Payment Method</div>
                    <div class="info-value">Cash on Delivery</div>
                  </div>
                </div>

                ${orderData.trackingNumber ? `
                <div class="tracking-info">
                  <div class="tracking-title">📋 Tracking Information</div>
                  <div class="tracking-text">
                    <strong>Tracking Number:</strong> ${orderData.trackingNumber}<br>
                    You can use this number to track your delivery status.
                  </div>
                </div>
                ` : ''}
              </div>

              <!-- Delivery Address -->
              <div class="section">
                <h2 class="section-title">📍 Delivery Address</h2>
                <div class="info-item" style="grid-column: 1 / -1;">
                  <div class="info-label">Your Address</div>
                  <div class="info-value">
                    ${orderData.shippingAddress}<br>
                    ${orderData.shippingCity}${orderData.shippingArea ? `, ${orderData.shippingArea}` : ''}
                  </div>
                </div>
              </div>

              <!-- Order Items -->
              <div class="section">
                <h2 class="section-title">📚 Your Order Items</h2>
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th style="text-align: center;">Quantity</th>
                      <th style="text-align: right;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsList}
                  </tbody>
                </table>
              </div>

              <!-- What to Expect -->
              <div class="expectations">
                <h3>⏰ What to Expect</h3>
                <ul>
                  <li><strong>Delivery Time:</strong> Within 24-48 hours from now</li>
                  <li><strong>Payment:</strong> Please have the exact amount (Rs. ${orderData.total.toFixed(0)}) ready</li>
                  <li><strong>Availability:</strong> Someone should be available to receive the package</li>
                  <li><strong>Confirmation:</strong> You'll receive a confirmation email once delivered</li>
                  <li><strong>Contact:</strong> Our delivery team will call you before arrival</li>
                </ul>
              </div>

              <!-- Important Reminders -->
              <div class="section">
                <h2 class="section-title">⚠️ Important Reminders</h2>
                <div class="info-item" style="grid-column: 1 / -1; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-left: 4px solid #ef4444;">
                  <div style="color: #991b1b; font-weight: 600; margin-bottom: 10px;">📋 Before Delivery:</div>
                  <ul style="color: #991b1b; margin: 0; padding-left: 20px;">
                    <li>Ensure someone is available at the delivery address</li>
                    <li>Have the exact payment amount ready</li>
                    <li>Check all items upon delivery before payment</li>
                    <li>Keep your phone nearby for delivery team contact</li>
                  </ul>
                </div>
              </div>

              <!-- Support Box -->
              <div class="support-box">
                <h3 class="support-title">📞 Need Help?</h3>
                <p class="support-text">If you have any questions about delivery:</p>
                <p class="support-contact">📧 Email: support@ibcedu.com</p>
                <p class="support-contact">📱 Phone: +92 XXX XXX XXXX</p>
                <p class="support-text" style="margin-top: 15px; font-size: 14px;">
                  Our support team is available to help with any delivery concerns.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p class="footer-text">
                Thank you for choosing IBC Educational Network!<br>
                Your educational materials are carefully selected to support your learning journey.
              </p>
            </div>
          </div>
        </body>
        </html>
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
    const itemsList = orderData.items.map((item: any) => 
      `<tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: left;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${item.title}</div>
          <div style="font-size: 14px; color: #6b7280;">${item.grade || 'N/A'} • ${item.subject || 'N/A'}</div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #1f2937;">
          Rs. ${item.price}
        </td>
      </tr>`
    ).join('')

    const deliveryDate = orderData.deliveryDate ? new Date(orderData.deliveryDate) : new Date()

    await resend.emails.send({
      from: 'IBC Educational Network <orders@ibcedu.com>',
      to: [orderData.customerEmail],
      subject: `✅ Order #${orderData.orderNumber} Delivered - IBC Educational Network`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Delivered</title>
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 30px; text-align: center; }
            .logo { width: 120px; height: auto; margin-bottom: 20px; }
            .header-title { color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header-subtitle { color: #d1fae5; font-size: 16px; margin: 10px 0 0 0; }
            .content { padding: 40px 30px; }
            .success-box { background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-left: 4px solid #059669; padding: 25px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
            .success-icon { font-size: 48px; margin-bottom: 15px; }
            .success-title { color: #065f46; font-size: 20px; font-weight: 700; margin: 0 0 10px 0; }
            .success-text { color: #047857; font-size: 16px; margin: 0; line-height: 1.5; }
            .section { margin-bottom: 30px; }
            .section-title { color: #1f2937; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .info-item { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .info-label { color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 5px; }
            .info-value { color: #1f2937; font-size: 16px; font-weight: 600; }
            .status-badge { display: inline-block; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; }
            .items-table { width: 100%; border-collapse: collapse; margin-top: 15px; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .items-table th { background: #f8fafc; padding: 15px 12px; text-align: left; font-weight: 700; color: #374151; border-bottom: 2px solid #e5e7eb; }
            .items-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .next-steps { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 8px; margin: 20px 0; }
            .next-steps h3 { color: #0c4a6e; margin: 0 0 15px 0; font-size: 18px; }
            .next-steps ul { margin: 0; padding-left: 20px; }
            .next-steps li { color: #0c4a6e; margin-bottom: 8px; line-height: 1.5; }
            .resources-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
            .resources-title { color: #92400e; font-size: 18px; font-weight: 700; margin: 0 0 15px 0; }
            .resources-text { color: #92400e; margin: 0 0 10px 0; }
            .resources-list { color: #92400e; margin: 0; padding-left: 20px; }
            .support-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
            .support-title { color: #92400e; font-size: 18px; font-weight: 700; margin: 0 0 15px 0; }
            .support-text { color: #92400e; margin: 0 0 10px 0; }
            .support-contact { color: #92400e; font-weight: 600; }
            .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer-text { color: #6b7280; font-size: 14px; margin: 0; }
            .celebration-box { background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ec4899; text-align: center; }
            .celebration-title { color: #831843; font-size: 18px; font-weight: 700; margin: 0 0 15px 0; }
            .celebration-text { color: #be185d; margin: 0; }
            @media (max-width: 600px) {
              .info-grid { grid-template-columns: 1fr; }
              .content { padding: 20px; }
              .header { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <img src="https://ibcedu.com/images/ibc-logo.png" alt="IBC Educational Network" class="logo">
              <h1 class="header-title">✅ Order Delivered Successfully!</h1>
              <p class="header-subtitle">Your educational materials have arrived safely</p>
            </div>

            <!-- Content -->
            <div class="content">
              <!-- Success Box -->
              <div class="success-box">
                <div class="success-icon">🎉</div>
                <h2 class="success-title">Delivery Complete!</h2>
                <p class="success-text">
                  Your order <strong>#${orderData.orderNumber}</strong> has been successfully delivered! 
                  Your educational materials are now ready to support your learning journey.
                </p>
              </div>

              <!-- Celebration Box -->
              <div class="celebration-box">
                <h3 class="celebration-title">🎓 Congratulations!</h3>
                <p class="celebration-text">
                  You've taken an important step in your educational journey. 
                  We're excited to be part of your learning experience!
                </p>
              </div>

              <!-- Delivery Summary -->
              <div class="section">
                <h2 class="section-title">📋 Delivery Summary</h2>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Order Number</div>
                    <div class="info-value">#${orderData.orderNumber}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Delivery Status</div>
                    <div class="info-value">
                      <span class="status-badge">✅ Delivered</span>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Delivery Date</div>
                    <div class="info-value">${deliveryDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Total Amount</div>
                    <div class="info-value">Rs. ${orderData.total.toFixed(0)}</div>
                  </div>
                </div>
              </div>

              <!-- Order Items -->
              <div class="section">
                <h2 class="section-title">📚 Your Delivered Items</h2>
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th style="text-align: center;">Quantity</th>
                      <th style="text-align: right;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsList}
                  </tbody>
                </table>
              </div>

              <!-- What's Next -->
              <div class="next-steps">
                <h3>📖 What's Next?</h3>
                <ul>
                  <li><strong>Quality Check:</strong> Please check all items in your order for any damage</li>
                  <li><strong>Storage:</strong> Keep your educational materials in a safe, dry place</li>
                  <li><strong>Learning:</strong> Start your learning journey with IBC materials</li>
                  <li><strong>Support:</strong> Use our materials to enhance your educational experience</li>
                  <li><strong>Feedback:</strong> Consider sharing your experience with us</li>
                </ul>
              </div>

              <!-- Learning Resources -->
              <div class="resources-box">
                <h3 class="resources-title">📚 Learning Resources</h3>
                <p class="resources-text">Explore more educational materials and resources:</p>
                <ul class="resources-list">
                  <li>Visit our website for additional learning resources</li>
                  <li>Check out our latest collections and new arrivals</li>
                  <li>Join our educational programs and workshops</li>
                  <li>Follow us for learning tips and educational content</li>
                  <li>Connect with other learners in our community</li>
                </ul>
              </div>

              <!-- Care Instructions -->
              <div class="section">
                <h2 class="section-title">🔧 Care Instructions</h2>
                <div class="info-item" style="grid-column: 1 / -1; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0ea5e9;">
                  <div style="color: #0c4a6e; font-weight: 600; margin-bottom: 10px;">📋 To ensure your materials last:</div>
                  <ul style="color: #0c4a6e; margin: 0; padding-left: 20px;">
                    <li>Store books in a cool, dry place away from direct sunlight</li>
                    <li>Handle pages gently to prevent damage</li>
                    <li>Use bookmarks instead of folding pages</li>
                    <li>Keep materials away from food and liquids</li>
                    <li>Consider using protective covers for long-term preservation</li>
                  </ul>
                </div>
              </div>

              <!-- Support Box -->
              <div class="support-box">
                <h3 class="support-title">📞 Support & Assistance</h3>
                <p class="support-text">If you have any questions or need assistance:</p>
                <p class="support-contact">📧 Email: support@ibcedu.com</p>
                <p class="support-contact">📱 Phone: +92 XXX XXX XXXX</p>
                <p class="support-text" style="margin-top: 15px; font-size: 14px;">
                  Our support team is here to help you make the most of your educational materials.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p class="footer-text">
                Thank you for choosing IBC Educational Network!<br>
                We're committed to supporting your educational journey with quality materials.<br>
                <strong>Happy Learning! 📖✨</strong>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    console.log('Order delivered email sent to customer')
    return { success: true }
  } catch (error) {
    console.error('Error sending order delivered email:', error)
    return { success: false, error }
  }
}

// Email for contact form submissions
export async function sendContactFormEmail(contactData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  try {
    await resend.emails.send({
      from: 'IBC Educational Network <noreply@ibcedu.com>',
      to: ['contact@ibcedu.com'],
      subject: `New Contact Form Submission - ${contactData.subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); padding: 30px; text-align: center; }
            .logo { width: 120px; height: auto; margin-bottom: 20px; }
            .header-title { color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header-subtitle { color: #dbeafe; font-size: 16px; margin: 10px 0 0 0; }
            .content { padding: 40px 30px; }
            .alert-box { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
            .alert-title { color: #1e40af; font-size: 18px; font-weight: 700; margin: 0 0 10px 0; }
            .alert-text { color: #1e3a8a; font-size: 16px; margin: 0; line-height: 1.5; }
            .section { margin-bottom: 30px; }
            .section-title { color: #1f2937; font-size: 20px; font-weight: 700; margin: 0 0 20px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .info-item { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .info-label { color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 5px; }
            .info-value { color: #1f2937; font-size: 16px; font-weight: 600; }
            .message-box { background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px; }
            .message-label { color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 10px; }
            .message-content { color: #1f2937; font-size: 16px; line-height: 1.6; white-space: pre-wrap; }
            .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; }
            .footer-text { color: #6b7280; font-size: 14px; margin: 0; }
            @media (max-width: 600px) {
              .info-grid { grid-template-columns: 1fr; }
              .content { padding: 20px; }
              .header { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <img src="https://ibcedu.com/images/ibc-logo.png" alt="IBC Educational Network" class="logo">
              <h1 class="header-title">New Contact Form Submission</h1>
              <p class="header-subtitle">Someone has contacted you through your website</p>
            </div>

            <!-- Content -->
            <div class="content">
              <!-- Alert Box -->
              <div class="alert-box">
                <h2 class="alert-title">📧 New Contact Form Message</h2>
                <p class="alert-text">
                  A visitor has submitted a contact form on your IBC Educational Network website. 
                  Please review the details below and respond accordingly.
                </p>
              </div>

              <!-- Contact Information -->
              <div class="section">
                <h2 class="section-title">👤 Contact Information</h2>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Name</div>
                    <div class="info-value">${contactData.name}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Email</div>
                    <div class="info-value">${contactData.email}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Phone</div>
                    <div class="info-value">${contactData.phone || 'Not provided'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Subject</div>
                    <div class="info-value">${contactData.subject}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Date & Time</div>
                    <div class="info-value">${new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</div>
                  </div>
                </div>
              </div>

              <!-- Message Content -->
              <div class="section">
                <h2 class="section-title">💬 Message</h2>
                <div class="message-box">
                  <div class="message-label">Message Content</div>
                  <div class="message-content">${contactData.message}</div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="section">
                <h2 class="section-title">⚡ Quick Actions</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                  <a href="mailto:${contactData.email}?subject=Re: ${contactData.subject}" style="display: block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; padding: 15px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: 600;">
                    📧 Reply via Email
                  </a>
                  ${contactData.phone ? `<a href="tel:${contactData.phone}" style="display: block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 15px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: 600;">
                    📞 Call Customer
                  </a>` : ''}
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p class="footer-text">
                This is an automated notification from IBC Educational Network.<br>
                Please respond to the customer within 24 hours for best service.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    console.log('Contact form email sent to contact@ibcedu.com')
    return { success: true }
  } catch (error) {
    console.error('Error sending contact form email:', error)
    return { success: false, error }
  }
}