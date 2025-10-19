import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from './../pages/Home';
import About from './../pages/About';
import Carrer from './../pages/Carrer';
import CatagoryNews from "../components/CatagoryNews";
import NewsDetails from './../pages/NewsDetails';
import AuthLayout from "../layouts/AuthLayout";
import Login from './../pages/Login';
import Reg from './../pages/Reg';
import PrivateRoute from "../private routes/PrivateRoute";
import Loading from "../components/Loading";

export const router = createBrowserRouter([
    {
        hydrateFallbackElement: <Loading />,
        path: "/",
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: 'about', Component: About },
            { path: 'career', Component: Carrer },
            {
                path: 'category/:id',
                Component: CatagoryNews,
                // loader: ({ params }) => fetch(`https://openapi.programming-hero.com/api/news/category/0${params.id}`)
                loader: () => fetch('/news.json')
            },
            {
                path: "*",
                element: <p className="text-center text-2xl my-20 font-bold">404 Page Not Found...</p>,
            }
        ]
    },
    {
        path: 'details/:id',
        element: <PrivateRoute>
            <NewsDetails></NewsDetails>
        </PrivateRoute>,
        loader: () => fetch('/news.json')
    },
    {
        path: 'auth',
        Component: AuthLayout,
        children: [
            { path: '/auth/login', Component: Login },
            { path: '/auth/registration', Component: Reg }
        ]
    },
]);