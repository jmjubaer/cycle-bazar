import { useEffect } from "react";
import { FaMoneyBillWave, FaUserFriends } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import CountUp from "react-countup";
import DashboardChart from "./DashboardChart";
import { useGetActivitySummeryQuery } from "../../../../redux/features/user/userApi";
import { TActivity } from "../../../../types/global.types";
import { useGetTotalRevenueQuery } from "../../../../redux/features/order/orderApi";
const Dashboard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { data: summery } = useGetActivitySummeryQuery(undefined);
    const { data: totalRevenue } = useGetTotalRevenueQuery(undefined);
    const { totalOrders, totalProducts, totalUsers } =
        summery?.data || ({} as TActivity);
    return (
        <div className='p-5'>
            <div className='grid xs:grid-cols-2 overflow-hidden md:grid-cols-4 gap-5'>
                <div className='border-2 bg-primary/10 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5'>
                    <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-300'>
                        <FaUserFriends className='text-2xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-4xl text-gray-600'>
                        <CountUp
                            end={
                                totalUsers?.length > 0 ? totalUsers?.length : 0
                            }
                        />
                    </h3>
                    <p className='font-medium'>Total Users</p>
                </div>
                <div className='border-2 bg-sky-100 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5'>
                    <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-300'>
                        <BsShop className='text-2xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-4xl text-gray-600'>
                        <CountUp
                            end={
                                totalProducts?.length > 0
                                    ? totalProducts?.length
                                    : 0
                            }
                        />
                    </h3>
                    <p className='font-medium'>Total Products</p>
                </div>
                <div  className='border-2 bg-teal-100 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5'>
                    <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-300'>
                        <MdAddShoppingCart className='text-2xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-4xl text-gray-600'>
                        <CountUp
                            end={
                                totalOrders?.length > 0
                                    ? totalOrders?.length
                                    : 0
                            }
                        />
                    </h3>
                    <p className='font-medium'>Total Orders</p>
                </div>
                <div className='border-2 bg-fuchsia-100 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5'>
                    <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-300'>
                        <FaMoneyBillWave className='text-2xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-4xl text-gray-600'>
                        $<CountUp
                            end={
                                totalRevenue?.data > 0 ? totalRevenue?.data : 0
                            }
                        />
                    </h3>
                    <p className='font-medium'>Total Seals</p>
                </div>
            </div>

            <div
             className='mt-5 overflow-auto'>
                <DashboardChart
                    totalUsers={totalUsers || []}
                    totalProducts={totalProducts || []}
                    totalOrders={totalOrders || []}
                />
            </div>
        </div>
    );
};

export default Dashboard;
