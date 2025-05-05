import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
    logout,
    selectCurrentUser,
    TUser,
} from "../../redux/features/auth/authSlice";
import logo from "./../../assets/logo.png";
import { Dropdown, Layout, Menu, MenuProps } from "antd";
import { FaRegUserCircle } from "react-icons/fa";
const { Content, Sider } = Layout;
const DashboardLayout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
                    key: "/dashboard/manage-offer",
                    label: (
                        <NavLink to={`/dashboard/manage-offer`}>
                            Manage Offer 
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
    const handleLogOut = async () => {
        dispatch(logout());
        navigate("/login");
    };
    const UserItems: MenuProps["items"] = [
        {
            label: (
                <Link className='text-xl' to={`/dashboard/manage-profile`}>
                    My Profile
                </Link>
            ),
            key: "profile",
        },
        {
            label: (
                <div className='text-xl' onClick={() => handleLogOut()}>
                    Log out
                </div>
            ),
            key: "logout",
        },
    ];
    const userMenuProps = {
        items: UserItems,
    };
    return (
        <Layout className='h-[calc(100vh-0px)]'>
            {/* Dashboard Sidebar  */}
            <Sider
                className='pt-5 h-[calc(100vh-0px)]'
                breakpoint='lg'
                collapsedWidth='0'>
                <div className='lg:col-span-2 ml-5 border-b border-gray-500 pb-5 flex gap-2'>
                    <Link to={"/"}>
                        <img
                            src={logo}
                            alt='Logo'
                            className='object-cover w-40 -mt-1 h-14'
                        />
                    </Link>
                </div>
                <Menu
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={["Dashboard"]}
                    items={sidebarItems}
                />
            </Sider>
            <Layout>
                <div className='w-full sticky bg-[#001529] py-3 flex justify-end pr-5'>
                    <Dropdown trigger={["click"]} menu={userMenuProps}>
                        <button className='cursor-pointer'>
                            <FaRegUserCircle className='text-5xl text-primary' />
                        </button>
                    </Dropdown>
                </div>
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
