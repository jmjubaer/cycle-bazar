import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";
const { Content, Sider } = Layout;
const DashboardLayout = () => {
    const user = useAppSelector(selectCurrentUser) as TUser;
    let sidebarItems;
    console.log(user);
    switch ((user as TUser)?.role) {
        case "customer":
            sidebarItems = [
                {
                    key: "Dashboard",
                    label: <NavLink to={`/dashboard`}>Dashboard</NavLink>,
                },
                {
                    key: "/dashboard/orders",
                    label: (
                        <NavLink to={`/dashboard/orders`}>View Order</NavLink>
                    ),
                },
                {
                    key: "/",
                    label: (
                        <NavLink to={`/dashboard/manage-profile`}>
                            Manage Profile
                        </NavLink>
                    ),
                },
            ];
            break;

        case "admin":
            sidebarItems = [
                {
                    key: "Dashboard",
                    label: <NavLink to={`/dashboard`}>Dashboard</NavLink>,
                },
                {
                    key: "/dashboard/manage-users",
                    label: (
                        <NavLink to={`/dashboard/manage-users`}>
                            Manage Products
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
                    key: "/",
                    label: (
                        <NavLink to={`/dashboard/manage-orders`}>
                            Manage Orders
                        </NavLink>
                    ),
                },
            ];
            break;

        case "supperAdmin":
            sidebarItems = [
                {
                    key: "Dashboard",
                    label: <NavLink to={`/dashboard`}>Dashboard</NavLink>,
                },
                {
                    key: "/dashboard/manage-users",
                    label: (
                        <NavLink to={`/dashboard/manage-users`}>
                            Manage Products
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
                    key: "/",
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
        <Layout
            className='h-[calc(100vh-68px)]'
            //  style={{ height: "100%" }}
        >
            <Sider
                className='pt-5'
                style={{
                    // height: "100vh",
                    position: "sticky",
                    top: "0",
                    left: "0",
                    overflow: "auto",
                    scrollbarWidth: "none",
                }}
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
                <Content style={{ margin: "24px 16px 0" }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
