import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { TeamProvider } from './context/TeamContext.js'
import { AuthProvider } from './context/AuthContext.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TeamProvider>
        <App />
      </TeamProvider>
    </AuthProvider>
  </StrictMode>,
)
