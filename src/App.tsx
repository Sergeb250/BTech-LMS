import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Courses from "./pages/Courses";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Locked from "./pages/Locked";
import { useAuth } from "./contexts/AuthContext";
import { useEnrollment } from "./hooks/useEnrollment";
import { Navigate, useLocation } from "react-router-dom";
import Settings from "./pages/Settings";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { enrollment, courseLocked } = useEnrollment();
  const location = useLocation();

  if (loading) return null; // Or a loading spinner

  // Always allow access to Auth, Index, and Locked pages
  // Also allow access if authentication is not required for the specific page (handled by page itself usually, but for global lock we care about payment)

  // Strict Payment Lock Check
  // We rely primarily on courseLocked which handles expiration/date logic from useEnrollment
  if (courseLocked && user) {
    const email = user.email;
    const isSuperAdmin = email === 'hacksergeb@gmail.com';
    const isFiston = email === 'intarefiston09@gmail.com';

    if (!isSuperAdmin) {
      if (isFiston) {
        // For Fiston, courseLocked includes the date check (e.g. >= 9th or 21st) logic
        // We do NOT check !payment_verified because he might be verified from previous months
        return <Navigate to="/locked" replace />;
      }

      // For others, strictly check payment verification as well just to be safe
      // or if they are unverified.
      if (!enrollment?.payment_verified) {
        return <Navigate to="/locked" replace />;
      }
    }
  }

  // If user is locked and tries to access /locked, let them (handled by route below)

  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/locked" element={<Locked />} />

            {/* Protected Routes */}
            <Route path="/courses" element={
              <RouteGuard>
                <Courses />
              </RouteGuard>
            } />
            <Route path="/lesson/:dayNumber" element={
              <RouteGuard>
                <Lesson />
              </RouteGuard>
            } />
            <Route path="/profile" element={
              <RouteGuard>
                <Profile />
              </RouteGuard>
            } />
            <Route path="/settings" element={
              <RouteGuard>
                <Settings />
              </RouteGuard>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
