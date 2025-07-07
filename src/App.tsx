// src/App.tsx
import { useState } from "react";
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
import { ThemeProvider } from '@/contexts/ThemeContext';
import MockExamRunner from "@/pages/MockExamRunner";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

// Tipagem da sessão
interface Session {
  id: number;
  date: Date;
  stationName: string;
  score: number;
  feedback: string;
}

const App = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

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
                      <Profile sessions={sessions} />
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
                  path="/dashboard/mock-exam-runner"
                  element={
                    <ProtectedRoute>
                      <MockExamRunner />
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
