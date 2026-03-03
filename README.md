# 🎓 ElevateU — Modern EdTech Learning Platform

<div align="center">

**A full-stack EdTech platform built with React, Node.js, Express, and MongoDB.**

Structured learning paths · AI-powered recommendations · Course management · Progress tracking



</div>

---

## ✨ Features

### 🧑‍🎓 Student Features
- **Course Discovery** — Browse, search & filter courses by category, subcategory, and difficulty level
- **Career Roadmaps** — Step-by-step learning paths for Web Development, AI/ML, Cybersecurity, Data Analysis, and Machine Learning
- **Personal Dashboard** — Track enrolled courses, learning hours, streaks, and completions
- **Notes System** — Create, edit, and search personal notes with modal editor
- **Purchase History** — View all course enrollments and transaction status
- **AI-Powered Roadmaps** — Get personalized learning path recommendations
- **Progress Tracking** — Visual progress bars and completion milestones

### 🛡️ Admin Features
- **Admin Dashboard** — Real-time stats (total users, courses, enrollments, revenue)
- **Course Management** — Full CRUD (Create, Read, Update, Delete) for courses
- **User Management** — View all users, change roles (promote/demote), delete accounts
- **Role-Based Access** — Separate admin login, protected admin routes
- **Course Builder** — Rich course creation with thumbnails, roadmap steps, video playlists, and documentation links

### 🎨 UI/UX
- Modern SaaS design with glassmorphism effects
- Fully responsive (mobile, tablet, desktop)
- Clean typography with Inter font
- Smooth animations and micro-interactions
- Split-screen authentication pages
- Collapsible dashboard sidebar

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, Vite 7, Tailwind CSS 3, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express 5 (ESM), MongoDB, Mongoose 8 |
| **Auth** | JWT (JSON Web Tokens), bcryptjs |
| **Storage** | Cloudinary (image uploads) |
| **AI** | HuggingFace API, OpenAI SDK |
| **Deployment** | Vercel (Frontend), Render/Railway (Backend) |

---

## 📁 Project Structure

```
ElevateU/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── DashboardSidebar.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   └── ...
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Notes.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── courses/
│   │   │   └── roadmaps/
│   │   ├── context/          # Auth context
│   │   ├── services/         # API service layer
│   │   └── index.css         # Global styles & design system
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # Node.js + Express backend
│   ├── controller/           # Route handlers
│   │   ├── userController.js
│   │   ├── coursecontroller.js
│   │   ├── adminController.js
│   │   └── paymentController.js
│   ├── models/               # Mongoose schemas
│   │   ├── user.js
│   │   ├── course.js
│   │   └── payment.js
│   ├── routes/               # Express routes
│   │   ├── userouteslogin.js
│   │   ├── courseroutes.js
│   │   ├── adminRoutes.js
│   │   └── paymentRoutes.js
│   ├── middleware/           # Auth & admin middleware
│   ├── config/               # Database config
│   ├── server.js
│   └── package.json
│
└── README.md
```





## 🔐 Authentication & Roles

| Role | Access |
|------|--------|
| **Student** | Browse courses, enroll, access dashboard, notes, purchase history |
| **Admin** | All student access + course CRUD, user management, role assignment, dashboard stats |

### Default Credentials

| Account | Email | Password |
|---------|-------|----------|
| Admin | `admin@example.com` | `Admin123` |



### Role-Based Routing

- `/dashboard`, `/notes`, `/purchase-history` → Authenticated users only
- `/admin/*` → Admin role required
- `/admin-login` → Separate admin authentication entry point

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/profile` | Get current user (protected) |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses (with filters) |
| GET | `/api/courses/:id` | Get course by ID |
| POST | `/api/courses` | Create course (admin) |
| PUT | `/api/courses/:id` | Update course (admin) |
| DELETE | `/api/courses/:id` | Delete course (admin) |
| POST | `/api/courses/:id/enroll` | Enroll student |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/users` | List all users |
| PUT | `/api/admin/users/:id/role` | Update user role |
| DELETE | `/api/admin/users/:id` | Delete user |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/create` | Create payment |
| GET | `/api/payments/user` | Get user payments |

---

## 🎨 Design System

The platform uses a custom design system built on Tailwind CSS:

- **Colors** — Primary (indigo), Accent (green), Surface (slate neutrals)
- **Typography** — Inter font family
- **Components** — Reusable classes: `btn-primary`, `btn-secondary`, `card`, `card-hover`, `input-field`, `badge`
- **Effects** — Glassmorphism, soft/elevated shadows, gradient text
- **Animations** — fadeIn, slideUp, float, slideInRight, slideInLeft

---

## 📱 Screenshots

| Page | Description |
|------|-------------|
| Landing Page | Hero section with CTAs, features, testimonials, pricing |
| Courses | Search, filter & browse course cards |
| Course Details | Hero banner, tabbed content, sticky enrollment sidebar |
| Dashboard | Stats cards, progress tracking, quick actions |
| Admin Dashboard | Real-time stats, course table, recent users |
| Admin Users | User management with role switching |



