import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../../../node_modules/swiper/swiper.css";
// import "swiper/css";
import "../../../node_modules/swiper/modules/effect-coverflow.css";
// import "swiper/css/effect-coverflow";
import "../../../node_modules/swiper/modules/pagination.css";
// import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import { useGetAllReviewQuery } from "../../redux/features/product/productApi";
import { TReview } from "../../types/prouduct.type";
import moment from "moment";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import SectionTitle from "../shere/SectionTitle";
const Review = () => {
    const { data: ReviewsData, isFetching } = useGetAllReviewQuery([
        { name: "limit", value: 6 },
    ]);
    return (
        <div className='container pb-8 xs:pb-14 lg:pb-20'>
            <SectionTitle
                textCenter
                title={"Testimonial"}
                description={"Customer Stories , The Cycle Bazar Experience"}
            />
            <Spin
                className='min-h-[100px] block'
                spinning={isFetching}
                tip='Loading...'
                size='large'>
                <Swiper
                    effect={"coverflow"}
                    // grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    initialSlide={1}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    // pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className='review-swiper mt-5 xs:mt-9 md:mt-14'>
                    {ReviewsData?.data?.map((review: TReview) => (
                        <SwiperSlide key={review?._id} className='slide'>
                            <div
                                data-aos='zoom-in'
                                className='shadow-md cursor-move rounded-xl h-full flex flex-col justify-between mb-5 p-2 sm:p-4 border border-gray-300 '>
                                <div className=''>
                                    <Rating
                                        // style={{ maxWidth: 150 }}
                                        className='xs:max-w-[150px] max-w-[120px]'
                                        readOnly
                                        orientation='horizontal'
                                        value={review?.rating}
                                    />
                                    {review?.comment?.length > 250 ? (
                                        <>
                                            <p className='sm:my-5 my-2 xs:block hidden'>
                                                {review?.comment?.slice(0, 300)}{" "}
                                                . . . . . . .
                                            </p>{" "}
                                            <p className='sm:my-5 my-2 xs:hidden block'>
                                                {review?.comment?.slice(0, 250)}{" "}
                                                . . . . . . .
                                            </p>
                                        </>
                                    ) : (
                                        <p className='sm:my-5 my-2 textj'>
                                            {review?.comment}
                                        </p>
                                    )}
                                </div>

                                <div className='grid xs:grid-cols-2 gap-1 sm:gap-3'>
                                    <div className='flex items-center gap-3'>
                                        <div className=''>
                                            <FaCircleUser className='text-5xl text-gray-300' />
                                        </div>
                                        <div className=''>
                                            <p className='capitalize secondary_font font-medium text-xl'>
                                                {review.reviewer.name}
                                            </p>
                                            <p className='text-gray-400'>
                                                {moment(
                                                    review.createdAt
                                                ).format("MMMM DD, YYYY")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className=''>
                                            <img
                                                src={review?.product?.image}
                                                alt=''
                                                className='w-12 h-12 border border-gray-300 rounded-full object-cover'
                                            />
                                        </div>
                                        <div className=''>
                                            <Link
                                                to={`/bicycle/${review?.product?._id}`}
                                                className='capitalize secondary_font  hover:text-blue-700 hover:underline font-medium text-xl'>
                                                {review.product?.name}
                                            </Link>
                                            <p className='text-gray-700'>
                                                {review?.product?.model}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Spin>
        </div>
    );
};

export default Review;
