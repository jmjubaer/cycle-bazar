import { Modal } from "antd";
import { useState } from "react";
import { TOrder } from "../../../types/order.type";
import moment from "moment";
type TProps = {
    item: TOrder;
};
const ViewOrderDetails = ({ item }: TProps) => {
    const [open, setOpen] = useState(false);
    console.log(item);
    return (
        <div className=''>
            <button
                onClick={() => setOpen(true)}
                className='whitespace-nowrap button_primary'>
                View Details
            </button>
            <Modal
                className='order-modal '
                // title='Order Details'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <div
                    className='h-[70vh] overflow-auto'
                    style={{ scrollbarWidth: "none" }}>
                    <h2 className='secondary_font font-medium text-2xl mb-3 text-center'>
                        Order Details
                    </h2>
                    <div className='w-full grid grid-cols-2 gap-5 '>
                        <div className=''>
                            <div className='mt-4 flex items-center gap-5'>
                                <img
                                    src={item?.product?.image}
                                    alt=''
                                    className='w-32 h-32 border border-gray-300 object-cover rounded-md'
                                />
                                <div className=''>
                                    <h3 className='text-xl font-medium secondary_font'>
                                        {item?.product?.name}
                                    </h3>
                                    <p className=' text-xl font-semibold '>
                                        <span className='font-medium text-lg mr-2'>
                                            {" "}
                                            Price:
                                        </span>
                                        ${item?.product?.price}
                                    </p>
                                    <p className=' text-xl '>
                                        <span className='font-medium text-lg mr-2'>
                                            {" "}
                                            Model:
                                        </span>
                                        {item?.product?.model}
                                    </p>
                                    <p className=' text-xl '>
                                        <span className='font-medium text-lg mr-2'>
                                            {" "}
                                            Brand:
                                        </span>
                                        {item?.product?.brand}
                                    </p>
                                </div>
                            </div>
                            <div className='overflow-hidden rounded-lg border mt-5 border-black/10 '>
                                <table className='w-full border border-black/10'>
                                    <tbody>
                                        <tr className='border border-black/10 bg-black/10'>
                                            <th
                                                colSpan={2}
                                                className='border text-lg border-black/10 secondary_font p-2 px-3'>
                                                Order Summary
                                            </th>
                                        </tr>
                                        <tr className='border border-black/10'>
                                            <td className='border w-1/2 border-black/10 p-2 px-3'>
                                                Price
                                            </td>
                                            <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                                ${item?.product?.price}
                                            </td>
                                        </tr>
                                        <tr className='border border-black/10'>
                                            <td className='border w-1/2 border-black/10 p-2 px-3'>
                                                Quantity
                                            </td>
                                            <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                                {item?.product.quantity}
                                            </td>
                                        </tr>
                                        <tr className='border border-black/10'>
                                            <td className='border w-1/2 border-black/10 p-2 px-3'>
                                                Shipping
                                            </td>
                                            <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                                ${"5"}
                                            </td>
                                        </tr>
                                        <tr className='border border-black/10'>
                                            <td className='border font-bold w-1/2 border-black/10 p-2 px-3'>
                                                Total
                                            </td>
                                            <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                                {item?.totalPrice}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <div className='bg-black/10 p-3 rounded-md text-base'>
                                <h2 className='secondary_font font-medium text-xl text-center'>
                                    Delivery Details
                                </h2>
                                <div className='grid grid-cols-2 gap-3 mt-2'>
                                    <p>
                                        <span className='font-medium '>
                                            Name:
                                        </span>{" "}
                                        {item?.deliveryInfo?.name}
                                    </p>
                                    <p>
                                        <span className='font-medium mt-3'>
                                            Number:
                                        </span>{" "}
                                        {item?.deliveryInfo?.phoneNumber}
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 gap-3 mt-2'>
                                    <p>
                                        <span className='font-medium '>
                                            City:
                                        </span>{" "}
                                        {item?.deliveryInfo?.city}
                                    </p>
                                    <p>
                                        <span className='font-medium mt-3'>
                                            District:
                                        </span>{" "}
                                        {item?.deliveryInfo?.district}
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 gap-3 mt-2'>
                                    <p>
                                        <span className='font-medium '>
                                            Thana/Upozila:
                                        </span>{" "}
                                        {item?.deliveryInfo?.thana}
                                    </p>
                                    <p>
                                        <span className='font-medium '>
                                            Postal Code:
                                        </span>{" "}
                                        {item?.deliveryInfo?.postalCode}
                                    </p>
                                </div>
                                <p className='mt-3'>
                                    <span className='font-medium '>
                                        Local Address:
                                    </span>{" "}
                                    {item?.deliveryInfo?.localAddress}
                                </p>
                            </div>

                            <div className='bg-primary/20 rounded-md p-3 mt-3'>
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Payment Status: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {item.paymentStatus}
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Order Status: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {item.status}
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 my-3 justify-between gap-5 items-center '>
                                    <p className='text-lg'>Order Date: </p>
                                    <p className='text-lg font-medium capitalize'>
                                        {moment(item.createdAt).format(
                                            "DD MMM YYYY"
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ViewOrderDetails;
