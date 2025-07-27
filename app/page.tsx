"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Users, Award, Target, ArrowRight, Star, CheckCircle, Globe, Clock, TrendingUp, Shield, Zap, Sparkles, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  title: string
  description: string
  price: number
  discount?: number
  imageUrl?: string
  category: string
  subject?: string
  series: string
  type?: string
  isNewCollection: boolean
  isFeatured: boolean
  rating?: number
  reviews?: number
}

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
}

export default function HomePage() {
  const [newCollections, setNewCollections] = useState<Product[]>([])
  const [programs, setPrograms] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({})
  const { addToCart } = useCart()

  // Fetch new collections from API
  const fetchNewCollections = async () => {
    try {
      const response = await fetch('/api/products?newCollection=true&limit=3')
      const data = await response.json()
      setNewCollections(data.products || [])
    } catch (error) {
      console.error('Error fetching new collections:', error)
    }
  }

  // Fetch programs/events from API
  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/events?featured=true&limit=3')
      const data = await response.json()
      setPrograms(data.events || [])
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNewCollections()
    fetchPrograms()
  }, [])

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

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      grade: product.category,
      price: product.price,
      image: product.imageUrl || '',
    })
    
    // Show green tick feedback
    setAddedToCart(prev => ({ ...prev, [product.id]: true }))
    
    // Reset after 3 seconds for better visibility
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }))
    }, 3000)
  }

  const features = [
    {
      icon: BookOpen,
      title: "Curriculum-Aligned Learning",
      description: "Content perfectly aligned with national and international curricula for seamless integration.",
    },
    {
      icon: Target,
      title: "Progressive Academic Structure",
      description: "Systematic progression from Beginner to Class 8 with carefully designed learning pathways.",
    },
    {
      icon: Users,
      title: "Trusted by Educators",
      description: "Used by thousands of schools and educators worldwide for proven academic results.",
    },
    {
      icon: Award,
      title: "Designed for Real Outcomes",
      description: "Evidence-based content design focused on measurable learning outcomes and student success.",
    },
  ]

  const achievements = [
    {
      number: "500+",
      label: "Educational Books",
      description: "Published & Distributed",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      number: "1000+",
      label: "Partner Schools",
      description: "Across Multiple Countries",
      icon: Globe,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      number: "50K+",
      label: "Active Students",
      description: "Learning Daily",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      number: "95%",
      label: "Success Rate",
      description: "Student Achievement",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Mathematics Teacher",
      school: "Karachi Grammar School",
      content: "IBC books have transformed how my students engage with mathematics. The visual approach and step-by-step explanations make complex concepts accessible to all learners.",
      rating: 5,
      avatar: "SA",
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Maria Khan",
      role: "English Teacher",
      school: "Lahore American School",
      content: "The English literature series has significantly improved my students' reading comprehension and critical thinking skills. Highly recommended!",
      rating: 5,
      avatar: "MK",
      color: "bg-teal-100 text-teal-800",
    },
    {
      name: "Ali Hassan",
      role: "Parent",
      school: "Islamabad",
      content: "As a parent, I've seen remarkable improvement in my daughter's learning enthusiasm since we started using IBC books at home.",
      rating: 5,
      avatar: "AH",
      color: "bg-orange-100 text-orange-800",
    },
  ]

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'upcoming': 'bg-green-100 text-green-700 border-green-200',
      'ongoing': 'bg-blue-100 text-blue-700 border-blue-200',
      'completed': 'bg-slate-100 text-slate-700 border-slate-200',
      'cancelled': 'bg-red-100 text-red-700 border-red-200',
    }
    return colors[status] || 'bg-slate-100 text-slate-700 border-slate-200'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 min-h-screen flex items-center pt-32 md:pt-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-100 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-orange-100 rounded-full opacity-10"></div>
        </div>

        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mt-4 md:mt-0">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                  Trusted by 1000+ Schools Worldwide
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Interactive Books for a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-600">
                    Brighter Future
                  </span>
                </h1>

                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Curriculum-aligned content from Beginner to Class 8, designed for academic growth and real learning
                  outcomes that inspire students to achieve excellence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/collections" className="btn-primary inline-flex items-center justify-center group">
                  Explore Our Collections
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/programs" className="btn-secondary inline-flex items-center justify-center">
                  View Programs
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">500+</div>
                  <div className="text-gray-600 text-sm">Books Published</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">1000+</div>
                  <div className="text-gray-600 text-sm">Schools Trust Us</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">50K+</div>
                  <div className="text-gray-600 text-sm">Students Learning</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/hero.png"
                    alt="Students learning with IBC Educational books"
                    width={500}
                    height={600}
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-200 to-teal-200 rounded-2xl -z-10 transform -rotate-3"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-tr from-orange-200 to-yellow-200 rounded-2xl -z-20 transform rotate-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About IBC Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/hero-2.png"
                alt="IBC Educational Network"
                width={500}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About IBC Educational Network</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  For over a decade, IBC Educational Network has been at the forefront of educational publishing,
                  creating interactive and engaging content that transforms the learning experience for students
                  worldwide.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Global Standards</h3>
                    <p className="text-gray-700">
                      Content aligned with international educational standards and best practices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Authors</h3>
                    <p className="text-gray-700">Created by experienced educators and subject matter experts.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Proven Results</h3>
                    <p className="text-gray-700">Trusted by educators worldwide for improved student outcomes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose IBC Educational Network?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We combine educational expertise with innovative design to create learning materials that inspire and
              engage students at every level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl card-shadow group">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-900 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-blue-900 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Collections Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Collections</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover our newest educational series designed to meet the evolving needs of modern learners.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : newCollections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {newCollections.map((product) => (
                <Link
                  key={product.id}
                  href={`/collections/${product.id}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow block relative"
                >
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
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                        className={`text-sm px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                          addedToCart[product.id] 
                            ? 'bg-green-500 text-white shadow-lg transform scale-105' 
                            : 'btn-primary'
                        }`}
                      >
                        {addedToCart[product.id] ? (
                          <>
                            <Check className="w-5 h-5 mr-2 animate-pulse" />
                            Added to Cart
                          </>
                        ) : (
                          'Add to Cart'
                        )}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No new collections available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/collections" className="btn-primary">
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-gradient-to-r from-blue-900 via-blue-800 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Impact in Numbers</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Measurable results that demonstrate our commitment to educational excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm border border-white border-opacity-20 group-hover:bg-opacity-20 transition-all duration-300">
                  <div className={`w-16 h-16 ${achievement.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{achievement.number}</div>
                  <div className="text-blue-100 font-medium">{achievement.label}</div>
                  <div className="text-blue-200 text-sm mt-1">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center bg-white bg-opacity-10 rounded-full px-6 py-3 backdrop-blur-sm border border-white border-opacity-20">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-white font-medium">Award-Winning Educational Content Since 2010</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Educators Say</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Hear from teachers and parents who have experienced the difference our educational materials make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center mr-4`}>
                    <span className="font-bold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}, {testimonial.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Educational Programs</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Structured learning pathways designed to support academic growth from early years through middle school.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : programs.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {programs.map((program) => (
                <div key={program.id} className="bg-white p-8 rounded-xl card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(program.status)}`}>
                      {program.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{program.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{program.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatDate(program.date)} at {program.time}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Globe className="w-4 h-4 mr-2" />
                      {program.location}
                    </div>
                  </div>
                  
                  <Link
                    href={`/programs/${program.id}`}
                    className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No programs available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/programs" className="btn-primary">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-800"></div>
        <div className="container-max text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Transform Your Educational Experience?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Join thousands of educators worldwide who trust IBC Educational Network for quality learning materials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Collections
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
