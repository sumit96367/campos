import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFFDF7',
              color: '#2B2622',
              fontFamily: '"Jost", sans-serif',
              fontSize: '14px',
              borderRadius: '2px',
              border: '1px solid #F1E8D4',
              boxShadow: '0 8px 40px rgba(43, 38, 34, 0.12)',
              padding: '16px 20px',
            },
            success: { iconTheme: { primary: '#B8963E', secondary: '#FFFDF7' } },
            error: { iconTheme: { primary: '#5B1F2B', secondary: '#FFFDF7' } },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
