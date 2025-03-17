import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
type TLogin = {
    email: string;
};
const NewsLetter = () => {
    const { reset, register, handleSubmit } = useForm<TLogin>();
    // TODO: Save email in DB
    const handleLogin: SubmitHandler<TLogin> = async (data) => {
        if (data?.email) {
            Swal.fire({
                title: "Thanks for subscribing",
                icon: "success",
            });
            reset();
        } else {
            Swal.fire({
                title: "Please enter your email address",
                icon: "error",
            });
        }
    };
    return (
        <div className='news_letter_bg h-[88vh] max-h-[500px] flex items-center justify-center'>
            <div className='z-10 text-white p-5 lg:w-1/2 max-w-[600px]'>
                <p data-aos='fade-right' className='font-medium'>
                    Email Newsletter
                </p>
                <h3
                    data-aos='fade-left'
                    className='xs:text-6xl text-4xl secondary_font font-medium mt-4'>
                    Stay in the loop
                </h3>
                <p 
                data-aos='zoom-in' 
                className='xs:mt-7 mt-4 xs:text-lg text-gray-400'>
                    Sign up to be notified of the latest bike releases, news and
                    exclusive promotions delivered right to your inbox.
                </p>
                <form
                    data-aos='fade-up'
                    onSubmit={handleSubmit(handleLogin)}
                    className='xs:mt-8 mt-5 flex'>
                    <input
                        {...register("email")}
                        className='w-full px-6 py-[6px] xs:py-[10px] bg-white rounded-s-4xl outline-0 text-black'
                        type='email'
                        placeholder='Your Email Address'
                    />

                    <button
                        className='w-fit whitespace-nowrap xs:px-6 px-2 rounded-e-4xl cursor-pointer text-black bg-primary'
                        type='submit'>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewsLetter;
