"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User, ChevronDown, LogOut, Settings } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useUser, UserButton } from '@clerk/nextjs'
import { isAdminEmail } from '@/lib/admin'
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isGradesOpen, setIsGradesOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const { user, isLoaded } = useUser()

  const grades = [
    "Beginner",
    "Step 1",
    "Step 2",
    "Step 3",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
  ]

  const isAdmin = user && isAdminEmail(user.emailAddresses[0]?.emailAddress)

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setIsGradesOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="container-max">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-6 flex-shrink-0">
            <Image
              src="/images/ibc-logo.png"
              alt="IBC Educational Network"
              width={160}
              height={100}
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <Link href="/" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap">
              Home
            </Link>
            <Link href="/collections" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap">
              Collections
            </Link>

            {/* Academic Grades Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsGradesOpen(!isGradesOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap"
              >
                <span>Academic Grades</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isGradesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {grades.map((grade) => (
                    <Link
                      key={grade}
                      href={`/academic-grades/${grade.toLowerCase().replace(" ", "-")}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                      onClick={() => setIsGradesOpen(false)}
                    >
                      {grade}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/programs" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap">
              Programs
            </Link>
            <Link href="/new-collection" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap">
              New Collection
            </Link>
            <Link href="/announcements" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap">
              Announcements
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap">
              Contact
            </Link>
            <Link href="/view-order" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap border border-gray-300 rounded-lg px-3 py-1 hover:border-blue-500">
              View Orders
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-blue-900 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Admin Authentication */}
            {isLoaded && (
              <div className="relative">
                {user && isAdmin ? (
                  <div className="flex items-center space-x-2">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                        }
                      }}
                      userProfileMode="navigation"
                      userProfileUrl="/admin"
                    />
                    <Link 
                      href="/admin"
                      className="hidden sm:block text-sm text-gray-600 hover:text-blue-900 transition-colors"
                    >
                      Admin Panel
                    </Link>
                  </div>
                ) : (
                  <Link 
                    href="/sign-in" 
                    className="p-2 text-gray-700 hover:text-blue-900 transition-colors"
                    title="Admin Login"
                  >
                    <User className="w-6 h-6" />
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
            <nav className="p-4 space-y-4">
              <Link 
                href="/" 
                className="block py-2 text-gray-700 hover:text-blue-900 font-medium"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                href="/collections" 
                className="block py-2 text-gray-700 hover:text-blue-900 font-medium"
                onClick={closeMobileMenu}
              >
                Collections
              </Link>

              <div>
                <button
                  onClick={() => setIsGradesOpen(!isGradesOpen)}
                  className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-blue-900 font-medium"
                >
                  <span>Academic Grades</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isGradesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {grades.map((grade) => (
                      <Link
                        key={grade}
                        href={`/academic-grades/${grade.toLowerCase().replace(" ", "-")}`}
                        className="block py-1 text-gray-600 hover:text-blue-900"
                        onClick={closeMobileMenu}
                      >
                        {grade}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                href="/programs" 
                className="block py-2 text-gray-700 hover:text-blue-900 font-medium"
                onClick={closeMobileMenu}
              >
                Programs
              </Link>
              <Link 
                href="/new-collection" 
                className="block py-2 text-gray-700 hover:text-blue-900 font-medium"
                onClick={closeMobileMenu}
              >
                New Collection
              </Link>
              <Link 
                href="/announcements" 
                className="block py-2 text-gray-700 hover:text-blue-900 font-medium"
                onClick={closeMobileMenu}
              >
                Announcements
              </Link>
              <Link 
                href="/about" 
                className="block py-2 text-gray-700 hover:text-blue-900 font-medium"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="block py-2 text-gray-700 hover:text-blue-900 font-medium"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              <Link 
                href="/view-order" 
                className="block py-2 text-gray-700 hover:text-blue-900 font-medium border border-gray-300 rounded-lg px-3 mx-2 hover:border-blue-500"
                onClick={closeMobileMenu}
              >
                View Orders
              </Link>

              {/* Mobile Admin Section */}
              {isLoaded && (
                <div className="border-t pt-4 mt-4">
                  {user && isAdmin ? (
                    <div className="space-y-2">
                      <Link 
                        href="/admin" 
                        className="block py-2 text-blue-900 font-medium"
                        onClick={closeMobileMenu}
                      >
                        Admin Panel
                      </Link>
                    </div>
                  ) : (
                    <Link 
                      href="/sign-in" 
                      className="block py-2 text-gray-700 hover:text-blue-900 font-medium"
                      onClick={closeMobileMenu}
                    >
                      Admin Login
                    </Link>
                  )}
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
