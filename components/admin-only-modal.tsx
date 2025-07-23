'use client'

import { useState, useEffect } from 'react'
import { X, ShieldX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface AdminOnlyModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
  autoCloseDelay?: number
}

export default function AdminOnlyModal({ 
  isOpen, 
  onClose, 
  title = "Admin Access Only",
  message = "This feature is restricted to administrators. Regular customers can browse and purchase without creating an account.",
  autoCloseDelay = 5000
}: AdminOnlyModalProps) {
  const [countdown, setCountdown] = useState(autoCloseDelay / 1000)

  useEffect(() => {
    if (!isOpen) return

    setCountdown(autoCloseDelay / 1000)
    
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, autoCloseDelay, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <ShieldX className="w-12 h-12 text-red-500" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {message}
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button 
              onClick={onClose}
              className="w-full bg-blue-900 hover:bg-blue-800"
            >
              Continue Shopping
            </Button>
            
            <p className="text-sm text-gray-500">
              Auto-closing in {countdown} seconds...
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-gray-600">
              Need assistance? Contact us for help with your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 