import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import StartFreeTrial from './pages/StartFreeTrial';
import MockExams from './pages/MockExams';
import MockExamRunner from './pages/MockExamRunner';
import PacientAI from './pages/PacientAI';
import ScenarioLibrary from './pages/ScenarioLibrary';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import BlogCategory from './pages/BlogCategory';

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
  },
  {
    path: '/dashboard/mock-exams',
    element: <MockExams />,
  },
  {
    path: '/dashboard/scenario-library',
    element: <ScenarioLibrary />,
  },
  {
    path: '/mock-exam-runner',
    element: <MockExamRunner />,
  },
  {
    path: '/start-free-trial',
    element: <StartFreeTrial />,
  },
  {
    path: '/dashboard/pacient-AI',
    element: <PacientAI />,
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


