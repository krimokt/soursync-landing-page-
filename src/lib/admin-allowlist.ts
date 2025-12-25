/**
 * Admin email allowlist
 * Add admin email addresses here
 */
const ADMIN_EMAILS = [
  // Add your admin email here
  // Example: 'admin@soursync.com',
  'groupechannel@gmail.com'
]

/**
 * Check if an email is in the admin allowlist
 */
export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

export { ADMIN_EMAILS }




