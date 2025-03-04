/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateMyNameMutation } from "../../../redux/features/user/userApi";
import { Modal } from "antd";
type TProps = {
    name: string;
    status: string;
};
type TNameForm = {
    name: string;
};
const UpdateName = ({ name, status }: TProps) => {
    const [open, setOpen] = useState(false);
    const [updateName] = useUpdateMyNameMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TNameForm>();
    const handleChangeName: SubmitHandler<TNameForm> = async (data) => {
        const toastId = toast.loading("Name updating....");
        try {
            const result = await updateName(data);
            if (result?.data?.success) {
                toast.success("Name updated successfully", { id: toastId });
                setOpen(false);
            }
        } catch (error: any) {
            toast.loading(error.message, { id: toastId });
        }
    };
    return (
        <div className=''>
            <button
                onClick={() => setOpen(true)}
                disabled={status === "blocked"}
                className='w-full bg-primary hover:bg-primary  font-medium cursor-pointer py-2 px-4 rounded-md'>
                Edit Name
            </button>
            <Modal
                title='Edit Name'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <form onSubmit={handleSubmit(handleChangeName)} className=' '>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input
                        className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary  p-3 px-0'
                        placeholder='Enter new name ...'
                        {...register("name", {
                            required: true,
                        })}
                        defaultValue={name}
                    />{" "}
                    {errors.name && (
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

export default UpdateName;
