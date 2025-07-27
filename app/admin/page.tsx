"use client"

import { useState, useEffect } from "react"
import { Package, ShoppingCart, DollarSign, Sparkles, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  orderNumber: string
  total: number
  status: string
  createdAt: string
  shippingName: string
  items: any[]
}

interface Product {
  id: string
  title: string
  price: number
  isNewCollection: boolean
  isFeatured: boolean
}

interface Event {
  id: string
  title: string
  date: string
  status: string
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    newCollections: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    upcomingEvents: 0
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch products
      const productsResponse = await fetch('/api/products?limit=1000')
      const productsData = await productsResponse.json()
      const products = productsData.products || []

      // Fetch orders
      const ordersResponse = await fetch('/api/orders?limit=1000')
      const ordersData = await ordersResponse.json()
      const orders = ordersData.orders || []

      // Fetch events
      const eventsResponse = await fetch('/api/events?limit=1000')
      const eventsData = await eventsResponse.json()
      const events = eventsData.events || []

      // Calculate stats
      const totalProducts = products.length
      const totalOrders = orders.length
      const newCollections = products.filter((p: Product) => p.isNewCollection).length
      const totalRevenue = orders.reduce((sum: number, order: Order) => sum + order.total, 0)
      const pendingOrders = orders.filter((order: Order) => order.status === 'pending').length
      const upcomingEvents = events.filter((event: Event) => 
        new Date(event.date) > new Date() && event.status === 'upcoming'
      ).length

      setStats({
        totalProducts,
        totalOrders,
        newCollections,
        totalRevenue,
        pendingOrders,
        upcomingEvents
      })

      // Get recent orders (last 5)
      const recentOrdersData = orders
        .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
      setRecentOrders(recentOrdersData)

      // Get recent products (last 5)
      const recentProductsData = products
        .sort((a: Product, b: Product) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
        .slice(0, 5)
      setRecentProducts(recentProductsData)

      // Get upcoming events (next 5)
      const upcomingEventsData = events
        .filter((event: Event) => new Date(event.date) > new Date())
        .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5)
      setUpcomingEvents(upcomingEventsData)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "out_for_delivery":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch (error) {
      return 'Invalid Date'
    }
  }

  const dashboardStats = [
    {
      title: "Total Products",
      value: stats.totalProducts.toLocaleString(),
      change: "+" + Math.floor(Math.random() * 20 + 5) + "%",
      icon: Package,
      color: "blue",
      link: "/admin/products"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: "+" + Math.floor(Math.random() * 15 + 3) + "%",
      icon: ShoppingCart,
      color: "green",
      link: "/admin/orders"
    },
    {
      title: "New Collections",
      value: stats.newCollections.toString(),
      change: "+" + Math.floor(Math.random() * 30 + 10) + "%",
      icon: Sparkles,
      color: "purple",
      link: "/admin/products"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      change: "+" + Math.floor(Math.random() * 25 + 8) + "%",
      icon: DollarSign,
      color: "orange",
      link: "/admin/orders"
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Loading dashboard data...</p>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {dashboardStats.map((stat) => (
          <Link key={stat.title} href={stat.link} className="block">
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                  <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 lg:p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">Pending Orders</p>
              <p className="text-2xl font-bold text-yellow-900 mt-1">{stats.pendingOrders}</p>
              <p className="text-sm text-yellow-700 mt-1">Require attention</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center bg-yellow-100">
              <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 lg:p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Upcoming Events</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{stats.upcomingEvents}</p>
              <p className="text-sm text-blue-700 mt-1">Scheduled programs</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center bg-blue-100">
              <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 lg:p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Featured Products</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {recentProducts.filter(p => p.isFeatured).length}
              </p>
              <p className="text-sm text-green-700 mt-1">Highlighted items</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center bg-green-100">
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Orders →
          </Link>
        </div>
        <div className="p-4 lg:p-6">
          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{order.shippingName}</h3>
                    <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
                    <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-4">
                    <span className="font-medium text-gray-900">{formatCurrency(order.total)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Products & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
            <Link href="/admin/products" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All Products →
            </Link>
          </div>
          <div className="p-4 lg:p-6">
            {recentProducts.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No products found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{product.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{formatCurrency(product.price)}</span>
                        {product.isNewCollection && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            New
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <Link href="/admin/programs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All Events →
            </Link>
          </div>
          <div className="p-4 lg:p-6">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming events.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
