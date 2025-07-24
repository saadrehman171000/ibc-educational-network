"use client"

import { usePathname } from 'next/navigation'
import { CartProvider } from "@/contexts/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Head from 'next/head'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      <Head>
        <title>IBC Educational Network - Interactive Books for Children</title>
        <meta name="description" content="Premium educational content from Beginner to Class 8, designed for academic excellence and real learning outcomes. Trusted by 1000+ schools worldwide." />
        <meta name="keywords" content="educational books, interactive learning, curriculum aligned, primary education, middle school, mathematics, english, science, social studies, IBC educational, Pakistan education, textbooks, workbooks" />
        <meta name="author" content="IBC Educational Network" />
        <meta property="og:title" content="IBC Educational Network - Interactive Books for Children" />
        <meta property="og:description" content="Premium educational content from Beginner to Class 8, designed for academic excellence and real learning outcomes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ibc-educational-network.vercel.app" />
        <meta property="og:image" content="/images/ibc-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IBC Educational Network - Interactive Books for Children" />
        <meta name="twitter:description" content="Premium educational content from Beginner to Class 8, designed for academic excellence and real learning outcomes." />
        <meta name="twitter:image" content="/images/ibc-logo.png" />
      </Head>
      <CartProvider>
        {!isAdminRoute && <Header />}
        <main className="min-h-screen">
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </CartProvider>
    </>
  )
} 