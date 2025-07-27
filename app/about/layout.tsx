import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - IBC Educational Network',
  description: 'Learn about IBC Educational Network, our mission to provide quality educational materials, and our commitment to student success.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 