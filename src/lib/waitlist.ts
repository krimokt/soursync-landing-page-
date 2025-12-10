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

