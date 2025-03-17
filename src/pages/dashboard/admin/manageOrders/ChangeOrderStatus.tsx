/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Modal } from "antd";
import { TOrder } from "../../../../types/order.type";
import { useChangeOrderStatusMutation } from "../../../../redux/features/order/orderApi";
type TProps = {
    item: TOrder;
};
type TNameForm = {
    status: string;
};
const orderStatus = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
];
const ChangeOrderStatus = ({ item }: TProps) => {
    const [open, setOpen] = useState(false);
    const [changeStatus] = useChangeOrderStatusMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TNameForm>();
// Status change function
    const handleChangeStatus: SubmitHandler<TNameForm> = async (data) => {
        const toastId = toast.loading("Status updating....");
        try {
            const result = await changeStatus({
                status: data.status,
                id: item?.key,
            });
            if (result?.data?.success) {
                toast.success("Status updated successful", { id: toastId });
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
                className={`w-full bg-primary hover:bg-primary  font-medium cursor-pointer  px-4 rounded whitespace-nowrap py-1`}>
                Change Status
            </button>
            {/* Status change modal */}
            <Modal
                title='Change Status'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <form onSubmit={handleSubmit(handleChangeStatus)} className=' '>
                    <select
                        className='w-full text-2xl text-black placeholder:text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                        defaultValue={item?.status}
                        {...register("status", {
                            required: true,
                        })}>
                        {orderStatus.map((status) => (
                            <option
                                value={status}
                                className='text-lg capitalize'>
                                {status}
                            </option>
                        ))}
                    </select>
                    {errors.status && (
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

export default ChangeOrderStatus;
