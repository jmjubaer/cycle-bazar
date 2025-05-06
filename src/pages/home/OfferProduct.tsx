import { Link } from "react-router-dom";

import ProductCard from "../shere/ProductCard";
import { Spin } from "antd";
import SectionTitle from "../shere/SectionTitle";
import { useGetAllFlashSaleQuery } from "../../redux/features/offerProducts/offerApi";
import { TProduct } from "../../types/prouduct.type";

const OfferProducts = () => {
    const { data: flashSaleData, isFetching } = useGetAllFlashSaleQuery([
        { name: "limit", value: 10 },
    ]);

    return (
        <div className='container py-8 xs:pb-14 lg:pb-20'>
            <SectionTitle
                title={"Best Offer Bicycle"}
                description={
                    "Explore Top-Quality Bicycles, at Special Prices – While Stocks Last"
                }
            />
            {/* Show all bicycle data  */}
            <Spin
                className='min-h-[100px] block'
                spinning={isFetching}
                tip='Loading...'
                size='large'>
                <div className='grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-y-7 gap-4 sm:mt-10 mt-5'>
                    {flashSaleData?.data &&
                        flashSaleData?.data.map((product: TProduct) => (
                            <ProductCard
                                key={product._id}
                                bicycle={product}
                               ></ProductCard>
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

export default OfferProducts;
