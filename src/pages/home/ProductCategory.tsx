import { Link } from "react-router-dom";
import SectionTitle from "../shere/SectionTitle";
import { TCategory } from "../../types/prouduct.type";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import { Spin } from "antd";

const ProductCategory = () => {
    // Bicycle category
    const { data: categories ,isFetching} = useGetAllCategoriesQuery(undefined);
    return (
        <div className='container pb-8 xs:pb-14 lg:pb-20'>
            <SectionTitle
                title={"Bicycle Category"}
                description={
                    "Find the Perfect , Bicycle for Your Next Adventure"
                }
            />
            <Spin size="large" spinning={isFetching}>
                <div className='grid grid-cols-2 lg:grid-cols-3 sm:gap-8 xs:gap-4 gap-2 sm:mt-10 mt-5'>
                    {categories?.data?.map((category: TCategory) => (
                        <div
                            data-aos='zoom-in'
                            key={category.name}
                            className='relative sm:w-full rounded-lg overflow-hidden'>
                            <img
                                className='w-full border border-muted h-40 xs:h-60 sm:h-80 object-bottom object-cover '
                                src={category?.image}
                                alt={category?.name}
                            />
                            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/40 z-10 w-full h-full text-center flex items-center flex-col justify-end gap-2 sm:gap-5'>
                                <h2 className='text-white text-xl xs:text-3xl sm:text-5xl secondary_font font-semibold'>
                                    {category?.name}
                                </h2>
                                <Link
                                    to={`/bicycles?category=${category?.key}`}
                                    className='button_primary_md mb-2 sm:mb-5'>
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Spin>
        </div>
    );
};

export default ProductCategory;
