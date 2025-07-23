"use client"

import { usePathname } from 'next/navigation'
import Header from "@/components/header"
import Footer from "@/components/footer"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  )
} 