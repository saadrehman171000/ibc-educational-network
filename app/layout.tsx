import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs'
import ConditionalLayout from "@/components/conditional-layout"
import PreloaderWrapper from "@/components/preloader-wrapper"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>IBC Educational Network - Quality Educational Materials & Books</title>
        <meta name="description" content="IBC Educational Network provides high-quality educational materials from Beginner to Class 8. Trusted by thousands of schools worldwide for curriculum-aligned learning resources." />
        <meta name="msapplication-TileColor" content="#003e94" />
        <meta name="theme-color" content="#003e94" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Favicon Configuration */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className}>
        <ClerkProvider 
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!} 
          appearance={{ 
            variables: { 
              colorPrimary: "#003e94" 
            } 
          }} 
          dynamic
        >
          <PreloaderWrapper>
            <ConditionalLayout>{children}</ConditionalLayout>
          </PreloaderWrapper>
        </ClerkProvider>
      </body>
    </html>
  )
}