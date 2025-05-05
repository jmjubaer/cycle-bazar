"use client"
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;
const DashboardLayout = () => {
    const user = useAppSelector(selectCurrentUser) as TUser;
    let sidebarItems;
    switch ((user as TUser)?.role) {
        case "customer":
            sidebarItems = [
                {
                    key: "/dashboard",
                    label: (
                        <NavLink to={`/dashboard/customer`}>Dashboard</NavLink>
                    ),
                },
                {
                    key: "/dashboard/manage-profile",
                    label: (
                        <NavLink to={`/dashboard/manage-profile`}>
                            My Profile
                        </NavLink>
                    ),
                },
                {
                    key: "/dashboard/orders",
                    label: (
                        <NavLink to={`/dashboard/orders`}>View Order</NavLink>
                    ),
                },
            ];
            break;

        case "admin":
            sidebarItems = [
                {
                    key: "/dashboard",
                    label: <NavLink to={`/dashboard/admin`}>Dashboard</NavLink>,
                },
                {
                    key: "/dashboard/manage-profile",
                    label: (
                        <NavLink to={`/dashboard/manage-profile`}>
                            My Profile
                        </NavLink>
                    ),
                },
                {
                    key: "/dashboard/manage-users",
                    label: (
                        <NavLink to={`/dashboard/manage-users`}>
                            Manage Users
                        </NavLink>
                    ),
                },
                {
                    key: "/dashboard/manage-products",
                    label: (
                        <NavLink to={`/dashboard/manage-products`}>
                            Manage Products
                        </NavLink>
                    ),
                },
                {
                    key: "/dashboard/create-product",
                    label: (
                        <NavLink to={`/dashboard/create-product`}>
                            Create Product
                        </NavLink>
                    ),
                },
                {
                    key: "/dashboard/manage-orders",
                    label: (
                        <NavLink to={`/dashboard/manage-orders`}>
                            Manage Orders
                        </NavLink>
                    ),
                },
            ];
            break;

        default:
            break;
    }
    return (
        <Layout className='h-[calc(100vh-68px)]'>
            {/* Dashboard Sidebar  */}
            <Sider
                className='pt-5 h-[calc(100vh-68px)]'
                breakpoint='lg'
                collapsedWidth='0'>
                <Menu
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={["Dashboard"]}
                    items={sidebarItems}
                />
            </Sider>
            <Layout>
                {/* Dashboard Body  */}
                <Content
                    className='h-[calc(100vh-69px)] overflow-auto p-2'
                    style={{ scrollbarWidth: "none" }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
