import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import CustomerDashboard from "../pages/dashboard/CustomerDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/dashboard/customer", element: <CustomerDashboard /> },
            { path: "/dashboard/admin", element: <AdminDashboard /> },
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
