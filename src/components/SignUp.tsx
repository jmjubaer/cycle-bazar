/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import bg from "../assets/bicycle-bg.avif";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TResponse } from "../types/global.types";
import { useSignupMutation } from "../redux/features/auth/authApi";

type TSingUp = {
    name: string;
    email: string;
    password: string;
};
type TUser = {
    name: string;
    email: string;
    password: string;
    role: string;
    status: string;
    isDeleted: boolean;
};
const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSingUp>();
    const [registration] = useSignupMutation();
    const navigate = useNavigate();
    // const dispatch = useAppDispatch();

    const handleSignUp: SubmitHandler<TSingUp> = async (data) => {
        const tostId = toast.loading("User is creating...");
        try {
            const response = (await registration(
                data
            ).unwrap()) as TResponse<TUser>;
            console.log(response);
            if (response.success) {
                toast.success("Signup is successfully", {
                    id: tostId,
                });
                navigate("/login");
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong", {
                id: tostId,
            });
        }
    };
    return (
        <div className='relative h-[calc(100vh-69px)]'>
            <img src={bg} className='object-cover w-full opacity-90 h-full' />
            <div className='absolute top-1/2 left-1/2 -translate-1/2 w-[94%] xs:w-4/5 sm:w-1/2 lg:w-[30%] bg-[#dddd]/60 p-5 rounded-2xl '>
                <h2 className='text-center mb-5 text-3xl font-semibold'>
                    Sign Up
                </h2>
                <form onSubmit={handleSubmit(handleSignUp)} className=' '>
                    <input
                        className='w-full placeholder:text-dark outline-none border-b-2 border-primary  p-3 px-0'
                        placeholder='Enter Name ...'
                        {...register("name", { required: true })}
                    />{" "}
                    {errors.name && (
                        <span className='text-white'>
                            This field is required
                        </span>
                    )}{" "}
                    <input
                        className='w-full mt-5 placeholder:text-dark outline-none border-b-2 border-primary  p-3 px-0'
                        placeholder='Enter Email ...'
                        {...register("email", { required: true })}
                    />{" "}
                    {errors.email && (
                        <span className='text-white'>
                            This field is required
                        </span>
                    )}
                    <input
                        className='w-full placeholder:text-dark outline-none mt-5 border-b-2 border-primary  p-2 px-0'
                        placeholder='Enter Password ...'
                        {...register("password", { required: true })}
                    />
                    {errors.password && (
                        <span className='text-white'>
                            This field is required
                        </span>
                    )}
                    <input
                        type='submit'
                        className='button_primary w-full mt-7'
                    />
                </form>
                <p className='mt-5'>
                    Already have an account,{" "}
                    <Link to={"/login"} className='font-bold text-blu'>
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default SignUp;
