/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBicycleMutation } from "../../../../redux/features/product/productApi";
type TProductForm = {
    name: string;
    brand: string;
    model: string;
    price: number;
    type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric" | "Kids";
    tag?: string;
    quantity: number;
    image: string;
    description: string;
    inStock: boolean;
    colors: string;
};
const categories = ["Mountain", "Road", "Hybrid", "BMX", "Electric", "Kids"];
const CreateProduct = () => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TProductForm>();
    const [createProduct] = useCreateBicycleMutation();
    const handleCreateProduct: SubmitHandler<TProductForm> = async (data) => {
        const toastId = toast.loading("Bicycle creating....", {
            duration: 5000,
        });
        try {
            const productData = {
                ...data,
                colors: data?.colors?.split(","),
                price: Number(data.price),
                quantity: Number(data.quantity),
            };

            console.log(productData);

            const result = await createProduct(productData);
            console.log(result);
            if (result?.data?.success) {
                toast.success("Bicycle create successful", { id: toastId });
                reset();
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        }
    };
    return (
        <div className='p-5'>
            <h2 className='text-center text-4xl secondary_font font-semibold'>
                Add Product
            </h2>
            <form onSubmit={handleSubmit(handleCreateProduct)} className=' '>
                <div className=''>
                    <label
                        className='label_primary text-xl mt-3'
                        htmlFor='name'>
                        Product Name:
                    </label>
                    <input
                        className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                        placeholder='Enter Product Name...'
                        id='name'
                        {...register("name", {
                            required: true,
                        })}
                    />{" "}
                    {errors.name && (
                        <span className='text-red-500 text-base'>
                            This field is required
                        </span>
                    )}
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <div className=''>
                        <label
                            className='label_primary text-xl mt-3'
                            htmlFor='model'>
                            Model:
                        </label>
                        <input
                            className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                            placeholder='Enter Model...'
                            id='model'
                            {...register("model", {
                                required: true,
                            })}
                        />{" "}
                        {errors.model && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className=''>
                        <label
                            className='label_primary text-xl mt-3'
                            htmlFor='brand'>
                            Brand:
                        </label>
                        <input
                            className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                            placeholder='Enter Brand...'
                            id='brand'
                            {...register("brand", {
                                required: true,
                            })}
                        />{" "}
                        {errors.brand && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <div className=''>
                        <label
                            className='label_primary text-xl mt-3'
                            htmlFor='type'>
                            Category:
                        </label>
                        <select
                            className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                            id='type'
                            {...register("type", {
                                required: true,
                            })}>
                            {categories?.map((category) => (
                                <option value={category}>{category}</option>
                            ))}
                        </select>
                        {errors.type && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className=''>
                        <label
                            className='label_primary text-xl mt-3'
                            htmlFor='tag'>
                            Special Tag{" "}
                            <span className='text-sm'>(optional)</span>:
                        </label>
                        <input
                            className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                            placeholder='Enter Product tag...'
                            id='tag'
                            {...register("tag")}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <div className=''>
                        <label
                            className='label_primary text-xl mt-3'
                            htmlFor='price'>
                            Price:
                        </label>
                        <input
                            className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                            placeholder='Enter Price...'
                            id='price'
                            {...register("price", {
                                required: true,
                            })}
                        />
                        {errors.price && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className=''>
                        <label
                            className='label_primary text-xl mt-3'
                            htmlFor='quantity'>
                            Quantity:
                        </label>
                        <input
                            className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                            id='quantity'
                            placeholder='Enter Product Quantity...'
                            {...register("quantity", {
                                required: true,
                            })}
                        />
                        {errors.quantity && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <div className=''>
                        <label
                            className='label_primary text-xl mt-3'
                            htmlFor='image'>
                            Image URL:
                        </label>
                        <input
                            className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                            placeholder='Enter image url ...'
                            id='image'
                            {...register("image", {
                                required: true,
                            })}
                        />
                        {errors.image && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className=''>
                        <label
                            className='label_primary text-xl mt-3'
                            htmlFor='colors'>
                            Colors{" "}
                            <span className='text-sm'>(Separate by comma)</span>
                            :
                        </label>
                        <input
                            className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                            id='colors'
                            placeholder='Enter Product colors...'
                            {...register("colors", {
                                required: true,
                            })}
                        />
                        {errors.colors && (
                            <span className='text-red-500 text-base'>
                                This field is required
                            </span>
                        )}
                    </div>
                </div>
                <div className=''>
                    <label
                        className='label_primary text-xl mt-3'
                        htmlFor='description'>
                        Product Description:
                    </label>
                    <textarea
                        className='w-full min-h-[150px] text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                        placeholder='Enter Description ...'
                        id='description'
                        {...register("description", {
                            required: true,
                        })}
                    />
                    {errors.description && (
                        <span className='text-red-500 text-base'>
                            This field is required
                        </span>
                    )}
                </div>
                <input
                    type='submit'
                    className='button_primary_md w-full mt-7'
                />
            </form>
        </div>
    );
};

export default CreateProduct;
