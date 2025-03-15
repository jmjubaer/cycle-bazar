/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBicycleMutation } from "../../../../redux/features/product/productApi";
import uploadImageIntoCloudinary from "../../../../utils/uploadImage";
import { MdCloudUpload } from "react-icons/md";
import { useEffect, useState } from "react";
import { Spin } from "antd";
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
    const [loading, setLoading] = useState(false);

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        reset,
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TProductForm>();
    const [createProduct] = useCreateBicycleMutation();
    const handleCreateProduct: SubmitHandler<TProductForm> = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Bicycle creating....", {
            duration: 5000,
        });
        try {
            const image = await uploadImageIntoCloudinary(data.image[0]);
            console.log(image);
            if (image?.error) {
                toast.error("Failed to upload image", { id: toastId });
                setLoading(false);
                return;
            }
            if (image?.imageUrl) {
                const productData = {
                    ...data,
                    image: image?.imageUrl,
                    colors: data?.colors?.split(","),
                    price: Number(data.price),
                    quantity: Number(data.quantity),
                };

                const result = await createProduct(productData);
                console.log(result);
                if (result?.data?.success) {
                    toast.success("Bicycle create successful", { id: toastId });
                    setLoading(false);
                    reset();
                }
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message, { id: toastId });
        }
    };

    useEffect(() => {
        const fileList = watch("image"); // Watch file input

        if (fileList && fileList.length > 0) {
            const file = fileList[0]; // Extract the first file

            setImagePreview(URL.createObjectURL(file as any));
        }
    }, [watch("image")]);
    return (
        <Spin
            spinning={loading}
            tip='Loading...'
            size='large'
            className='w-full'>
            <div className='xs:p-5 p-2'>
                <h2 className='text-center mb-7 text-4xl secondary_font font-semibold'>
                    Add Product
                </h2>
                <form onSubmit={handleSubmit(handleCreateProduct)} className=''>
                    <div className='grid sm:grid-cols-3 sm:gap-5 '>
                        <div className=''>
                            <label
                                className={`sm:w-full w-64
                                     h-52 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition ${
                                         errors.image
                                             ? "border-red-400"
                                             : "border-gray-400}"
                                     }`}>
                                <input
                                    className='hidden'
                                    id='image'
                                    type='file'
                                    {...register("image", {
                                        required: true,
                                    })}
                                />
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt='Image Preview'
                                        className='w-full h-full object- rounded-lg'
                                    />
                                ) : (
                                    <>
                                        {" "}
                                        <MdCloudUpload
                                            size={40}
                                            className='text-gray-400'
                                        />
                                        <p className='text-gray-400 text-sm mt-2'>
                                            Click to select
                                        </p>
                                    </>
                                )}
                            </label>
                            {errors.image && (
                                <span className='text-red-500 text-base'>
                                    This field is required
                                </span>
                            )}
                        </div>
                        <div className='col-span-2 flex flex-col justify-between'>
                            <div className=''>
                                <label
                                    className='label_primary  md:text-xl text-lg mt-3'
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
                            <div className='grid xs:grid-cols-2 gap-5 mt-3'>
                                <div className=''>
                                    <label
                                        className='label_primary  md:text-xl text-lg '
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
                                <div data-aos-delay='500' className=''>
                                    <label
                                        className='label_primary  md:text-xl text-lg '
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
                        </div>
                    </div>
                    <div
                        //data-aos='fade-up'
                        data-aos-delay='200'
                        className='grid xs:grid-cols-2 sm:grid-cols-3 gap-x-5 sm:gap-5'>
                        <div className='xs:col-span-2 sm:col-span-1'>
                            <label
                                className='label_primary  md:text-xl text-lg mt-5'
                                htmlFor='colors'>
                                Colors{" "}
                                <span className='md:text-sm text-xs'>
                                    (Separate by comma)
                                </span>
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
                        <div className=''>
                            <label
                                className='label_primary  md:text-xl text-lg mt-5'
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
                                className='label_primary  md:text-xl text-lg mt-5'
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
                    <div
                        //data-aos='fade-up'
                        data-aos-delay='200'
                        className='grid xs:grid-cols-2 gap-5'>
                        <div className=''>
                            <label
                                className='label_primary  md:text-xl text-lg mt-5'
                                htmlFor='type'>
                                Category:
                            </label>
                            <select
                                className='w-full text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
                                id='type'
                                {...register("type", {
                                    required: true,
                                })}>
                                <option>Select a category</option>
                                {categories?.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
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
                                className='label_primary  md:text-xl text-lg mt-5'
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
                    <div className=''>
                        <label
                            className='label_primary  md:text-xl text-lg mt-5'
                            htmlFor='description'>
                            Product Description:
                        </label>
                        <textarea
                            className='w-full min-h-[130px] text-xl text-black outline-none border-b-2 border-primary capitalize p-2 px-0'
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
        </Spin>
    );
};

export default CreateProduct;
