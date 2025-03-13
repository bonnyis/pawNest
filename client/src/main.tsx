import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/providers/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
