import React from "react"
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
                    src="/placeholder.svg?height=600&width=500&text=Students+learning+with+IBC+books"
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

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Educators Say</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Hear from teachers and students who have experienced the difference our educational materials make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "IBC books have transformed how my students engage with mathematics. The visual approach and step-by-step explanations make complex concepts accessible to all learners."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-800 font-bold">SA</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Ahmed</h4>
                  <p className="text-gray-600 text-sm">Mathematics Teacher, Karachi Grammar School</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-lg border border-teal-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "The English literature series has significantly improved my students' reading comprehension and critical thinking skills. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-teal-800 font-bold">MK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Maria Khan</h4>
                  <p className="text-gray-600 text-sm">English Teacher, Lahore American School</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg border border-orange-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "As a parent, I've seen remarkable improvement in my daughter's learning enthusiasm since we started using IBC books at home."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-orange-800 font-bold">AH</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ali Hassan</h4>
                  <p className="text-gray-600 text-sm">Parent, Islamabad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="section-padding bg-gradient-to-r from-blue-900 via-blue-800 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fillOpacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Impact in Numbers</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Measurable results that demonstrate our commitment to educational excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm border border-white border-opacity-20 group-hover:bg-opacity-20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">500+</div>
                <div className="text-blue-100 font-medium">Educational Books</div>
                <div className="text-blue-200 text-sm mt-1">Published & Distributed</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm border border-white border-opacity-20 group-hover:bg-opacity-20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">1000+</div>
                <div className="text-blue-100 font-medium">Partner Schools</div>
                <div className="text-blue-200 text-sm mt-1">Across Multiple Countries</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm border border-white border-opacity-20 group-hover:bg-opacity-20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">50K+</div>
                <div className="text-blue-100 font-medium">Active Students</div>
                <div className="text-blue-200 text-sm mt-1">Learning Daily</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm border border-white border-opacity-20 group-hover:bg-opacity-20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">95%</div>
                <div className="text-blue-100 font-medium">Success Rate</div>
                <div className="text-blue-200 text-sm mt-1">Student Achievement</div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center bg-white bg-opacity-10 rounded-full px-6 py-3 backdrop-blur-sm border border-white border-opacity-20">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-white font-medium">Award-Winning Educational Content Since 2010</span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Updates */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Stay informed about our newest releases, educational insights, and upcoming events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">New Release</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Advanced Mathematics Series for Class 8 Now Available
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Our latest mathematics curriculum features enhanced problem-solving techniques and real-world applications.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">January 15, 2025</span>
                  <Link href="/announcements" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white text-teal-600 px-3 py-1 rounded-full text-sm font-medium">Event</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  Educational Expo 2025 - Meet Us in Karachi
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Join us at Pakistan's largest educational exhibition from March 15-17, 2025 at Expo Center Karachi.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">January 10, 2025</span>
                  <Link href="/announcements" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium">Training</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  Teacher Training Workshop Series Begins
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Professional development workshops for educators. Limited seats available with early bird pricing.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">January 8, 2025</span>
                  <Link href="/announcements" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          </div>

          <div className="text-center mt-12">
            <Link href="/announcements" className="btn-primary">
              View All Announcements
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
