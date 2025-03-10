import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
type TLogin = {
    email: string;
};
const NewsLetter = () => {
    const { reset,register, handleSubmit } = useForm<TLogin>();
    const handleLogin: SubmitHandler<TLogin> = async (data) => {
        if (data?.email) {
            Swal.fire({
                title: "Thanks for subscribing",
                icon: "success",
            });
            reset()
        } else {
            Swal.fire({
                title: "Please enter your email address",
                icon: "error",
            });
        }
    };
    return (
        <div className='news_letter_bg h-[88vh] flex items-center justify-center'>
            <div className='z-10 text-white w-1/2'>
                <p className='font-medium'>Email Newsletter</p>
                <h3 className='text-6xl secondary_font font-medium mt-4'>
                    Stay in the loop
                </h3>
                <p className='mt-7 text-lg text-gray-400'>
                    Sign up to be notified of the latest bike releases, news and
                    exclusive promotions delivered right to your inbox.
                </p>
                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className='mt-8 flex'>
                    <input
                        {...register("email")}
                        className='w-full px-6 py-[10px] bg-white rounded-s-4xl outline-0 text-black'
                        type='email'
                        placeholder='Your Email Address'
                    />

                    <button
                        className='w-fit whitespace-nowrap px-6 rounded-e-4xl cursor-pointer text-black bg-primary'
                        type='submit'>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewsLetter;
