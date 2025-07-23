"use client"

import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import AdminGuard from "@/components/admin-guard"
import { useState, useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Set favicon for admin pages
    const setFavicon = () => {
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = '/favicon.ico'
      document.getElementsByTagName('head')[0].appendChild(link)
    }
    
    setFavicon()
  }, [])

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex pt-16">
          <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 lg:ml-64 p-4 lg:p-8 min-h-[calc(100vh-4rem)]">{children}</main>
        </div>
      </div>
    </AdminGuard>
  )
}
