"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Bell, Edit, Trash2, Eye, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"

interface Announcement {
  id: string
  title: string
  summary: string
  content: string
  category: string
  author: string
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [featuredOnly, setFeaturedOnly] = useState(false)

  // Fetch announcements
  const fetchAnnouncements = async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(featuredOnly && { featured: 'true' }),
      })

      const response = await fetch(`/api/announcements?${params}`)
      const data = await response.json()

      setAnnouncements(data.announcements || [])
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements(1)
  }, [searchTerm, featuredOnly])

  const handleDelete = async (announcementId: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return

    try {
      const response = await fetch(`/api/announcements/${announcementId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Announcement deleted successfully!')
        fetchAnnouncements(pagination?.page || 1)
      } else {
        alert('Failed to delete announcement')
      }
    } catch (error) {
      console.error('Error deleting announcement:', error)
      alert('Failed to delete announcement')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600">Manage system announcements and notifications</p>
        </div>
        <Link
          href="/admin/announcements/add"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Announcement</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Important Filter */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="importantOnly"
              checked={importantOnly}
              onChange={(e) => setImportantOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="importantOnly" className="text-sm text-gray-700">
              Important only
            </label>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm("")
              setImportantOnly(false)
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
          {pagination.totalCount} announcements
        </div>
      )}

      {/* Announcements Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No announcements found.</p>
            <Link href="/admin/announcements/add" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
              Add your first announcement
            </Link>
          </div>
        ) : (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Announcement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
              </tr>
            </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <tr key={announcement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {announcement.isFeatured ? (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          ) : (
                            <Bell className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {announcement.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {announcement.summary}
                          </div>
                        </div>
                    </div>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {announcement.isFeatured ? (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                          Featured
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                          Normal
                    </span>
                      )}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(announcement.createdAt)}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                        <button className="text-green-600 hover:text-green-700 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                        <button 
                          onClick={() => handleDelete(announcement.id)}
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
            onClick={() => fetchAnnouncements(pagination.page - 1)}
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
                  onClick={() => fetchAnnouncements(pageNum)}
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
            onClick={() => fetchAnnouncements(pagination.page + 1)}
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
