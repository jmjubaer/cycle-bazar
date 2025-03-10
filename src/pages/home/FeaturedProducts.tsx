import { Link } from "react-router-dom";
import { useGetAllBicyclesQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types/prouduct.type";
import ProductCard from "../shere/ProductCard";
import { Spin } from "antd";

const FeaturedProducts = () => {
    const { data: bicycleData,isFetching } = useGetAllBicyclesQuery([
        { name: "limit", value: 6 },
    ]);

    return (
        <div className='container py-20'>
            <div className=''>
                <h3 className='text-xl font-medium text-muted'>
                    Featured Bicycle
                </h3>
                <h2 className=' text-4xl mt-3  font-semibold secondary_font'>
                    Discover the Ultimate <br />
                    Bicycles for Every Ride and Adventure
                </h2>
            </div>
            <Spin className="min-h-[100px] block" spinning={isFetching} tip='Loading...' size='large'>
                <div className='grid grid-cols-3 gap-8 mt-10'>
                    {bicycleData?.data &&
                        bicycleData?.data.map((bicycle: TProduct) => (
                            <ProductCard
                                key={bicycle._id}
                                bicycle={bicycle}></ProductCard>
                        ))}
                </div>
            </Spin>

            <Link
                to={"/bicycles"}
                className='button_primary_large w-fit block mx-auto mt-8'>
                View All
            </Link>
        </div>
    );
};

export default FeaturedProducts;
