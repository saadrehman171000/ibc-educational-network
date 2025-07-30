"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, User, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"

interface Announcement {
  id: string
  title: string
  content: string
  summary: string
  category: string
  author: string
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export default function AnnouncementDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnnouncement = async () => {
      if (!params.id) return

      setLoading(true)
      try {
        const response = await fetch(`/api/announcements/${params.id}`)
        
        if (!response.ok) {
          throw new Error('Announcement not found')
        }
        
        const data = await response.json()

        setAnnouncement(data.announcement)
      } catch (error) {
        console.error('Error fetching announcement:', error)
        setError('Failed to load announcement')
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncement()
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'New Release': 'bg-orange-100 text-orange-800',
      'Event': 'bg-blue-100 text-blue-800',
      'Training': 'bg-green-100 text-green-800',
      'Technology': 'bg-purple-100 text-purple-800',
      'Partnership': 'bg-indigo-100 text-indigo-800',
      'Competition': 'bg-pink-100 text-pink-800',
      'Update': 'bg-gray-100 text-gray-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-max py-12">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-max py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Announcement Not Found</h1>
            <p className="text-gray-600 mb-6">The announcement you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/announcements"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Announcements
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white section-padding">
        <div className="container-max">
          <Link
            href="/announcements"
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Announcements
          </Link>
          
          <div className="flex items-center space-x-4 mb-4">
            <span className={`${getCategoryColor(announcement.category)} px-3 py-1 rounded-full text-sm font-medium`}>
              {announcement.category}
            </span>
            {announcement.isFeatured && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{announcement.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-blue-100">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{announcement.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(announcement.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{formatTime(announcement.createdAt)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-xl p-8 md:p-12 card-shadow">
              {/* Summary */}
              <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">Summary</h2>
                <p className="text-blue-800 leading-relaxed">{announcement.summary}</p>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {announcement.content}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <span>Last updated: {formatDate(announcement.updatedAt)}</span>
                  </div>
                  
                  <Link
                    href="/announcements"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to All Announcements
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
} 