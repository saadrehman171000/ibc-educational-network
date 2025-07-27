import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections - IBC Educational Network',
  description: 'Browse our comprehensive collection of educational materials from Beginner to Class 8. Quality books and resources for students and educators.',
}

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 