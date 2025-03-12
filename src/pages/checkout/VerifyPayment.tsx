import Lottie from "lottie-react";
import pending from "./../../assets/animation/pending.json";
import failed from "./../../assets/animation/failed.json";
import success from "./../../assets/animation/success.json";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyPaymentQuery } from "../../redux/features/order/orderApi";
const VerifyPayment = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { isLoading, data } = useVerifyPaymentQuery(
        searchParams.get("order_id"),
        {
            refetchOnMountOrArgChange: true,
        }
    );
    console.log(isLoading);
    console.log(data);
    if (!isLoading) {
        setTimeout(() => {
            navigate("/bicycles");
        }, 1000);
    }
    return (
        <div className='flex items-center justify-center overflow-hidden h-[calc(100vh-70px)]'>
            <div className='w-1/2'>
                {isLoading ? (
                    <Lottie animationData={pending} loop={true} />
                ) : data.success ? (
                    <Lottie animationData={success} loop={false} />
                ) : (
                    <Lottie animationData={failed} loop={false} />
                )}
            </div>
        </div>
    );
};

export default VerifyPayment;
