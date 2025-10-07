import { createBrowserRouter } from "react-router";
import Root from './../Layouts/Root';
import Home from "../Pages/Home";
import Products from './../Pages/Products';
import Wishlist from './../Pages/Wishlist';
import ProductDetails from "../Pages/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: 'products', Component: Products },
            { path: 'wishlist', Component: Wishlist },
            { path: 'product/:id', Component: ProductDetails }
        ]
    },
]);