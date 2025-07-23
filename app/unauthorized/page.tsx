'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ShieldX } from 'lucide-react'

export default function UnauthorizedPage() {
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      handleContinueShopping()
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleContinueShopping = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <ShieldX className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            This area is restricted to administrators only
          </p>
        </div>

        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            <strong>Admin Access Only:</strong> This portal is exclusively for IBC Educational Network administrators. 
            Regular customers can browse our catalog and make purchases without needing to sign in.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Button 
            onClick={handleContinueShopping}
            className="w-full bg-blue-900 hover:bg-blue-800"
          >
            Continue Shopping
          </Button>
          
          <p className="text-xs text-gray-500">
            You will be redirected automatically in a few seconds...
          </p>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">
            Need help? Contact us for assistance with your order.
          </p>
        </div>
      </div>
    </div>
  )
} 