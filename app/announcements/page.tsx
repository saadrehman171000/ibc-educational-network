"use client"

import { useState, useEffect } from "react"
import { Calendar, User, ArrowRight } from "lucide-react"
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

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Fetch announcements from API
  const fetchAnnouncements = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/announcements')
      const data = await response.json()
      
      console.log('Announcements API Response:', data) // Debug log
      setAnnouncements(data.announcements || [])
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  // Get unique categories from announcements
  const categories = ["All", ...Array.from(new Set(announcements.map(a => a.category)))]

  // Filter announcements based on selected category
  const filteredAnnouncements = selectedCategory === "All" 
    ? announcements 
    : announcements.filter(a => a.category === selectedCategory)

  // Separate featured and regular announcements
  const featuredAnnouncements = filteredAnnouncements.filter(a => a.isFeatured)
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.isFeatured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Latest News & Announcements</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Stay updated with the latest developments, new releases, and important updates from IBC Educational Network.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container-max">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="section-padding">
          <div className="container-max">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      {!loading && (
        <section className="section-padding">
          <div className="container-max">
            {/* Featured Announcements */}
            {featuredAnnouncements.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Announcements</h2>
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  {featuredAnnouncements.map((announcement) => (
                    <article key={announcement.id} className="bg-white rounded-xl card-shadow overflow-hidden">
                      <div className="p-8">
                        <div className="flex items-center space-x-4 mb-4">
                          <span className={`${getCategoryColor(announcement.category)} px-3 py-1 rounded-full text-sm font-medium`}>
                            {announcement.category}
                          </span>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(announcement.createdAt)}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3">{announcement.title}</h3>
                        <p className="text-gray-600 mb-4">{announcement.summary}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500 text-sm">
                            <User className="w-4 h-4 mr-1" />
                            {announcement.author}
                          </div>
                          <Link
                            href={`/announcements/${announcement.id}`}
                            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                          >
                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* All Announcements */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">All Announcements</h2>
              
              {regularAnnouncements.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {selectedCategory === "All" 
                      ? "No announcements found." 
                      : `No announcements found in the "${selectedCategory}" category.`
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {regularAnnouncements.map((announcement) => (
                    <article key={announcement.id} className="bg-white rounded-xl p-6 card-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(announcement.category)}`}
                            >
                              {announcement.category}
                            </span>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(announcement.createdAt)}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <User className="w-4 h-4 mr-1" />
                              {announcement.author}
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                          <p className="text-gray-600">{announcement.summary}</p>
                        </div>

                        <Link
                          href={`/announcements/${announcement.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center whitespace-nowrap"
                        >
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="section-padding bg-blue-900 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter to receive the latest announcements, new releases, and educational insights
            directly in your inbox.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-75 mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
