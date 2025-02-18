import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "./../../assets/logo.png";
const MainLayout = () => {
    // const navigate = useNavigate();
    return (
        <div className='text-white'>
            <header className='overflow-auto z-10 sticky top-0 left-0 bg-black/80 py-2'>
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
                                    to={"/dashboard"}>
                                    Dashboard
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className=''>
                        <Link to={"/login"} className='button_primary'>
                            Login
                        </Link>
                    </div>
                </div>
            </header>
            <main className='min-h-[calc(100vh-100px)]'>
                <div>
                    <Outlet />
                </div>
            </main>
            {/* <footer style={{ textAlign: "center" }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </footer> */}
        </div>
    );
};

export default MainLayout;
