import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/products/ProductDetails";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Checkout from "../pages/checkout/Checkout";
import Order from "../pages/dashboard/customer/Order";
import DashboardLayout from "../components/layout/DashboradLayout";
import ManageProfiles from "../pages/dashboard/manageProfile/ManageProfiles";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageProducts from "../pages/dashboard/admin/ManageProducts";
import ManageOrders from "../pages/dashboard/admin/ManageOrders";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/bicycles", element: <Products /> },
            { path: "/bicycle/:id", element: <ProductDetails /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            {
                path: "/:productId/checkout",
                element: (
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "/dashboard",
                        element: (
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/dashboard/orders",
                        element: (
                            <ProtectedRoute role='customer'>
                                <Order />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/dashboard/manage-profile",
                        element: (
                            <ProtectedRoute role='customer'>
                                <ManageProfiles />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/dashboard/manage-users",
                        element: (
                            <ProtectedRoute role='admin'>
                                <ManageUsers />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/dashboard/manage-products",
                        element: (
                            <ProtectedRoute role='admin'>
                                <ManageProducts />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/dashboard/manage-orders",
                        element: (
                            <ProtectedRoute role='admin'>
                                <ManageOrders />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
        ],
    },
]);

export default router;
