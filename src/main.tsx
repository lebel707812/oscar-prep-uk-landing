import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProgressProvider } from './contexts/ProgressContext.tsx';

createRoot(document.getElementById("root")!).render(
  <ProgressProvider>
    <App />
  </ProgressProvider>
);


