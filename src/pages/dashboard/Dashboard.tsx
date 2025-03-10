import { useEffect } from "react";

const Dashboard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return <div>Dashboard</div>;
};

export default Dashboard;
