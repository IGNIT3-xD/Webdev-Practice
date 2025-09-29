import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./Components/Home.jsx"
import Blogs from './Components/Blogs';
import Root from './Components/Root.jsx';
import Products from './Components/Products';
import Users from './Components/Users';
import Users2 from './Components/Users2';
import UserDetails from './Components/UserDetails';

const userPromise = fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <h1>Hello World</h1>,
  // },

  {
    path: "app",
    Component: App
  },

  {
    path: "home",
    element: <Home></Home>
  },

  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "blogs", Component: Blogs },
      { path: "products", Component: Products },
      {
        path: "users",
        loader: () => fetch('https://jsonplaceholder.typicode.com/users'),
        Component: Users
      },

      {
        path: "users2",
        element: <Suspense fallback={<h3>Loading...</h3>}>
          <Users2 userPromise={userPromise}></Users2>
        </Suspense>
      },

      {
        path: "users2/:userId",
        loader: ({ params }) => fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`),
        Component: UserDetails
      },

      // {
      //   path: "*",
      //   element: <h1>Error Not Found</h1>,
      // }
    ]
  },

  {
    path: "*",
    element: <h1>Error Not Found</h1>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)