import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, planInterest } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: 'SourSync <onboarding@resend.dev>', // Update with your verified domain
      to: email,
      subject: 'Welcome to SourSync Waitlist! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to SourSync</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ededed;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #2a2a2a;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px; text-align: center;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #06b6d4; letter-spacing: -0.5px;">
                          Welcome to SourSync! 🎉
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #d4d4d8;">
                          Thank you for joining our waitlist! We're thrilled to have you on board.
                        </p>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #d4d4d8;">
                          You're now part of an exclusive group of early adopters who will be the first to experience SourSync when we launch.
                        </p>
                        ${planInterest ? `
                        <div style="background-color: #06b6d4/10; border: 1px solid #06b6d4/20; border-radius: 8px; padding: 16px; margin: 20px 0;">
                          <p style="margin: 0; font-size: 14px; color: #06b6d4; font-weight: 500;">
                            Plan Interest: <span style="color: #ededed;">${planInterest}</span>
                          </p>
                        </div>
                        ` : ''}
                        <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #d4d4d8;">
                          <strong style="color: #ededed;">What happens next?</strong>
                        </p>
                        <ul style="margin: 16px 0; padding-left: 24px; color: #d4d4d8; line-height: 1.8;">
                          <li>You'll receive priority access when we launch</li>
                          <li>Get exclusive updates about new features</li>
                          <li>Enjoy special early-bird pricing</li>
                          <li>Access to our private community</li>
                        </ul>
                      </td>
                    </tr>
                    
                    <!-- CTA -->
                    <tr>
                      <td style="padding: 20px 40px 40px; text-align: center;">
                        <p style="margin: 0 0 16px; font-size: 14px; color: #a1a1aa;">
                          We'll notify you as soon as SourSync is ready!
                        </p>
                        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #2a2a2a;">
                          <p style="margin: 0; font-size: 12px; color: #71717a;">
                            Questions? Reply to this email and we'll get back to you.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Footer -->
                  <table role="presentation" style="max-width: 600px; width: 100%; margin-top: 20px;">
                    <tr>
                      <td style="padding: 20px; text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #71717a;">
                          © ${new Date().getFullYear()} SourSync. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Email API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

