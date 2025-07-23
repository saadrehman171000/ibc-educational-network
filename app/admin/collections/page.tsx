"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"

export default function CollectionsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const collections = [
    {
      id: "1",
      title: "Mathematics Foundation Series",
      description: "Comprehensive mathematics curriculum for primary grades",
      grade: "Class 1-5",
      books: 12,
      status: "active",
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      title: "English Literature Collection",
      description: "Classic and contemporary literature for middle school",
      grade: "Class 6-8",
      books: 8,
      status: "active",
      createdAt: "2025-01-10",
    },
    {
      id: "3",
      title: "Science Explorer Series",
      description: "Interactive science learning materials",
      grade: "Class 3-6",
      books: 15,
      status: "draft",
      createdAt: "2025-01-08",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collections</h1>
          <p className="text-gray-600">Manage your educational collections</p>
        </div>
        <Link
          href="/admin/collections/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Collection</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(collection.status)}`}>
                {collection.status}
              </span>
              <div className="flex items-center space-x-1">
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
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{collection.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{collection.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Grade:</span>
                <span className="text-gray-900">{collection.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Books:</span>
                <span className="text-gray-900">{collection.books}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Created:</span>
                <span className="text-gray-900">{collection.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
