/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "../../../redux/features/user/userApi";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { TUser } from "../../../types/global.types";
type TProps = {
    data: TUser;
};
type TNameForm = {
    name: string;
    phone: string;
    city: string;
    district: string;
    thana: string;
    postalCode: string;
    localAddress: string;
};
const UpdateProfile = ({ data }: TProps) => {
    const [open, setOpen] = useState(false);
    const [updateProfile] = useUpdateProfileMutation();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TNameForm>();
    // Update name functionality
    const handleUpdateProfile: SubmitHandler<TNameForm> = async (data) => {
        const toastId = toast.loading("Profile updating....");
        try {
            const result = await updateProfile(data);
            console.log(result);
            if (result?.data?.success) {
                toast.success("Profile updated successfully", { id: toastId });
                setOpen(false);
                reset();
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        }
    };
    return (
        <div className=''>
            <button
                onClick={() => setOpen(true)}
                disabled={status === "blocked"}
                className='w-full bg-primary flex items-center gap-2 hover:bg-white border border-primary  font-medium cursor-pointer py-2 px-4 rounded-md'>
                <FaEdit /> <span className="hidden sm:block">Edit Profile</span>
            </button>
            {/* Update name modal */}
            <Modal
                title='Update Profile'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <form
                    onSubmit={handleSubmit(handleUpdateProfile)}
                    className=' '>
                    {/* register your input into the hook by invoking the "register" function */}
                    <div className='mt-5'>
                        <label htmlFor='name' className='text-lg font-medium'>
                            Name
                        </label>
                        <input
                            className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary py-2 p-3 px-0'
                            placeholder='Enter new name ...'
                            {...register("name", {
                                required: true,
                            })}
                            defaultValue={data?.name}
                        />{" "}
                        {errors.name && (
                            <span className='text-white'>
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='phone' className='text-lg font-medium'>
                            Phone
                        </label>
                        <input
                            className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary py-2 p-3 px-0'
                            placeholder='Enter phone ...'
                            {...register("phone", {
                                required: true,
                            })}
                            defaultValue={data?.phone}
                        />{" "}
                        {errors.phone && (
                            <span className='text-white'>
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className='space-y-3 md:space-y-3  mt-3 '>
                        <div>
                            <label
                                htmlFor='city'
                                className='text-lg font-medium'>
                                City
                            </label>
                            <input
                                className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary py-2 p-3 px-0 '
                                {...register("city", {
                                    required: "City is Required!",
                                })}
                                defaultValue={data?.city}
                                type='text'
                                placeholder='Your City'
                            />
                            {errors.city && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.city.message}
                                </p>
                            )}
                        </div>{" "}
                        <div>
                            <label
                                htmlFor='district'
                                className='text-lg font-medium'>
                                District
                            </label>
                            <input
                                className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary py-2 p-3 px-0'
                                {...register("district", {
                                    required: "District is Required!",
                                })}
                                defaultValue={data?.district}
                                type='text'
                                placeholder='Your district'
                            />
                            {errors.district && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.district.message}
                                </p>
                            )}
                        </div>
                        <div className='grid xs:grid-cols-2 xs:gap-2'>
                            <div>
                                <label
                                    htmlFor='thana'
                                    className='text-lg font-medium'>
                                    Thana
                                </label>
                                <input
                                    className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary py-2 p-3 px-0'
                                    {...register("thana", {
                                        required: "Thana is Required!",
                                    })}
                                    defaultValue={data?.thana}
                                    placeholder='Your Thana'
                                />
                                {errors.thana && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {errors.thana.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor='postalCode'
                                    className='text-lg font-medium'>
                                    Postal Code
                                </label>
                                <input
                                    className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary py-2 p-3 px-0'
                                    {...register("postalCode", {
                                        required: "Postal Code is Required!",
                                    })}
                                    defaultValue={data?.postalCode}
                                    type='number'
                                    placeholder='Your Postal Code'
                                />
                                {errors.postalCode && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {errors.postalCode.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='localAddress'
                                className='text-lg font-medium'>
                                Local Address
                            </label>
                            <input
                                className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary py-2 p-3 px-0'
                                {...register("localAddress", {
                                    required: "Local address is Required!",
                                })}
                                defaultValue={data?.localAddress}
                                placeholder='Your Local address'
                            />
                            {errors.localAddress && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.localAddress.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <input
                        type='submit'
                        className='button_primary w-full mt-7'
                    />
                </form>
            </Modal>
        </div>
    );
};

export default UpdateProfile;
