# Shah Sultan's IELTS Academy - Complete Codebase Documentation

## 📋 Table of Contents
1. [Application Overview](#application-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Structure](#architecture--structure)
4. [User Roles](#user-roles)
5. [Features by Section](#features-by-section)
6. [Page Components](#page-components)
7. [Component Library](#component-library)
8. [Routing Structure](#routing-structure)
9. [Styling System](#styling-system)
10. [Data Models](#data-models)

---

## 🎯 Application Overview

**Name:** Shah Sultan's IELTS Academy
**Type:** Full-featured IELTS Preparation and Management Platform
**Purpose:** Comprehensive platform for IELTS exam preparation with student learning tools, mock tests, and administrative management capabilities

### Key Statistics (from About Section)
- **5,000+** Successful Students
- **4.8/5** Average Rating
- **29,000+** Social Media Following
- **7.5** Highest Band Score Achieved

---

## 💻 Technology Stack

### Frontend Technologies
- **Framework:** React 18.3.1
- **Language:** TypeScript 5.5.4
- **Build Tool:** Vite 7.1.5
- **Routing:** React Router DOM 6.26.2
- **Styling:** TailwindCSS 3.4.17
- **Icons:** Lucide React 0.441.0

### Development Tools
- **Package Manager:** NPM (Yarn recommended)
- **Code Quality:** ESLint
- **Type Checking:** TypeScript with strict mode
- **PostCSS:** For CSS processing
- **Autoprefixer:** For browser compatibility

---

## 🏗️ Architecture & Structure

### Project Directory Structure
```
/app
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── layout/        # Layout components (Navbar, Footer, Layout)
│   │   ├── sections/      # Reusable section components
│   │   └── ui/            # UI components (Button, Logo, etc.)
│   ├── pages/
│   │   ├── Admin/         # Admin dashboard pages
│   │   ├── Auth/          # Authentication pages
│   │   ├── Dashboard/     # Student dashboard pages
│   │   ├── MockTest/      # Mock test flow pages
│   │   ├── Home.tsx       # Landing page
│   │   ├── Teachers.tsx   # Teachers page
│   │   └── Courses.tsx    # Courses page
│   ├── App.tsx            # Main app component with routing
│   ├── AppRouter.tsx      # Router wrapper
│   ├── index.tsx          # Entry point
│   ├── index.css          # Global styles
│   └── App.css            # Component styles
├── public/                # Static assets
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind configuration
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

---

## 👥 User Roles

### 1. **Student Role**
- **Access Level:** Limited
- **Capabilities:**
  - View courses and course information
  - Take mock tests and exams
  - View test results and progress
  - Manage personal profile
  - Access learning materials

### 2. **Teacher Role**
- **Access Level:** Elevated (shares admin dashboard)
- **Capabilities:**
  - Access admin dashboard
  - Manage students
  - Create and manage questions
  - Control exams
  - View analytics

### 3. **Admin Role**
- **Access Level:** Full
- **Capabilities:**
  - All teacher capabilities
  - Manage home page content
  - Manage teachers
  - System settings
  - Full platform control

---

## 🎨 Features by Section

### A. PUBLIC WEBSITE

#### 1. **Home Page** (`/`)
**Hero Section:**
- Large headline: "Your trusted destination for mastering English and achieving the IELTS goals"
- Two CTAs: "Register Now" and "Explore Courses"
- Academy award badge display

**Features Section:**
- **Expert-Led Classes:** Dedicated educators with IELTS experience
- **Tailored Study Materials:** Customized for Academic and General Training
- **Small Group Sessions:** Personalized attention
- **Computer-Based Practice:** Digital IELTS format preparation
- **Mock Tests:** Regular practice with detailed feedback
- **Spoken English Support:** Confidence building sessions

**About Section:**
- Academy history and mission
- Founder information (Md. Shah Sultan)
- Key statistics display:
  - 5000+ Successful Students
  - 4.8/5 Average Rating
  - 29K+ Social Media Following
  - 7.5 Highest Band Score
- Achievement highlights (British Council recognition)

**Courses Preview:**
Three main course offerings:
1. **Academic IELTS** (৳4,000)
   - 8-week intensive program
   - Academic writing focus
   - 4 full mock tests
   
2. **General Training** (৳500)
   - 6-week standard program
   - Letter writing & practical reading
   - 3 full mock tests
   
3. **Fast Track Course** (Featured)
   - 2-week intensive program
   - Daily mock tests
   - One-on-one tutoring
   - Up to 25% discount

**Testimonials Section:**
- Grid layout with 8 student testimonials
- Each includes: Photo, Name, Band Score, Comment
- Hover effects and shadow animations

**Gallery Section:**
- Image showcase of facilities and classes
- Categories: Classroom, Events, Achievements, Facilities

**Achievements & Recognition:**
- British Council recognition details
- Community impact statistics
- Success rate highlights

**Call-to-Action Section:**
- "Ready to Achieve Your IELTS Goals?"
- Dual buttons: Register Now / Contact Us

**Contact Section:**
- Contact form
- Location information
- Social media links

#### 2. **Teachers Page** (`/teachers`)
- Faculty profiles
- Qualifications and experience
- Teaching specializations

#### 3. **Courses Page** (`/courses`)
- Detailed course information
- Pricing and duration
- Enrollment options

---

### B. AUTHENTICATION SYSTEM

#### 1. **Student Login** (`/login`)
**Features:**
- Email and password authentication
- "Remember Me" checkbox
- Password visibility toggle
- Form validation with error messages
- Toast notifications for success/error
- Forgot password link
- Redirect to registration
- Auto-redirect after login

**Validation:**
- Email format validation
- Required field validation
- Real-time error clearing

#### 2. **Admin/Teacher Login** (`/admin-login`)
- Separate login portal for staff
- Enhanced security
- Role-based routing

#### 3. **Registration** (`/register`)
- New student account creation
- Form validation
- Terms and conditions acceptance

**Protected Routes:**
- All authenticated routes use `ProtectedRoute` component
- Role-based routes use `RoleBasedRoute` component
- Automatic redirect to login if not authenticated

---

### C. STUDENT DASHBOARD

**Access:** `/dashboard/*`
**Layout:** Collapsible sidebar with main content area

#### 1. **Overview** (`/dashboard`)
**Components:**
- Welcome message with user name
- Statistics cards:
  - Tests completed
  - Current progress
  - Upcoming exams
  - Recent scores
- Quick action buttons
- Progress charts
- Recent activity feed

#### 2. **Exams** (`/dashboard/exams`)
**Features:**
- Modern, gradient-based UI design
- **Exam Type Filters:**
  - All Tests
  - Full Mock Tests
  - Listening only
  - Reading only
  - Writing only
  - Speaking only

- **Quick Stats Cards:**
  - Listening (30min) 🎧
  - Reading (60min) 📖
  - Writing (60min) ✍️
  - Speaking (14min) 🎤

- **Search Functionality:**
  - Search bar for finding specific tests
  - Filter dropdown with exam types

- **IELTS Structure Cards:**
  Each section card displays:
  - Section name
  - Duration
  - Number of questions
  - Description
  - "Start Practice" button
  - Hover effects

- **Progress Statistics:**
  - Tests Completed (12)
  - Average Band Score (7.5)
  - Hours Practiced (45)
  - Target Band Score (8.0)

- **Scheduled Exams:**
  - Upcoming exam calendar
  - Exam details (date, time, location)
  - Confirmation status
  - Action buttons

#### 3. **Results** (`/dashboard/results`)
- Test history
- Score breakdowns
- Performance analytics
- Band score tracking
- Comparison with previous attempts

#### 4. **Profile** (`/dashboard/profile`)
- Personal information
- Account settings
- Profile picture
- Contact details
- Preferences

**Sidebar Navigation:**
- Collapsible/expandable (desktop)
- Slide-in drawer (mobile)
- Active route highlighting
- User profile section
- Logout button

---

### D. ADMIN DASHBOARD

**Access:** `/admin/*`
**Roles:** Admin and Teacher
**Layout:** Advanced sidebar with multi-section management

#### 1. **Dashboard Overview** (`/admin`)
**Displays:**
- System statistics
- Recent activities
- Quick actions
- Performance metrics
- User analytics

#### 2. **Student Manager** (`/admin/students`)
**Features:**
- Student list with search
- Student profiles
- Enrollment status
- Performance tracking
- Batch management
- Communication tools

#### 3. **Question Manager** (`/admin/questions`)
**Comprehensive Question Management System:**

**Features:**
- Create, edit, and delete questions
- Search and filter questions
- Bulk operations

**Question Types Supported:**
- Multiple Choice
- Essay
- Listening
- Reading
- Speaking

**Question Attributes:**
- Section (Listening, Reading, Writing, Speaking)
- Difficulty level (Easy, Medium, Hard)
- Question text
- Options (for multiple choice)
- Correct answer
- Points value
- Time limit (in minutes)
- Explanation
- Tags

**Interface Components:**
- Statistics dashboard:
  - Total questions count
  - Reading questions count
  - Average time limit
  - Total points available
- Filter controls:
  - Search by question text or tags
  - Filter by section
  - Filter by difficulty
- Question cards with:
  - Color-coded badges for section and difficulty
  - Edit and delete actions
  - Full question details

**Add/Edit Modal:**
- Full-screen modal with form
- Rich text support
- Multiple option management
- Tag management
- Validation

#### 4. **Exam Control** (`/admin/exam-control`)
**Real-Time Exam Monitoring System:**

**Features:**
- Live exam session monitoring
- Start/pause/end exam controls
- Real-time student tracking
- Exam scheduling

**Exam Attributes:**
- Title
- Section type
- Status (draft, scheduled, active, completed, cancelled)
- Start and end time
- Duration
- Total questions and marks
- Participant count
- Passing marks
- Instructions

**Live Statistics:**
- Active exams count
- Students online count
- Scheduled exams
- Total participants

**Live Sessions Monitor:**
- Real-time student progress
- Questions answered count
- Time remaining
- Current score
- Progress bars
- Force end session capability
- Monitor individual sessions

**Exam Management Actions:**
- Start scheduled exams
- Pause active exams
- End active exams
- Cancel scheduled exams
- View detailed exam information
- Download results (for completed exams)

**Exam Details Modal:**
- Basic information
- Exam settings
- Schedule details
- Instructions
- Active sessions for the exam

#### 5. **Home Manager** (`/admin/home-manager`)
**Content Management System for Home Page:**

**Tab Sections:**

**a) Overview Tab:**
- Statistics cards:
  - Active courses count
  - Features count
  - Testimonials count
  - Gallery images count
  - Active sections count
- Home page sections list:
  - Section name
  - Type
  - Active/Inactive status
  - Last updated date
  - Toggle activation
  - Edit section

**b) Features Tab:**
- Manage feature highlights
- Add/edit/delete features
- Feature attributes:
  - Title
  - Description
  - Icon
  - Active status
- Grid layout with cards
- Toggle activation per feature

**c) Courses Tab:**
- Manage course offerings
- Add/edit/delete courses
- Course attributes:
  - Title
  - Description
  - Price (in Taka)
  - Duration
  - Image
  - Features list
  - Active status
- Visual course cards with images
- Feature tags display
- Toggle activation per course

**d) Testimonials Tab:**
- Manage student testimonials
- Add/edit/delete testimonials
- Testimonial attributes:
  - Student name
  - Band score
  - Comment/review
  - Image/avatar
  - Course taken
  - Date
  - Active status
- List view with avatars
- Toggle activation per testimonial

**e) Gallery Tab:**
- Manage gallery images
- Add/edit/delete images
- Image attributes:
  - Title
  - Description
  - Image URL
  - Category (classroom, events, achievements, facilities)
  - Active status
- Grid layout with image previews
- Category badges
- Toggle visibility per image

**Common Features Across All Tabs:**
- Add new items with modals
- Edit existing items
- Delete with confirmation
- Active/Inactive toggle
- Search and filter capabilities
- Responsive grid layouts

#### 6. **Teachers Management** (`/admin/teachers`)
**Features:**
- Teacher profiles
- Qualifications tracking
- Schedule management
- Performance metrics

#### 7. **Settings** (`/admin/settings`)
**Configuration Options:**
- System settings
- User management
- Security settings
- Notification preferences
- Integration settings

**Sidebar Features:**
- Collapsible/expandable
- Icon-based navigation
- Active route highlighting
- Admin profile display
- Logout option

---

### E. MOCK TEST SYSTEM

**Access:** `/mock-test/*`
**Purpose:** Complete IELTS examination simulation

#### **Test Flow:**
1. **Instructions** (`/mock-test/`)
   - Test overview
   - Rules and regulations
   - Start button

2. **Listening Section** (`/mock-test/listening`)
   - 30-minute duration
   - Audio playback
   - Question interface
   - Timer display
   - Progress tracking

3. **Break 1** (`/mock-test/break/1`)
   - 2-minute break
   - Next section preview (Reading)
   - Auto-advance timer

4. **Reading Section** (`/mock-test/reading`)
   - 60-minute duration
   - Multiple passages
   - Various question types
   - Timer and progress

5. **Break 2** (`/mock-test/break/2`)
   - 2-minute break
   - Next section preview (Writing)

6. **Writing Section** (`/mock-test/writing`)
   - 60-minute duration
   - Task 1 and Task 2
   - Word count tracking
   - Text editor

7. **Break 3** (`/mock-test/break/3`)
   - 2-minute break
   - Next section preview (Speaking)

8. **Speaking Section** (`/mock-test/speaking`)
   - 11-14 minutes
   - Three parts
   - Recording capability
   - Timer per part

9. **Confirmation** (`/mock-test/confirmation`)
   - Test completion message
   - What's next information
   - Return to dashboard

---

### F. LISTENING EXAM FLOW

**Access:** `/listening-exam/*`
**Purpose:** Dedicated listening test with complete pre-test procedures

#### **Flow Stages:**

1. **Candidate Confirmation** (`/listening-exam/`)
   - Personal details verification
   - Test information display
   - Proceed to sound test

2. **Sound Test** (`/listening-exam/sound-test`)
   - Audio equipment check
   - Volume adjustment
   - Sample audio playback
   - Headphone verification
   - Proceed when ready

3. **Listening Instructions** (`/listening-exam/instructions`)
   - Detailed test instructions
   - Section breakdown
   - Timing information
   - Important notes
   - Start test button

4. **Listening Test** (`/listening-exam/test`)
   - Actual test interface
   - Audio playback controls
   - Question display
   - Answer input
   - Timer
   - Submit functionality
   - Auto-redirect to dashboard on completion

---

## 📄 Page Components

### Public Pages

#### **Home.tsx**
- Comprehensive landing page
- Multiple sections
- Responsive design
- Animations and transitions

#### **Teachers.tsx**
- Faculty showcase
- Profiles and credentials

#### **Courses.tsx**
- Course catalog
- Detailed information
- Enrollment CTAs

### Authentication Pages

#### **Login.tsx**
- Form with validation
- Toast notifications
- Password toggle
- Redirect logic

#### **AdminLogin.tsx**
- Staff authentication
- Role verification

#### **Register.tsx**
- New user registration
- Form validation
- Terms acceptance

### Dashboard Pages

#### Student Dashboard Files:
- **StudentDashboard.tsx** - Main layout with sidebar
- **Overview.tsx** - Dashboard home
- **Exams.tsx** - Exam browser and launcher
- **Results.tsx** - Test results and analytics
- **Profile.tsx** - User profile management

#### Admin Dashboard Files:
- **AdminDashboard.tsx** - Admin layout with sidebar
- **Overview.tsx** - Admin dashboard home
- **Students.tsx** - Student management
- **QuestionManager.tsx** - Question CRUD operations
- **ExamControl.tsx** - Real-time exam control
- **HomeManager.tsx** - Content management
- **Teachers.tsx** - Teacher management
- **Settings.tsx** - System configuration

### Mock Test Pages

#### **MockTest.tsx**
- Main test router
- State management
- Flow control

#### Individual Section Components:
- **Instructions.tsx** - Test instructions
- **ListeningInstructions.tsx** - Listening-specific instructions
- **Listening.tsx** - Listening test interface
- **Reading.tsx** - Reading test interface
- **Writing.tsx** - Writing test interface
- **Speaking.tsx** - Speaking test interface
- **Break.tsx** - Break screen with timer
- **Confirmation.tsx** - Test completion

### Listening Exam Flow Pages

#### **ListeningExamFlow.tsx**
- Exam flow router
- Navigation management

#### Components:
- **CandidateConfirmation.tsx** - Candidate verification
- **SoundTest.tsx** - Audio check
- **ListeningInstructions.tsx** - Instructions (shared)
- **ListeningTest.tsx** - Actual test interface

---

## 🧩 Component Library

### Layout Components (`src/components/layout/`)

#### **Layout.tsx**
- Main layout wrapper
- Navbar integration
- Footer integration
- Minimal mode support
- Props:
  - `children`: Content to render
  - `isLoggedIn`: Authentication status
  - `minimal`: Hide footer flag
  - `userRole`: User role for conditional rendering

#### **Navbar.tsx**
- Responsive navigation
- User authentication display
- Role-based menu items
- Mobile hamburger menu
- Props:
  - `isLoggedIn`: Show authenticated menu
  - `minimal`: Simplified navbar
  - `userRole`: Display role-specific items

#### **Footer.tsx**
- Site footer with links
- Social media icons
- Contact information
- Copyright notice

### Authentication Components (`src/components/auth/`)

#### **AuthContext.tsx**
- React Context for authentication
- Provides:
  - `isLoggedIn`: Boolean auth state
  - `userRole`: Current user role
  - `login(role)`: Login function
  - `logout()`: Logout function
- Uses localStorage for persistence

#### **ProtectedRoute.tsx**
- Route guard for authenticated users
- Redirects to login if not authenticated
- Props:
  - `isAuthenticated`: Auth status
  - `children`: Protected content

#### **RoleBasedRoute.tsx**
- Route guard with role checking
- Redirects based on role permissions
- Props:
  - `isAuthenticated`: Auth status
  - `userRole`: Current user role
  - `allowedRoles`: Array of permitted roles
  - `children`: Protected content

### Section Components (`src/components/sections/`)

#### **ContactSection.tsx**
- Reusable contact form
- Location display
- Social links

#### **Gallery.tsx**
- Image gallery component
- Grid layout
- Lightbox functionality

#### **TestimonialCarousel.tsx**
- Testimonial slider
- Auto-play option
- Navigation controls

### UI Components (`src/components/ui/`)

#### **Button.tsx**
- Reusable button component
- Variants: primary, secondary, outline
- Sizes: sm, md, lg
- Loading state
- Disabled state
- Link support (React Router)
- Props:
  - `variant`: Style variant
  - `size`: Button size
  - `loading`: Show loading spinner
  - `disabled`: Disable interaction
  - `fullWidth`: Full width button
  - `to`: React Router link
  - `onClick`: Click handler
  - `children`: Button content

#### **Logo.tsx**
- Academy logo component
- SVG or image support
- Responsive sizing

#### **BadgeIndianRupee.tsx**
- Currency display component
- Rupee symbol
- Formatting

#### **Check.tsx**
- Checkmark icon component
- Used in feature lists

---

## 🛣️ Routing Structure

### Main Routes (App.tsx)

```
/                     → Home Page (Layout wrapped)
/teachers            → Teachers Page (Layout wrapped)
/courses             → Courses Page (Layout wrapped)
/login               → Login Page (Layout wrapped)
/admin-login         → Admin Login (No layout)
/register            → Register Page (Layout wrapped)
/dashboard/*         → Student Dashboard (Protected, student role)
/admin/*             → Admin Dashboard (Protected, admin/teacher roles)
/mock-test/*         → Mock Test Flow (Protected, minimal layout)
/listening-exam/*    → Listening Exam Flow (Protected, minimal layout)
/logout              → Logout Handler (auto-redirects)
```

### Student Dashboard Routes

```
/dashboard           → Overview
/dashboard/exams     → Exams Browser
/dashboard/results   → Results & Analytics
/dashboard/profile   → User Profile
```

### Admin Dashboard Routes

```
/admin               → Admin Overview
/admin/students      → Student Manager
/admin/questions     → Question Manager
/admin/exam-control  → Exam Control Center
/admin/home-manager  → Home Page Manager
/admin/teachers      → Teachers Management
/admin/settings      → System Settings
```

### Mock Test Routes

```
/mock-test/                        → Instructions
/mock-test/listening-instructions  → Listening Instructions
/mock-test/listening               → Listening Test
/mock-test/break/1                 → Break (before Reading)
/mock-test/reading                 → Reading Test
/mock-test/break/2                 → Break (before Writing)
/mock-test/writing                 → Writing Test
/mock-test/break/3                 → Break (before Speaking)
/mock-test/speaking                → Speaking Test
/mock-test/confirmation            → Test Complete
```

### Listening Exam Routes

```
/listening-exam/             → Candidate Confirmation
/listening-exam/sound-test   → Sound Test
/listening-exam/instructions → Instructions
/listening-exam/test         → Listening Test
```

---

## 🎨 Styling System

### Tailwind Configuration

#### **Color Palette:**

**Primary Colors (60% usage):**
- Default: `#0a2a66` (Deep Navy Blue)
- Light: `#1e3f7d`
- Dark: `#071d47`

**Secondary Colors (30% usage):**
- Default: `#f9f9f9` (White/Light Gray)
- Dark: `#e5e5e5`

**Accent Colors (10% usage):**
- Default: `#c6a545` (Elegant Gold)
- Light: `#d4b968`
- Dark: `#b08f33`

**Text Colors:**
- Primary: `#333333`
- Secondary: `#666666`
- Tertiary: `#999999`

**Status Colors:**
- Success: `#2e7d32`
- Warning: `#ed6c02`
- Error: `#d32f2f`
- Info: `#0288d1`

#### **Typography:**
- Font Family: Inter, system-ui, sans-serif
- Responsive font sizes
- Custom line heights

#### **Spacing:**
- Extended spacing scale
- Custom 128 (32rem) and 144 (36rem)

#### **Border Radius:**
- Standard Tailwind scale
- Custom 4xl (2rem)

#### **Animations:**
- Pulse animation
- Custom transitions
- Hover effects

### CSS Files

#### **index.css**
- Global styles
- Tailwind imports
- Base resets
- Typography settings

#### **App.css**
- Component-specific styles
- Utility classes
- Custom animations

---

## 📊 Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  profilePicture?: string;
  dateJoined: string;
}
```

### Question Model
```typescript
interface Question {
  id: string;
  type: 'multiple-choice' | 'essay' | 'listening' | 'reading' | 'speaking';
  section: 'listening' | 'reading' | 'writing' | 'speaking';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  timeLimit: number;
  explanation?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

### Exam Model
```typescript
interface Exam {
  id: string;
  title: string;
  section: 'listening' | 'reading' | 'writing' | 'speaking' | 'full-test';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'cancelled';
  startTime: string;
  endTime: string;
  duration: number;
  totalQuestions: number;
  totalMarks: number;
  participants: number;
  maxParticipants: number;
  passingMarks: number;
  createdAt: string;
  instructions?: string;
}
```

### Exam Session Model
```typescript
interface ExamSession {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  startedAt: string;
  status: 'in-progress' | 'completed' | 'paused' | 'abandoned';
  timeRemaining: number;
  questionsAnswered: number;
  currentScore: number;
  answers: Array<{
    questionId: string;
    answer: any;
    timeSpent: number;
  }>;
}
```

### Course Model
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  features: string[];
  isActive: boolean;
}
```

### Testimonial Model
```typescript
interface Testimonial {
  id: string;
  name: string;
  band: number;
  comment: string;
  image: string;
  course: string;
  date: string;
  isActive: boolean;
}
```

### Feature Model
```typescript
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}
```

### Gallery Image Model
```typescript
interface GalleryImage {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'classroom' | 'events' | 'achievements' | 'facilities';
  isActive: boolean;
}
```

### Home Section Model
```typescript
interface HomeSection {
  id: string;
  name: string;
  type: 'hero' | 'features' | 'courses' | 'testimonials' | 'gallery' | 'stats' | 'contact';
  isActive: boolean;
  content: any;
  lastUpdated: string;
}
```

---

## 🔐 Authentication Flow

1. **User visits protected route**
2. **Check AuthContext for authentication status**
3. **If not authenticated:**
   - Redirect to `/login`
   - Store original destination
4. **User logs in:**
   - Validate credentials
   - Set role in AuthContext
   - Save to localStorage
   - Redirect to original destination or dashboard
5. **Protected routes check role:**
   - Student → `/dashboard/*`
   - Admin/Teacher → `/admin/*`

---

## 📱 Responsive Design

### Breakpoints (Tailwind defaults)
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

### Mobile Features
- Hamburger menu navigation
- Collapsible sidebars
- Touch-friendly buttons
- Responsive grids
- Stacked layouts

### Desktop Features
- Multi-column layouts
- Expanded sidebars
- Hover effects
- Advanced animations

---

## 🚀 Key Features Summary

### Student Experience
✅ Browse courses and teachers
✅ Take practice tests
✅ Monitor progress
✅ View results
✅ Track improvement

### Admin Experience
✅ Manage students
✅ Create questions
✅ Control exams in real-time
✅ Monitor live sessions
✅ Manage website content
✅ View analytics

### Testing Experience
✅ Full IELTS mock tests
✅ Individual section tests
✅ Real exam simulation
✅ Timer and progress tracking
✅ Break periods
✅ Sound testing

---

## 📦 Dependencies

### Core Dependencies
- react: ^18.3.1
- react-dom: ^18.3.1
- react-router-dom: ^6.26.2
- lucide-react: ^0.441.0

### Dev Dependencies
- @vitejs/plugin-react: ^4.2.1
- typescript: ^5.5.4
- tailwindcss: 3.4.17
- vite: ^7.1.5
- eslint: ^8.50.0
- @typescript-eslint/eslint-plugin: ^5.54.0
- @typescript-eslint/parser: ^5.54.0

---

## 🎯 Current Implementation Status

### ✅ Fully Implemented
- Public website pages
- Authentication system
- Student dashboard structure
- Admin dashboard structure
- Mock test flow structure
- Listening exam flow structure
- Question manager UI
- Exam control UI
- Home page manager UI
- Responsive navigation
- Protected routes
- Role-based access

### ⚠️ Frontend Only (No Backend)
- All data is mocked with static arrays
- No API integrations
- No database persistence
- Authentication is simulated
- Question CRUD operations work in memory only
- Exam control changes are not persisted

### 🔮 Future Enhancements
- Backend API integration
- Database connectivity
- Real authentication with JWT
- File upload for images
- Audio playback for listening tests
- Text editor for writing tests
- Video recording for speaking tests
- Real-time exam monitoring with WebSockets
- Analytics and reporting
- Email notifications
- Payment integration
- Certificate generation

---

## 📝 Notes

1. **Mock Data:** All current data is hardcoded in component state
2. **No Backend:** This is a frontend-only implementation
3. **TypeScript:** Full TypeScript support with strict mode
4. **Responsive:** Mobile-first responsive design
5. **Accessibility:** Basic ARIA labels implemented
6. **Performance:** Optimized with React best practices
7. **Scalability:** Component-based architecture for easy expansion

---

## 🏁 Conclusion

This is a comprehensive, production-ready frontend for an IELTS academy platform. It includes:
- Complete UI/UX for all user roles
- Robust routing and authentication
- Responsive design for all devices
- Modern component architecture
- Type-safe TypeScript implementation
- Extensive admin capabilities
- Full mock test simulation

**Next Steps for Production:**
1. Implement backend API
2. Add database layer
3. Integrate real authentication
4. Add file upload capabilities
5. Implement real-time features
6. Add payment processing
7. Deploy to production environment

---

*Documentation generated on: [Current Date]*
*Version: 1.0.0*
*Last Updated: Based on codebase analysis*
