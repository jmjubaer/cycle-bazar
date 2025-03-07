/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Modal } from "antd";
import { TProduct } from "../../../../types/prouduct.type";
import { useUpdateBicycleMutation } from "../../../../redux/features/product/productApi";
type TProps = {
    item: TProduct;
};
type TProductForm = {
    price: number;
    quantity: number;
};
const UpdateProduct = ({ item }: TProps) => {
    const [open, setOpen] = useState(false);
    const [updateProduct] = useUpdateBicycleMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TProductForm>();

    const handleUpdateProduct: SubmitHandler<TProductForm> = async (data) => {
        const toastId = toast.loading("Bicycle updating....");
        try {
            const updateProductData = {
                price: Number(data.price),
                quantity: Number(data.quantity),
            };
            const result = await updateProduct({
                data: updateProductData,
                id: item?.key,
            });
            console.log(result);
            if (result?.data?.success) {
                toast.success("Bicycle updated successful", { id: toastId });
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
                Update Product
            </button>
            <Modal
                title='Update Product'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <form
                    onSubmit={handleSubmit(handleUpdateProduct)}
                    className=' '>
                    <label
                        className='label_primary text-xl mt-3'
                        htmlFor='quantity'>
                        Product Price:
                    </label>
                    <input
                        className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                        defaultValue={item?.price}
                        placeholder='Product Price...'
                        {...register("price", {
                            required: true,
                        })}
                    />
                    {errors.price && (
                        <span className='text-white'>
                            This field is required
                        </span>
                    )}
                    <label
                        className='label_primary text-xl mt-3'
                        htmlFor='quantity'>
                        Product Quantity:
                    </label>
                    <input
                        className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                        defaultValue={item?.quantity}
                        id='quantity'
                        placeholder='Enter Product Quantity...'
                        {...register("quantity", {
                            required: true,
                        })}
                    />
                    {errors.quantity && (
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

export default UpdateProduct;
