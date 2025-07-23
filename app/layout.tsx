import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from "@/contexts/cart-context"
import ConditionalLayout from "@/components/conditional-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IBC Educational Network - Interactive Books for Children",
  description:
    "Premium educational content from Beginner to Class 8, designed for academic excellence and real learning outcomes.",
  generator: "v0.dev",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png?v=2", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        variables: {
          colorPrimary: "#003e94",
        }
      }}
    >
      <html lang="en">
        <head>
          <meta name="msapplication-TileColor" content="#003e94" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className={inter.className}>
          <CartProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
