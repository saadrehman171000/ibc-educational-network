import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programs & Events - IBC Educational Network',
  description: 'Discover our educational programs, workshops, and events designed to enhance learning experiences for students and educators.',
}

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 