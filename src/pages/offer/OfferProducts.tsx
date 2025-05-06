import { Pagination, Spin } from "antd";
import { TProduct } from "../../types/prouduct.type";
import { useEffect, useRef, useState } from "react";

import ProductCard from "../shere/ProductCard";
import { useGetAllFlashSaleQuery } from "../../redux/features/offerProducts/offerApi";


const OfferProducts = () => {
    const [page, setPage] = useState(1);

    const { data: bicycleData, isFetching } = useGetAllFlashSaleQuery([
        { name: "page", value: page },
        { name: "limit", value: 15 },
        { name: "sort", value: "-createdAt" },
    ]);

    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [page]);
    return (
        <div className='container '>
            <div
                ref={contentRef}
                style={{ scrollbarWidth: "none" }}
                className=' h-[calc(100vh-115px)] overflow-auto  lg:p-5 pr-0'>
                <Spin spinning={isFetching} tip='Loading...' size='large'>
                    {/* Product section */}
                    <div className='grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   mb-5 gap-3 gap-y-8'>
                        {bicycleData?.data.length > 0 ? (
                            bicycleData?.data.map((bicycle: TProduct) => (
                                <ProductCard
                                    key={bicycle._id}
                                    bicycle={bicycle}></ProductCard>
                            ))
                        ) : (
                            <div className='text-gray-400 text-2xl text-center col-span-3 my-10'>
                                There has no available bicycle
                            </div>
                        )}
                    </div>
                </Spin>
                <Pagination
                    className='flex justify-center'
                    onChange={(value) => setPage(value)}
                    total={bicycleData?.meta?.total}
                    pageSize={15}
                    current={page}
                />
            </div>
        </div>
    );
};

export default OfferProducts;
