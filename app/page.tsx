import Image from "next/image"
import Link from "next/link"
import { BookOpen, Users, Award, Target, ArrowRight, Star, CheckCircle } from "lucide-react"

export default function HomePage() {
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

  const collections = [
    {
      id: 1,
      title: "English Language Arts",
      grade: "Class 1-3",
      image: "/placeholder.svg?height=300&width=200",
      description: "Comprehensive English learning with interactive exercises and engaging stories.",
    },
    {
      id: 2,
      title: "Mathematics Fundamentals",
      grade: "Class 4-6",
      image: "/placeholder.svg?height=300&width=200",
      description: "Build strong mathematical foundations with visual learning and practical applications.",
    },
    {
      id: 3,
      title: "Science Explorer",
      grade: "Class 5-8",
      image: "/placeholder.svg?height=300&width=200",
      description: "Discover the wonders of science through hands-on experiments and real-world examples.",
    },
    {
      id: 4,
      title: "Social Studies Journey",
      grade: "Class 3-5",
      image: "/placeholder.svg?height=300&width=200",
      description: "Explore cultures, geography, and history with interactive maps and engaging content.",
    },
    {
      id: 5,
      title: "Creative Writing Workshop",
      grade: "Step 2-3",
      image: "/placeholder.svg?height=300&width=200",
      description: "Develop writing skills through structured exercises and creative prompts.",
    },
    {
      id: 6,
      title: "Early Learning Basics",
      grade: "Beginner",
      image: "/placeholder.svg?height=300&width=200",
      description: "Foundation skills for young learners with colorful illustrations and activities.",
    },
  ]

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
                src="/placeholder.svg?height=400&width=500"
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

      {/* Featured Collections Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Collections</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover our most popular educational series, carefully crafted to support learning at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((book) => (
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
                    <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {book.grade}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{book.description}</p>
                  <Link
                    href={`/collections/${book.id}`}
                    className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/collections" className="btn-primary">
              View All Collections
            </Link>
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

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl card-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Early Years Program</h3>
              <p className="text-gray-700 mb-4">Beginner to Step 3</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Foundation skills development with interactive activities, colorful illustrations, and age-appropriate
                content designed to spark curiosity and love for learning.
              </p>
              <Link
                href="/programs#early-years"
                className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
              >
                Learn More →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl card-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Primary Program</h3>
              <p className="text-gray-700 mb-4">Class 1 to Class 5</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Comprehensive curriculum coverage with engaging content, practical exercises, and assessment tools to
                build strong academic foundations across all subjects.
              </p>
              <Link
                href="/programs#primary"
                className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
              >
                Learn More →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl card-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Middle School Program</h3>
              <p className="text-gray-700 mb-4">Class 6 to Class 8</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Advanced learning materials with critical thinking exercises, research projects, and exam preparation to
                prepare students for higher academic challenges.
              </p>
              <Link
                href="/programs#middle-school"
                className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
              >
                Learn More →
              </Link>
            </div>
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
