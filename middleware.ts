import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { isAdminEmail } from '@/lib/admin-allowlist'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle legacy blog URLs: /blog/[slug] -> /blog/en/[slug]
  // Do this before any Supabase call — no auth needed for a redirect
  const blogSlugMatch = pathname.match(/^\/blog\/([^\/]+)$/)
  if (blogSlugMatch) {
    const slug = blogSlugMatch[1]
    const validLanguages = ['en', 'fr', 'ar', 'zh']
    if (!validLanguages.includes(slug)) {
      return NextResponse.redirect(
        new URL(`/blog/en/${slug}`, request.url),
        308
      )
    }
  }

  // Public pages — skip Supabase entirely, return immediately
  const needsAuth = pathname.startsWith('/admin') || pathname === '/login'
  if (!needsAuth) {
    return NextResponse.next()
  }

  // Only hit Supabase for protected routes
  const { supabaseResponse, user } = await updateSession(request)

  if (pathname.startsWith('/admin')) {
    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      return Response.redirect(loginUrl)
    }
    if (!isAdminEmail(user.email)) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('error', 'unauthorized')
      return Response.redirect(loginUrl)
    }
  }

  if (pathname === '/login' && user && isAdminEmail(user.email)) {
    return Response.redirect(new URL('/admin/analytics', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Only run middleware on routes that actually need it
    '/admin/:path*',
    '/login',
    '/blog/:slug',
  ],
}




