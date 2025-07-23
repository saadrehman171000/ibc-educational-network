"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart, Star, Info, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  title: string
  description: string
  category: string
  subject?: string
  series: string
  type?: string
  price: number
  discount?: number
  imageUrl?: string
  isNewCollection: boolean
  isFeatured: boolean
  rating?: number
  reviews?: number
  createdAt: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
        } else {
          router.push('/collections')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        router.push('/collections')
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId, router])

  // Convert Google Drive URL to display URL
  const getImageUrl = (url?: string) => {
    if (!url) return '/placeholder-logo.png'
    const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/
    const match = url.match(driveRegex)
    
    if (match) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`
    }
    
    return url
  }

  const getDiscountedPrice = () => {
    if (!product) return 0
    return product.discount 
      ? product.price - (product.price * product.discount / 100) 
      : product.price
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/collections" className="text-blue-600 hover:text-blue-700">
            Return to Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-max py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/collections" className="hover:text-blue-600">Collections</Link>
              <span>/</span>
              <span className="text-gray-900">{product.title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container-max py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <Image
                src={getImageUrl(product.imageUrl)}
                alt={product.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
              {product.isNewCollection && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  New Collection
                </span>
              )}
              {product.isFeatured && (
                <span className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              
              {/* Product Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full">{product.category}</span>
                {product.subject && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{product.subject}</span>
                )}
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{product.series}</span>
                {product.type && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{product.type}</span>
                )}
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating!)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              {product.discount && product.discount > 0 ? (
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-green-600">
                    Rs. {getDiscountedPrice().toFixed(0)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    Rs. {product.price}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {product.discount}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-blue-900">Rs. {product.price}</span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>Description</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Product Details</span>
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                {product.subject && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-medium">{product.subject}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Series:</span>
                  <span className="font-medium">{product.series}</span>
                </div>
                {product.type && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{product.type}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-medium">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/collections"
                  className="text-center bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Browse More
                </Link>
                <Link
                  href={`/academic-grades/${product.category.toLowerCase().replace(' ', '-')}`}
                  className="text-center bg-green-100 text-green-700 py-3 px-6 rounded-lg hover:bg-green-200 transition-colors font-medium"
                >
                  View {product.category}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More from {product.series}</h2>
          <div className="text-center py-8">
            <p className="text-gray-500">Related products will be shown here</p>
          </div>
        </div>
      </div>
    </div>
  )
} 