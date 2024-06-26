import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.context.jsx'
import { ProductProvider } from './context/product.context.jsx'
import { ThisUserProvider } from './context/user.context.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThisUserProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </ThisUserProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>,
)
