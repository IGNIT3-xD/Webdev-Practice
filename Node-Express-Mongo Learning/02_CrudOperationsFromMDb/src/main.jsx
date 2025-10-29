import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import UserDetails from './components/UserDetails.jsx';
import Update from './components/Update';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App
  },
  {
    path: "users/:id",
    Component: UserDetails,
    loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`)
  },
  {
    path: "update/:id",
    Component: Update,
    loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`)
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
