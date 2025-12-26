

import './index.css'

import { RouterProvider } from 'react-router-dom'
import routes from './routes.tsx'
import { createRoot } from 'react-dom/client'
import AuthProvider from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={routes} />
  </AuthProvider>
);

