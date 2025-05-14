/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCircleUser } from "react-icons/fa6";
import { TProduct } from "../../types/prouduct.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import moment from "moment";
import { SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";
import { useCreateReviewMutation } from "../../redux/features/product/productApi";
import { useGetMeQuery } from "../../redux/features/user/userApi";
type Inputs = {
    comment: string;
};
type ProductCardProps = {
    data: TProduct;
};
const ReviewTab = ({ data: bicycle }: ProductCardProps) => {
    
    const user = useAppSelector(selectCurrentUser) as TUser;
    const { data: currentUser } = useGetMeQuery(undefined);
    const [rating, setRating] = useState(0);
    const [createReview] = useCreateReviewMutation();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (!user) {
                toast.error("Please login to give review!");
                return;
            }
            if (rating > 0) {
                const review = {
                    product: bicycle?._id,
                    reviewer: currentUser?.data?._id,
                    rating,
                    comment: data.comment,
                };
                const result = await createReview(review);
                if (result?.data?.success) {
                    reset();
                }
            } else {
                toast.error("Please select a rating");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            {/* Show this product review */}
            {bicycle.reviews.map((review, idx) => (
                <div className='md:my-8 my-4'>
                    <div data-aos='fade-up' key={idx} className='flex gap-3 '>
                        <div className='w-12'>
                            <FaCircleUser className='text-5xl text-gray-300' />
                        </div>
                        <div className=''>
                            <Rating
                                style={{ maxWidth: 110 }}
                                readOnly
                                orientation='horizontal'
                                value={review.rating}
                            />
                            <div className='flex items-center gap-3'>
                                <p className='capitalize secondary_font font-medium text-xl'>
                                    {review.reviewer.name}
                                </p>
                                <p className='text-gray-400'>
                                    {moment(review.createdAt).format(
                                        "MMMM DD, YYYY"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div data-aos='fade-up' key={idx} className='flex gap-3 '>
                        <div className='w-12 md:block hidden'></div>
                        <div className='w-full'>
                            <p className='xs:text-lg text-base mt-3 text-gray-500'>
                                {review.comment}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            {/* Add Review Section */}
            <div className=''>
                <h2
                    data-aos='fade-up'
                    className=' text-xl mt-8 font-semibold secondary_font'>
                    Add Review
                </h2>
                <div data-aos='fade-up' className='mt-5'>
                    <div className=''>
                        <h3 className='secondary_font font-medium text-base'>
                            Your Ratting:*
                        </h3>
                        <Rating
                            style={{ maxWidth: 150 }}
                            onChange={(value: SetStateAction<number>) =>
                                setRating(value)
                            }
                            orientation='horizontal'
                            value={rating}
                        />
                        {/* Review form */}
                        <form
                            data-aos='fade-up'
                            className='mt-5'
                            onSubmit={handleSubmit(onSubmit)}>
                            <label className='secondary_font font-medium text-base'>
                                Your Review:*
                            </label>
                            <textarea
                                className='md:w-4/6 w-full block mt-3 px-4 py-2 text-base bg-black/10 outline-0 resize-y min-h-[100px] xs:min-h-[150px] rounded-md'
                                {...register("comment", {
                                    required: true,
                                })}></textarea>
                            {/* errors will return when field validation fails  */}
                            {errors.comment && (
                                <p className=''>This field is required</p>
                            )}

                            <input
                                className='button_primary_md mt-5'
                                type='submit'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewTab;
