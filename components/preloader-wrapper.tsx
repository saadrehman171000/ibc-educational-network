"use client"

import { useState, useEffect } from "react"
import Preloader from "./preloader"

interface PreloaderWrapperProps {
  children: React.ReactNode
}

export default function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('ibc-has-visited')
    
    if (hasVisited) {
      // If user has visited before, skip preloader
      setIsLoading(false)
      setHasLoaded(true)
    } else {
      // Mark as visited
      sessionStorage.setItem('ibc-has-visited', 'true')
    }
  }, [])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
    setHasLoaded(true)
  }

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {hasLoaded && children}
    </>
  )
} 