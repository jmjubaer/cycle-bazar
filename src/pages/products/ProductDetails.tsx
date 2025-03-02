import { useNavigate, useParams } from "react-router-dom";
import {
    useGetBicycleByIdQuery,
    useGetRelatedBicyclesQuery,
} from "../../redux/features/product/productApi";
import { Spin, Tabs, TabsProps } from "antd";
import { TProduct, TReview } from "../../types/prouduct.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { CiFaceFrown, CiFaceSmile } from "react-icons/ci";
import DescriptionTab from "./DescriptionTab";
import ReviewTab from "./ReviewTab";
import ProductCard from "../shere/ProductCard";
import { useEffect } from "react";

const ProductDetails = () => {
    const { id } = useParams();
    const { data: bicycle, isFetching } = useGetBicycleByIdQuery(id);
    const { data: relatedBicycle } = useGetRelatedBicyclesQuery(id, {
        skip: isFetching,
    });
    const {
        image,
        reviews,
        name,
        tag,
        price,
        colors,
        quantity,

        inStock,

        model,
        brand,
        type,

        description,
    } = bicycle?.data || ({} as TProduct);
    const totalRating = reviews?.reduce(
        (sum: number, review: TReview) => sum + review.rating,
        0
    );
    const avgRatting = totalRating / reviews?.length;

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Description",
            children: <DescriptionTab description={description} />,
        },
        {
            key: "2",
            label: `Reviews ${reviews?.length}`,
            children: <ReviewTab data={bicycle?.data} />,
        },
    ];
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);
    const navigate = useNavigate();
    return (
        <div className='container py-10'>
            <Spin spinning={isFetching} tip='Loading...' size='large'>
                {bicycle ? (
                    <>
                        <div className='grid grid-cols-2 items-center justify-between gap-8 h-fit'>
                            <div className='flex overflow-hidden items-center justify-center relative'>
                                {tag && (
                                    <span className='absolute top-3 right-3 rounded font-semibold p-1 px-3 text-xs bg-primary'>
                                        {tag}
                                    </span>
                                )}
                                <img
                                    src={image}
                                    alt=''
                                    className='w-full object-cover rounded-2xl'
                                />
                            </div>
                            <div className='flex flex-col justify-between '>
                                <h2 className='text-5xl font-semibold text-primary secondary_font mb-3'>
                                    {name}
                                </h2>
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
                                            ({reviews?.length} reviews)
                                        </span>
                                    </div>
                                )}
                                <div className='flex items-center gap-2 p-2 rounded-md px-3 mt-2 bg-gray-200 w-fit'>
                                    {quantity > 0 ? (
                                        <CiFaceSmile className='text-xl' />
                                    ) : (
                                        <CiFaceFrown />
                                    )}
                                    <p className='text-sm text-gray-500'>
                                        {quantity} IN STOCK
                                    </p>
                                </div>
                                <p className='font-medium my-2   '>
                                    Price:{" "}
                                    <span className='text-2xl ml-3 font-bold secondary_font '>
                                        ${price}
                                    </span>
                                </p>
                                <p className='font-medium my-2   '>
                                    Color:{" "}
                                    <span className=' ml-3 font-semibold secondary_font '>
                                        {colors.map((color: string) => (
                                            <span key={color}> {color},</span>
                                        ))}
                                    </span>
                                </p>
                                <p className='font-medium my-2'>
                                    Model:{" "}
                                    <span className='font-normal ml-2'>
                                        {model}
                                    </span>
                                </p>{" "}
                                <p className='font-medium my-2'>
                                    Category:{" "}
                                    <span className='font-normal ml-2'>
                                        {type}
                                    </span>
                                </p>
                                <p className='font-medium my-2'>
                                    Brand:
                                    <span className='font-normal ml-2'>
                                        {brand}
                                    </span>
                                </p>
                                <button
                                    onClick={() => navigate(`/${id}/checkout`)}
                                    disabled={!inStock}
                                    className='button_primary_large disabled:opacity-60 cursor-move w-[70%] text-center inline-block mt-5'>
                                    {inStock ? "Buy Now" : "Out of Stock"}
                                </button>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <Tabs
                                defaultActiveKey='1'
                                items={items}
                                // onChange={onChange}
                            />
                        </div>
                        <div className=''>
                            <h2 className=' text-4xl mt-8 font-semibold secondary_font'>
                                Related Category Product
                            </h2>
                            <div className='grid grid-cols-3 gap-8 mt-10'>
                                {relatedBicycle?.data.length > 0 &&
                                    relatedBicycle?.data.map(
                                        (bicycle: TProduct) => (
                                            <ProductCard
                                                key={bicycle._id}
                                                bicycle={bicycle}></ProductCard>
                                        )
                                    )}
                            </div>
                        </div>{" "}
                    </>
                ) : (
                    <div className='text-gray-400 text-2xl text-center col-span-3 my-10'>
                        Bicycle not found. Please check the ID or try again
                        later.
                        <br />
                        <a href='/'>Back to Homepage</a>
                    </div>
                )}
            </Spin>
        </div>
    );
};

export default ProductDetails;
