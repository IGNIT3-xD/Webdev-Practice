import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from './Components/Login';
import LogRegLayout from './Components/LogRegLayout';
import Reg from './Components/Reg';
import Home from './Components/Home';

const router = createBrowserRouter([
  {
    path: "/",
    Component: LogRegLayout,
    children: [
      { path: 'login', Component: Login },
      { path: 'signup', Component: Reg }
    ]
  },
  {
    path: 'home',
    Component: Home
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)