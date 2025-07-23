"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Megaphone,
  GraduationCap,
  ChevronDown,
  Plus,
  List,
} from "lucide-react"

interface AdminSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["products"])

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => (prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]))
  }

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("admin-sidebar")
      const target = event.target as Node

      if (sidebarOpen && sidebar && !sidebar.contains(target) && window.innerWidth < 1024) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [sidebarOpen, setSidebarOpen])

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      exact: true,
    },
    {
      title: "Products",
      icon: Package,
      key: "products",
      submenu: [
        { title: "All Products", href: "/admin/products", icon: List },
        { title: "Add Product", href: "/admin/products/add", icon: Plus },
      ],
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      title: "Collections",
      icon: FileText,
      key: "collections",
      submenu: [
        { title: "All Collections", href: "/admin/collections", icon: List },
        { title: "Add Collection", href: "/admin/collections/add", icon: Plus },
      ],
    },
    {
      title: "Announcements",
      icon: Megaphone,
      key: "announcements",
      submenu: [
        { title: "All Announcements", href: "/admin/announcements", icon: List },
        { title: "Add Announcement", href: "/admin/announcements/add", icon: Plus },
      ],
    },
    {
      title: "Programs",
      icon: GraduationCap,
      key: "programs",
      submenu: [
        { title: "All Programs", href: "/admin/programs", icon: List },
        { title: "Add Program", href: "/admin/programs/add", icon: Plus },
      ],
    },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto z-40 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="p-4 pt-6">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.title}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.key!)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        expandedMenus.includes(item.key!)
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedMenus.includes(item.key!) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedMenus.includes(item.key!) && (
                      <ul className="mt-1 ml-6 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                              className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                                pathname === subItem.href
                                  ? "bg-blue-100 text-blue-700"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              <subItem.icon className="w-4 h-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      (item.exact ? pathname === item.href : pathname.startsWith(item.href!))
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
