import { createBrowserRouter, Outlet } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import StartFreeTrial from './pages/StartFreeTrial';
import MockExams from './pages/MockExams';
import MockExamRunner from './pages/MockExamRunner';

import ClinicalCases from './pages/ClinicalCases';
import ClinicalCaseDetail from './pages/ClinicalCaseDetail';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import BlogCategory from './pages/BlogCategory';
import BlogDashboard from './pages/BlogDashboard';
import BlogEditor from './pages/BlogEditor';
import LearningHub from './pages/LearningHub';
import LearningTopicDetail from './pages/LearningTopicDetail';
import Layout from './components/ui/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'mock-exams',
        element: <MockExams />,
      },
      {
        path: 'blog',
        element: <BlogDashboard />,
      },
      {
        path: 'blog/new',
        element: <BlogEditor />,
      },
      {
        path: 'blog/edit/:id',
        element: <BlogEditor />,
      },
      {
        path: 'learning-hub',
        element: <LearningHub />,
      },
      {
        path: 'learning-hub/topic/:topicSlug',
        element: <LearningTopicDetail />,
      },
    ],
  },
  {
    path: '/clinical-cases',
    element: <ClinicalCases />,
  },
  {
    path: '/mock-exam-runner',
    element: <MockExamRunner />,
  },
  {
    path: '/clinical-case/:caseId',
    element: <ClinicalCaseDetail />,
  },
  {
    path: '/start-free-trial',
    element: <StartFreeTrial />,
  },
  {
    path: '/blog',
    element: <BlogIndex />,
  },
  {
    path: '/blog/category/:categorySlug',
    element: <BlogCategory />,
  },
  {
    path: '/blog/:slug',
    element: <BlogPost />,
  },
]);

export default router;




