'use client'

import { SignIn, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminEmail } from '@/lib/admin'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function SignInPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [showAdminWarning, setShowAdminWarning] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      const email = user.emailAddresses[0]?.emailAddress
      if (!isAdminEmail(email)) {
        setShowAdminWarning(true)
        // Sign out the user since they're not admin
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        // Admin user, redirect to admin dashboard
        router.push('/admin')
      }
    }
  }, [user, isLoaded, router])

  if (showAdminWarning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Access Restricted
            </h2>
            <Alert className="mt-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                This portal is for administrators only. Regular users can browse and purchase products without creating an account.
              </AlertDescription>
            </Alert>
            <div className="mt-6">
              <Button 
                onClick={() => router.push('/')} 
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              You will be redirected automatically in a few seconds...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the administrative dashboard
          </p>
        </div>
        <div className="mt-8">
          <SignIn 
            routing="hash" 
            redirectUrl="/admin"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-lg",
              }
            }}
          />
        </div>
      </div>
    </div>
  )
} 