import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email to contact@ibcedu.com
    await resend.emails.send({
      from: 'IBC Educational Network <noreply@ibcedu.com>',
      to: ['contact@ibcedu.com'],
      subject: `New Contact Form Submission - ${subject}`,
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
                    <div class="info-value">${name}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Email</div>
                    <div class="info-value">${email}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Phone</div>
                    <div class="info-value">${phone || 'Not provided'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Subject</div>
                    <div class="info-value">${subject}</div>
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
                  <div class="info-item">
                    <div class="info-label">IP Address</div>
                    <div class="info-value">${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}</div>
                  </div>
                </div>
              </div>

              <!-- Message Content -->
              <div class="section">
                <h2 class="section-title">💬 Message</h2>
                <div class="message-box">
                  <div class="message-label">Message Content</div>
                  <div class="message-content">${message}</div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="section">
                <h2 class="section-title">⚡ Quick Actions</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                  <a href="mailto:${email}?subject=Re: ${subject}" style="display: block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; padding: 15px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: 600;">
                    📧 Reply via Email
                  </a>
                  <a href="tel:${phone}" style="display: block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 15px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: 600;">
                    📞 Call Customer
                  </a>
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
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.'
    })

  } catch (error) {
    console.error('Error sending contact form email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
} 