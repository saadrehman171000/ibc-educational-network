"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddProgramPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    gradeRange: "",
    objectives: "",
    features: "",
    status: "draft",
  })

  const gradeRanges = [
    "Beginner - Step 3",
    "Class 1 - Class 3",
    "Class 4 - Class 5",
    "Class 6 - Class 8",
    "Class 1 - Class 5",
    "Class 6 - Class 10",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Program data:", formData)
    // Handle form submission
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/programs" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Program</h1>
          <p className="text-gray-600">Create a new educational program</p>
        </div>
      </div>

      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter program title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter program description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Grade Range *</label>
            <select
              name="gradeRange"
              required
              value={formData.gradeRange}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Grade Range</option>
              {gradeRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
            <textarea
              name="objectives"
              rows={4}
              value={formData.objectives}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter learning objectives"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Features</label>
            <textarea
              name="features"
              rows={4}
              value={formData.features}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter key features"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Program
            </button>
            <Link
              href="/admin/programs"
              className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
