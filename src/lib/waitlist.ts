import { createClient } from '@/lib/supabase/client'

export interface WaitlistEntry {
  email: string
  source?: string
  plan_interest?: string
}

/**
 * Add an email to the waitlist
 */
export async function addToWaitlist(data: WaitlistEntry) {
  const supabase = createClient()
  
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([
      {
        email: data.email.toLowerCase().trim(),
        source: data.source || 'unknown',
        plan_interest: data.plan_interest || null,
      },
    ])
    .select()
    .single()

  if (error) {
    // If it's a duplicate email error, return a specific message
    if (error.code === '23505') {
      throw new Error('This email is already on the waitlist!')
    }
    throw new Error(error.message || 'Failed to join waitlist')
  }

  // Send welcome email (fire and forget - don't block on email errors)
  if (result) {
    try {
      await fetch('/api/waitlist/welcome-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: result.email,
          planInterest: result.plan_interest,
        }),
      })
    } catch (emailError) {
      // Log error but don't fail the waitlist signup
      console.error('Failed to send welcome email:', emailError)
    }
  }

  return result
}

/**
 * Track CTA click with Google Analytics
 */
export function trackCTAClick(ctaName: string, planName?: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_click', {
      cta_name: ctaName,
      plan_name: planName || 'none',
    })
  }
}


