import mountain from "../../assets/Mountain.jpg";
import road from "../../assets/Road.avif";
import hybrid from "../../assets/Hybrid.avif";
import BMX from "../../assets/BMX.avif";
import electric from "../../assets/Electric.avif";
import kids from "../../assets/kids.avif";
import { Link } from "react-router-dom";
type TCategory = {
    name: string;
    image: string;
};
const ProductCategory = () => {
    const categories: TCategory[] = [
        { name: "Mountain", image: mountain },
        { name: "Road Cycle", image: road },
        { name: "Hybrid", image: hybrid },
        { name: "BMX Cycle", image: BMX },
        { name: "Electric", image: electric },
        { name: "Kids Cycle", image: kids },
    ];
    return (
        <div className='container pb-20'>
            <div className=''>
                <h3
                    data-aos='fade-right'
                    className='text-xl font-medium text-muted'>
                    Bicycle Category
                </h3>
                <h2
                    data-aos='fade-right' data-aos-delay="200"
                    className=' text-4xl mt-3  font-semibold secondary_font'>
                    Find the Perfect
                    <br />
                    Bicycle for Your Next Adventure
                </h2>
            </div>
            <div className='grid grid-cols-3 gap-8 mt-10'>
                {categories.map((category: TCategory) => (
                    <div
                        data-aos='zoom-in'
                        key={category.name}
                        className='relative rounded-lg overflow-hidden'>
                        <img
                            className='w-full border border-muted h-80 object-bottom object-cover '
                            src={category?.image}
                            alt={category?.name}
                        />
                        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/40 z-10 w-full h-full text-center flex items-center flex-col justify-end gap-5'>
                            <h2 className='text-white text-5xl secondary_font font-semibold'>
                                {category?.name}
                            </h2>
                            <Link
                                to={`/bicycles?category=${category?.name.replace(
                                    " Cycle",
                                    ""
                                )}`}
                                className='button_primary_md mb-5'>
                                Shop Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCategory;
