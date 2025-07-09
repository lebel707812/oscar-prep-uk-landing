// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Suspense } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from '@/contexts/ThemeContext';

// Lazy imports para otimização de performance
import {
  LazyDashboard,
  LazyGamificationDashboard,
  LazyMockExams,
  LazyBlogIndex,
  LazyBlogPost,
  LazyForumIndex,
  LazyForumTopic,
  LazySettings,
  LazyProfile,
  LoadingSpinner
} from "@/components/LazyComponents";

// Lazy loading para outras páginas
import { lazy } from 'react';
const LazyResources = lazy(() => import("./pages/Resources"));
const LazySessionHistory = lazy(() => import("./pages/SessionHistory"));
const LazySessionReview = lazy(() => import("./pages/SessionReview"));
const LazyPacientAI = lazy(() => import("./pages/PacientAI"));
const LazyScenarioLibrary = lazy(() => import("./pages/ScenarioLibrary"));
const LazyBlogCategory = lazy(() => import("./pages/BlogCategory"));
const LazyBlogDashboard = lazy(() => import("./pages/BlogDashboard"));
const LazyBlogEditor = lazy(() => import("./pages/BlogEditor"));
const LazyForumNewTopic = lazy(() => import("./pages/ForumNewTopic"));
const LazyMockExamRunner = lazy(() => import("./pages/MockExamRunner"));

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
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <LazyDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/profile"
                    element={
                      <ProtectedRoute>
                        <LazyProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/mock-exams"
                    element={
                      <ProtectedRoute>
                        <LazyMockExams />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/resources"
                    element={
                      <ProtectedRoute>
                        <LazyResources />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/scenario-library"
                    element={
                      <ProtectedRoute>
                        <LazyScenarioLibrary />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/session-history"
                    element={
                      <ProtectedRoute>
                        <LazySessionHistory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/gamification"
                    element={
                      <ProtectedRoute>
                        <LazyGamificationDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/session-review/:sessionId"
                    element={
                      <ProtectedRoute>
                        <LazySessionReview />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/pacient-ai"
                    element={
                      <ProtectedRoute>
                        <LazyPacientAI />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/mock-exam-runner"
                    element={
                      <ProtectedRoute>
                        <LazyMockExamRunner />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/settings"
                    element={
                      <ProtectedRoute>
                        <LazySettings />
                      </ProtectedRoute>
                    }
                  />
                  {/* Forum Routes */}
                  <Route path="/forum" element={<LazyForumIndex />} />
                  <Route path="/forum/topic/:slug" element={<LazyForumTopic />} />
                  <Route
                    path="/forum/new-topic"
                    element={
                      <ProtectedRoute>
                        <LazyForumNewTopic />
                      </ProtectedRoute>
                    }
                  />
                  {/* Blog Routes */}
                  <Route path="/blog" element={<LazyBlogIndex />} />
                  <Route path="/blog/category/:categorySlug" element={<LazyBlogCategory />} />
                  <Route path="/blog/artigo/:id" element={<LazyBlogPost />} />
                  <Route path="/blog/:slug" element={<LazyBlogPost />} /> {/* Backward compatibility */}
                  <Route
                    path="/dashboard/blog"
                    element={
                      <ProtectedRoute>
                        <LazyBlogDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/blog/new"
                    element={
                      <ProtectedRoute>
                        <LazyBlogEditor />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/blog/edit/:id"
                    element={
                      <ProtectedRoute>
                        <LazyBlogEditor />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

