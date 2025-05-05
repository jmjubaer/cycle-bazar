/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBicycleByIdQuery } from "../../redux/features/product/productApi";
import { FaCheckCircle, FaMinus, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import surjopay from "../../assets/shurjoPay.png";
import cod from "../../assets/cod.png";
import { useCreateOrderMutation } from "../../redux/features/order/orderApi";
import { useGetMeQuery } from "../../redux/features/user/userApi";
import { TDeliveryInfo } from "../../types/order.type";
import { Spin } from "antd";
import { TResponse } from "../../types/global.types";
type TOrderResponse = {
    data: {
        paymentUrl: string;
    };
    success: boolean;
};
const Checkout = () => {
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();
    const { data: product } = useGetBicycleByIdQuery(productId);
    const [createOrder] = useCreateOrderMutation();
    const { data: currentUser } = useGetMeQuery(undefined);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TDeliveryInfo>();
    const onSubmit: SubmitHandler<TDeliveryInfo> = async (data) => {
        const toastId = toast.success("Order placing....");
        setLoading(true);
        try {
            if (!paymentMethod) {
                return toast.error("Please select a payment method", {
                    id: toastId,
                });
            }
            const orderData = {
                user: currentUser?.data?._id,
                product: productId,
                quantity,
                totalPrice: product?.data?.price * quantity + 5,
                paymentMethod,
                deliveryInfo: {
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    localAddress: data.localAddress,
                    city: data.city,
                    district: data.district,
                    thana: data.thana,
                    postalCode: Number(data.postalCode),
                },
            };
            const result = (await createOrder(
                orderData
            )) as TResponse<TOrderResponse>;
            if (result?.data?.success) {
                toast.success("Order placed successfully!", { id: toastId });
                reset();
                if (result?.data?.data?.paymentUrl) {
                    window.open(result?.data?.data?.paymentUrl, "_self");
                    setLoading(false);
                } else {
                    setLoading(false);
                    navigate("/bicycles");
                }
            } else if (result?.error) {
                toast.error(
                    result?.error?.data?.message || "Failed to place order",
                    { id: toastId }
                );
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message, { id: toastId });
        }
    };
    useEffect(() => {
        if (quantity == 0) {
            setQuantity(1);
        }
    }, [quantity]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);
    return (
        <Spin
            spinning={loading}
            tip='Loading...'
            size='large'
            className='w-full'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='container overflow-hidden grid md:grid-cols-2 xs:gap-5 gap-3 py-5 items-center'>
                
            {/* Delivery Info section */}
                <div
                    data-aos='fade-right'
                    className=' border border-gray-300 rounded-xl p-3 xs:p-5'>
                    <h2 className='secondary_font font-medium text-2xl text-center'>
                        Delivery Address
                    </h2>
                    <div data-aos='fade-up' data-aos-delay='200' className=''>
                        <label className='label_primary my-3 '>Name:*</label>
                        <input
                            placeholder='Enter Your Name'
                            className='input_primary'
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {errors.name && (
                            <p className='text-red-500 mt-1'>
                                This field is required
                            </p>
                        )}{" "}
                    </div>
                    <div data-aos='fade-up' data-aos-delay='300' className=''>
                        <label className=' mt-5 label_primary'>Phone:*</label>
                        <input
                            placeholder='Enter Your phone           '
                            className='input_primary mt-3'
                            {...register("phoneNumber", {
                                required: true,
                            })}
                        />
                        {errors.phoneNumber && (
                            <p className='text-red-500 mt-1'>
                                This field is required
                            </p>
                        )}
                    </div>
                    <div
                        data-aos='fade-up'
                        data-aos-delay='300'
                        className='grid xs:grid-cols-2 xs:gap-3'>
                        <div className=''>
                            <label className=' mt-5 label_primary'>
                                City:*
                            </label>
                            <input
                                placeholder='Enter Your City           '
                                className='input_primary mt-3'
                                {...register("city", {
                                    required: true,
                                })}
                            />
                            {errors.city && (
                                <p className='text-red-500 mt-1'>
                                    This field is required
                                </p>
                            )}
                        </div>{" "}
                        <div className=''>
                            <label className=' mt-5 label_primary'>
                                District:*
                            </label>
                            <input
                                placeholder='Enter Your District           '
                                className='input_primary mt-3'
                                {...register("district", {
                                    required: true,
                                })}
                            />
                            {errors.district && (
                                <p className='text-red-500 mt-1'>
                                    This field is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div
                        data-aos='fade-up'
                        data-aos-delay='400'
                        className='grid xs:grid-cols-2 xs:gap-3'>
                        <div className=''>
                            <label className=' mt-5 label_primary'>
                                Thana/Upazila:*
                            </label>
                            <input
                                placeholder='Enter Thana/Upazila..           '
                                className='input_primary mt-3'
                                {...register("thana", {
                                    required: true,
                                })}
                            />
                            {errors.thana && (
                                <p className='text-red-500 mt-1'>
                                    This field is required
                                </p>
                            )}
                        </div>{" "}
                        <div className=''>
                            <label className=' mt-5 label_primary'>
                                Postal Code:*
                            </label>
                            <input
                                placeholder='Enter Postal Code           '
                                className='input_primary mt-3'
                                {...register("postalCode", {
                                    required: true,
                                })}
                            />
                            {errors.city && (
                                <p className='text-red-500 mt-1'>
                                    This field is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div data-aos='fade-up' data-aos-delay='400' className=''>
                        <label className=' mt-5 label_primary'>
                            Local Address:*
                        </label>
                        <input
                            placeholder='Enter Your Address'
                            className='input_primary mt-3'
                            {...register("localAddress", {
                                required: true,
                            })}
                        />
                        {errors.localAddress && (
                            <p className='text-red-500 mt-1'>
                                This field is required
                            </p>
                        )}
                    </div>
                </div>
            {/* Product Info section */}

                <div className='lg:w-4/5 mx-auto'>
                    <h2 className='secondary_font font-medium text-2xl text-center'>
                        Product Details
                    </h2>
                    <div
                        data-aos='fade-up'
                        data-aos-delay='200'
                        className='mt-4 flex items-center gap-3 xs:gap-5'>
                        <img
                            src={product?.data?.image}
                            alt=''
                            className='w-28 h-28 border border-gray-300 object-cover rounded-md'
                        />
                        <div className=''>
                            <h3 className='text-xl font-medium secondary_font'>
                                {product?.data?.name}
                            </h3>
                            <p className='my-1 text-xl font-semibold '>
                                <span className='font-medium text-lg mr-2'>
                                    {" "}
                                    Price:
                                </span>
                                ${product?.data?.price}
                            </p>
                            <div className='flex items-center gap-2'>
                                <button
                                    onClick={() =>
                                        setQuantity(
                                            quantity > 1
                                                ? quantity - 1
                                                : quantity
                                        )
                                    }
                                    type='button'
                                    className='bg-black/10 cursor-pointer p-3 rounded'>
                                    <FaMinus />
                                </button>
                                <input
                                    type='number'
                                    min='1'
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value))
                                    }
                                    // defaultValue={quantity}
                                    value={quantity || 1}
                                    className='input_primary w-40'
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    type='button'
                                    className='bg-black/10 cursor-pointer p-3 rounded'>
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        data-aos='fade-up'
                        data-aos-delay='300'
                        className='overflow-hidden rounded-lg border mt-5 border-black/10 '>
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
                                        ${product?.data?.price}
                                    </td>
                                </tr>
                                <tr className='border border-black/10'>
                                    <td className='border w-1/2 border-black/10 p-2 px-3'>
                                        Quantity
                                    </td>
                                    <td className='border w-1/2 font-bold border-black/10 p-2 px-3'>
                                        {quantity}
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
                                        ${product?.data?.price * quantity + 5}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2
                        data-aos='fade-up'
                        data-aos-delay='400'
                        className='secondary_font font-medium text-2xl mt-4'>
                        Payment Method
                    </h2>

                    <div
                        data-aos='fade-up'
                        data-aos-delay='400'
                        className='flex items-center gap-3 xs:gap-5 mt-3'>
                        <button
                            type='button'
                            onClick={() => setPaymentMethod("surjopay")}
                            className='border-2 relative cursor-pointer overflow-hidden border-gray-300 rounded-md px-3 py-1'>
                            <img
                                src={surjopay}
                                alt=''
                                className='w-[130px] p-1 h-10'
                            />
                            {paymentMethod === "surjopay" && (
                                <FaCheckCircle className='absolute text-2xl text-green-600 top-1/2 -translate-y-1/2 left-3 bg-white rounded-full' />
                            )}
                        </button>
                        <button
                            type='button'
                            onClick={() => setPaymentMethod("COD")}
                            className='border-2 relative cursor-pointer overflow-hidden border-gray-300 rounded-md px-3 py-1'>
                            <img
                                src={cod}
                                alt=''
                                className='w-[130px] p-1 h-10'
                            />
                            {paymentMethod === "COD" && (
                                <FaCheckCircle className='absolute text-2xl text-green-600 top-1/2 -translate-y-1/2 left-3 bg-white rounded-full' />
                            )}
                        </button>
                    </div>

                    <button
                        data-aos='fade-up'
                        type='submit'
                        className='button_primary_md w-full mt-5'>
                        Order Now
                    </button>
                </div>
            </form>
        </Spin>
    );
};

export default Checkout;
