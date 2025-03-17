import { Link } from "react-router-dom";
import { useGetAllBicyclesQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types/prouduct.type";
import ProductCard from "../shere/ProductCard";
import { Spin } from "antd";
import SectionTitle from "../shere/SectionTitle";

const FeaturedProducts = () => {
    const { data: bicycleData, isFetching } = useGetAllBicyclesQuery([
        { name: "limit", value: 6 },
    ]);

    return (
        <div className='container py-8 xs:py-14 lg:py-20'>
            <SectionTitle
                title={"Featured Bicycle"}
                description={
                    "Discover the Ultimate , Bicycles for Every Ride and Adventure"
                }
            />
            {/* Show all bicycle data  */}
            <Spin
                className='min-h-[100px] block'
                spinning={isFetching}
                tip='Loading...'
                size='large'>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 gap-4 sm:mt-10 mt-5'>
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
                className='button_primary_large w-fit block mx-auto xs:mt-8 mt-3'>
                View All
            </Link>
        </div>
    );
};

export default FeaturedProducts;
