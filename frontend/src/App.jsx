import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Job pages
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";

// Admin/recruiter pages
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import UserManagement from "./pages/UserManagement";
import ManageJobs from "./pages/ManageJobs";
import Reports from "./pages/Reports";

// Profile page
import Profile from "./pages/Profile";

import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />

        {/* Public job routes */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/:id/apply" element={<ApplyJob />} />

        {/* Profile route (protected for all logged-in users) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={["candidate", "recruiter", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Recruiter/Admin routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["recruiter", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/post"
          element={
            <ProtectedRoute roles={["recruiter", "admin"]}>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id/edit"
          element={
            <ProtectedRoute roles={["recruiter", "admin"]}>
              <EditJob />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-jobs"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ManageJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized fallback */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <Footer />
    </>
  );
}