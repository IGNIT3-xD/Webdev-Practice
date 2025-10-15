import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './layouts/Root';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import AuthProvider from './contexts/AuthProvider';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import RequiredAuth from './private routes/RequiredAuth';
import Reviews from './components/Reviews';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'registration', Component: Registration },
      {
        path: 'dashboard',
        element: <RequiredAuth>
          <Dashboard />
        </RequiredAuth>
      },
      {
        path: 'profile',
        element: <RequiredAuth>
          <Profile />
        </RequiredAuth>
      },

      {
        path: "reviews",
        element: <RequiredAuth><Reviews></Reviews></RequiredAuth>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
)
