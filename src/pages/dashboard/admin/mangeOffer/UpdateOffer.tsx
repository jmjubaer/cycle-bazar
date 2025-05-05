/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Modal } from "antd";
import { TOfferProduct } from "../../../../types/prouduct.type";
import { useUpdateFlashSaleMutation } from "../../../../redux/features/offerProducts/offerApi";
type TProps = {
    item: TOfferProduct;
};
type TProductForm = {
    discountPercentage: number;
};
const UpdateOffer = ({ item }: TProps) => {
    const [open, setOpen] = useState(false);
    const [updateFlashSale] = useUpdateFlashSaleMutation();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TProductForm>();
    // Update product functionality
    const handleUpdateFlashSale: SubmitHandler<TProductForm> = async (data) => {
        const toastId = toast.loading("Bicycle updating....");
        try {
            const result = await updateFlashSale({
                data,
                id: item?.key,
            });
            console.log(result);
            if (result?.data?.success) {
                toast.success("Bicycle updated successful", { id: toastId });
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
                className={`w-full bg-primary hover:bg-primary  font-medium cursor-pointer  px-4 rounded whitespace-nowrap py-1`}>
                Update Offer
            </button>
            {/* Update product modal */}
            <Modal
                title='Update Product'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <form
                    onSubmit={handleSubmit(handleUpdateFlashSale)}
                    className=' '>
                    <label
                        className='label_primary text-xl mt-3'
                        htmlFor='discountPercentage'>
                        Discount Percent:
                    </label>
                    <input
                        className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                        id='discountPercentage'
                        defaultValue={item?.discountPercentage}
                        placeholder='Discount Percentage...'
                        {...register("discountPercentage", {
                            required: {
                                value: true,
                                message: "Discount percentage is required",
                            },
                            min: {
                                value: 1,
                                message: "Discount must be at least 1%",
                            },
                            max: {
                                value: 100,
                                message: "Discount can't exceed 100%",
                            },
                        })}
                    />
                    {errors.discountPercentage && (
                        <span className='text-red-500'>
                            {errors.discountPercentage.message}
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

export default UpdateOffer;
