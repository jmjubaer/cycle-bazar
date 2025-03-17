import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaRegUserCircle, FaTimes } from "react-icons/fa";
import logo from "./../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
    logout,
    selectCurrentUser,
    TUser,
} from "../../redux/features/auth/authSlice";
import { Dropdown, MenuProps } from "antd";
import { useState } from "react";
const Navbar = () => {
    const user = useAppSelector(selectCurrentUser) as TUser;
    const [control, setControl] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // Logout function
    const handleLogOut = async () => {
        dispatch(logout());
        navigate("/login");
    };
    // dropdown items
    const items: MenuProps["items"] = [
        {
            label: (
                <Link className='' to={`/dashboard/manage-profile`}>
                    My Profile
                </Link>
            ),
            key: "profile",
        },
        {
            label: (
                <div className='' onClick={() => handleLogOut()}>
                    Log out
                </div>
            ),
            key: "logout",
        },
    ];

    const menuProps = {
        items,
    };
    return (
        <header className=' text-white z-30 sticky top-0 left-0 bg-black/80 py-2'>
            <div className='container'>
                <nav className='flex z-50 lg:grid lg:grid-cols-5 justify-between items-center'>
                    {/* Logo */}
                    <div className='lg:col-span-2 flex gap-2'>
                        <Link to={"/"}>
                            <img
                                src={logo}
                                alt='Logo'
                                className='object-cover w-40 -mt-1 h-14'
                            />
                        </Link>
                    </div>

                    <div
                        className={`jm_nav ${
                            control ? "w-4/5 md:w-1/2 p-5" : "w-0"
                        }`}>
                        {/* Menu item */}
                        <ul className='flex flex-col lg:flex-row gap-3 lg:gap-x-7'>
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        `transition-all ${
                                            isActive
                                                ? "text-primary font-bold"
                                                : "hover:text-primary"
                                        }`
                                    }
                                    to={"/"}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        `transition ${
                                            isActive
                                                ? "text-primary font-bold"
                                                : "hover:text-primary"
                                        }`
                                    }
                                    to={"/bicycles"}>
                                    All Bicycle
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        `transition ${
                                            isActive
                                                ? "text-primary font-bold"
                                                : "hover:text-primary"
                                        }`
                                    }
                                    to={"/about-us"}>
                                    About us
                                </NavLink>
                            </li>
                            {user?.role === "customer" && (
                                <li>
                                    <NavLink to={"/dashboard/orders"}>
                                        Orders
                                    </NavLink>
                                </li>
                            )}
                            {user && (
                                <li>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `transition ${
                                                isActive
                                                    ? "text-primary font-bold"
                                                    : "hover:text-primary"
                                            }`
                                        }
                                        to={`/dashboard/${user?.role}`}>
                                        Dashboard
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                        <div className='flex-row-reverse flex lg:flex-row justify-end lg:mt-0 mt-5 items-center gap-5'>
                            {/* User dropdown when use is login */}
                            {user ? (
                                <Dropdown trigger={["click"]} menu={menuProps}>
                                    <button className='cursor-pointer'>
                                        <FaRegUserCircle className='text-3xl text-primary' />
                                    </button>
                                </Dropdown>
                            ) : (
                                <Link to={"/login"} className='button_primary'>
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                    {/* small screen toggle button */}
                    <button
                        onClick={() => setControl(!control)}
                        className='block lg:hidden'>
                        {control ? <FaTimes /> : <FaBars />}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
