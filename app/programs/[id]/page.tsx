"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Phone, Globe, Tag } from "lucide-react"
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

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`)
        if (response.ok) {
          const eventData = await response.json()
          setEvent(eventData)
        } else {
          console.error('Event not found')
          router.push('/programs')
        }
      } catch (error) {
        console.error('Error fetching event:', error)
        router.push('/programs')
      } finally {
        setLoading(false)
      }
    }

    if (eventId) {
      fetchEvent()
    }
  }, [eventId, router])

  // Convert Google Drive URL to display URL with better handling
  const getImageUrl = (url?: string) => {
    if (!url) return '/placeholder-logo.png'
    
    // Handle Google Drive URLs
    const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)(?:\/view)?/
    const match = url.match(driveRegex)
    
    if (match) {
      const fileId = match[1]
      // Use direct download URL which is more reliable
      return `https://drive.google.com/uc?export=view&id=${fileId}`
    }
    
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
      day: 'numeric',
      weekday: 'long'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link href="/programs" className="text-blue-600 hover:text-blue-700">
            Back to Programs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max py-4">
          <Link 
            href="/programs"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Programs</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container-max py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Event Image */}
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(event.image)}
                alt={event.title}
                fill
                className="object-cover"
                onError={handleImageError}
              />
              {event.featured && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
                  Featured Event
                </span>
              )}
            </div>

            {/* Event Info */}
            <div className="space-y-6">
              {/* Status and Category */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
                <span className="text-sm text-gray-600">{event.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{event.title}</h1>

              {/* Description */}
              <p className="text-lg text-gray-600">{event.description}</p>

              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="font-medium">{formatDate(event.date)}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="font-medium">{event.time}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                  <div>
                    <span className="font-medium">{event.location}</span>
                    {event.address && (
                      <p className="text-sm text-gray-500">{event.address}</p>
                    )}
                  </div>
                </div>

                {event.organizer && (
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">Organized by {event.organizer}</span>
                  </div>
                )}

                {event.phone && (
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">{event.phone}</span>
                  </div>
                )}

                {event.website && (
                  <div className="flex items-center text-gray-700">
                    <Globe className="w-5 h-5 mr-3 text-blue-600" />
                    <a 
                      href={event.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              {/* Contact Button */}
              {event.contact && (
                <div className="pt-4">
                  <a
                    href={`mailto:${event.contact}`}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <span>Contact Organizer</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full Description */}
      {event.fullDescription && (
        <section className="py-12 bg-white">
          <div className="container-max">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Event</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.fullDescription}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <section className="py-8 bg-gray-50">
          <div className="container-max">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, index) => (
                <span key={index} className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirements */}
      {event.requirements && event.requirements.length > 0 && (
        <section className="py-8 bg-white">
          <div className="container-max">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
            <ul className="space-y-2">
              {event.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Agenda */}
      {event.agenda && event.agenda.length > 0 && (
        <section className="py-8 bg-gray-50">
          <div className="container-max">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Agenda</h3>
            <div className="space-y-4">
              {event.agenda.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 flex">
                  <div className="flex-shrink-0 w-20 text-sm font-medium text-blue-600">
                    {item.time}
                  </div>
                  <div className="text-gray-700">
                    {item.activity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {event.gallery && event.gallery.length > 0 && (
        <section className="py-8 bg-white">
          <div className="container-max">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Gallery</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.gallery.map((imageUrl, index) => (
                <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={getImageUrl(imageUrl)}
                    alt={`${event.title} gallery ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interested in This Event?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get in touch with us for more information or to register for this event
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {event.contact && (
              <a
                href={`mailto:${event.contact}`}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Contact Organizer
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium"
            >
              General Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 