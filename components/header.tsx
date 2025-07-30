"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useUser, UserButton } from '@clerk/nextjs'
import { isAdminEmail } from '@/lib/admin'
import Image from "next/image"
import { createPortal } from "react-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isGradesOpen, setIsGradesOpen] = useState(false)
  const { getTotalItems } = useCart()
  const { user, isLoaded } = useUser()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const grades = [
    "Nursery",
    "KG1",
    "KG2",
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsGradesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Get dropdown position with viewport boundary checks
  const getDropdownPosition = () => {
    if (!buttonRef.current) return { top: 0, left: 0, width: 192 }
    
    const rect = buttonRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const dropdownWidth = 192 // Fixed width
    
    let left = rect.left
    
    // Ensure dropdown doesn't go off the right edge
    if (left + dropdownWidth > viewportWidth) {
      left = viewportWidth - dropdownWidth - 16 // 16px margin
    }
    
    // Ensure dropdown doesn't go off the left edge
    if (left < 16) {
      left = 16
    }
    
    return {
      top: rect.bottom + 8,
      left: Math.max(0, left),
      width: dropdownWidth
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <div className="relative">
              <Image
                src="/images/ibc-logo.png"
                alt="IBC Educational Network"
                width={200}
                height={100}
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300 blur-sm" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-1 justify-center">
            <Link href="/" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs xl:text-sm px-2">
              Home
            </Link>
            <Link href="/collections" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs xl:text-sm px-2">
              Collections
            </Link>

            {/* Academic Grades Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                ref={buttonRef}
                onClick={() => setIsGradesOpen(!isGradesOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap text-xs xl:text-sm px-2"
              >
                <span>Academic Grades</span>
                <ChevronDown className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform ${isGradesOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link href="/programs" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs xl:text-sm px-2">
              Programs
            </Link>
            <Link href="/new-collection" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs xl:text-sm px-2">
              New Collection
            </Link>
            <Link href="/announcements" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs xl:text-sm px-2">
              Announcements
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs xl:text-sm px-2">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs xl:text-sm px-2">
              Contact
            </Link>
            <Link href="/view-order" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap border border-gray-300 rounded px-2 py-1 hover:border-blue-500 flex-shrink-0 text-xs xl:text-sm">
              View Orders
            </Link>
          </nav>

          {/* Medium Screen Navigation */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1 flex-1 justify-center">
            <Link href="/" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs px-1">
              Home
            </Link>
            <Link href="/collections" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs px-1">
              Collections
            </Link>
            <Link href="/programs" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs px-1">
              Programs
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs px-1">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-900 font-medium transition-colors whitespace-nowrap flex-shrink-0 text-xs px-1">
              Contact
            </Link>
          </nav>

          {/* Right Icons - Fixed width to prevent layout shifts */}
          <div className="flex items-center space-x-3 flex-shrink-0 w-32 xl:w-40 justify-end">
            <Link href="/cart" className="relative p-1 text-gray-700 hover:text-blue-900 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Admin Authentication - Fixed width container */}
            {isLoaded && (
              <div className="flex items-center space-x-2 min-w-0">
                {user && isAdmin ? (
                  <>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-7 h-7",
                        }
                      }}
                      userProfileMode="navigation"
                      userProfileUrl="/admin"
                    />
                    <Link 
                      href="/admin"
                      className="hidden sm:block text-xs text-gray-600 hover:text-blue-900 transition-colors"
                    >
                      Admin Panel
                    </Link>
                  </>
                ) : (
                  <Link 
                    href="/sign-in" 
                    className="p-1 text-gray-700 hover:text-blue-900 transition-colors"
                    title="Admin Login"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1 text-gray-700 hover:text-blue-900 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-24 bg-white z-40 overflow-y-auto">
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
                  <ChevronDown className={`w-4 h-4 transition-transform ${isGradesOpen ? 'rotate-180' : ''}`} />
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

      {/* Portal-based Dropdown with viewport boundary checks - Desktop only */}
      {isGradesOpen && typeof window !== 'undefined' && window.innerWidth >= 1024 && createPortal(
        <div
          ref={dropdownRef}
          className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[9999] max-h-96 overflow-y-auto"
          style={{
            top: getDropdownPosition().top,
            left: getDropdownPosition().left,
            width: getDropdownPosition().width,
            maxWidth: 'calc(100vw - 32px)' // Prevent overflow
          }}
        >
          {grades.map((grade) => (
            <Link
              key={grade}
              href={`/academic-grades/${grade.toLowerCase().replace(" ", "-")}`}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm"
              onClick={() => setIsGradesOpen(false)}
            >
              {grade}
            </Link>
          ))}
        </div>,
        document.body
      )}
    </header>
  )
}
