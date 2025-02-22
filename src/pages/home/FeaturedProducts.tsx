import { Link } from "react-router-dom";
import { useGetAllBicyclesQuery } from "../../redux/features/auth/product/productApi";
import { TProduct } from "../../types/prouduct.type";

const FeaturedProducts = () => {
    const { data: bicycleData } = useGetAllBicyclesQuery([
        { name: "limit", value: 6 },
    ]);

    return (
        <div className='container py-24'>
            <div className=''>
                <h3 className='text-xl font-medium text-muted'>
                    Featured Bicycle
                </h3>
                <h2 className=' text-4xl mt-3  font-semibold secondary_font'>
                    Discover the Ultimate <br />
                    Bicycles for Every Ride and Adventure
                </h2>
            </div>
            <div className='grid grid-cols-3 gap-8 mt-10'>
                {bicycleData?.data &&
                    bicycleData?.data.map((bicycle: TProduct) => (
                        <div className='relative'>
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
                            <div className='flex items-center justify-between'>
                                <h4 className='text-xl'>
                                    Model:{" "}
                                    <span className='font-medium'>
                                        {bicycle?.model}
                                    </span>
                                </h4>
                                <h4 className='text-xl'>
                                    Category:{" "}
                                    <span className='font-medium'>
                                        {bicycle?.type}
                                    </span>
                                </h4>
                            </div>
                            <div className='flex items-center justify-between mt-5'>
                                <h4 className='text-xl'>
                                    Price:{" "}
                                    <span className='font-bold'>
                                        ${bicycle?.price}
                                    </span>
                                </h4>
                                <h4 className='text-xl'>
                                    Brand:{" "}
                                    <span className='font-medium'>
                                        {bicycle?.brand}
                                    </span>
                                </h4>
                            </div>
                            <button className='button_primary w-full mt-5'>
                                Buy Now
                            </button>
                        </div>
                    ))}
            </div>

            <Link to={"/"} className="button_primary_large w-fit block mx-auto mt-8">View All</Link>
        </div>
    );
};

export default FeaturedProducts;
