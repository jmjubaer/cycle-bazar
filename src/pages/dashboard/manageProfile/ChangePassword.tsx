/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Modal } from "antd";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
type TProps = {
    status: string;
};
type TNameForm = {
    oldPassword: string;
    newPassword: string;
};
const ChangePassword = ({ status }: TProps) => {
    const [open, setOpen] = useState(false);
    const [changePassword] = useChangePasswordMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TNameForm>();
    // Change password functionality
    const handleChangePassword: SubmitHandler<TNameForm> = async (data) => {
        const toastId = toast.loading("Password changing....", {
            duration: 5000,
        });
        try {
            const result = await changePassword(data);
            if (result?.data?.success) {
                toast.success("Password change successful", { id: toastId });
                setOpen(false);
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
                className='w-full bg-primary hover:bg-primary  font-medium cursor-pointer py-2 px-4 rounded-md'>
                Change Password
            </button>
            {/* Change Password modal */}
            <Modal
                title='Edit Name'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <form
                    onSubmit={handleSubmit(handleChangePassword)}
                    className=' '>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input
                        className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary  p-3 px-0'
                        placeholder='Enter pld password ...'
                        {...register("oldPassword", {
                            required: true,
                        })}
                    />{" "}
                    {errors.oldPassword && (
                        <span className='text-white'>
                            This field is required
                        </span>
                    )}{" "}
                    <input
                        className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary  p-3 px-0'
                        placeholder='Enter new password ...'
                        {...register("newPassword", {
                            required: true,
                        })}
                    />{" "}
                    {errors.newPassword && (
                        <span className='text-white'>
                            This field is required
                        </span>
                    )}
                    <input
                        type='submit'
                        className='button_primary w-full mt-7'
                    />
                </form>
            </Modal>
        </div>
    );
};

export default ChangePassword;
