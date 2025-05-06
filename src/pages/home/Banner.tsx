import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/swiper.css";
import "../../../node_modules/swiper/modules/effect-fade.css";
import "../../../node_modules/swiper/modules/navigation.css";
import "../../../node_modules/swiper/modules/pagination.css";
import AOS from "aos";
import "aos/dist/aos.css";
import image_1 from "../../assets/banner_image_1.jfif";
import image_2 from "../../assets/banner_image_2.jfif";
import image_3 from "../../assets/banner_image_3.jfif";
import image_4 from "../../assets/banner_image_4.jfif";
// import required modules
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
AOS.init({
    duration: 1000,
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false,
});
const Banner = () => {
    return (
        <div className=''>
            <Swiper
                effect={"fade"}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[EffectFade, Pagination, Autoplay]}
                className='mySwiper h-[90vh] max-h-[500px]'>
                {/* Banner Card */}
                <SwiperSlide>
                    <div className='relative w-full h-full z-10'>
                        <div className='absolute top-0 left-0 h-full w-full bg-black/40 z-10'></div>
                        <div className='absolute text-white z-20 flex justify-center items-center w-full h-full'>
                            <div className='md:w-1/2  w-[95%] text-center'>
                                <h2
                                    data-aos='fade-up'
                                    className='banner_title secondary_font'>
                                    Sporty Ride Or Speedy Commuter
                                </h2>
                                <Link
                                    to='/bicycle/67b94c70ca5b5458cb5e49d4'
                                    className='button_primary_large mt-7 inline-block w-fit btn_1'>
                                    Discover Now
                                </Link>
                            </div>
                        </div>
                        <img
                            className='w-full h-full object-center object-cover'
                            src={image_1}
                        />
                    </div>
                </SwiperSlide>{" "}
                {/* Banner Card */}
                <SwiperSlide>
                    <div className='relative w-full h-full'>
                        <div className='absolute top-0 left-0 h-full w-full bg-black/30 z-10'></div>
                        <div className='absolute text-white z-20 flex justify-center items-center w-full h-full'>
                            <div className='md:w-1/2  w-[95%] text-center'>
                                <h2
                                    data-aos='fade-up'
                                    className='banner_title secondary_font secondary_font'>
                                    Climbing By High Durable Cycle
                                </h2>
                                <Link
                                    to={"/bicycle/67cbbe30ff036aa389867908"}
                                    className='button_primary_large mt-7 inline-block w-fit btn_2'>
                                    Ride Now
                                </Link>
                            </div>
                        </div>
                        <img
                            className='w-full h-full object-center object-cover'
                            src={image_2}
                        />
                    </div>
                </SwiperSlide>
                {/* Banner Card */}
                <SwiperSlide>
                    <div className='relative w-full h-full'>
                        <div className='absolute top-0 left-0 h-full w-full bg-black/40 z-10'></div>
                        <div className='absolute text-white z-20 flex justify-center items-center w-full h-full'>
                            <div className='md:w-1/2  w-[95%] text-center'>
                                <h2
                                    data-aos='fade-up'
                                    className='banner_title secondary_font '>
                                    The Next Generation of Bikes
                                </h2>
                                <Link
                                    to={"/bicycle/67b94c70ca5b5458cb5e49d1"}
                                    className='button_primary_large mt-7 inline-block w-fit btn_3'>
                                    Explore Now
                                </Link>
                            </div>
                        </div>
                        <img
                            className='w-full h-full object-center object-cover'
                            src={image_3}
                        />
                    </div>
                </SwiperSlide>
                {/* Banner Card */}
                <SwiperSlide>
                    <div className='relative w-full h-full'>
                        <div className='absolute top-0 left-0 h-full w-full bg-black/40 z-10'></div>
                        <div className='absolute text-white z-20 flex justify-center items-center w-full h-full'>
                            <div className='md:w-1/2  w-[95%] text-center'>
                                <h2
                                    data-aos='fade-up'
                                    className='banner_title  secondary_font '>
                                    Full Suspension Mountain Bikes
                                </h2>
                                <Link
                                    to={"/bicycle/67b94c70ca5b5458cb5e49d2"}
                                    className='button_primary_large mt-7 inline-block w-fit btn_4'>
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                        <img
                            className='w-full h-full object-center object-cover'
                            src={image_4}
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
