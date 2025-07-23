"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, Search } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function CollectionsPage() {
  const [selectedGrade, setSelectedGrade] = useState("All")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const { addToCart } = useCart()

  const grades = [
    "All",
    "Beginner",
    "Step 1",
    "Step 2",
    "Step 3",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
  ]
  const subjects = ["All", "English", "Mathematics", "Science", "Social Studies", "Urdu", "Islamic Studies"]

  const books = [
    {
      id: "1",
      title: "English Language Arts - Foundation",
      grade: "Class 1",
      subject: "English",
      price: 450,
      image: "/placeholder.svg?height=300&width=200",
      description: "Comprehensive English learning with phonics, vocabulary, and basic grammar.",
      series: "Foundation Series",
      type: "Textbook",
    },
    {
      id: "2",
      title: "Mathematics Made Easy",
      grade: "Class 2",
      subject: "Mathematics",
      price: 520,
      image: "/placeholder.svg?height=300&width=200",
      description: "Interactive math concepts with visual learning and practical exercises.",
      series: "Made Easy Series",
      type: "Textbook",
    },
    {
      id: "3",
      title: "Science Explorer - Young Scientists",
      grade: "Class 3",
      subject: "Science",
      price: 480,
      image: "/placeholder.svg?height=300&width=200",
      description: "Discover science through hands-on experiments and real-world examples.",
      series: "Explorer Series",
      type: "Textbook",
    },
    {
      id: "4",
      title: "Social Studies Journey",
      grade: "Class 4",
      subject: "Social Studies",
      price: 460,
      image: "/placeholder.svg?height=300&width=200",
      description: "Explore cultures, geography, and history with interactive content.",
      series: "Journey Series",
      type: "Textbook",
    },
    {
      id: "5",
      title: "Advanced English Literature",
      grade: "Class 5",
      subject: "English",
      price: 580,
      image: "/placeholder.svg?height=300&width=200",
      description: "Develop reading comprehension and literary analysis skills.",
      series: "Advanced Series",
      type: "Textbook",
    },
    {
      id: "6",
      title: "Mathematics Problem Solving",
      grade: "Class 6",
      subject: "Mathematics",
      price: 620,
      image: "/placeholder.svg?height=300&width=200",
      description: "Advanced mathematical concepts with problem-solving strategies.",
      series: "Problem Solving Series",
      type: "Workbook",
    },
    {
      id: "7",
      title: "Integrated Science",
      grade: "Class 7",
      subject: "Science",
      price: 650,
      image: "/placeholder.svg?height=300&width=200",
      description: "Comprehensive science covering physics, chemistry, and biology.",
      series: "Integrated Series",
      type: "Textbook",
    },
    {
      id: "8",
      title: "World History & Geography",
      grade: "Class 8",
      subject: "Social Studies",
      price: 680,
      image: "/placeholder.svg?height=300&width=200",
      description: "Explore world civilizations and geographical concepts.",
      series: "World Series",
      type: "Textbook",
    },
    {
      id: "9",
      title: "Early Learning ABC",
      grade: "Beginner",
      subject: "English",
      price: 320,
      image: "/placeholder.svg?height=300&width=200",
      description: "Fun introduction to letters, sounds, and basic words.",
      series: "Early Learning Series",
      type: "Activity Book",
    },
    {
      id: "10",
      title: "Numbers and Counting",
      grade: "Step 1",
      subject: "Mathematics",
      price: 350,
      image: "/placeholder.svg?height=300&width=200",
      description: "Learn numbers, counting, and basic math concepts.",
      series: "Step by Step Series",
      type: "Activity Book",
    },
    {
      id: "11",
      title: "My First Science Book",
      grade: "Step 2",
      subject: "Science",
      price: 380,
      image: "/placeholder.svg?height=300&width=200",
      description: "Introduction to basic science concepts through fun activities.",
      series: "My First Series",
      type: "Activity Book",
    },
    {
      id: "12",
      title: "Community Helpers",
      grade: "Step 3",
      subject: "Social Studies",
      price: 400,
      image: "/placeholder.svg?height=300&width=200",
      description: "Learn about different jobs and community roles.",
      series: "Community Series",
      type: "Picture Book",
    },
  ]

  const filteredBooks = books.filter((book) => {
    const matchesGrade = selectedGrade === "All" || book.grade === selectedGrade
    const matchesSubject = selectedSubject === "All" || book.subject === selectedSubject
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesGrade && matchesSubject && matchesSearch
  })

  const handleAddToCart = (book: (typeof books)[0]) => {
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
      <section className="bg-blue-900 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Collections</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover our comprehensive range of educational materials designed to support learning from Beginner to
            Class 8.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Filters:</span>
              </div>

              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredBooks.length} of {books.length} books
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl card-shadow overflow-hidden group">
                <div className="relative overflow-hidden">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {book.grade}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">{book.type}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">{book.series}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{book.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-900">Rs. {book.price}</span>
                    <span className="text-sm text-gray-500">{book.subject}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/collections/${book.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
                    >
                      Read More
                    </Link>
                    <button onClick={() => handleAddToCart(book)} className="flex-1 btn-primary text-sm py-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No books found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
