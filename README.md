# Shah Sultan's IELTS Academy

An educational platform for IELTS coaching built with React, TypeScript, and Vite.

## 🚀 Live Application

**Production URL:** https://ssieltsacademy.web.app

**Admin Login:** https://ssieltsacademy.web.app/admin-login

## 📋 Features

- User authentication with Google Sign-In
- Role-based access (Student, Teacher, Admin)
- Interactive mock tests
- Admin dashboard for content management
- Responsive design with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Authentication, Realtime Database, Hosting)
- **Icons:** Lucide React

## 🚀 Getting Started (Development)

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Firebase

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

## 🔧 Firebase Configuration

- **Project ID:** ssieltsacademy
- **Database URL:** https://ssieltsacademy-default-rtdb.firebaseio.com/
- **Auth Domain:** ssieltsacademy.firebaseapp.com
- **Storage Bucket:** ssieltsacademy.firebasestorage.app

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── layout/        # Layout components (Navbar, Footer)
│   ├── sections/      # Page sections
│   └── ui/           # Reusable UI components
├── pages/            # Route components
├── firebase/         # Firebase configuration and services
├── contexts/         # React contexts
├── models/           # TypeScript interfaces
├── services/         # API services
└── utils/           # Utility functions
```

## 🔐 Authentication

The app uses Firebase Authentication with Google Sign-In. Admin users are granted elevated permissions for managing content.

**Admin Email:** abirsabirhossain@gmail.com

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, contact the development team.

---

*Built with ❤️ for IELTS students worldwide*
