import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import StartFreeTrial from './pages/StartFreeTrial';
import MockExams from './pages/MockExams';
import MockExamRunner from './pages/MockExamRunner';
import PacientAI from './pages/PacientAI';

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
    path: '/mock-exam-runner',
    element: <MockExamRunner />,
  },
  {
    path: '/start-free-trial',
    element: <StartFreeTrial />,
  },
  {
    path: '/dashboard/pacient-ai',
    element: <PacientAI />,
  },
]);

export default router;
