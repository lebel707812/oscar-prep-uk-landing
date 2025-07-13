import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProgressProvider } from './contexts/ProgressContext.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <NotificationProvider>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </NotificationProvider>
  </ErrorBoundary>
);


