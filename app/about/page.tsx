import Image from "next/image"
import { Target, Eye, Heart, Users, Award, Globe, Calendar, BookOpen, Star } from "lucide-react"

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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About IBC Educational Network</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Transforming education through innovative content and unwavering commitment to academic excellence since 2010.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                <h2 className="text-3xl font-semibold text-slate-900">Our Story</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                IBC Educational Network began with a simple yet powerful vision: to create educational materials that
                truly engage students and support teachers in delivering exceptional learning experiences. Founded in
                Karachi, Pakistan, we have grown from a small publishing house to a trusted name in educational content
                across the region.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our journey has been marked by continuous innovation, deep collaboration with educators, and an
                unwavering commitment to quality. Today, we serve thousands of schools and tens of thousands of
                students, but our core mission remains unchanged: to make learning engaging, effective, and accessible
                for all.
              </p>
              <div className="flex items-center space-x-8 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">14+</div>
                  <div className="text-slate-600 text-sm">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">500+</div>
                  <div className="text-slate-600 text-sm">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">50K+</div>
                  <div className="text-slate-600 text-sm">Students Served</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/about.png"
                alt="IBC Educational Network Story"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-slate-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full"></div>
              <h2 className="text-3xl font-semibold text-slate-900">Our Values</h2>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The principles that guide our work and shape our commitment to educational excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              <h2 className="text-3xl font-semibold text-slate-900">Our Journey</h2>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Key milestones that mark our growth and commitment to educational innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {milestone.year}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{milestone.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-slate-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full"></div>
              <h2 className="text-3xl font-semibold text-slate-900">Our Team</h2>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Meet the dedicated professionals behind our educational content and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Content Team</h3>
              <p className="text-slate-600">Expert educators and subject matter specialists who create our curriculum-aligned content.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Quality Assurance</h3>
              <p className="text-slate-600">Rigorous review processes ensure accuracy, relevance, and educational effectiveness.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Global Reach</h3>
              <p className="text-slate-600">International partnerships and distribution networks serving schools worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Join Our Mission</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Partner with us to transform education and inspire the next generation of learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact Us
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
