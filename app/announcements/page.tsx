"use client"

import { useState, useEffect } from "react"
import { Calendar, User, ArrowRight, Clock, Tag } from "lucide-react"
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
      'New Release': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Event': 'bg-blue-50 text-blue-700 border-blue-200',
      'Training': 'bg-violet-50 text-violet-700 border-violet-200',
      'Technology': 'bg-purple-50 text-purple-700 border-purple-200',
      'Partnership': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Competition': 'bg-rose-50 text-rose-700 border-rose-200',
      'Update': 'bg-slate-50 text-slate-700 border-slate-200',
    }
    return colors[category] || 'bg-slate-50 text-slate-700 border-slate-200'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-6 text-white">
            Latest News & Updates
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Stay informed about our newest releases, educational insights, and upcoming events from IBC Educational Network.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="container-max">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
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
            {/* Featured Announcements */}
            {featuredAnnouncements.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  <h2 className="text-2xl font-semibold text-slate-900">Featured Updates</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredAnnouncements.map((announcement) => (
                    <article key={announcement.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`${getCategoryColor(announcement.category)} px-3 py-1.5 rounded-full text-xs font-medium border`}>
                            {announcement.category}
                          </span>
                          <div className="flex items-center text-slate-500 text-sm">
                            <Clock className="w-4 h-4 mr-1.5" />
                            {formatDate(announcement.createdAt)}
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-tight">{announcement.title}</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">{announcement.summary}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center text-slate-500 text-sm">
                            <User className="w-4 h-4 mr-1.5" />
                            {announcement.author}
                          </div>
                          <Link
                            href={`/announcements/${announcement.id}`}
                            className="text-blue-600 hover:text-blue-700 font-medium flex items-center text-sm group"
                          >
                            Read More 
                            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
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
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full"></div>
                <h2 className="text-2xl font-semibold text-slate-900">All Announcements</h2>
              </div>
              
              {regularAnnouncements.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tag className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 text-lg">
                    {selectedCategory === "All" 
                      ? "No announcements available at the moment." 
                      : `No announcements found in the "${selectedCategory}" category.`
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {regularAnnouncements.map((announcement) => (
                    <article key={announcement.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getCategoryColor(announcement.category)}`}>
                              {announcement.category}
                            </span>
                            <div className="flex items-center text-slate-500 text-sm">
                              <Calendar className="w-4 h-4 mr-1.5" />
                              {formatDate(announcement.createdAt)}
                            </div>
                            <div className="flex items-center text-slate-500 text-sm">
                              <User className="w-4 h-4 mr-1.5" />
                              {announcement.author}
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-slate-900 mb-3 leading-tight">{announcement.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{announcement.summary}</p>
                        </div>

                        <Link
                          href={`/announcements/${announcement.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center text-sm whitespace-nowrap group"
                        >
                          Read More 
                          <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
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
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-white">Stay Connected</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter for the latest announcements, new releases, and educational insights delivered to your inbox.
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
