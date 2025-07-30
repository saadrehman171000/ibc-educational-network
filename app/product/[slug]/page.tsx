"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart, Star, Info, Package, Check, MapPin, Truck, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  title: string
  slug: string
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
  const productSlug = params.slug as string
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productSlug}`)
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

    if (productSlug) {
      fetchProduct()
    }
  }, [productSlug, router])

  // Convert Google Drive URL to display URL with better handling
  const getImageUrl = (url?: string) => {
    console.log('Product detail getImageUrl called with:', url) // Debug log
    
    if (!url || url.trim() === '') {
      console.log('No URL provided, returning placeholder')
      return '/placeholder-logo.png'
    }
    
    // Handle different Google Drive URL formats
    const driveRegexes = [
      /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)(?:\/view)?/,
      /https:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
      /https:\/\/docs\.google\.com\/.*\/d\/([a-zA-Z0-9_-]+)/
    ]
    
    for (const regex of driveRegexes) {
      const match = url.match(regex)
      if (match) {
        const fileId = match[1]
        // Use thumbnail URL which is more reliable for display
        const processedUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`
        console.log('Processed Google Drive URL:', processedUrl)
        return processedUrl
      }
    }
    
    // If it's already a direct URL or other format, return as is
    console.log('Returning original URL:', url)
    return url
  }

  const getDiscountedPrice = () => {
    if (!product) return 0
    return product.discount 
      ? product.price - (product.price * product.discount / 100) 
      : product.price
  }

  const handleAddToCart = () => {
    if (!product) return
    
    addToCart({
      id: product.id,
      title: product.title,
      grade: product.category,
      price: getDiscountedPrice(),
      image: getImageUrl(product.imageUrl)
    })
    
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
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
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-max py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/collections" className="hover:text-blue-600 transition-colors">Collections</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container-max py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group">
              <Image
                src={getImageUrl(product.imageUrl)}
                alt={product.title}
                width={600}
                height={800}
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isNewCollection && (
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span>New Collection</span>
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.title}</h1>
              
              {/* Product Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
                  {product.category}
                </span>
                {product.subject && (
                  <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                    {product.subject}
                  </span>
                )}
                <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
                  {product.series}
                </span>
                {product.type && (
                  <span className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium border border-purple-200">
                    {product.type}
                  </span>
                )}
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating!)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">
                    {product.rating} ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              {product.discount && product.discount > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-bold text-green-600">
                      Rs. {getDiscountedPrice().toFixed(0)}
                    </span>
                    <span className="text-2xl text-gray-500 line-through">
                      Rs. {product.price}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold border border-green-200">
                      {product.discount}% OFF
                    </span>
                    <span className="text-sm text-gray-600">
                      Save Rs. {(product.price - getDiscountedPrice()).toFixed(0)}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-4xl font-bold text-blue-900">Rs. {product.price}</span>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <span>Description</span>
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Product Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-indigo-600" />
                </div>
                <span>Product Details</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <span className="text-sm text-gray-600 font-medium">Category</span>
                  <p className="text-gray-900 font-semibold mt-1">{product.category}</p>
                </div>
                {product.subject && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="text-sm text-gray-600 font-medium">Subject</span>
                    <p className="text-gray-900 font-semibold mt-1">{product.subject}</p>
                  </div>
                )}
                <div className="bg-gray-50 rounded-xl p-4">
                  <span className="text-sm text-gray-600 font-medium">Series</span>
                  <p className="text-gray-900 font-semibold mt-1">{product.series}</p>
                </div>
                {product.type && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="text-sm text-gray-600 font-medium">Type</span>
                    <p className="text-gray-900 font-semibold mt-1">{product.type}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-6">
              <button 
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg ${
                  addedToCart
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/collections"
                  className="text-center bg-white text-gray-700 py-4 px-6 rounded-2xl border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold hover:shadow-lg transform hover:-translate-y-1"
                >
                  Browse More
                </Link>
                <Link
                  href={`/academic-grades/${product.category.toLowerCase().replace(' ', '-')}`}
                  className="text-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 px-6 rounded-2xl border-2 border-indigo-600 hover:from-indigo-700 hover:to-indigo-800 hover:border-indigo-700 transition-all duration-300 font-semibold hover:shadow-lg transform hover:-translate-y-1"
                >
                  View {product.category}
                </Link>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Secure & Trusted</h4>
                  <p className="text-sm text-gray-600">30-day money-back guarantee</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Fast Delivery</h4>
                  <p className="text-sm text-gray-600">Free shipping on orders over Rs. 2,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 