import { lazy } from 'react';

// Lazy loading para componentes pesados
export const LazyDashboard = lazy(() => import('../pages/Dashboard'));
export const LazyGamificationDashboard = lazy(() => import('../pages/GamificationDashboard'));
export const LazyMockExams = lazy(() => import('../pages/MockExams'));
export const LazyBlogIndex = lazy(() => import('../pages/BlogIndex'));
export const LazyBlogPost = lazy(() => import('../pages/BlogPost'));
export const LazyForumIndex = lazy(() => import('../pages/ForumIndex'));
export const LazyForumTopic = lazy(() => import('../pages/ForumTopic'));
export const LazySettings = lazy(() => import('../pages/Settings'));
export const LazyProfile = lazy(() => import('../pages/Profile'));

// Loading component para fallback
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

// Error boundary para lazy components
export const LazyErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">
          We're having trouble loading this page. Please try refreshing.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

