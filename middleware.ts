import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { isAdminEmail } from '@/lib/admin-allowlist'

export async function middleware(request: NextRequest) {
  // Update session and get user
  const { supabaseResponse, user } = await updateSession(request)

  // Handle legacy blog URLs: /blog/[slug] -> /blog/en/[slug]
  const pathname = request.nextUrl.pathname
  const blogSlugMatch = pathname.match(/^\/blog\/([^\/]+)$/)
  if (blogSlugMatch) {
    const slug = blogSlugMatch[1]
    // Don't redirect if it's already a language code
    const validLanguages = ['en', 'fr', 'ar', 'zh']
    if (!validLanguages.includes(slug)) {
      return NextResponse.redirect(
        new URL(`/blog/en/${slug}`, request.url),
        308 // Permanent redirect
      )
    }
  }

  // Check if the route is protected
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If no user, redirect to login
    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return Response.redirect(loginUrl)
    }

    // If user exists but not in admin allowlist, redirect to login with error
    if (!isAdminEmail(user.email)) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('error', 'unauthorized')
      return Response.redirect(loginUrl)
    }
  }

  // If accessing login page and already authenticated as admin, redirect to admin
  if (request.nextUrl.pathname === '/login' && user && isAdminEmail(user.email)) {
    return Response.redirect(new URL('/admin/analytics', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}




