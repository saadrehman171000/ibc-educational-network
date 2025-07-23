"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const products = [
    {
      id: "1",
      title: "Mathematics Foundation - Class 1",
      category: "Mathematics",
      grade: "Class 1",
      price: 450,
      stock: 25,
      status: "active",
      image: "/placeholder.svg?height=100&width=80",
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      title: "English Literature - Class 5",
      category: "English",
      grade: "Class 5",
      price: 580,
      stock: 12,
      status: "active",
      image: "/placeholder.svg?height=100&width=80",
      createdAt: "2025-01-14",
    },
    {
      id: "3",
      title: "Science Explorer - Class 3",
      category: "Science",
      grade: "Class 3",
      price: 520,
      stock: 8,
      status: "low_stock",
      image: "/placeholder.svg?height=100&width=80",
      createdAt: "2025-01-13",
    },
    {
      id: "4",
      title: "Social Studies Journey - Class 4",
      category: "Social Studies",
      grade: "Class 4",
      price: 490,
      stock: 0,
      status: "out_of_stock",
      image: "/placeholder.svg?height=100&width=80",
      createdAt: "2025-01-12",
    },
  ]

  const categories = ["All", "Mathematics", "English", "Science", "Social Studies", "Urdu", "Islamic Studies"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "low_stock":
        return "bg-yellow-100 text-yellow-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "low_stock":
        return "Low Stock"
      case "out_of_stock":
        return "Out of Stock"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your educational materials and books</p>
        </div>
        <Link
          href="/admin/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Product</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Grade</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Price</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Stock</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-12 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="rounded object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{product.title}</h3>
                        <p className="text-sm text-gray-500">Added {product.createdAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{product.category}</td>
                  <td className="py-4 px-6 text-gray-900">{product.grade}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">Rs. {product.price}</td>
                  <td className="py-4 px-6 text-gray-900">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </td>
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{" "}
          <span className="font-medium">4</span> results
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  )
}
