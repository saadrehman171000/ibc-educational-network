"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  status: string
  featured: boolean
  image?: string
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

export default function ProgramsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  // Fetch events
  const fetchEvents = async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedStatus && { status: selectedStatus }),
      })

      const response = await fetch(`/api/events?${params}`)
      const data = await response.json()

      setEvents(data.events || [])
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents(1)
  }, [searchTerm, selectedCategory, selectedStatus])

  // Convert Google Drive URL to display URL with better handling
  const getImageUrl = (url?: string) => {

    
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
        const processedUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
        console.log('Processed Google Drive URL:', processedUrl)
        return processedUrl
      }
    }
    
    // If it's already a direct URL or other format, return as is
    console.log('Returning original URL:', url)
    return url
  }

  // Handle image load errors with retry
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget
    const originalSrc = target.src
    
    // If it's already trying the fallback, don't retry
    if (originalSrc.includes('placeholder-logo.png')) {
      return
    }
    
    // Try alternative Google Drive URL format first
    if (originalSrc.includes('drive.google.com')) {
      const driveRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/
      const match = originalSrc.match(driveRegex)
      
      if (match && !originalSrc.includes('thumbnail')) {
        target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`
        return
      }
    }
    
    // Final fallback to placeholder
    target.src = '/placeholder-logo.png'
  }

  const handleView = (eventId: string) => {
    router.push(`/programs/${eventId}`)
  }

  const handleEdit = (eventId: string) => {
    router.push(`/admin/programs/edit/${eventId}`)
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Event deleted successfully!')
        fetchEvents(pagination?.page || 1)
      } else {
        alert('Failed to delete event')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Failed to delete event')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadge = (event: Event) => {
    const badges = []
    
    if (event.featured) {
      badges.push(<span key="featured" className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Featured</span>)
    }
    
    badges.push(
      <span key="status" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(event.status)}`}>
        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
      </span>
    )
    
    return <div className="flex gap-1">{badges}</div>
  }

  // Get unique values for filters
  const categories = [...new Set(events.map(e => e.category))].filter(Boolean)
  const statuses = [...new Set(events.map(e => e.status))].filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events & Programs</h1>
          <p className="text-gray-600">Manage educational events and programs</p>
        </div>
        <Link
          href="/admin/programs/add"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
              placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("")
              setSelectedStatus("")
            }}
            className="px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      {pagination && (
        <div className="text-sm text-gray-600">
          Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of{' '}
          {pagination.totalCount} events
        </div>
      )}

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No events found.</p>
            <Link href="/admin/programs/add" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
              Add your first event
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0">
                          <Image
                            src={getImageUrl(event.image)}
                            alt={event.title}
                            width={64}
                            height={64}
                            className="h-16 w-16 object-cover rounded"
                            onError={handleImageError}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {event.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {event.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">{event.description}</div>
                      <div className="text-sm text-gray-500">{event.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">{event.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(event)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleView(event.id)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                        >
                  <Eye className="w-4 h-4" />
                </button>
                        <button 
                          onClick={() => handleEdit(event.id)}
                          className="text-green-600 hover:text-green-700 p-1"
                        >
                  <Edit className="w-4 h-4" />
                </button>
                        <button 
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
            </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => fetchEvents(pagination.page - 1)}
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
                  onClick={() => fetchEvents(pageNum)}
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
            onClick={() => fetchEvents(pagination.page + 1)}
            disabled={!pagination.hasNext}
            className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
      </div>
      )}
    </div>
  )
}
