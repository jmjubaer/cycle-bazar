/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import bg from "../assets/bicycle-bg.avif";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TResponse } from "../types/global.types";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
type TLogin = {
    email: string;
    password: string;
};
type TLoginResponse = {
    accessToken: string;
};
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLogin>();
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // login function
    const handleLogin: SubmitHandler<TLogin> = async (data) => {
        const tostId = toast.loading("User is logging");
        try {
            const response = (await login(
                data
            ).unwrap()) as TResponse<TLoginResponse>;
            if (response.success) {
                dispatch(
                    setUser({
                        user: verifyToken(response?.data!.accessToken),
                        token: response?.data?.accessToken,
                    })
                );
                toast.success("User logged in successfully", {
                    id: tostId,
                });
                navigate("/");
            }
        } catch (error: any) {
            toast.error(error.message || "Something is wrong", {
                id: tostId,
            });
        }
    };

    return (
        <div className='relative h-[calc(100vh-69px)] '>
            <img src={bg} className='object-cover w-full opacity-90 h-full' />
            <div className='absolute top-1/2 left-1/2 -translate-1/2 w-[94%] xs:w-4/5 sm:w-1/2 lg:w-[30%] bg-[#dddd]/60 p-5 rounded-2xl '>
                <h2 className='text-center mb-5 text-3xl font-semibold'>
                    Login
                </h2>
                <form onSubmit={handleSubmit(handleLogin)} className=' '>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input
                        className='w-full text-black placeholder:text-black outline-none border-b-2 border-primary  p-3 px-0'
                        placeholder='Enter Email ...'
                        {...register("email", { required: true })}
                    />{" "}
                    {errors.email && (
                        <span className='text-white'>
                            This field is required
                        </span>
                    )}
                    <input
                        className='w-full text-black placeholder:text-black outline-none mt-5 border-b-2 border-primary  p-2 px-0'
                        placeholder='Enter Password ...'
                        {...register("password", { required: true })}
                    />
                    {/* errors will return when field validation fails  */}
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
                    Don't have a account,{" "}
                    <Link to={"/signup"} className='font-bold text-blu'>
                        Register
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Login;
