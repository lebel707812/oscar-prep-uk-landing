// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Profile from "@/pages/Profile";
import MockExams from "@/pages/MockExams";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import SessionHistory from "./pages/SessionHistory";
import SessionReview from "./pages/SessionReview";
import PacientAI from "./pages/PacientAI";
import ScenarioLibrary from "./pages/ScenarioLibrary";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import BlogDashboard from "./pages/BlogDashboard";
import BlogEditor from "./pages/BlogEditor";
import ForumIndex from "./pages/ForumIndex";
import ForumTopic from "./pages/ForumTopic";
import ForumNewTopic from "./pages/ForumNewTopic";
import { ThemeProvider } from '@/contexts/ThemeContext';
import MockExamRunner from "@/pages/MockExamRunner";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/mock-exams"
                  element={
                    <ProtectedRoute>
                      <MockExams />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/resources"
                  element={
                    <ProtectedRoute>
                      <Resources />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/scenario-library"
                  element={
                    <ProtectedRoute>
                      <ScenarioLibrary />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/session-history"
                  element={
                    <ProtectedRoute>
                      <SessionHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/session-review/:sessionId"
                  element={
                    <ProtectedRoute>
                      <SessionReview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/pacient-ai"
                  element={
                    <ProtectedRoute>
                      <PacientAI />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mock-exam-runner"
                  element={
                    <ProtectedRoute>
                      <MockExamRunner />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                {/* Forum Routes */}
                <Route path="/forum" element={<ForumIndex />} />
                <Route path="/forum/topic/:slug" element={<ForumTopic />} />
                <Route
                  path="/forum/new-topic"
                  element={
                    <ProtectedRoute>
                      <ForumNewTopic />
                    </ProtectedRoute>
                  }
                />
                {/* Blog Routes */}
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/category/:categorySlug" element={<BlogCategory />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route
                  path="/dashboard/blog"
                  element={
                    <ProtectedRoute>
                      <BlogDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/blog/new"
                  element={
                    <ProtectedRoute>
                      <BlogEditor />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/blog/edit/:id"
                  element={
                    <ProtectedRoute>
                      <BlogEditor />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;