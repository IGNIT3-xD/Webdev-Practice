import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from './../pages/Home';
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllProducts from './../pages/AllProducts';
import MyProducts from './../pages/MyProducts';
import MyBids from './../pages/MyBids';
import CreateProducts from './../pages/CreateProducts';
import PrivateRoute from "../private routes/PrivateRoute";
import PublicRoute from "../public route/PublicRoute";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
    {
        hydrateFallbackElement: <p className="text-2xl font-bold text-center my-20">Loading...</p>,
        path: "/",
        errorElement: <p className="text-3xl font-bold my-20 text-center text-red-700">Error 401. Unauthorized Access</p>,
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch('http://localhost:5000/recent-products'),
                hydrateFallbackElement: <p className="text-2xl font-bold text-center my-20">Loading...</p>
            },
            {
                path: 'login',
                element: <PublicRoute>
                    <Login></Login>
                </PublicRoute>
            },
            {
                path: 'register',
                element: <PublicRoute>
                    <Register></Register>
                </PublicRoute>
            },

            {
                path: 'all-products',
                element: <AllProducts />,
                loader: () => fetch('http://localhost:5000/products'),
                hydrateFallbackElement: <p className="text-2xl font-bold text-center my-20">Loading...</p>
            },
            {
                path: 'products/:id',
                element: <PrivateRoute>
                    <ProductDetails />
                </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`),
                hydrateFallbackElement: <p className="text-2xl font-bold text-center my-20">Loading...</p>
            },
            {
                path: 'my-products',
                element: <PrivateRoute>
                    <MyProducts />
                </PrivateRoute>
            },
            {
                path: 'my-bids',
                element: <PrivateRoute>
                    <MyBids />
                </PrivateRoute>
            },
            {
                path: 'create-products',
                element: <PrivateRoute>
                    <CreateProducts />
                </PrivateRoute>
            },
            {
                path: '*',
                element: <p className="text-3xl font-bold my-20 text-center text-red-700">Error 404</p>
            }
        ]
    },
]);