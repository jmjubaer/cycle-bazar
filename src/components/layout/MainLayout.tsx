import { Outlet } from "react-router-dom";
import Navbar from "../../pages/shere/Navbar";
const MainLayout = () => {
    // const navigate = useNavigate();
    return (
        <div className=''>
            <Navbar />
            <main className='min-h-[calc(100vh-100px)] overflow-auto'>
                <Outlet />
            </main>
            {/* <footer style={{ textAlign: "center" }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </footer> */}
        </div>
    );
};

export default MainLayout;
