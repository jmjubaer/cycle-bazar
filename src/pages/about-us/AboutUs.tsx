import { Link } from "react-router-dom";
import bicycleBanner from "../../assets/about-as.avif";
import founder from "../../assets/founder.jpg";
import ceo from "../../assets/ceo.jpg";
import cto from "../../assets/cto.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useEffect } from "react";
const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='container'>
            <div className='grid grid-cols-2 items-center'>
                <div className='pr-10'>
                    <h3
                        data-aos='fade-up'
                        className='text-xl font-medium text-muted'>
                        About Us
                    </h3>
                    <h2
                        data-aos='fade-up' data-aos-delay="200"
                        className=' text-4xl my-5 font-semibold secondary_font'>
                        Why Riders Choose Cycle Bazar
                    </h2>
                    <p data-aos='fade-up' data-aos-delay="300" className='my-5 '>
                        At Cycle Bazar, we believe that every ride is an
                        adventure waiting to happen. Whether you're a seasoned
                        cyclist, a daily commuter, or just looking for a fun way
                        to explore the outdoors, we have the perfect bike for
                        you.
                    </p>
                    <p data-aos='fade-up' data-aos-delay="400" className='my-5'>
                        Founded with a passion for cycling, our mission is to
                        provide high-quality bicycles, top-notch accessories,
                        and expert service to riders of all levels. From
                        mountain trails to city streets, we offer a wide range
                        of bikes, including mountain bikes, road bikes, hybrids,
                        BMX, electric bikes, and kids' bikes.
                    </p>
                    <Link
                        data-aos='fade-up' data-aos-delay="500"
                        className='border-2 inline-block rounded font-semibold px-5 py-2 border-primary/50 text-primary'
                        to={"/bicycles"}>
                        Shop Now <FaLongArrowAltRight className='inline ml-1' />
                    </Link>
                </div>
                <div className=''>
                    <img
                    data-aos="zoom-in"
                        src={bicycleBanner}
                        alt=''
                        className='h-screen w-full object-cover'
                    />
                </div>
            </div>
            <div className='text-center py-24'>
                <h3 data-aos="fade-down" className='text-xl font-medium text-muted'>
                    Professional Team
                </h3>
                <h2 data-aos="zoom-in" className=' text-4xl my-3 font-semibold secondary_font'>
                    Meet Our Team
                </h2>
                <p data-aos="fade-up" className='w-1/2 mx-auto mt-5 font-medium text-gray-500'>
                    Meet the passionate cycling experts at Cycle Bazar,
                    dedicated to helping you find the perfect ride for every
                    adventure.
                </p>
                <div className='grid mt-16 grid-cols-3 justify-between gap-10'>
                    <div data-aos="fade-right" className=''>
                        <img
                            src={founder}
                            alt=''
                            className='w-full object-cover rounded-xl'
                        />
                        <h2 className='secondary_font font-semibold text-4xl mt-5'>
                            Henry Mason
                        </h2>
                        <p className='text-lg font-semibold'>
                            Founder CycleBazar
                        </p>
                    </div>
                    <div data-aos="zoom-in" className=''>
                        <img
                            src={ceo}
                            alt=''
                            className='w-full object-cover rounded-xl'
                        />
                        <h2 className='secondary_font font-semibold text-4xl mt-5'>
                            Steven Snow
                        </h2>
                        <p className='text-lg font-semibold'>CEO CycleBazar</p>
                    </div>
                    <div data-aos="fade-left" className=''>
                        <img
                            src={cto}
                            alt=''
                            className='w-full object-cover rounded-xl'
                        />
                        <h2 className='secondary_font font-semibold text-4xl mt-5'>
                            Alisha Morris
                        </h2>
                        <p className='text-lg font-semibold'>CTO CycleBazar</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
