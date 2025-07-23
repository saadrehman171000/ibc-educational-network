"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const announcements = [
    {
      id: "1",
      title: "New Mathematics Series Launch",
      category: "New Release",
      status: "published",
      author: "Admin",
      publishDate: "2025-01-15",
      views: 1250,
    },
    {
      id: "2",
      title: "Educational Expo 2024",
      category: "Event",
      status: "published",
      author: "Events Team",
      publishDate: "2025-01-10",
      views: 890,
    },
    {
      id: "3",
      title: "Teacher Training Workshop",
      category: "Training",
      status: "draft",
      author: "Training Dept",
      publishDate: "2025-01-08",
      views: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "New Release":
        return "bg-blue-100 text-blue-800"
      case "Event":
        return "bg-purple-100 text-purple-800"
      case "Training":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600">Manage news and announcements</p>
        </div>
        <Link
          href="/admin/announcements/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Announcement</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Title</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Author</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Views</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <tr key={announcement.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                      <p className="text-sm text-gray-500">Published {announcement.publishDate}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(announcement.category)}`}
                    >
                      {announcement.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}
                    >
                      {announcement.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{announcement.author}</td>
                  <td className="py-4 px-6 text-gray-900">{announcement.views}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
