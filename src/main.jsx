import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* PER TESTARE FUNZIONI IN LOCALE */
// import { getProjectById } from './api/projects'
// if (import.meta.env.DEV) {
//   window.getProjectById = getProjectById
// }


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
