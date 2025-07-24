import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs'
import ConditionalLayout from "@/components/conditional-layout"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-TileColor" content="#003e94" />
        <meta name="theme-color" content="#003e94" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=8" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=8" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=8" />
        <link rel="manifest" href="/site.webmanifest" />
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
          <ConditionalLayout>{children}</ConditionalLayout>
        </ClerkProvider>
      </body>
    </html>
  )
}
