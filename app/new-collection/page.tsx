"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge, Calendar, ArrowRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function NewCollectionPage() {
  const { addToCart } = useCart()

  const newBooks = [
    {
      id: "new-1",
      title: "Advanced Mathematics for Class 8",
      grade: "Class 8",
      subject: "Mathematics",
      price: 750,
      image: "/placeholder.svg?height=300&width=200",
      description:
        "Comprehensive mathematics curriculum with advanced problem-solving techniques and real-world applications.",
      releaseDate: "January 2025",
      series: "Advanced Learning Series",
      isNew: true,
      features: ["Interactive Exercises", "Step-by-step Solutions", "Practice Tests", "Digital Resources"],
    },
    {
      id: "new-2",
      title: "English Literature Anthology - Class 7",
      grade: "Class 7",
      subject: "English",
      price: 680,
      image: "/placeholder.svg?height=300&width=200",
      description:
        "Curated collection of classic and contemporary literature with comprehensive analysis and activities.",
      releaseDate: "January 2025",
      series: "Literature Masters Series",
      isNew: true,
      features: ["Classic Stories", "Poetry Collection", "Literary Analysis", "Creative Writing"],
    },
    {
      id: "new-3",
      title: "Integrated Science Explorer - Class 6",
      grade: "Class 6",
      subject: "Science",
      price: 720,
      image: "/placeholder.svg?height=300&width=200",
      description:
        "Comprehensive science education covering physics, chemistry, and biology with hands-on experiments.",
      releaseDate: "December 2024",
      series: "Science Explorer Series",
      isNew: true,
      features: ["Lab Experiments", "Visual Learning", "STEM Activities", "Assessment Tools"],
    },
    {
      id: "new-4",
      title: "World Geography & Cultures - Class 5",
      grade: "Class 5",
      subject: "Social Studies",
      price: 620,
      image: "/placeholder.svg?height=300&width=200",
      description:
        "Explore world geography, cultures, and civilizations through interactive maps and engaging content.",
      releaseDate: "December 2024",
      series: "Global Perspectives Series",
      isNew: true,
      features: ["Interactive Maps", "Cultural Studies", "Historical Timeline", "Project Ideas"],
    },
    {
      id: "new-5",
      title: "Creative Writing Workshop - Class 4",
      grade: "Class 4",
      subject: "English",
      price: 580,
      image: "/placeholder.svg?height=300&width=200",
      description:
        "Develop writing skills through structured exercises, creative prompts, and storytelling techniques.",
      releaseDate: "November 2024",
      series: "Creative Learning Series",
      isNew: true,
      features: ["Writing Prompts", "Grammar Exercises", "Story Templates", "Peer Review"],
    },
    {
      id: "new-6",
      title: "Mathematical Reasoning - Class 3",
      grade: "Class 3",
      subject: "Mathematics",
      price: 520,
      image: "/placeholder.svg?height=300&width=200",
      description: "Build logical thinking and problem-solving skills through engaging mathematical challenges.",
      releaseDate: "November 2024",
      series: "Reasoning Skills Series",
      isNew: true,
      features: ["Logic Puzzles", "Problem Solving", "Mental Math", "Visual Learning"],
    },
    {
      id: "new-7",
      title: "Early Science Discoveries - Step 3",
      grade: "Step 3",
      subject: "Science",
      price: 450,
      image: "/placeholder.svg?height=300&width=200",
      description: "Introduction to basic science concepts through fun experiments and colorful illustrations.",
      releaseDate: "October 2024",
      series: "Discovery Series",
      isNew: true,
      features: ["Simple Experiments", "Colorful Illustrations", "Fun Activities", "Safety Guidelines"],
    },
    {
      id: "new-8",
      title: "Phonics & Reading - Step 2",
      grade: "Step 2",
      subject: "English",
      price: 420,
      image: "/placeholder.svg?height=300&width=200",
      description: "Systematic phonics instruction with engaging stories and reading comprehension activities.",
      releaseDate: "October 2024",
      series: "Reading Foundation Series",
      isNew: true,
      features: ["Phonics Lessons", "Reading Practice", "Comprehension", "Audio Support"],
    },
  ]

  const handleAddToCart = (book: (typeof newBooks)[0]) => {
    addToCart({
      id: book.id,
      title: book.title,
      grade: book.grade,
      price: book.price,
      image: book.image,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-teal-600 text-white section-padding">
        <div className="container-max text-center">
          <div className="flex items-center justify-center mb-4">
            <Badge className="w-8 h-8 mr-3 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">New Collection 2025</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover our latest educational materials featuring cutting-edge content, innovative design, and enhanced
            learning experiences.
          </p>
        </div>
      </section>

      {/* Featured New Release */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 lg:p-12 mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    JUST RELEASED
                  </span>
                  <span className="text-orange-600 font-medium">January 2025</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Advanced Mathematics for Class 8</h2>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Our most comprehensive mathematics curriculum yet, featuring advanced problem-solving techniques,
                  real-world applications, and interactive digital resources to prepare students for higher mathematics.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">Interactive Exercises</h3>
                    <p className="text-sm text-gray-600">Engaging problem-solving activities</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">Digital Resources</h3>
                    <p className="text-sm text-gray-600">Online tools and practice tests</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-blue-900">Rs. 750</span>
                  <button onClick={() => handleAddToCart(newBooks[0])} className="btn-primary">
                    Add to Cart
                  </button>
                  <Link href={`/collections/${newBooks[0].id}`} className="btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src={newBooks[0].image || "/placeholder.svg"}
                    alt={newBooks[0].title}
                    width={400}
                    height={500}
                    className="rounded-xl shadow-2xl mx-auto"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-full h-full bg-orange-200 rounded-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Releases Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Releases</h2>
            <p className="text-xl text-gray-700">
              Fresh content designed with the latest educational insights and methodologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {newBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl card-shadow overflow-hidden group">
                <div className="relative overflow-hidden">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">NEW</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {book.grade}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{book.releaseDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{book.series}</p>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{book.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {book.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {book.features.length > 2 && (
                        <span className="text-xs text-gray-500">+{book.features.length - 2} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-900">Rs. {book.price}</span>
                    <span className="text-sm text-gray-500">{book.subject}</span>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleAddToCart(book)} className="flex-1 btn-primary text-sm py-2">
                      Add to Cart
                    </button>
                    <Link
                      href={`/collections/${book.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors text-sm"
                    >
                      View Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's New Features */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's New in 2025</h2>
            <p className="text-xl text-gray-700">Enhanced features and improvements in our latest collection</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Badge className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enhanced Digital Integration</h3>
              <p className="text-gray-700 leading-relaxed">
                QR codes linking to interactive online resources, video explanations, and digital assessments.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Progressive Learning Paths</h3>
              <p className="text-gray-700 leading-relaxed">
                Carefully structured content that builds upon previous knowledge with clear learning progressions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Updated Curriculum Alignment</h3>
              <p className="text-gray-700 leading-relaxed">
                Fully aligned with the latest national and international curriculum standards and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-order Section */}
      <section className="section-padding bg-blue-900 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Coming Soon</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Be the first to get our upcoming releases. Pre-order now and receive exclusive early access and special
            pricing.
          </p>

          <div className="bg-white bg-opacity-10 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Advanced Physics for Class 9</h3>
            <p className="opacity-90 mb-6">
              Comprehensive physics curriculum with laboratory experiments and real-world applications. Expected
              release: March 2025
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Pre-order Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
