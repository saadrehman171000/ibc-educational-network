"use client"

import { useState } from "react"
import { Search, Eye, Package, Truck, CheckCircle } from "lucide-react"

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("All")

  const orders = [
    {
      id: "ORD-001",
      customer: "Ahmed Khan",
      email: "ahmed.khan@email.com",
      products: ["Mathematics Class 5", "English Class 5"],
      total: 1200,
      status: "pending",
      date: "2025-01-23",
      address: "Karachi, Pakistan",
    },
    {
      id: "ORD-002",
      customer: "Fatima Ali",
      email: "fatima.ali@email.com",
      products: ["Science Explorer Class 6"],
      total: 720,
      status: "approved",
      date: "2025-01-23",
      address: "Lahore, Pakistan",
    },
    {
      id: "ORD-003",
      customer: "Hassan Ahmed",
      email: "hassan.ahmed@email.com",
      products: ["Social Studies Class 4", "Mathematics Class 4"],
      total: 1010,
      status: "out_for_delivery",
      date: "2025-01-22",
      address: "Islamabad, Pakistan",
    },
    {
      id: "ORD-004",
      customer: "Ayesha Malik",
      email: "ayesha.malik@email.com",
      products: ["English Literature Class 7"],
      total: 680,
      status: "delivered",
      date: "2025-01-21",
      address: "Faisalabad, Pakistan",
    },
  ]

  const statusOptions = ["All", "pending", "approved", "out_for_delivery", "delivered"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Approval"
      case "approved":
        return "Approved"
      case "out_for_delivery":
        return "Out for Delivery"
      case "delivered":
        return "Delivered"
      default:
        return "Unknown"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return Package
      case "approved":
        return CheckCircle
      case "out_for_delivery":
        return Truck
      case "delivered":
        return CheckCircle
      default:
        return Package
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Handle status update
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All Status" : getStatusText(status)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const StatusIcon = getStatusIcon(order.status)
          return (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <StatusIcon className="w-5 h-5 text-gray-400" />
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Customer</h4>
                  <p className="text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Products</h4>
                  <div className="space-y-1">
                    {order.products.map((product, index) => (
                      <p key={index} className="text-sm text-gray-900">
                        {product}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Total Amount</h4>
                  <p className="text-lg font-semibold text-gray-900">Rs. {order.total.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Order Date: {order.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Delivery Address</h4>
                  <p className="text-sm text-gray-900">{order.address}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
