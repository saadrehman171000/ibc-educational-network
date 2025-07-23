import Image from "next/image"
import Link from "next/link"
import { Star, BookOpen, Award, Users, Calendar, MapPin } from "lucide-react"

export default function ProgramsPage() {
  const events = [
    {
      title: "Educational Expo 2024",
      date: "March 15-17, 2024",
      location: "Expo Center Karachi",
      description: "Join us at Pakistan's largest educational exhibition.",
    },
    {
      title: "Teacher Training Workshop",
      date: "April 20, 2024",
      location: "IBC Head Office",
      description: "Professional development workshop for educators.",
    },
    {
      title: "Student Competition",
      date: "May 10, 2024",
      location: "Various Schools",
      description: "Inter-school academic competition for all grades.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Educational Programs</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive learning pathways designed to support academic excellence from early years through middle
            school.
          </p>
        </div>
      </section>

      {/* Early Years Program */}
      <section id="early-years" className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Star className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Early Years Program</h2>
                  <p className="text-lg text-gray-600">Beginner to Step 3</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Our Early Years Program is designed to build strong foundations for lifelong learning. Through
                interactive activities, colorful illustrations, and age-appropriate content, we spark curiosity and
                foster a love for learning in young minds.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Foundation Skills Development</h3>
                    <p className="text-gray-700">
                      Basic literacy, numeracy, and cognitive skills through play-based learning.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Interactive Learning</h3>
                    <p className="text-gray-700">
                      Hands-on activities and multimedia content to engage young learners.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Social-Emotional Learning</h3>
                    <p className="text-gray-700">Building confidence, cooperation, and emotional intelligence.</p>
                  </div>
                </div>
              </div>

              <Link href="/collections?grade=early-years" className="btn-primary inline-flex items-center">
                Explore Early Years Books
              </Link>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Early Years Learning"
                width={600}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Primary Program */}
      <section id="primary" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Primary Education"
                width={600}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-blue-900" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Primary Program</h2>
                  <p className="text-lg text-gray-600">Class 1 to Class 5</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Our Primary Program provides comprehensive curriculum coverage with engaging content, practical
                exercises, and assessment tools. We focus on building strong academic foundations across all subjects
                while maintaining student engagement and motivation.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Comprehensive Curriculum</h3>
                    <p className="text-gray-700">
                      Complete coverage of English, Mathematics, Science, and Social Studies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Skill-Based Learning</h3>
                    <p className="text-gray-700">Focus on critical thinking, problem-solving, and analytical skills.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Assessment Integration</h3>
                    <p className="text-gray-700">
                      Regular assessments and progress tracking for optimal learning outcomes.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/collections?grade=primary" className="btn-primary inline-flex items-center">
                Explore Primary Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Middle School Program */}
      <section id="middle-school" className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Award className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Middle School Program</h2>
                  <p className="text-lg text-gray-600">Class 6 to Class 8</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Our Middle School Program features advanced learning materials with critical thinking exercises,
                research projects, and comprehensive exam preparation. We prepare students for higher academic
                challenges while building independence and analytical skills.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Advanced Content</h3>
                    <p className="text-gray-700">
                      In-depth subject matter with real-world applications and case studies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Research & Projects</h3>
                    <p className="text-gray-700">
                      Independent research projects and collaborative learning experiences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Exam Preparation</h3>
                    <p className="text-gray-700">
                      Comprehensive preparation for board exams and competitive assessments.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/collections?grade=middle-school" className="btn-primary inline-flex items-center">
                Explore Middle School Books
              </Link>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Middle School Learning"
                width={600}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Statistics */}
      <section className="section-padding bg-blue-900 text-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Program Impact</h2>
            <p className="text-xl text-blue-100">Measurable results across all our educational programs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="opacity-90">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="opacity-90">Books Published</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="opacity-90">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">1,000+</div>
              <div className="opacity-90">Partner Schools</div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-700">Join us at educational events and workshops throughout the year</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white rounded-xl p-6 card-shadow">
                <div className="flex items-start space-x-3 mb-4">
                  <Calendar className="w-6 h-6 text-blue-900 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-blue-900 font-medium">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{event.location}</span>
                </div>

                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Choose the program that best fits your educational needs and start your journey with IBC Educational
            Network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections" className="btn-primary">
              Browse All Collections
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
