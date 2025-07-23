'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { isAdminEmail } from '@/lib/admin'

interface AdminGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function AdminGuard({ children, fallback }: AdminGuardProps) {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push('/sign-in')
        return
      }

      const email = user.emailAddresses[0]?.emailAddress
      if (!isAdminEmail(email)) {
        router.push('/unauthorized')
        return
      }
    }
  }, [user, isLoaded, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    )
  }

  if (!user) {
    return fallback || null
  }

  const email = user.emailAddresses[0]?.emailAddress
  if (!isAdminEmail(email)) {
    return fallback || null
  }

  return <>{children}</>
} 