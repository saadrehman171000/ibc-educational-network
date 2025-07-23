"use client"

import { Bell, Search, User, LogOut, Menu, X } from "lucide-react"
import Image from "next/image"

interface AdminHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function AdminHeader({ sidebarOpen, setSidebarOpen }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center space-x-3">
            <Image
              src="/images/ibc-logo.png"
              alt="IBC Educational Network"
              width={80}
              height={53}
              className="h-8 w-auto"
            />
            <h1 className="text-lg lg:text-xl font-bold text-gray-900 hidden sm:block">Admin Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64"
            />
          </div>

          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
