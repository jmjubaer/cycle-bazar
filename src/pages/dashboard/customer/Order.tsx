import moment from "moment";
import { useGetMyOrdersQuery } from "../../../redux/features/order/orderApi";
import { TOrder } from "../../../types/order.type";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import ViewOrderDetails from "../../shere/ViewOrderDetails";

const Order = () => {
    const { data: orderData, isFetching } = useGetMyOrdersQuery(undefined);
    const navigate = useNavigate();
    return (
        <div>
            <h2 className='text-3xl font-semibold text-center secondary_font mb-3'>
                My Orders
            </h2>
            <Spin spinning={isFetching} tip='Loading...' size='large'>
                <div  className=''>
                    {orderData?.data?.length > 0 ? (
                        <div className='grid grid-cols-2 gap-5 items-center justify-between mt-7'>
                            {orderData?.data?.map((order: TOrder) => (
                                <div
                                    key={order?._id}
                                    className='border-2 rounded-xl p-4 border-gray-200'>
                                    <div
                                        key={order?._id}
                                        className='flex gap-3'>
                                        <img
                                            src={order.product.image}
                                            alt=''
                                            className='w-30 h-30 object-cover rounded-xl'
                                        />
                                        <div className=''>
                                            <h3 className='text-xl font-semibold text-center secondary_font'>
                                                {order.product.name}
                                            </h3>
                                            <p className=' font-medium'>
                                                Model: {order.product.model}
                                            </p>
                                            <p className='font-bold text-primary text-2xl'>
                                                ${order.product.price}
                                            </p>
                                            <p className='text-lg font-medium'>
                                                Qty - {order.product.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='bg-primary/20 rounded-md p-3 mt-3'>
                                        <div className='grid grid-cols-2 justify-between gap-5 items-center '>
                                            <p className='text-lg'>Total: </p>
                                            <p className='text-lg font-medium'>
                                                ${order.totalPrice}
                                            </p>
                                        </div>{" "}
                                        <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                            <p className='text-lg'>
                                                Payment Status:{" "}
                                            </p>
                                            <p className='text-lg font-medium capitalize'>
                                                {order.paymentStatus}
                                            </p>
                                        </div>
                                        <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                            <p className='text-lg'>
                                                Order Status:{" "}
                                            </p>
                                            <p className='text-lg font-medium capitalize'>
                                                {order.status}
                                            </p>
                                        </div>
                                        <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                            <p className='text-lg'>
                                                Order Date:{" "}
                                            </p>
                                            <p className='text-lg font-medium capitalize'>
                                                {moment(order.createdAt).format(
                                                    "DD MMM YYYY"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className=' grid grid-cols-2 gap-5 mt-3'>
                                        <ViewOrderDetails
                                            item={order}
                                            type='large'
                                        />
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/${order.product?._id}/checkout`
                                                )
                                            }
                                            className='w-full bg-primary hover:bg-primary  font-medium cursor-pointer py-2 px-4 rounded whitespace-nowrap'>
                                            Buy Again
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-gray-400 text-2xl text-center col-span-3 my-10'>
                            No orders found.
                        </div>
                    )}
                </div>
            </Spin>
        </div>
    );
};

export default Order;
