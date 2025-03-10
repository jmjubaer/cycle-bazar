import { FaLocationDot } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
const Footer = () => {
    const baseUrl = "http://localhost:5173";
    return (
        <footer className='bg-black/90 h-fit pt-20 text-white'>
            <div className='container flex gap-20'>
                <div className='w-3/5'>
                    <img src={logo} className='w-[200px]' />
                    <p className='my-5 font-medium'>
                        Join Our Cycling Community – Sign up for exclusive
                        deals, latest arrivals, and expert tips to enhance your
                        biking journey!
                    </p>
                    <h3 className='text-primary text-3xl secondary_font font-semibold my-7'>
                        Contact
                    </h3>
                    <ul>
                        <li className='flex gap-5 my-3'>
                            <FaLocationDot className='text-xl' />
                            <p>
                                4200 Hamill Avenue, San Diego, California 92109
                            </p>
                        </li>
                        <li className='flex gap-5 my-3'>
                            <FaPhone className='text-xl' />
                            <p>021 3456 789</p>
                        </li>
                        <li className='flex gap-5 my-3'>
                            <MdEmail className='text-xl' />
                            <p>customer@cyclebazar.com</p>
                        </li>
                    </ul>
                </div>
                <div className=''>
                    <h3 className='text-primary text-3xl secondary_font font-semibold my-7'>
                        Menu
                    </h3>
                    {/* http://localhost:5173/bicycles?category=Mountain */}
                    <ul className='flex flex-col gap-5'>
                        <Link to={`${baseUrl}`}>Home</Link>
                        <Link to={`${baseUrl}/bicycles`}>Bicycles</Link>
                        <Link to={`${baseUrl}/about-us`}>About Us</Link>
                        <Link to={`${baseUrl}/login`}>Login</Link>
                        <Link to={`${baseUrl}/signup`}>Sign Up</Link>
                    </ul>
                </div>
                <div className=''>
                    <h3 className='text-primary text-3xl secondary_font font-semibold my-7'>
                        Category
                    </h3>
                    <ul className='flex flex-col gap-5'>
                        <Link to={`${baseUrl}/bicycles?category=Mountain`}>
                            Mountain
                        </Link>
                        <Link to={`${baseUrl}/bicycles?category=Road`}>
                            Road Cycle
                        </Link>
                        <Link to={`${baseUrl}/bicycles?category=Hybrid`}>
                            Hybrid
                        </Link>
                        <Link to={`${baseUrl}/bicycles?category=BMX`}>
                            BMX Cycle
                        </Link>
                        <Link to={`${baseUrl}/bicycles?category=Electric`}>
                            Electric
                        </Link>
                        <Link to={`${baseUrl}/bicycles?category=Kids`}>
                            Kids Cycle
                        </Link>
                    </ul>
                </div>
            </div>
            <p className='py-8 text-sm text-center border-y mt-6 border-gray-700 text-gray-500'>
                © Copyright 2021 CycleBazar
            </p>
        </footer>
    );
};

export default Footer;
