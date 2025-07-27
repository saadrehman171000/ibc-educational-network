"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Clock, Users, Star, ChevronRight, Filter, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Event {
  id: string
  title: string
  description: string
  fullDescription?: string
  date: string
  endDate?: string
  time: string
  location: string
  address?: string
  image?: string
  gallery: string[]
  category: string
  status: string
  featured: boolean
  tags: string[]
  requirements: string[]
  agenda?: any[]
  organizer?: string
  contact?: string
  phone?: string
  website?: string
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
  const [events, setEvents] = useState<Event[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  // Fetch events
  const fetchEvents = async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedStatus && { status: selectedStatus }),
      })

      const response = await fetch(`/api/events?${params}`)
      const data = await response.json()

      console.log('Events API Response:', data) // Debug log
      console.log('Events received:', data.events) // Debug log
      console.log('First event image:', data.events?.[0]?.image) // Debug log

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
  }, [selectedCategory, selectedStatus])

  // Convert Google Drive URL to display URL with better handling
  const getImageUrl = (url?: string) => {
    console.log('getImageUrl called with:', url) // Debug log
    
    if (!url) {
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
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
      }
    }
    
    // If it's not a Google Drive URL, return as is
    console.log('Not a Google Drive URL, returning as is:', url)
    return url
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('Image error, setting to placeholder')
    e.currentTarget.src = '/placeholder-logo.png'
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Workshop': 'bg-blue-50 text-blue-700 border-blue-200',
      'Seminar': 'bg-green-50 text-green-700 border-green-200',
      'Conference': 'bg-purple-50 text-purple-700 border-purple-200',
      'Training': 'bg-orange-50 text-orange-700 border-orange-200',
      'Webinar': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Competition': 'bg-pink-50 text-pink-700 border-pink-200',
    }
    return colors[category] || 'bg-slate-50 text-slate-700 border-slate-200'
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'upcoming': 'bg-green-50 text-green-700 border-green-200',
      'ongoing': 'bg-blue-50 text-blue-700 border-blue-200',
      'completed': 'bg-slate-50 text-slate-700 border-slate-200',
      'cancelled': 'bg-red-50 text-red-700 border-red-200',
    }
    return colors[status] || 'bg-slate-50 text-slate-700 border-slate-200'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Educational Programs & Events</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive educational programs, workshops, and events designed to enhance learning and professional development.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="container-max">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === ""
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setSelectedCategory("Workshop")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === "Workshop"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              Workshops
            </button>
            <button
              onClick={() => setSelectedCategory("Seminar")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === "Seminar"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              Seminars
            </button>
            <button
              onClick={() => setSelectedCategory("Training")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === "Training"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              Training
            </button>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-20">
          <div className="container-max">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      {!loading && (
        <section className="py-16">
          <div className="container-max">
            {events.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Events Found</h3>
                <p className="text-slate-600">
                  {selectedCategory 
                    ? `No events found in the "${selectedCategory}" category.` 
                    : "No events are currently scheduled."
                  }
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="relative h-64 bg-white">
                      <Image
                        src={getImageUrl(event.image)}
                        alt={event.title}
                        fill
                        className="object-contain"
                        onError={handleImageError}
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      {event.featured && (
                        <div className="absolute top-4 right-4">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-tight">{event.title}</h3>
                      <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">{event.description}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-slate-500 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                      </div>

                      <Link
                        href={`/programs/${event.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group"
                      >
                        Learn More 
                        <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => fetchEvents(pagination.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="flex items-center space-x-1 px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 text-sm"
                >
                  Previous
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                    const pageNum = Math.max(1, pagination.page - 2) + i
                    if (pageNum > pagination.totalPages) return null
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => fetchEvents(pageNum)}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          pageNum === pagination.page
                            ? 'bg-blue-600 text-white'
                            : 'border border-slate-300 hover:bg-slate-50'
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
                  className="flex items-center space-x-1 px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Stay Updated</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter to receive updates about upcoming events, workshops, and educational programs.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-slate-400 mt-3">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
