import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
// import { useAuth } from "./contexts/AuthContext";
// import { useEnrollment } from "./hooks/useEnrollment";
import { useLocation } from "react-router-dom";

// RouteGuard simplified to just render children directly for Open Access
const RouteGuard = ({ children }: { children: React.ReactNode }) => {
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
            {/* Auth and Locked routes removed */}

            {/* Routes are now open */}
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
