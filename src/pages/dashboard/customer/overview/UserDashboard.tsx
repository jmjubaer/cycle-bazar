import { useEffect } from "react";
import { FaCommentDots } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import CountUp from "react-countup";
import { useGetMyOrdersQuery } from "../../../../redux/features/order/orderApi";
import OrderCart from "./OrderChart";
import { useGetMyReviewQuery } from "../../../../redux/features/product/productApi";
const UserDashboard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { data: myOrder } = useGetMyOrdersQuery(undefined);
    const { data: myReview } = useGetMyReviewQuery(undefined);

    return (
        <div className='p-5'>
            <div className='grid grid-cols-2 gap-5'>
                <div
                    data-aos='fade-right'
                    className='border-2 bg-teal-100 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5'>
                    <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-300'>
                        <MdAddShoppingCart className='text-2xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-4xl text-gray-600'>
                        <CountUp
                            end={
                                myOrder?.data.length > 0
                                    ? myOrder?.data.length
                                    : 0
                            }
                        />
                    </h3>
                    <p className='font-medium'>Total Orders</p>
                </div>
                <div
                    data-aos='fade-left'
                    className='border-2 bg-sky-100 border-gray-300 gap-2 rounded-md hover:shadow-xl flex flex-col items-center justify-center p-5'>
                    <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-300'>
                        <FaCommentDots className='text-2xl ' />
                    </div>
                    <h3 className='secondary_font font-bold text-4xl text-gray-600'>
                        <CountUp
                            end={
                                myReview?.data.length > 0
                                    ? myReview?.data.length
                                    : 0
                            }
                        />
                    </h3>
                    <p className='font-medium'>Total Review</p>
                </div>
            </div>

            <div
                // data-aos='flip-up'
                className='mt-5  overflow-auto'>
                <OrderCart totalOrders={myReview?.data || []} />
            </div>
        </div>
    );
};

export default UserDashboard;
