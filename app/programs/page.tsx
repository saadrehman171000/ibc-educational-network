"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Clock, Users, Star, ChevronRight } from "lucide-react"
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
        const processedUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
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
      return
    }
    
    // Try different Google Drive URL formats
    if (originalSrc.includes('drive.google.com')) {
      const driveRegex = /[?&]id=([a-zA-Z0-9_-]+)/
      const match = originalSrc.match(driveRegex)
      
      if (match) {
        const fileId = match[1]
        // Try thumbnail format
        if (!originalSrc.includes('thumbnail')) {
          target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
          return
        }
        // Try alternative format
        if (!originalSrc.includes('uc?export=download')) {
          target.src = `https://drive.google.com/uc?export=download&id=${fileId}`
          return
        }
      }
    }
    
    // Final fallback to placeholder
    target.src = '/placeholder-logo.png'
  }

  // Get unique categories from events
  const categories = [...new Set(events.map(event => event.category))].filter(Boolean)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'ongoing':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Educational Programs & Events</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join our educational programs, workshops, and events designed to enhance learning experiences
          </p>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Educational Workshops</h3>
              <p className="text-gray-600">
                Interactive learning sessions designed to enhance educational outcomes and teaching methodologies
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Teacher Training</h3>
              <p className="text-gray-600">
                Professional development programs for educators to improve teaching skills and classroom management
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Competitions</h3>
              <p className="text-gray-600">
                Academic competitions and events to encourage student participation and excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container-max">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">Filter by:</span>
            </div>
            
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setSelectedCategory("")
                setSelectedStatus("")
              }}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container-max">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No events found</p>
              <p className="text-gray-400 mt-2">Check back soon for upcoming programs and events!</p>
            </div>
          ) : (
            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video relative">
                      <Image
                        src={getImageUrl(event.image)}
                        alt={event.title}
                        fill
                        className="object-cover"
                        onError={handleImageError}
                        priority={false}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyydwTv5Zr7w2H3vhc3f/Z"
                      />
                      {event.featured && (
                        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="p-6">
                      {/* Event Meta */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">{event.category}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                      {/* Event Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {event.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                          {event.tags.length > 3 && (
                            <span className="text-gray-500 text-xs">+{event.tags.length - 3} more</span>
                          )}
                        </div>
                      )}

                      {/* Action Button */}
                      <Link 
                        href={`/programs/${event.id}`}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>Learn More</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-12">
                  <button
                    onClick={() => fetchEvents(pagination.page - 1)}
                    disabled={!pagination.hasPrev}
                    className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
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
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to Host an Event?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Partner with us to organize educational events and workshops for your community
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <span>Contact Us</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
