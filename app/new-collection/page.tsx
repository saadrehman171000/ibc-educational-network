"use client"

import { useState, useEffect } from "react"
import { Search, Grid, List, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
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

export default function NewCollectionPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    subject: '',
    series: '',
  })

  // Fetch new collection products
  const fetchProducts = async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        newCollection: 'true', // Only fetch new collection products
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.subject && { subject: filters.subject }),
        ...(filters.series && { series: filters.series }),
      })

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()

      setProducts(data.products)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(1)
  }, [filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      subject: '',
      series: '',
    })
  }

  // Convert Google Drive URL to display URL
  const getImageUrl = (url?: string) => {
    if (!url) return '/placeholder-logo.png'
    const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/
    const match = url.match(driveRegex)
    
    if (match) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`
    }
    
    return url
  }

  // Get unique values for filters
  const getUniqueValues = (field: keyof Product) => {
    const values = products.map(product => product[field]).filter(Boolean)
    return [...new Set(values)] as string[]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="w-10 h-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">New Collection</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our latest educational books and materials, fresh from our collection
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search new products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {getUniqueValues('category').map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Subjects</option>
                {getUniqueValues('subject').map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Series Filter */}
            <div>
              <select
                value={filters.series}
                onChange={(e) => handleFilterChange('series', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Series</option>
                {getUniqueValues('series').map((series) => (
                  <option key={series} value={series}>{series}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear All Filters
            </button>

            {/* View Mode Toggle */}
            <div className="ml-auto flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {pagination && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of{' '}
              {pagination.totalCount} new collection products
            </p>
          </div>
        )}

        {/* Products Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No new collection products found</p>
            <p className="text-gray-400 mt-2">Check back soon for our latest additions!</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
            : "space-y-4 mb-8"
          }>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/collections/${product.id}`}
                className={viewMode === 'grid' 
                  ? "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow block relative"
                  : "bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex gap-4 hover:shadow-md transition-shadow block relative"
                }
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={getImageUrl(product.imageUrl)}
                        alt={product.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-logo.png'
                        }}
                      />
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>New</span>
                      </span>
                      {product.isFeatured && (
                        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.category} • {product.subject}</p>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.discount && product.discount > 0 ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-blue-900">
                                Rs. {(product.price - (product.price * product.discount / 100)).toFixed(0)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">Rs. {product.price}</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-blue-900">Rs. {product.price}</span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault()
                            // Add to cart functionality
                          }}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-32 h-40 relative flex-shrink-0">
                      <Image
                        src={getImageUrl(product.imageUrl)}
                        alt={product.title}
                        fill
                        className="object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-logo.png'
                        }}
                      />
                      <span className="absolute top-1 right-1 bg-orange-500 text-white text-xs px-1 py-0.5 rounded flex items-center space-x-1">
                        <Sparkles className="w-2 h-2" />
                        <span>New</span>
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.category} • {product.subject} • {product.series}</p>
                      <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.discount && product.discount > 0 ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-blue-900">
                                Rs. {(product.price - (product.price * product.discount / 100)).toFixed(0)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">Rs. {product.price}</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-blue-900">Rs. {product.price}</span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault()
                            // Add to cart functionality
                          }}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => fetchProducts(pagination.page - 1)}
              disabled={!pagination.hasPrev}
              className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                const pageNum = Math.max(1, pagination.page - 2) + i
                if (pageNum > pagination.totalPages) return null
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => fetchProducts(pageNum)}
                    className={`px-3 py-2 rounded-lg ${
                      pageNum === pagination.page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => fetchProducts(pagination.page + 1)}
              disabled={!pagination.hasNext}
              className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Browse All Collections CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore All Collections</h3>
            <p className="text-gray-600 mb-6">
              Don't miss out on our complete range of educational materials
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              <span>Browse All Collections</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
