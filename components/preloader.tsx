"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Delay before hiding preloader
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 500) // Call onComplete after fade out
          }, 300)
          return 100
        }
        return prev + Math.random() * 15 + 5 // Random increment between 5-20
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col items-center justify-center"
        >
          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative">
              {/* Logo */}
              <Image
                src="/images/ibc-logo.png"
                alt="IBC Educational Network"
                width={200}
                height={100}
                className="h-24 w-auto"
                priority
                onError={(e) => {
                  // Fallback if logo fails to load
                  e.currentTarget.style.display = 'none'
                }}
              />
              
              {/* Animated ring around logo */}
              <motion.div
                className="absolute inset-0 border-4 border-blue-200 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-80 max-w-[90vw] space-y-4">
            {/* Progress Bar */}
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-teal-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Progress Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <motion.p
                key={progress}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-semibold text-gray-700"
              >
                {Math.round(progress)}%
              </motion.p>
              <p className="text-sm text-gray-500 mt-1">
                Loading IBC Educational Network...
              </p>
            </motion.div>
          </div>

          {/* Loading Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex space-x-1 mt-6"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-600 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 