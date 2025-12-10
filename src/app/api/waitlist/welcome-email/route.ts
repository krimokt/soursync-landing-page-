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

    // Get the app URL for logo
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://soursync.com'
    const logoUrl = `${appUrl}/soursync-logo.svg`

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: 'SourSync <noreply@soursync.com>',
      to: email,
      subject: 'SourSync waitlist confirmation',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SourSync Waitlist Confirmation</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; color: #1a1a1a;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Logo Header -->
                    <tr>
                      <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                        <img src="${logoUrl}" alt="SourSync" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 40px;">
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #1a1a1a;">
                          Hi,
                        </p>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #1a1a1a;">
                          This email confirms your request to join the SourSync waitlist.
                        </p>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #1a1a1a;">
                          We will notify you when early access opens and provide updates on key features and launch milestones.
                        </p>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #1a1a1a;">
                          For business inquiries or partnership discussions, please reply to this message.
                        </p>
                        <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.6; color: #1a1a1a;">
                          Sincerely,
                        </p>
                        <p style="margin: 5px 0 0; font-size: 16px; line-height: 1.6; color: #1a1a1a;">
                          The SourSync Team
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; border-radius: 0 0 8px 8px;">
                        <p style="margin: 0; font-size: 12px; color: #666666; text-align: center;">
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

