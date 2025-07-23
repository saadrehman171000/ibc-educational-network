import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isAdminEmail } from './lib/admin'

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
])

const isAuthRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Only process authentication for admin and auth routes
  if (!isAdminRoute(req) && !isAuthRoute(req)) {
    return NextResponse.next()
  }

  const { userId } = await auth()
  
  // Helper function to check if user is admin
  const checkIsAdmin = async (userId: string): Promise<boolean> => {
    try {
      const client = await clerkClient()
      const user = await client.users.getUser(userId)
      const email = user.emailAddresses?.[0]?.emailAddress
      return isAdminEmail(email)
    } catch (error) {
      console.error('Error fetching user:', error)
      return false
    }
  }
  
  // If accessing admin routes
  if (isAdminRoute(req)) {
    // Require authentication
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    
    // Check if user is admin
    const isAdmin = await checkIsAdmin(userId)
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }
  
  // If user is signed in and trying to access auth routes
  if (isAuthRoute(req) && userId) {
    const isAdmin = await checkIsAdmin(userId)
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
    // If admin, redirect to admin dashboard
    return NextResponse.redirect(new URL('/admin', req.url))
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Only match admin and auth routes
    '/admin/:path*',
    '/sign-in/:path*',
    '/sign-up/:path*'
  ],
} 