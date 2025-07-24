"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, Calendar, Tag, DollarSign } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

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
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export default function CollectionsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch new collection products
  const fetchNewCollections = async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        newCollection: 'true',
        ...(searchTerm && { search: searchTerm }),
      })

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()

      console.log('New collections API Response:', data) // Debug log
      setProducts(data.products || [])
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching new collections:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNewCollections(1)
  }, [searchTerm])

  // Convert Google Drive URL to display URL with better handling
  const getImageUrl = (url?: string) => {
    console.log('Admin collections getImageUrl called with:', url) // Debug log
    
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
        // Use direct download URL which is more reliable
        const processedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
        console.log('Processed Google Drive URL:', processedUrl)
        return processedUrl
      }
    }
    
    // If it's already a direct URL or other format, return as is
    console.log('Returning original URL:', url)
    return url
  }

  // Handle image load errors with multiple retry strategies
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget
    const originalSrc = target.src
    
    console.log('Image load error for:', originalSrc) // Debug log
    
    // If it's already trying the fallback, don't retry
    if (originalSrc.includes('placeholder-logo.png')) {
      console.log('Already using placeholder, not retrying')
      return
    }
    
    // Try different Google Drive URL formats
    if (originalSrc.includes('drive.google.com')) {
      const driveRegex = /[?&]id=([a-zA-Z0-9_-]+)/
      const match = originalSrc.match(driveRegex)
      
      if (match) {
        const fileId = match[1]
        // Try different URL formats in order of preference
        const urlFormats = [
          `https://drive.google.com/uc?export=view&id=${fileId}`,
          `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`,
          `https://drive.google.com/uc?export=download&id=${fileId}`,
          `https://drive.google.com/file/d/${fileId}/view`
        ]
        
        for (const format of urlFormats) {
          if (!originalSrc.includes(format.split('?')[0])) {
            console.log('Trying alternative URL format:', format)
            target.src = format
            return
          }
        }
      }
    }
    
    // Final fallback to placeholder
    console.log('Using final fallback to placeholder')
    target.src = '/placeholder-logo.png'
  }

  const handleView = (productId: string) => {
    router.push(`/collections/${productId}`)
  }

  const handleEdit = (productId: string) => {
    router.push(`/admin/products/edit/${productId}`)
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Product deleted successfully!')
        fetchNewCollections(pagination?.page || 1)
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price
    return price - (price * discount / 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Collections</h1>
          <p className="text-gray-600">Manage products marked as new collections</p>
        </div>
        <Link
          href="/admin/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search new collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No new collection products found.</p>
              <Link
                href="/admin/products/add"
                className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
              >
                Add your first new collection product
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Product Image */}
                  <div className="aspect-[3/4] relative bg-gray-100 flex items-center justify-center">
                    <Image
                      src={getImageUrl(product.imageUrl)}
                      alt={product.title}
                      width={300}
                      height={400}
                      className="w-full h-full object-contain"
                      onError={handleImageError}
                    />
                    {product.isFeatured && (
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        New Collection
                      </span>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleView(product.id)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(product.id)}
                          className="p-1 text-gray-400 hover:text-green-600"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    {/* Product Meta */}
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center text-gray-500">
                        <Tag className="w-4 h-4 mr-2" />
                        <span>{product.category} • {product.subject}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>
                          {product.discount ? (
                            <>
                              <span className="line-through text-gray-400">Rs. {product.price}</span>
                              <span className="ml-2 text-red-600 font-medium">Rs. {getDiscountedPrice(product.price, product.discount).toFixed(0)}</span>
                            </>
                          ) : (
                            `Rs. ${product.price}`
                          )}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(product.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => fetchNewCollections(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              <span className="px-3 py-2 text-gray-600">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => fetchNewCollections(pagination.page + 1)}
                disabled={!pagination.hasNext}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
