"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"

const categories = [
  'Nursery',
  'KG1',
  'KG2',
  'Beginner',
  'Step 1',
  'Step 2', 
  'Step 3',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
]

const subjects = [
  'English',
  'Urdu',
  'Mathematics',
  'Science',
  'Social Studies',
  'Islamic Studies',
  'General Knowledge',
  'Drawing',
  'Handwriting',
  'Computer',
  '5 in 1',
  'Writing Journey',
  'Art & Craft',
  'Qaida',
  'Tajweed',
  'Hifz',
  'Arabic',
  'Environmental Studies',
  'Life Skills',
  'Creative Writing',
]

const seriesOptions = [
  'KG Series',
  'Primary Series',
  'Art in Craft',
  'All in One',
  'Glorious',
  'Junior Artist',
  'Subhani Qaida',
  'Smart Start Famous 5',
  'Starter',
  'Writing Journey',
  'Art & Craft',
  'Drawing',
  'Early Learning',
  'Foundation Series',
  'Core Series',
  'Advanced Series',
  'Islamic Series',
  'Creative Series',
  'Activity Series',
  'Assessment Series',
]

const typeOptions = [
  'Reader',
  'Copy',
  'Textbook',
  'Workbook',
  'Activity Book',
  'Guide',
  'Qaida',
  'Drawing',
  'Coloring Book',
  'Assessment Book',
  'Practice Book',
  'Reference Book',
  'Story Book',
  'Poetry Book',
  'Grammar Book',
  'Vocabulary Book',
  'Comprehension Book',
  'Creative Book',
  'Islamic Book',
  'Science Lab Book',
]

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subject: "",
    series: "",
    type: "",
    price: "",
    discount: "",
    imageUrl: "",
    isNewCollection: false,
    isFeatured: false,
  })

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        if (response.ok) {
          const product = await response.json()
          setFormData({
            title: product.title || "",
            description: product.description || "",
            category: product.category || "",
            subject: product.subject || "",
            series: product.series || "",
            type: product.type || "",
            price: product.price.toString(),
            discount: product.discount?.toString() || "",
            imageUrl: product.imageUrl || "",
            isNewCollection: product.isNewCollection || false,
            isFeatured: product.isFeatured || false,
          })
        } else {
          alert('Product not found')
          router.push('/admin/products')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        alert('Failed to load product')
        router.push('/admin/products')
      } finally {
        setFetching(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const price = parseFloat(formData.price)
      if (isNaN(price) || price < 0) {
        alert('Please enter a valid price')
        return
      }

      const discount = formData.discount ? parseFloat(formData.discount) : undefined
      if (discount !== undefined && (isNaN(discount) || discount < 0 || discount > 100)) {
        alert('Please enter a valid discount (0-100)')
        return
      }

      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price,
          discount,
        }),
      })

      if (response.ok) {
        alert('Product updated successfully!')
        router.push('/admin/products')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product')
    } finally {
      setLoading(false)
    }
  }

  // Convert Google Drive sharing URL to direct image URL
  const getImagePreviewUrl = (url: string) => {
    if (!url) return ''
    
    // Convert Google Drive sharing URL to direct image URL
    const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/
    const match = url.match(driveRegex)
    
    if (match) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`
    }
    
    return url
  }

  if (fetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600">Update product information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product description"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category (Grade)
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Series
                    </label>
                    <select
                      name="series"
                      value={formData.series}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Series</option>
                      {seriesOptions.map((series) => (
                        <option key={series} value={series}>
                          {series}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Type</option>
                      {typeOptions.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.discount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image URL (Google Drive) *
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    required
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://drive.google.com/file/d/.../view"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Share your image from Google Drive and paste the sharing URL here
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isNewCollection"
                      id="isNewCollection"
                      checked={formData.isNewCollection}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isNewCollection" className="text-sm font-medium text-gray-700">
                      Mark as New Collection
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                      Mark as Featured
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Preview & Actions */}
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Image Preview</h2>
              <div className="space-y-4">
                {formData.imageUrl ? (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <Image
                      src={getImagePreviewUrl(formData.imageUrl)}
                      alt="Product preview"
                      width={200}
                      height={250}
                      className="w-full h-auto rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-logo.png'
                      }}
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Eye className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Image preview will appear here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Updating...' : 'Update Product'}</span>
                </button>
                <Link
                  href="/admin/products"
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center block"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
} 