# Shinde'z Organics Application

## Overview

This is a full-stack agricultural equipment marketplace application designed to connect farmers for equipment sharing, rental, and sales. The application uses a modern web stack with React/TypeScript for the frontend and Express.js with Drizzle ORM for the backend. The project follows a monorepo structure with shared schema definitions and is designed to eventually support mobile development through React Native integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## Contact Information
- Mobile: +91 9040000099
- Email: shindezorganics@gmail.com  
- LinkedIn: https://www.linkedin.com/in/shinde-z-organics-0430a1377/

## Recent Changes (January 25, 2025)
- ✅ Firebase authentication system configured with environment variables
- ✅ Fixed TypeScript compilation issues in storage layer
- ✅ Resolved Equipment page naming conflict 
- ✅ Updated logo to use provided Shinde'z Organics branding image
- ✅ Added contact information throughout application interface
- ✅ Application successfully running with both frontend and backend operational
- ✅ Added comprehensive city selection feature after state selection
  - Created LocationSelector component with all Indian states and cities
  - Updated database schema to include separate state and city fields
  - Enhanced Profile page with state/city selection for user location
  - Improved Equipment marketplace with state/city filtering options
  - Updated equipment cards to display city, state, and detailed address

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom farm-themed color palette
- **Authentication**: Firebase Authentication with Google sign-in support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Shared TypeScript schema definitions using Drizzle-Zod
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement with Vite integration

### Key Components

#### Database Schema
The application uses a PostgreSQL database with the following main entities:
- **Users**: Farmer profiles with authentication details, language preferences, and admin flags
- **Equipment**: Agricultural machinery listings with images, pricing, and availability
- **Bookings**: Rental transactions with status tracking and payment information
- **Chat Messages**: Real-time messaging between farmers for equipment inquiries

#### Authentication System
- Firebase Authentication handles user registration and login
- Supports Google OAuth and email/password authentication
- Admin users have elevated permissions for dashboard access
- Session persistence across browser refreshes

#### Equipment Management
- Farmers can list equipment with detailed descriptions, images, and pricing
- Support for both hourly and daily rental rates
- Availability calendar system for time slot management
- Image upload capabilities through Firebase Storage

#### Booking System
- Real-time availability checking
- Payment processing integration (Razorpay planned)
- Status tracking (pending, confirmed, completed, cancelled)
- Cost calculation based on rental duration

#### Multilingual Support
- i18next integration for internationalization
- Support for English, Hindi, and Marathi
- Language preference stored per user
- UI components with translation support

## Data Flow

1. **User Authentication**: Firebase handles login/registration, user state managed in React context
2. **Equipment Listings**: Data fetched from PostgreSQL through Express API endpoints
3. **Real-time Updates**: TanStack Query manages server state synchronization
4. **Image Handling**: Firebase Storage for equipment images
5. **Chat System**: Real-time messaging using Firebase Realtime Database (planned)

## External Dependencies

### Firebase Services
- **Authentication**: User login and registration
- **Storage**: Image and file uploads
- **Realtime Database**: Chat messaging system

### Payment Processing
- **Razorpay**: Payment gateway integration for booking transactions

### Database
- **Neon Database**: PostgreSQL hosting with serverless scaling
- **Drizzle ORM**: Type-safe database queries and migrations

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library
- **Font Awesome**: Additional icons

## Deployment Strategy

### Development Environment
- Vite dev server with hot module replacement
- Express server with automatic restart using tsx
- Environment variables for Firebase and database configuration

### Production Build
- Frontend: Vite build process outputs static assets
- Backend: esbuild bundles server code for Node.js deployment
- Database migrations handled through Drizzle Kit

### Hosting Considerations
- Static frontend can be deployed to CDN/edge locations
- Express server requires Node.js runtime environment
- PostgreSQL database hosted on Neon or similar managed service
- Environment variables required for Firebase and database connections

The architecture is designed to be scalable and maintainable, with clear separation between frontend and backend concerns, type safety throughout the stack, and modern development practices.