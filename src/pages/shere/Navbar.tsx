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
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import { TCategory } from "../../types/prouduct.type";
import { FaAngleDown } from "react-icons/fa6";
const Navbar = () => {
    const user = useAppSelector(selectCurrentUser) as TUser;
    const [control, setControl] = useState(false);
    const { data: categories } = useGetAllCategoriesQuery(undefined);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // Logout function
    const handleLogOut = async () => {
        dispatch(logout());
        navigate("/login");
    };
    // dropdown items
    const UserItems: MenuProps["items"] = [
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

    const CategoryItems: MenuProps["items"] = categories?.data?.map(
        (category: TCategory) => ({
            label: (
                <Link
                    to={`/bicycles?category=${category?.key}`}
                    className='w-[200px] flex gap-5 py-2 border-b -mt-2'>
                    <img src={category?.image} alt='' className='w-10 h-10' />
                    <p className='text-xl text-blue-500'>{category?.name}</p>
                </Link>
            ),
            key: "profile",
        })
    );

    const userMenuProps = {
        items: UserItems,
    };
    const categoryMenuProps = {
        items: CategoryItems,
    };
    // TODO: add 6 menu
    return (
        <header className=' text-white z-30 sticky top-0 left-0 bg-black/80 py-2'>
            <div className='container'>
                <nav className='flex z-50 lg:grid lg:grid-cols-5 justify-between gap-5 items-center'>
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

                    {/* <div className='relative w-ful h-fit '>
                        <IoSearchSharp className='absolute top-1/2 right-2 text-xl text-gray-500 -translate-y-1/2' />
                        <input
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            type='text'
                            className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-3xl'
                            placeholder='Search Bicycles...'
                        />
                    </div> */}
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
                                <Dropdown
                                    trigger={["hover"]}
                                    className='group transition-all duration-500'
                                    menu={categoryMenuProps}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `transition  ${
                                                isActive
                                                    ? "text-primary group font-bold"
                                                    : "hover:text-primary group"
                                            }`
                                        }
                                        to={"/bicycles"}>
                                        <span>All Bicycle</span>{" "}
                                        <FaAngleDown className='inline-block ml-2 group-hover:rotate-180 text-xl transition-all duration-500' />
                                    </NavLink>
                                </Dropdown>
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
                                <Dropdown
                                    trigger={["click"]}
                                    menu={userMenuProps}>
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
