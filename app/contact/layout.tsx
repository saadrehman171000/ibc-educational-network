import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - IBC Educational Network',
  description: 'Get in touch with IBC Educational Network. Contact us for inquiries about our educational materials, partnerships, or support.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 