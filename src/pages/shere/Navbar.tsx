import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "./../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
    logout,
    selectCurrentUser,
    TUser,
} from "../../redux/features/auth/authSlice";
import { Dropdown, MenuProps } from "antd";
const Navbar = () => {
    const user = useAppSelector(selectCurrentUser) as TUser;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogOut = async () => {
        dispatch(logout());
        navigate("/login");
    };
    const items: MenuProps["items"] = [
        {
            label: <Link to={`/dashboard/${user?.role}`}>Dashboard</Link>,
            key: "dashboard",
        },
        {
            label: <button onClick={() => handleLogOut()}>Log out</button>,
            key: "logout",
        },
    ];

    const menuProps = {
        items,
        // onClick: handleChangeStatus,
    };
    return (
        <header className='overflow-auto text-white z-30 sticky top-0 left-0 bg-black/80 py-2'>
            <div className='container flex items-center justify-between'>
                <Link to={"/"}>
                    <img
                        src={logo}
                        alt='Logo'
                        className='object-cover w-40 -mt-1 h-14'
                    />
                </Link>
                <div className=''>
                    <ul className='flex items-center gap-3 font-medium'>
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
                        </li>{" "}
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
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `transition ${
                                        isActive
                                            ? "text-primary font-bold"
                                            : "hover:text-primary"
                                    }`
                                }
                                to={"/orders"}>
                                Orders
                            </NavLink>
                        </li>
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
                                    to={`/dashboard`}>
                                    Dashboard
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                <div className=''>
                    {user ? (
                        <Dropdown
                            trigger={["click"]}
                            menu={menuProps}
                            // trigger={(item) => handleChangeStatus(item)}
                        >
                            <button className='cursor-pointer'>
                                {/* <Space> */}
                                <FaRegUserCircle className='text-3xl text-primary' />
                                {/* </Space> */}
                            </button>
                        </Dropdown>
                    ) : (
                        // <Link to={`/dashboard/${user.role}`} title='Dashboard'>
                        //     <FaRegUserCircle className='text-3xl text-primary' />
                        // </Link>
                        <Link to={"/login"} className='button_primary'>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
