import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Home from "../pages/home/Home";
import ProductDetails from "../pages/products/ProductDetails";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Checkout from "../pages/checkout/Checkout";
import Order from "../pages/dashboard/customer/Order";
import DashboardLayout from "../components/layout/DashboradLayout";
import ManageProfiles from "../pages/dashboard/manageProfile/ManageProfiles";
import Dashboard from "../pages/dashboard/admin/overview/Dashboard";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageProducts from "../pages/dashboard/admin/mangeProducts/ManageProducts";
import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";
import VerifyPayment from "../pages/checkout/VerifyPayment";
import CreateProduct from "../pages/dashboard/admin/mangeProducts/CreateProduct";
import AboutUs from "../pages/about-us/AboutUs";
import UserDashboard from "../pages/dashboard/customer/overview/UserDashboard";
import Products from "../pages/products/Products";
import ManageOfferProducts from "../pages/dashboard/admin/mangeOffer/ManageOfferProducts";
import OfferProducts from "../pages/offer/OfferProducts";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/bicycles", element: <Products /> },
            { path: "/offer-bicycles", element: <OfferProducts /> },
            { path: "/bicycle/:id", element: <ProductDetails /> },
            { path: "/about-us", element: <AboutUs /> },
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
                path: "/order/verify-payment",
                element: (
                    <ProtectedRoute>
                        <VerifyPayment />
                    </ProtectedRoute>
                ),
            },
            // Sub Layout for dashboard
        ],
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
                path: "/dashboard/admin",
                element: (
                    <ProtectedRoute role='admin'>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dashboard/customer",
                element: (
                    <ProtectedRoute role='customer'>
                        <UserDashboard />
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
                    <ProtectedRoute>
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
                path: "/dashboard/manage-offer",
                element: (
                    <ProtectedRoute role='admin'>
                        <ManageOfferProducts />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dashboard/create-product",
                element: (
                    <ProtectedRoute role='admin'>
                        <CreateProduct />
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
]);

export default router;
