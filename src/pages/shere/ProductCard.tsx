import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { TProduct } from "../../types/prouduct.type";
import { Link } from "react-router-dom";
import { useEffect } from "react";
type ProductCardProps = {
    bicycle: TProduct;
};
const ProductCard = ({ bicycle }: ProductCardProps) => {
    const totalRating = bicycle?.reviews?.reduce(
        (sum, review) => sum + review?.rating,
        0
    );
    const avgRatting = totalRating / bicycle?.reviews?.length;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [bicycle]);
    return (
        <div data-aos='zoom-in' className='relative flex flex-col justify-between'>
            {bicycle?.tag && (
                <span className='absolute top-3 right-3 rounded font-semibold p-1 px-3 text-xs text-white bg-primary'>
                    {bicycle?.tag}
                </span>
            )}
            <img
                className='w-full border border-muted h-60 object-cover rounded-2xl'
                src={bicycle?.image}
                alt={bicycle?.name}
            />

            <h3 className='my-2 font-semibold uppercase text-2xl'>
                {bicycle?.name}
            </h3>
            {avgRatting > 0 && (
                <div className='flex items-center gap-3'>
                    <div className='flex'>
                        <Rating
                            style={{ maxWidth: 120 }}
                            readOnly
                            orientation='horizontal'
                            value={avgRatting}
                        />
                    </div>
                    <span className='text-gray-500'>
                        ({bicycle?.reviews.length} reviews)
                    </span>
                </div>
            )}
            <div className='flex items-center justify-between'>
                <h4 className='text-xl'>
                    Model: <span className='font-medium'>{bicycle?.model}</span>
                </h4>
                <h4 className='text-xl'>
                    Category:{" "}
                    <span className='font-medium'>{bicycle?.type}</span>
                </h4>
            </div>
            <div className='flex items-center justify-between mt-5'>
                <h4 className='text-xl'>
                    Price: <span className='font-bold'>${bicycle?.price}</span>
                </h4>
                <h4 className='text-xl'>
                    Brand: <span className='font-medium'>{bicycle?.brand}</span>
                </h4>
            </div>
            <Link
                to={`/bicycle/${bicycle?._id}`}
                className='button_primary w-full mt-5 text-center'>
                View Details{" "}
            </Link>
        </div>
    );
};

export default ProductCard;
