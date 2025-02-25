import { TProduct } from "../../types/prouduct.type";
type ProductCardProps = {
    bicycle: TProduct;
};
const ProductCard = ({ bicycle }: ProductCardProps) => {
    return (
        <div className='relative flex flex-col justify-between'>
            {bicycle?.tag && (
                <span className='absolute top-3 right-3 rounded font-semibold p-1 px-3 text-xs text-white bg-primary'>
                    {bicycle?.tag}
                </span>
            )}
            <img
                className='w-full border border-muted h-60 object-cover rounded-2xl'
                src={bicycle?.image}
                alt={bicycle?.name}
            />

            <h3 className='my-2 font-semibold uppercase text-2xl'>
                {bicycle?.name}
            </h3>
            <div className='flex items-center justify-between'>
                <h4 className='text-xl'>
                    Model: <span className='font-medium'>{bicycle?.model}</span>
                </h4>
                <h4 className='text-xl'>
                    Category:{" "}
                    <span className='font-medium'>{bicycle?.type}</span>
                </h4>
            </div>
            <div className='flex items-center justify-between mt-5'>
                <h4 className='text-xl'>
                    Price: <span className='font-bold'>${bicycle?.price}</span>
                </h4>
                <h4 className='text-xl'>
                    Brand: <span className='font-medium'>{bicycle?.brand}</span>
                </h4>
            </div>
            <button className='button_primary w-full mt-5'>View Detailsce </button>
        </div>
    );
};

export default ProductCard;
