import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./components/PrivateRoutes";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddCourse from "./pages/AdminAddCourse";
import AdminCourseForm from "./pages/AdminCourseForm";
import AdminCourses from "./pages/AdminCourses";

// Course Pages
import Courses from "./pages/courses/Courses";
import CourseDetails from "./pages/CourseDetails";
import TechCourses from "./pages/TechCourses";
import NonTechCourses from "./pages/NonTechCourses";

// Other Pages
import WebDevelopment from "./pages/roadmaps/WebDevelopment";
import AIML from "./pages/roadmaps/GEN'AI";
import Cybersecurity from "./pages/roadmaps/Cybersecurity";
import DataAnalyst from "./pages/roadmaps/DataAnalyst";
import MachineLearning from "./pages/roadmaps/MachineLearning";

import WebDevelopmentCourse from "./pages/courses/Webdev";
import AIMLCourse from "./pages/courses/GEN'AI";
import CybersecurityCourse from "./pages/courses/cybersecurity";
import DataAnalystCourse from "./pages/courses/DA";
import MachineLearningCourse from "./pages/courses/ML";

import PaymentEnrollment from "./pages/PaymentEnrollment";

function AppLayout({ children }) {
  const location = useLocation();
  const noLayoutRoutes = [
    "/result",
    "/admin-login",
    "/admin",
    "/admin/add-course",
    "/admin/courses",
    "/admin/create-course",
  ];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div
      className={`min-h-screen flex flex-col ${hideLayout ? "bg-gray-50" : ""}`}
    >
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        {children}
        <ScrollToTop />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/tech-courses" element={<TechCourses />} />
            <Route path="/non-tech-courses" element={<NonTechCourses />} />
            <Route path="/roadmap" element={<Roadmap />} />
            {/* Roadmap Routes */}
            <Route
              path="/roadmap/web-development"
              element={<WebDevelopment />}
            />
            <Route path="/roadmap/GEN'AI" element={<AIML />} />
            <Route path="/roadmap/cybersecurity" element={<Cybersecurity />} />
            <Route path="/roadmap/data-analyst" element={<DataAnalyst />} />
            <Route
              path="/roadmap/machine-learning"
              element={<MachineLearning />}
            />
            {/* Course Routes */}
            <Route
              path="/courses/Webdev"
              element={
                <PrivateRoute>
                  <WebDevelopmentCourse />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/GEN'AI"
              element={
                <PrivateRoute>
                  <AIMLCourse />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/cybersecurity"
              element={
                <PrivateRoute>
                  <CybersecurityCourse />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/DA"
              element={
                <PrivateRoute>
                  <DataAnalystCourse />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/ML"
              element={
                <PrivateRoute>
                  <MachineLearningCourse />
                </PrivateRoute>
              }
            />
            $newRoute
            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/add-course"
              element={
                <ProtectedAdminRoute>
                  <AdminAddCourse />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <ProtectedAdminRoute>
                  <AdminCourses />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/create-course"
              element={
                <ProtectedAdminRoute>
                  <AdminCourseForm />
                </ProtectedAdminRoute>
              }
            />
          </Routes>

          <ToastContainer position="top-right" autoClose={3000} />
        </AppLayout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
