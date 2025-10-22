import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { RouterProvider } from 'react-router/dom'
import router from './router/router.js'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster 
      position="top-center"
      toastOptions={{
        duration: 4000,
      }}
    />
  </StrictMode>,
)
