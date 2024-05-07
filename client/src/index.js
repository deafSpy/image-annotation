import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { RouterProvider } from "react-router-dom";
import AppRouter from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from "react-toastify";

import './styles/index.css'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
            {/* <App /> */}
        <RouterProvider router={AppRouter} />
        <ToastContainer />
            
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
