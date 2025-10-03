import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from '../src/Layouts/Root';
import About from './Component/About';
import Contact from './Component/Contact';
import Home from './Component/Home';
import WordsByLevel from './Component/WordsByLevel';
import Loading from './Component/Loading';

const router = createBrowserRouter([
  {
    hydrateFallbackElement: <Loading></Loading>,
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home, loader: () => fetch('https://openapi.programming-hero.com/api/levels/all') },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "level/:levelId", Component: WordsByLevel, loader: ({ params }) => fetch(`https://openapi.programming-hero.com/api/level/${params.levelId}`) },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)