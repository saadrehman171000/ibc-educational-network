import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AnnouncementsPage() {
  const announcements = [
    {
      id: 1,
      title: "New Mathematics Series for Class 6-8 Now Available",
      date: "January 15, 2025",
      author: "IBC Editorial Team",
      category: "New Release",
      summary:
        "We're excited to announce the launch of our comprehensive Mathematics series for middle school students, featuring advanced problem-solving techniques and real-world applications.",
      content:
        "Our new Mathematics series for Class 6-8 represents a significant advancement in mathematical education. The series includes interactive problem-solving exercises, visual learning aids, and comprehensive assessment tools designed to build strong mathematical foundations.",
      featured: true,
    },
    {
      id: 2,
      title: "Educational Expo 2024 - Meet Us at Karachi Expo Center",
      date: "January 10, 2025",
      author: "Events Team",
      category: "Event",
      summary:
        "Join us at the largest educational exhibition in Pakistan from March 15-17, 2024. Discover our latest publications and meet our educational experts.",
      content:
        "IBC Educational Network will be participating in the Educational Expo 2024 at Karachi Expo Center. Visit our booth to explore our latest publications, attend live demonstrations, and meet with our educational consultants.",
      featured: false,
    },
    {
      id: 3,
      title: "Teacher Training Workshop Series Begins February 2025",
      date: "January 8, 2025",
      author: "Training Department",
      category: "Training",
      summary:
        "Professional development workshops for educators using IBC materials. Limited seats available - register now for early bird pricing.",
      content:
        "Our comprehensive teacher training program is designed to help educators maximize the effectiveness of IBC educational materials. The workshop covers pedagogical strategies, assessment techniques, and classroom management.",
      featured: false,
    },
    {
      id: 4,
      title: "Digital Learning Platform Beta Launch",
      date: "January 5, 2025",
      author: "Technology Team",
      category: "Technology",
      summary:
        "Experience the future of education with our new digital learning platform. Beta testing now open for select schools and educators.",
      content:
        "We're pioneering the integration of traditional textbooks with cutting-edge digital technology. Our new platform offers interactive exercises, progress tracking, and personalized learning paths.",
      featured: true,
    },
    {
      id: 5,
      title: "Partnership with Leading International Schools",
      date: "December 28, 2024",
      author: "Partnership Team",
      category: "Partnership",
      summary:
        "IBC Educational Network announces strategic partnerships with top international schools across the region to enhance educational standards.",
      content:
        "These partnerships will facilitate knowledge exchange, curriculum development, and best practice sharing to elevate educational standards across our partner institutions.",
      featured: false,
    },
    {
      id: 6,
      title: "Student Art Competition 2025 - Submissions Open",
      date: "December 25, 2024",
      author: "Community Team",
      category: "Competition",
      summary:
        "Calling all young artists! Submit your creative works for our annual student art competition with exciting prizes and recognition.",
      content:
        "Our annual art competition celebrates creativity and artistic expression among students. This year's theme is 'Learning Through Art' with categories for different age groups.",
      featured: false,
    },
  ]

  const categories = ["All", "New Release", "Event", "Training", "Technology", "Partnership", "Competition"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Latest News & Announcements</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Stay updated with the latest developments, new releases, and important updates from IBC Educational Network.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container-max">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All" ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Announcements */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Announcements</h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {announcements
              .filter((announcement) => announcement.featured)
              .map((announcement) => (
                <article key={announcement.id} className="bg-white rounded-xl card-shadow overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {announcement.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {announcement.date}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{announcement.title}</h3>

                    <p className="text-gray-700 leading-relaxed mb-6">{announcement.summary}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <User className="w-4 h-4 mr-1" />
                        {announcement.author}
                      </div>
                      <Link
                        href={`/announcements/${announcement.id}`}
                        className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                      >
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* All Announcements */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Announcements</h2>

          <div className="space-y-6">
            {announcements.map((announcement) => (
              <article key={announcement.id} className="bg-white rounded-xl p-6 card-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          announcement.category === "New Release"
                            ? "bg-green-100 text-green-800"
                            : announcement.category === "Event"
                              ? "bg-blue-100 text-blue-800"
                              : announcement.category === "Training"
                                ? "bg-purple-100 text-purple-800"
                                : announcement.category === "Technology"
                                  ? "bg-orange-100 text-orange-800"
                                  : announcement.category === "Partnership"
                                    ? "bg-teal-100 text-teal-800"
                                    : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        {announcement.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {announcement.date}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <User className="w-4 h-4 mr-1" />
                        {announcement.author}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{announcement.title}</h3>

                    <p className="text-gray-700 leading-relaxed">{announcement.summary}</p>
                  </div>

                  <div className="flex-shrink-0">
                    <Link href={`/announcements/${announcement.id}`} className="btn-primary inline-flex items-center">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-blue-900 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter to receive the latest announcements, new releases, and educational insights
            directly in your inbox.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-75 mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
