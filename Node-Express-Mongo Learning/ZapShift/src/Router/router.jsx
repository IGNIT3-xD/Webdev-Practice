import { createBrowserRouter } from "react-router";
import Root from './../layouts/Root';
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import About from "../pages/About/About";
import Story from "../pages/About/components/Story";
import Mission from './../pages/About/components/Mission';
import Success from './../pages/About/components/Success';
import Teams from './../pages/About/components/Teams';
import AuthLayout from "../layouts/AuthLayout";
import Login from './../pages/Auth/Login';
import Registration from './../pages/Auth/Registration';
import PrivateRoute from './PrivateRoute';
import Rider from './../pages/BeARider/Rider';
import PublicRoute from "./PublicRoute";
import Parcel from './../pages/AddParcel/Parcel';
import Dashboard from './../layouts/Dashboard';
import MyParcels from './../pages/Dashboard/MyParcels';
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/PaymentCancel";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import ApproveRiders from './../pages/Dashboard/ApproveRiders';
import UsersManagment from './../pages/Dashboard/UsersManagment';
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders";
import AssignDeliveries from "../pages/Dashboard/AssignDeliveries";
import RiderRoute from './RiderRoute';
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries";
import TrackAParcel from "../pages/TrackParcel/TrackAParcel";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch('/services.json').then(res => res.json())
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/Warhouses.json').then(res => res.json())
            },
            {
                path: 'about-us',
                Component: About,
                children: [
                    {
                        path: '/about-us/story',
                        Component: Story
                    },
                    {
                        path: '/about-us/mission',
                        Component: Mission
                    },
                    {
                        path: '/about-us/success',
                        Component: Success
                    },
                    {
                        path: '/about-us/teams',
                        Component: Teams
                    }
                ]
            },
            {
                path: 'be-a-rider',
                element: <PrivateRoute><Rider /></PrivateRoute>,
                loader: () => fetch('/Warhouses.json').then(res => res.json())
            },
            {
                path: 'add-parcel',
                element: <PrivateRoute><Parcel /></PrivateRoute>,
                loader: () => fetch('/Warhouses.json').then(res => res.json())
            },
            {
                path: 'track-a-parcel/:trackingId',
                Component: TrackAParcel
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                element: <PublicRoute><Login /></PublicRoute>
            },
            {
                path: 'signup',
                element: <PublicRoute><Registration /></PublicRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: '/dashboard/payment-success',
                Component: PaymentSuccess
            },
            {
                path: '/dashboard/payment-cancel',
                Component: PaymentCancel
            },
            {
                path: '/dashboard/payment-history',
                Component: PaymentHistory
            },
            {
                path: '/dashboard/approve-riders',
                element: <AdminRoute><ApproveRiders /></AdminRoute>
            },
            {
                path: '/dashboard/users-managment',
                element: <AdminRoute><UsersManagment /></AdminRoute>
            },
            {
                path: '/dashboard/assign-riders',
                element: <AdminRoute><AssignRiders /></AdminRoute>
            },
            {
                path: '/dashboard/assign-deliveries',
                element: <RiderRoute><AssignDeliveries /></RiderRoute>
            },
            {
                path: '/dashboard/completed-deliveries',
                element: <RiderRoute><CompletedDeliveries /></RiderRoute>
            }
        ]
    }
]);