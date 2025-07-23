import { Package, ShoppingCart, Users, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Products",
      value: "248",
      change: "+12%",
      icon: Package,
      color: "blue",
    },
    {
      title: "Total Orders",
      value: "1,429",
      change: "+8%",
      icon: ShoppingCart,
      color: "green",
    },
    {
      title: "Active Users",
      value: "12,847",
      change: "+23%",
      icon: Users,
      color: "purple",
    },
    {
      title: "Revenue",
      value: "Rs. 2,84,950",
      change: "+15%",
      icon: DollarSign,
      color: "orange",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Ahmed Khan",
      product: "Mathematics Class 5",
      amount: "Rs. 650",
      status: "pending",
    },
    {
      id: "ORD-002",
      customer: "Fatima Ali",
      product: "English Literature Class 7",
      amount: "Rs. 720",
      status: "processing",
    },
    {
      id: "ORD-003",
      customer: "Hassan Ahmed",
      product: "Science Explorer Class 6",
      amount: "Rs. 580",
      status: "delivered",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}
              >
                <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="p-4 lg:p-6">
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{order.customer}</h3>
                  <p className="text-sm text-gray-600">{order.product}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-4">
                  <span className="font-medium text-gray-900">{order.amount}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
