"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Package, Calendar, MapPin, Phone, Mail, Clock, CheckCircle, Truck, XCircle } from "lucide-react"
import Image from "next/image"

interface OrderItem {
  id: string
  title: string
  price: number
  quantity: number
  imageUrl?: string
}

interface Order {
  id: string
  orderNumber: string
  total: number
  status: string
  createdAt: string
  updatedAt: string
  shippingName: string
  shippingEmail: string
  shippingPhone: string
  shippingAddress: string
  shippingCity: string
  shippingArea?: string
  paymentStatus: string
  items: OrderItem[]
  adminNotes?: string
  trackingNumber?: string
  deliveryDate?: string
}

export default function ViewOrderPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  // Check for email parameter in URL (from checkout redirect)
  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
      // Auto-search for orders
      handleEmailSearch(emailParam)
    }
  }, [searchParams])

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-blue-100 text-blue-800 border-blue-200",
      out_for_delivery: "bg-orange-100 text-orange-800 border-orange-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200"
    }
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "out_for_delivery":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <Package className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const handleEmailSearch = async (emailToSearch: string) => {
    if (!emailToSearch.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(emailToSearch)}`)
      const data = await response.json()

      if (data.orders) {
        setOrders(data.orders)
      } else {
        setOrders([])
      }
      setSearched(true)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setOrders([])
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleEmailSearch(email)
  }

  const getImageUrl = (url?: string) => {

    
    if (!url) {
      console.log('No URL provided, returning placeholder')
      return '/placeholder-logo.png'
    }
    
    // Handle Google Drive URLs
    const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/
    const match = url.match(driveRegex)
    
    if (match) {
      const imageUrl = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`
      console.log('Generated Google Drive URL:', imageUrl)
      return imageUrl
    }
    
    // Handle other Google Drive URL formats
    const openRegex = /https:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/
    const openMatch = url.match(openRegex)
    
    if (openMatch) {
      const imageUrl = `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w400`
      console.log('Generated Google Drive open URL:', imageUrl)
      return imageUrl
    }
    
    // Handle docs.google.com URLs
    const docsRegex = /https:\/\/docs\.google\.com\/.*\/d\/([a-zA-Z0-9_-]+)/
    const docsMatch = url.match(docsRegex)
    
    if (docsMatch) {
      const imageUrl = `https://drive.google.com/thumbnail?id=${docsMatch[1]}&sz=w400`
      console.log('Generated Google Docs URL:', imageUrl)
      return imageUrl
    }
    
    console.log('Returning original URL:', url)
    return url
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    const originalSrc = target.src
    
    // Try different fallback strategies
    if (originalSrc.includes('drive.google.com')) {
      const idMatch = originalSrc.match(/id=([a-zA-Z0-9_-]+)/)
      if (idMatch) {
        // Try direct download URL
        target.src = `https://drive.google.com/uc?export=view&id=${idMatch[1]}`
        return
      }
    }
    
    // Final fallback
    target.src = '/placeholder-logo.png'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">View Your Orders</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Enter your email address to view all your order details and track their status
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search Orders
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Searching for your orders...</p>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Order Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status.replace('_', ' ')}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Shipping Information */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Shipping Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p><strong>Name:</strong> {order.shippingName}</p>
                            <p><strong>Email:</strong> {order.shippingEmail}</p>
                            <p><strong>Phone:</strong> {order.shippingPhone}</p>
                            <p><strong>Address:</strong> {order.shippingAddress}</p>
                            <p><strong>City:</strong> {order.shippingCity}</p>
                            {order.shippingArea && (
                              <p><strong>Area:</strong> {order.shippingArea}</p>
                            )}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Package className="w-4 h-4 mr-2" />
                            Order Summary
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p><strong>Total Items:</strong> {order.items.length}</p>
                            <p><strong>Total Amount:</strong> Rs. {order.total}</p>
                            {order.trackingNumber && (
                              <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                            )}
                            {order.deliveryDate && (
                              <p><strong>Delivery Date:</strong> {formatDate(order.deliveryDate)}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-16 h-20 relative bg-white rounded overflow-hidden border border-gray-200 flex items-center justify-center">
                                <Image
                                  src={getImageUrl(item.imageUrl)}
                                  alt={item.title}
                                  fill
                                  className="object-contain"
                                  onError={handleImageError}
                                />
                                {!item.imageUrl && (
                                  <div className="text-gray-400 text-xs text-center">
                                    No Image
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{item.title}</h5>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-sm text-gray-600">Price: Rs. {item.price}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  Rs. {item.price * item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Admin Notes */}
                      {order.adminNotes && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Admin Notes</h4>
                          <p className="text-sm text-gray-700">{order.adminNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
                <p className="text-gray-600">
                  No orders found for the email address: <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please check your email address or contact us if you believe this is an error.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 