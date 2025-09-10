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

// Roadmap pages
import WebDevelopment from "./pages/roadmaps/WebDevelopment";
import AIML from "./pages/roadmaps/GEN'AI";
import Cybersecurity from "./pages/roadmaps/Cybersecurity";
import DataAnalyst from "./pages/roadmaps/DataAnalyst";
import MachineLearning from "./pages/roadmaps/MachineLearning";

// Courses pages
import Courses from "./pages/courses/Courses";
import WebDevelopmentCourse from "./pages/courses/Webdev";
import AIMLCourse from "./pages/courses/GEN'AI";
import CybersecurityCourse from "./pages/courses/cybersecurity";
import DataAnalystCourse from "./pages/courses/DA";
import MachineLearningCourse from "./pages/courses/ML";

// Resume Checker
import ResumeChecker from "./pages/Resumechecker";
import ResumeResult from "./components/ResumeResult";

function AppLayout({ children }) {
  const location = useLocation();
  const noLayoutRoutes = ["/result"]; // Hide Navbar/Footer
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div
      className={`min-h-screen flex flex-col ${hideLayout ? "bg-gray-50" : ""}`}
    >
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        {children}
        <ToastContainer position="top-center" autoClose={3000} />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/contact" element={<Contact />} />
          {/* Roadmap pages */}
          <Route path="/roadmap/web-development" element={<WebDevelopment />} />
          <Route path="/roadmap/GEN'AI" element={<AIML />} />
          <Route path="/roadmap/cybersecurity" element={<Cybersecurity />} />
          <Route path="/roadmap/data-analyst" element={<DataAnalyst />} />
          <Route
            path="/roadmap/machine-learning"
            element={<MachineLearning />}
          />
          {/* Courses */}
          <Route path="/courses" element={<Courses />} />
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
          {/* Resume Checker */}
          <Route
            path="/resume-checker"
            element={
              <PrivateRoute>
                <ResumeChecker />
              </PrivateRoute>
            }
          />
          <Route path="/result" element={<ResumeResult />} /> {/* FULL page */}
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
