import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import CustomerDashboard from "../pages/dashboard/CustomerDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/products/ProductDetails";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Checkout from "../pages/checkout/Checkout";

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
                path: "/dashboard/customer",
                element: (
                    <ProtectedRoute role='customer'>
                        <CustomerDashboard />{" "}
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dashboard/admin",
                element: (
                    <ProtectedRoute role='admin'>
                        <AdminDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/:productId/checkout",
                element: (
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    // {
    //     path: "/login",
    //     element: <Login />,
    // },
    // {
    //     path: "/signup",
    //     element: <SignUp />,
    // },
]);

export default router;
