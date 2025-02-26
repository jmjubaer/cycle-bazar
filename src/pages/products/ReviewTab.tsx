import { FaCircleUser } from "react-icons/fa6";
import { TReview } from "../../types/prouduct.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import moment from "moment";

type ProductCardProps = {
    reviews: TReview[];
};
const ReviewTab = ({ reviews }: ProductCardProps) => {
    console.log(reviews);
    return (
        <div>
            {reviews.map((review) => (
                <div className='flex gap-3 my-8'>
                    <div className=''>
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
                        <p className='text-lg mt-3 text-gray-500'>
                            {review.comment}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewTab;
