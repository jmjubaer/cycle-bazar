import { Outlet } from "react-router-dom";
import Navbar from "../../pages/shere/Navbar";
const MainLayout = () => {
    return (
        <div className=''>
            <Navbar />
            <main className='min-h-[calc(100vh-100px)] overflow-auto'>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
