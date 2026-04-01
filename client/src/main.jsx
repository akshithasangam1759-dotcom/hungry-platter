import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-body)',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#52c98f', secondary: '#0d0d0d' } },
          error: { iconTheme: { primary: '#e05252', secondary: '#0d0d0d' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
