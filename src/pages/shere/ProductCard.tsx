import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { TProduct } from "../../types/prouduct.type";
import { Link } from "react-router-dom";
import { useEffect } from "react";
type ProductCardProps = {
    bicycle: TProduct;
};
const ProductCard = ({ bicycle }: ProductCardProps) => {
    // calculate average ratting
    const totalRating = bicycle?.reviews?.reduce(
        (sum, review) => sum + review?.rating,
        0
    );
    const avgRatting = totalRating / bicycle?.reviews?.length;
    // Scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [bicycle]);
    return (
        <div className='relative border rounded-sm bg-white border-gray-300 overflow-hidden group flex flex-col justify-between'>
            {bicycle?.tag && (
                <span className='absolute top-3 right-3 rounded font-semibold p-1 px-3 text-xs text-black bg-primary'>
                    {bicycle?.tag}
                </span>
            )}{" "}
            {bicycle?.discount > 0 && (
                <span className='absolute top-3 left-3 text-black rounded font-semibold p-1 px-3 text-xs  bg-primary'>
                    -{bicycle?.discount}%
                </span>
            )}
            <img
                className='sm:w-full w-[300px] h-[200px] mx-auto sm:h-40  object-contain'
                src={bicycle?.image}
                alt={bicycle?.name}
            />
            <div className='border-t border-gray-300 p-2'>
                <h3 className='my-1 font-semibold uppercase sm:text-xl'>
                    {bicycle?.name}
                </h3>
                {/* Show average ratting  */}

                <div className='flex items-center gap-3'>
                    <div className='flex'>
                        <Rating
                            style={{ maxWidth: 100 }}
                            readOnly
                            orientation='horizontal'
                            value={avgRatting || 0}
                        />
                    </div>
                    <span className='text-gray-500'>
                        ({bicycle?.reviews.length} reviews)
                    </span>
                </div>

                {bicycle?.discount ? (
                    <div className='flex gap-3'>
                        <h4 className='sm:text-xl '>
                            <span className='font-bold '>
                                $
                                {Math.ceil(
                                    bicycle?.price -
                                        (bicycle?.price * bicycle?.discount) /
                                            100
                                )}
                            </span>
                        </h4>
                        <h4 className='sm:text-xl line-through text-gray-400'>
                            <span className='font-bold '>
                                ${bicycle?.price}
                            </span>
                        </h4>
                    </div>
                ) : (
                    <h4 className='sm:text-xl '>
                        Price:{" "}
                        <span className='font-bold '>${bicycle?.price}</span>
                    </h4>
                )}
                <Link
                    to={`/bicycle/${bicycle?._id}`}
                    className='button_primary w-full sm:mt-5 mt-1 absolute left-0 -bottom-80 text-center group-hover:bottom-0 transition-all duration-1000'>
                    View Details{" "}
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
