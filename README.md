# IBC Educational Network

A comprehensive educational platform built with Next.js, featuring interactive books and learning materials for students from Beginner to Class 8.

## Overview

IBC Educational Network is a modern educational website that provides premium educational content, interactive learning materials, and comprehensive curriculum coverage. The platform serves thousands of schools and educators worldwide with proven academic results.

## Features

### Public Features
- **Comprehensive Collections**: Educational materials from Beginner to Class 8
- **Subject Coverage**: Mathematics, English, Science, Social Studies, Urdu, and Islamic Studies
- **Interactive Shopping Cart**: Add books to cart and manage orders
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Search & Filter**: Advanced filtering by grade, subject, and content type
- **Educational Programs**: Structured learning pathways for different age groups
- **News & Announcements**: Latest updates and educational insights
- **Contact System**: Multi-channel communication with support team

### Admin Dashboard
- **Product Management**: Add, edit, and manage educational materials
- **Order Management**: Track and process customer orders
- **Collection Management**: Organize books into themed collections
- **Program Management**: Create and manage educational programs
- **Announcement System**: Publish news and updates
- **User Management**: Handle customer accounts and permissions
- **Analytics Dashboard**: Monitor sales, inventory, and user engagement

### Authentication & Security
- **Clerk Authentication**: Secure user authentication and session management
- **Admin Protection**: Role-based access control for administrative features
- **Secure Checkout**: Protected payment processing and order management

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **State Management**: React Context API
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Clerk account for authentication

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/saadrehman171000/ibc-educational-network.git
cd ibc-educational-network
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a `.env.local` file in the root directory:
\`\`\`env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── collections/       # Book collections
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Order processing
│   └── ...               # Other public pages
├── components/            # Reusable React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # UI components
├── contexts/             # React Context providers
├── public/               # Static assets
│   ├── images/           # Image assets
│   └── favicon files     # Favicon and manifest files
└── styles/               # Global styles
\`\`\`

## Key Components

### Public Components
- **Header**: Navigation with cart integration and user authentication
- **Footer**: Company information and quick links
- **Product Cards**: Interactive book displays with cart functionality
- **Filter System**: Advanced search and filtering capabilities

### Admin Components
- **AdminSidebar**: Navigation for administrative functions
- **AdminHeader**: Admin dashboard header with search and notifications
- **AdminGuard**: Authentication protection for admin routes

### Context Providers
- **CartProvider**: Shopping cart state management
- **ClerkProvider**: Authentication state and user management

## Educational Programs

### Early Years Program (Beginner - Step 3)
- Foundation skills development
- Interactive learning activities
- Age-appropriate content design

### Primary Program (Class 1 - Class 5)
- Comprehensive curriculum coverage
- Skill-based learning approach
- Regular assessment integration

### Middle School Program (Class 6 - Class 8)
- Advanced learning materials
- Critical thinking exercises
- Exam preparation focus

## API Routes

The application includes several API endpoints for:
- User authentication and session management
- Order processing and management
- Product catalog operations
- Administrative functions


## License

This project is proprietary software owned by IBC Educational Network. All rights are reserved.

## Contact

**IBC Educational Network**
- Address: Office No. 7, Shan Plaza, Gawali Lane #2, New Urdu Bazar, Karachi, Pakistan
- Phone: +92 313 3849727, +92 314 2353805
- Email: info@ibcedu.com
- Website: [IBC Educational Network](https://github.com/saadrehman171000/ibc-educational-network)

## Support

For technical support or questions about the platform:
- Email: support@ibceducational.com
- Create an issue in this repository
- Contact our development team

## Acknowledgments

- Built with Next.js and modern web technologies
- Designed for educational excellence and user experience
- Trusted by 1000+ schools and 50,000+ students worldwide
