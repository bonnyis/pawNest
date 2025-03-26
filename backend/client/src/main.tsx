import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/providers/App.tsx'
import '@/shared/assets/css/index.css'

createRoot(document.getElementById('root')!).render(
  
    <App />
  
)
