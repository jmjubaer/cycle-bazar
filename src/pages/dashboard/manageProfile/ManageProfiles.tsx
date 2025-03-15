import { FaUser } from "react-icons/fa";
import { TUser } from "../../../types/global.types";
import { Spin } from "antd";
import { useGetMeQuery } from "../../../redux/features/user/userApi";
import UpdateName from "./UpdateName";
import ChangePassword from "./ChangePassword";

const ManageProfiles = () => {
    const { data, isFetching } = useGetMeQuery(undefined);

    const { email, name, role, status } = (data?.data as TUser) || {};

    return (
        <div className='flex items-center justify-center h-full'>
            <div 
            //data-aos="zoom-in" 
            className='border border-gray-300 p-5 w-full md:w-1/2 max-w-[500px] rounded-2xl shadow-2xl relative '>
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
            </div>
        </div>
    );
};

export default ManageProfiles;
