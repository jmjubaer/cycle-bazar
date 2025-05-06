import { FaEnvelope, FaHome, FaPhone, FaUser, FaUserCog } from "react-icons/fa";
import { TUser } from "../../../types/global.types";
import { Spin } from "antd";
import { useGetMeQuery } from "../../../redux/features/user/userApi";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import banner from "../../../assets/profile_banner.png";
import { FaLocationDot } from "react-icons/fa6";
const ManageProfiles = () => {
    const { data, isFetching } = useGetMeQuery(undefined);

    const {
        email,
        name,
        role,
        status,
        phone,
        city,
        district,
        localAddress,
        postalCode,
        thana,
    } = (data?.data as TUser) || {};

    return (
        <div className='p-3'>
            <Spin
                spinning={isFetching}
                tip='Loading...'
                size='large'
                className='w-full'>
                {status === "blocked" && (
                    <span className='absolute top-5 right-5 bg-primary px-2 py-1 font-semibold rounded'>
                        Blocked
                    </span>
                )}
                <div className='relative bg-white rounded-md shadow'>
                    <img src={banner} className='xs:h-64 h-30 w-full object-cover' />
                    <div className='bg-gray-300 text-gray-500 p-8 rounded-full w-fit absolute bottom-10 left-10 sm:block hidden'>
                        <FaUser className='xs:text-8xl text-7xl' />
                    </div>
                    <div className='md:h-28 md:py-0 py-3 h-fit flex  items-center'>
                        <div className='sm:ml-[30%] md:ml-[20%] flex flex-wrap justify-between px-2 xs:px-10 items-center w-full'>
                            <div className=''>
                                <h2 className='text-3xl font-medium capitalize'>
                                    {name}
                                </h2>
                                <h2 className='text-lg font-bold capitalize'>
                                    {role}
                                </h2>
                            </div>{" "}
                            <div className='flex items-center gap-5 flex-wrap'>
                                <UpdateProfile
                                    data={data?.data}></UpdateProfile>
                                <ChangePassword
                                    status={status}></ChangePassword>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='py-5 grid sm:grid-cols-3  gap-5'>
                    <div className=' bg-white p-5 rounded-md shadow'>
                        <h3 className='flex items-center font-medium gap-2'>
                            <FaUser className='' /> <span>{name}</span>
                        </h3>{" "}
                        <h3 className='flex items-center font-medium gap-2 my-5 capitalize'>
                            <FaUserCog className='text-lg' />{" "}
                            <span>{role}</span>
                        </h3>{" "}
                        <h3 className='flex items-center  font-medium gap-2  my-5'>
                            <FaEnvelope className='text-lg' />{" "}
                            <span>{email}</span>
                        </h3>{" "}
                        <h3 className='flex items-center  font-medium gap-2 my-5'>
                            <FaPhone className='text-lg' /> <span>{phone}</span>
                        </h3>{" "}
                        <h3 className='flex items-center font-medium gap-2 my-5'>
                            <FaHome className='text-lg' />{" "}
                            <span>{localAddress}</span>
                        </h3>{" "}
                        <h3 className='flex items-center font-medium gap-2 my-5'>
                            <FaLocationDot className='' />{" "}
                            <span>{`${postalCode}, ${thana},  ${district}, ${city}`}</span>
                        </h3>
                    </div>
                    <div className='sm:col-span-2 bg-white'>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14749.774279765728!2d89.83438746839494!3d22.449959683152773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0005bf768793a3%3A0xe21128743731bcc6!2z4Kaq4Ka_IOCmuOCmvyDgpqzgpr7gprDgp4Hgpofgppbgpr7gprLgp4A!5e0!3m2!1sbn!2sbd!4v1746543379196!5m2!1sbn!2sbd'
                            // width='700'
                            // height='450'
                            // style='border:0;'
                            // allowfullscreen=''
                            className='w-full h-full min-h-[300px]'
                            loading='lazy'
                            // referrerpolicy='no-referrer-when-downgrade'
                        ></iframe>
                    </div>
                </div>
            </Spin>
            {/* <div
                // data-aos='zoom-in'
                className='border border-gray-300 p-5 w-full rounded-2xl shadow-2xl relative '>
                <Spin
                    spinning={isFetching}
                    tip='Loading...'
                    size='large'
                    className='w-full'>
                    {status === "blocked" && (
                        <span className='absolute top-5 right-5 bg-primary px-2 py-1 font-semibold rounded'>
                            Blocked
                        </span>
                    )}
                    <div className={`${status === "blocked" && "opacity-50"}`}>
                        <div className='bg-gray-300 text-gray-500 p-4 rounded-2xl w-fit'>
                            <FaUser className='xs:text-9xl text-7xl' />
                        </div>
                        <div className=''>
                            <h2 className='text-3xl font-bold'>
                                Manage Profiles
                            </h2>
                            <h3 className='text-xl'>{name}</h3>
                            <h3 className='text-xl'>{email}</h3>
                            <h3 className='text-xl'>Role: {role}</h3>
                            <div className=' grid xs:grid-cols-2 gap-5 mt-3'>
                                <UpdateName
                                    name={name}
                                    status={status}></UpdateName>
                                <ChangePassword
                                    status={status}></ChangePassword>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div> */}
        </div>
    );
};

export default ManageProfiles;
