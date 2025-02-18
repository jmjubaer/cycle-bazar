import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import bg from "../assets/bicycle-bg.avif";
import { Link } from "react-router-dom";
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>();
    const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

    return (
        <div className='relative h-[calc(100vh-69px)]'>
            <img src={bg} className='object-cover w-full opacity-90 h-full' />
            <div className='absolute top-1/2 left-1/2 -translate-1/2 w-[30%] bg-[#dddd]/60 p-5 rounded-2xl '>
                <h2 className='text-center mb-5 text-3xl font-semibold'>
                    Login
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className=' '>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input
                        className='w-full placeholder:text-dark outline-none border-b-2 border-primary  p-3 px-0'
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
                        {...register("password",{ required: true })}
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
