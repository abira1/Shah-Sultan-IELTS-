# AI Coding Instructions for Shah Sultan's IELTS Academy

## Project Overview
This is a React + TypeScript + Vite educational platform for IELTS coaching. The architecture follows a component-based design with clear separation between UI components, sections, and pages.

## Tech Stack & Development
- **Framework**: React 18 + TypeScript + Vite
- **Routing**: React Router DOM v6 (nested routing pattern)
- **Styling**: Tailwind CSS with custom design system
- **Development**: `npm run dev` | **Build**: `npm run build` | **Lint**: `npm run lint`

## Architecture Patterns

### Component Organization
```
src/components/
├── ui/           # Reusable UI primitives (Button, Logo, etc.)
├── sections/     # Page sections (Gallery, ContactSection, TestimonialCarousel)
├── layout/       # Layout components (Layout, Navbar, Footer)
└── auth/         # Authentication components (AuthContext, ProtectedRoute)
```

### Authentication Flow
- Uses React Context (`AuthContext`) with localStorage persistence
- Simple role-based system: `'student' | 'teacher' | 'admin'` 
- Protected routes redirect to `/login?redirect=<originalPath>`
- Login state persists across browser sessions

### Routing Architecture
- Main app uses nested React Router setup in `App.tsx`
- All routes wrapped in `<Layout>` component with auth state props
- Protected routes use `<ProtectedRoute>` wrapper component
- Dashboard uses sub-routing with `<Routes>` inside `StudentDashboard.tsx`

## Design System (Tailwind Config)

### Color Palette
```typescript
primary: '#0a2a66' (Deep Navy) - Main brand color
secondary: '#f9f9f9' (Light Gray) - Background
accent: '#c6a545' (Gold) - Highlights and CTAs
```

### Component Patterns
- **Button variants**: `'primary' | 'secondary' | 'outline'` with size options
- **Layout props**: `isLoggedIn`, `userRole`, `minimal` (for exam mode)
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints

## Key Conventions

### State Management
- No external state library - uses React Context for auth
- Component-level useState for UI interactions
- localStorage for auth persistence

### File Naming
- Components: PascalCase with `.tsx` extension
- Pages: PascalCase in `pages/` directory with subdirectories for features
- Sections: Descriptive names like `ContactSection`, `TestimonialCarousel`

### Import Patterns
```typescript
// External libraries first
import React from 'react';
import { Link } from 'react-router-dom';

// Internal components by hierarchy
import Button from '../components/ui/Button';
import Layout from '../components/layout/Layout';
```

## Critical Workflows

### Adding New Pages
1. Create in `src/pages/` with appropriate subdirectory
2. Add route in `App.tsx` with Layout wrapper
3. Include auth props: `isLoggedIn={isLoggedIn} userRole={userRole}`

### Mock Test Flow
- Uses `minimal={true}` layout prop to hide navbar/footer
- Multi-step routing: `/mock-test/instructions` → `/mock-test/listening` → etc.
- State managed in `MockTest.tsx` parent component

### Dashboard Structure
- Sidebar navigation with collapse/expand functionality
- Mobile-responsive with overlay behavior
- Role-based menu items (student/teacher/admin)

## External Dependencies
- **Icons**: Lucide React (consistent icon system)
- **Fonts**: Inter font family via Tailwind config
- **No UI library**: Custom components built with Tailwind

When working on this codebase, maintain the established patterns for component organization, authentication flow, and design system consistency.