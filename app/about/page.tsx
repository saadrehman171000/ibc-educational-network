import Image from "next/image"
import { Target, Eye, Heart, Users, Award, Globe } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence in Education",
      description: "We strive for the highest standards in educational content creation and delivery.",
    },
    {
      icon: Heart,
      title: "Student-Centered Approach",
      description: "Every decision we make is guided by what's best for student learning and development.",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "We believe in the power of collaboration between educators, students, and families.",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "Our content reflects diverse perspectives and prepares students for a global world.",
    },
  ]

  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      description: "IBC Educational Network was established with a vision to transform educational publishing.",
    },
    {
      year: "2013",
      title: "First Major Publication",
      description: "Released our first comprehensive series for primary education, setting new industry standards.",
    },
    {
      year: "2016",
      title: "Digital Integration",
      description: "Pioneered interactive digital content integration with traditional textbooks.",
    },
    {
      year: "2019",
      title: "International Expansion",
      description: "Extended our reach to schools across South Asia and the Middle East.",
    },
    {
      year: "2022",
      title: "Innovation Award",
      description: "Received the National Education Innovation Award for outstanding contribution to learning.",
    },
    {
      year: "2024",
      title: "50,000 Students",
      description: "Reached the milestone of serving over 50,000 students across 1,000+ schools.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">About IBC Educational Network</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Transforming education through innovative content and unwavering commitment to academic excellence since
            2010.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                IBC Educational Network began with a simple yet powerful vision: to create educational materials that
                truly engage students and support teachers in delivering exceptional learning experiences. Founded in
                Karachi, Pakistan, we have grown from a small publishing house to a trusted name in educational content
                across the region.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our journey has been marked by continuous innovation, deep collaboration with educators, and an
                unwavering commitment to quality. Today, we serve thousands of schools and tens of thousands of
                students, but our core mission remains unchanged: to make learning engaging, effective, and accessible
                for all.
              </p>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">14+</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">500+</div>
                  <div className="text-gray-600">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">1000+</div>
                  <div className="text-gray-600">Partner Schools</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="IBC Educational Network Office"
                width={600}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 card-shadow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-8 h-8 text-blue-900" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To create innovative, engaging, and academically rigorous educational content that empowers students to
                achieve their full potential while supporting educators in delivering exceptional learning experiences.
                We are committed to making quality education accessible and effective for learners at every stage of
                their academic journey.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 card-shadow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-8 h-8 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the leading educational publisher in the region, recognized for our commitment to academic
                excellence, innovation in learning design, and positive impact on student outcomes. We envision a future
                where every student has access to world-class educational materials that inspire curiosity, critical
                thinking, and lifelong learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to educational excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-900 transition-colors duration-300">
                  <value.icon className="w-10 h-10 text-blue-900 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Key milestones that have shaped IBC Educational Network into the trusted publisher we are today.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="bg-white rounded-xl p-6 card-shadow">
                      <div className="text-2xl font-bold text-blue-900 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-900 rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expert Team</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Dedicated professionals with decades of combined experience in education, publishing, and content
              development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Educational Director"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Educational Directors</h3>
              <p className="text-gray-600 mb-4">Ph.D. in Education</p>
              <p className="text-gray-700 leading-relaxed">
                Leading curriculum development and ensuring academic rigor across all our publications.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Content Development Team"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Content Specialists</h3>
              <p className="text-gray-600 mb-4">Subject Matter Experts</p>
              <p className="text-gray-700 leading-relaxed">
                Creating engaging, accurate, and pedagogically sound content across all subject areas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Design Team"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Design & Technology</h3>
              <p className="text-gray-600 mb-4">Creative Professionals</p>
              <p className="text-gray-700 leading-relaxed">
                Bringing content to life through innovative design and cutting-edge educational technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="section-padding bg-blue-900 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Awards & Recognition</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Our commitment to excellence has been recognized by educational institutions and industry organizations.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">National Education Innovation Award</h3>
              <p className="text-blue-100">2022 - Outstanding contribution to educational innovation</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Best Educational Publisher</h3>
              <p className="text-blue-100">2021 - Regional recognition for quality content</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Excellence in Design</h3>
              <p className="text-blue-100">2020 - Outstanding visual design in educational materials</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
