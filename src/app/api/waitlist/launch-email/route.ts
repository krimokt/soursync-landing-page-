import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin-allowlist'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (!isAdminEmail(user.email)) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }

    // Get all waitlist entries
    const { data: waitlistEntries, error: waitlistError } = await supabase
      .from('waitlist')
      .select('email, plan_interest')
      .order('created_at', { ascending: true })

    if (waitlistError) {
      console.error('Error fetching waitlist:', waitlistError)
      return NextResponse.json(
        { error: 'Failed to fetch waitlist' },
        { status: 500 }
      )
    }

    if (!waitlistEntries || waitlistEntries.length === 0) {
      return NextResponse.json(
        { error: 'No waitlist entries found' },
        { status: 404 }
      )
    }

    // Get the app URL for logo
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://soursync.com'
    const logoUrl = `${appUrl}/soursync-logo.svg`

    // Send launch emails to all waitlist users
    const emailPromises = waitlistEntries.map((entry) =>
      resend.emails.send({
        from: 'SourSync <noreply@soursync.com>',
        to: entry.email,
        subject: '🎉 SourSync is Now Live! Your Early Access Awaits',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>SourSync is Live!</title>
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
                      <!-- Header -->
                      <tr>
                        <td style="padding: 30px 40px 20px; text-align: center;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #06b6d4; letter-spacing: -0.5px;">
                            🚀 SourSync is Now Live!
                          </h1>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 20px 40px;">
                          <p style="margin: 0 0 20px; font-size: 18px; line-height: 1.6; color: #1a1a1a; font-weight: 500;">
                            Great news! SourSync is officially live and ready for you.
                          </p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #1a1a1a;">
                            As a waitlist member, you have <strong style="color: #06b6d4;">priority access</strong> to start using SourSync right away. 
                            All the features you've been waiting for are now available.
                          </p>
                          <div style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center;">
                            <p style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #ffffff;">
                              Ready to get started?
                            </p>
                            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://soursync.com'}" 
                               style="display: inline-block; padding: 12px 32px; background-color: #ffffff; color: #06b6d4; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; margin-top: 8px;">
                              Access SourSync Now →
                            </a>
                          </div>
                          <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #1a1a1a;">
                            <strong style="color: #1a1a1a;">What you can do now:</strong>
                          </p>
                          <ul style="margin: 16px 0; padding-left: 24px; color: #1a1a1a; line-height: 1.8;">
                            <li>Create professional quotations in seconds</li>
                            <li>Manage your entire sourcing workflow</li>
                            <li>Track orders from supplier to delivery</li>
                            <li>Share client portals with real-time updates</li>
                            <li>Organize all your sourcing data in one place</li>
                          </ul>
                          ${entry.plan_interest ? `
                          <div style="background-color: #e0f7fa; border: 1px solid #06b6d4; border-radius: 8px; padding: 16px; margin: 20px 0;">
                            <p style="margin: 0; font-size: 14px; color: #06b6d4; font-weight: 500;">
                              Your interested plan: <span style="color: #1a1a1a;">${entry.plan_interest}</span>
                            </p>
                          </div>
                          ` : ''}
                        </td>
                      </tr>
                      
                      <!-- Support -->
                      <tr>
                        <td style="padding: 20px 40px 40px; text-align: center;">
                          <p style="margin: 0 0 16px; font-size: 14px; color: #666666;">
                            Need help getting started? We're here for you!
                          </p>
                          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
                            <p style="margin: 0; font-size: 12px; color: #666666;">
                              Questions? Reply to this email or visit our help center.
                            </p>
                          </div>
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
    )

    const results = await Promise.allSettled(emailPromises)
    
    const successful = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.filter((r) => r.status === 'rejected').length

    return NextResponse.json({
      success: true,
      total: waitlistEntries.length,
      successful,
      failed,
      message: `Launch emails sent: ${successful} successful, ${failed} failed`,
    })
  } catch (error: any) {
    console.error('Launch email API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

