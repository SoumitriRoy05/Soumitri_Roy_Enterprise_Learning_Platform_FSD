import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturePage";
import LearningPage from "./pages/LearningPage";
import WorkforcePage from "./pages/WorkforcePage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import StudentHome from "./pages/StudentHome";
import WorkforceDashboard from "./pages/WorkforceDashboard";
import WorkforceHome from "./pages/WorkforceHome";
import StudentFeatures from "./pages/StudentFeatures";
import WorkforceFeatures from "./pages/WorkforceFeatures";
import SandboxPage from "./pages/SandboxPage";
import CoursesPage from "./pages/CoursesPage";
import CertificatesPage from "./pages/CertificatesPage";
import DiscussionsPage from "./pages/DiscussionsPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import ProgressPage from "./pages/ProgressPage";
<<<<<<< HEAD
import Navbar from "./components/Navbar";
import DashboardSidebar from "./components/DashboardSidebar";
import Background from "./components/Background";
import "./styles/dashboard.css";
=======
>>>>>>> c813a36 (Frontend Updates)
import TeamSpace from "./pages/TeamSpace";
import FloatingChatbot from "./components/FloatingChatbot";
import HomePage from "./pages/HomePage";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useAdmin } from "./context/AdminContext";

import LearningPathsPage from "./pages/LearningPathsPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import AIStudyBuddyPage from "./pages/AIStudyBuddyPage";
import OpportunityFeedPage from "./pages/OpportunityFeedPage";
import BadgesPage from "./pages/BadgesPage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import DailyQuestsPage from "./pages/DailyQuestsPage";
import CodeArenaPage from "./pages/CodeArenaPage";
import FlashcardsPage from "./pages/FlashcardsPage";

function ComingSoonPage({ title }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className={`dashboard-page ${isSidebarOpen ? 'with-sidebar' : ''}`}>
      <Background />
      <Navbar 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
        showSidebarToggle={true} 
      />
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="dashboard-content-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', background: 'rgba(18, 18, 30, 0.65)', padding: '60px', borderRadius: '20px', border: '1px solid rgba(0, 229, 255, 0.15)', backdropFilter: 'blur(12px)' }}>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '48px', color: '#00e5ff', marginBottom: '20px' }}>{title}</h1>
          <h2 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '15px' }}>Coming Soon</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '400px', margin: '0 auto' }}>
            We're working hard to bring you this feature. Check back later for updates!
          </p>
        </div>
      </main>
    </div>
  );
}

function AdminProtectedRoute({ children }) {
  const { isAdminAuth } = useAdmin();
  if (!isAdminAuth) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: 'var(--bg-primary)', color: 'var(--accent)',
        fontFamily: 'Orbitron, sans-serif', fontSize: '16px'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const { themeMode, themeAccent } = useAuth();
  const isDashboardRoute = ["/workforce-dashboard", "/workforce-home", "/student-home", "/team-space"].includes(location.pathname);

  // Re-apply theme CSS vars on every route change so theme persists globally
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/student-features" element={<StudentFeatures />} />
        <Route path="/student-hub" element={<StudentFeatures />} />
        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/workforce" element={<WorkforcePage />} />
        <Route path="/work-hub" element={<WorkforcePage />} />
        <Route path="/sandbox" element={<SandboxPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* Admin routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard/*" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />

        {/* Protected routes */}
        {/* /dashboard redirects to student-home */}
        <Route path="/dashboard" element={<Navigate to="/student-home" replace />} />
        <Route path="/workforce-dashboard" element={<ProtectedRoute><WorkforceDashboard /></ProtectedRoute>} />
        <Route path="/student-home" element={<ProtectedRoute><StudentHome /></ProtectedRoute>} />
        <Route path="/workforce-home" element={<ProtectedRoute><WorkforceHome /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/workforce-features" element={<ProtectedRoute><WorkforceFeatures /></ProtectedRoute>} />
        <Route path="/discussions" element={<ProtectedRoute><DiscussionsPage /></ProtectedRoute>} />
        <Route path="/team-space"   element={<ProtectedRoute><TeamSpace /></ProtectedRoute>} />
        <Route path="/resources" element={<Navigate to="/student-home" replace />} />
        <Route path="/certificate" element={<ProtectedRoute><CertificatesPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
        <Route path="/learning-paths" element={<ProtectedRoute><LearningPathsPage /></ProtectedRoute>} />
        <Route path="/assignments" element={<ProtectedRoute><AssignmentsPage /></ProtectedRoute>} />
        <Route path="/ai-buddy" element={<ProtectedRoute><AIStudyBuddyPage /></ProtectedRoute>} />
        <Route path="/ai-study-buddy" element={<ProtectedRoute><AIStudyBuddyPage /></ProtectedRoute>} />
        <Route path="/opportunity-feed" element={<ProtectedRoute><OpportunityFeedPage /></ProtectedRoute>} />
        <Route path="/badges" element={<ProtectedRoute><BadgesPage /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
        <Route path="/daily-quests" element={<ProtectedRoute><DailyQuestsPage /></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>} />
        <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>} />
        <Route path="/code-arena" element={<ProtectedRoute><CodeArenaPage /></ProtectedRoute>} />
        <Route path="/flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
        <Route path="/create-flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
      </Routes>
      {!isDashboardRoute && <FloatingChatbot />}
    </>
  );
}

export default App;
