/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Modal } from "antd";
import { useCreateFlashSaleMutation } from "../../../../redux/features/offerProducts/offerApi";
import Swal from "sweetalert2";
type TProps = {
    selectedIds: React.Key[];
    setSelectedIds: React.Dispatch<React.SetStateAction<React.Key[]>>;
};
type TProductForm = {
    discountPercentage: number;
};
const AddOfferProducts = ({ selectedIds, setSelectedIds }: TProps) => {
    const [open, setOpen] = useState(false);
    const [createFlashSale] = useCreateFlashSaleMutation();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TProductForm>();
    // Update product functionality
    const handleAddFlashSale: SubmitHandler<TProductForm> = async (data) => {
        const toastId = toast.loading("Flash sale adding....");
        try {
            const result = await createFlashSale({
                product: selectedIds,
                discountPercentage: Number(data.discountPercentage),
            });
            if (result?.data?.success) {
                toast.success("Offer added successful", { id: toastId });
                reset();
                setSelectedIds([]);
                setOpen(false);
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        }
    };
    const handleOpen = () => {
        if (selectedIds?.length > 0) {
            setOpen(true);
        } else {
            Swal.fire({
                title: "Warning",
                text: "Please Select products",
                icon: "warning",
            });
        }
    };
    return (
        <div className=''>
            <button
                onClick={handleOpen}
                className={`button_primary flex items-center gap-2`}>
                Add Flash Sale
            </button>
            {/* Update product modal */}
            <Modal
                title='Update Product'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <form
                    onSubmit={handleSubmit(handleAddFlashSale)}
                    className=' '>
                    <label
                        className='label_primary text-xl mt-3'
                        htmlFor='discountPercentage'>
                        Discount Percent:
                    </label>
                    <input
                        className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                        id='discountPercentage'
                        placeholder='Discount Percentage...'
                        {...register("discountPercentage", {
                            required: true,
                        })}
                    />
                    {errors.discountPercentage && (
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

export default AddOfferProducts;
