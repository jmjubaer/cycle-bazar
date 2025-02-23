import { Pagination, Spin } from "antd";
import { useGetAllBicyclesQuery } from "../../redux/features/auth/product/productApi";
import { TProduct } from "../../types/prouduct.type";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaTag } from "react-icons/fa";

type TOption = {
    name: string;
    value: string;
};
const Products = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    // const [brand, setBrand] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(9999999999);
    const [inStock, setInStock] = useState({ name: "inStock", value: false });
    const [outOfStock, setOutOrStock] = useState({
        name: "inStock",
        value: false,
    });
    const [availability, setAvailability] = useState([
        { name: "inStock", value: false },
        { name: "inStock", value: true },
    ]);
    const { data: bicycleData, isFetching } = useGetAllBicyclesQuery([
        { name: "page", value: page },
        { name: "limit", value: 6 },
        { name: "sort", value: "_id" },
        { name: "searchTerm", value: searchTerm },
        { name: "minPrice", value: minPrice },
        { name: "maxPrice", value: maxPrice },
        // ...brand,
        ...availability,
    ]);
    console.log(minPrice, maxPrice);
    useEffect(() => {
        if (inStock.value && outOfStock.value) {
            setAvailability([
                { name: "inStock", value: true },
                { name: "inStock", value: false },
            ]);
        } else if (inStock.value && !outOfStock.value) {
            setAvailability([{ name: "inStock", value: true }]);
        } else if (!inStock.value && outOfStock.value) {
            setAvailability([{ name: "inStock", value: false }]);
        } else {
            setAvailability([
                { name: "inStock", value: true },
                { name: "inStock", value: false },
            ]);
        }
    }, [inStock, outOfStock]);
    // const handleBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     if (event) {
    //         setBrand([{ name: "brand", value: event.target.value }]);
    //     } else {
    //         setBrand([]);
    //     }
    // };
    const brandOptions: TOption[] = Array.from(
        new Set(
            bicycleData?.data?.map((bicycle: TProduct) => ({
                name: bicycle?.brand,
                value: bicycle?.brand,
            }))
        )
    );
    console.log(brandOptions);
    return (
        <div className='container py-5 grid gap-3 grid-cols-4'>
            <div
                style={{ scrollbarWidth: "none" }}
                className='col-span-1 sticky h-[calc(100vh-115px)] overflow-auto top-0 left-0 border-r border-gray-300 pr-3'>
                <div className='relative w-full h-fit '>
                    <IoSearchSharp className='absolute top-1/2 right-2 text-xl text-gray-500 -translate-y-1/2' />
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type='text'
                        className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-3xl'
                        placeholder='Search Bicycles...'
                    />
                </div>
                <hr className='text-gray-300 my-5' />
                <div className=''>
                    <h3 className='block font-bold text-2xl secondary_font text-primary'>
                        Category
                    </h3>
                    <ul
                        // value={category}
                        // onChange={(e) => setCategory(e.target.value)}
                        className='block w-full list-disc px-3 py-2 text-gray-600 rounded-3xl'>
                        <li
                            className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                category === "" ? "text-primary/70" : ""
                            }`}
                            onClick={() => setCategory("")}
                            value=''>
                            {" "}
                            <FaTag className='text-sm ' /> All Categories
                        </li>
                        <li
                            className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                category === "Mountain" ? "text-primary/70" : ""
                            }`}
                            onClick={() => setCategory("Mountain")}
                            value=''>
                            {" "}
                            <FaTag className='text-sm ' /> Mountain
                        </li>
                        <li
                            className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                category === "Road" ? "text-primary/70" : ""
                            }`}
                            onClick={() => setCategory("Road")}
                            value=''>
                            {" "}
                            <FaTag className='text-sm ' /> Road Cycle
                        </li>
                        <li
                            className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                category === "Hybrid" ? "text-primary/70" : ""
                            }`}
                            onClick={() => setCategory("Hybrid")}
                            value=''>
                            {" "}
                            <FaTag className='text-sm ' />
                            Hybrid Cycle
                        </li>
                        <li
                            className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                category === "BMX" ? "text-primary/70" : ""
                            }`}
                            onClick={() => setCategory("BMX")}
                            value=''>
                            {" "}
                            <FaTag className='text-sm ' /> BMX Cycle
                        </li>
                        <li
                            className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                category === "Electric" ? "text-primary/70" : ""
                            }`}
                            onClick={() => setCategory("Electric")}
                            value=''>
                            {" "}
                            <FaTag className='text-sm ' /> Electric
                        </li>
                        <li
                            className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                category === "Kids" ? "text-primary/70" : ""
                            }`}
                            onClick={() => setCategory("Kids")}
                            value=''>
                            {" "}
                            <FaTag className='text-sm ' /> Kids Cycle
                        </li>
                    </ul>
                </div>
                <hr className='text-gray-300 mb-5' />
                <div className=''>
                    <h3 className='block mb-5 font-bold text-2xl secondary_font text-primary'>
                        Availability
                    </h3>
                    <div className='flex items-center gap-3 text-xl pl-3'>
                        <input
                            onChange={(e) =>
                                setInStock({
                                    name: "inStock",
                                    value: e.target.checked,
                                })
                            }
                            className='w-5 h-5'
                            value={"inStock"}
                            type='checkbox'
                            name='available'
                            id='available'
                        />
                        <label className='cursor-pointer' htmlFor='available'>
                            In Stock
                        </label>
                    </div>
                    <div className='flex items-center my-3 gap-3 text-xl pl-3'>
                        <input
                            onChange={(e) =>
                                setOutOrStock({
                                    name: "inStock",
                                    value: e.target.checked,
                                })
                            }
                            className='w-5 h-5'
                            type='checkbox'
                            value={"outOfStock"}
                            name='available'
                            id='outOfStock'
                        />
                        <label className='cursor-pointer' htmlFor='outOfStock'>
                            Out of Stock
                        </label>
                    </div>
                </div>
                <hr className='text-gray-300 mb-5' />
                <div className=''>
                    <h3 className='block mb-5 font-bold text-2xl secondary_font text-primary'>
                        Price Range
                    </h3>
                    <div className='flex justify-between items-center gap-3  pl-3'>
                        <label className='cursor-pointer text-xl'>
                            Min Price:
                        </label>
                        <input
                            className='outline-0 p-1 px-2 w-1/2 border rounded'
                            onChange={(e) =>
                                setMinPrice(Number(e.target.value))
                            }
                            placeholder='Min Price'
                            type='number'
                        />
                    </div>
                    <div className='flex justify-between items-center gap-3 mt-5 pl-3'>
                        <label className='cursor-pointer text-xl'>
                            Max Price:
                        </label>
                        <input
                            className='outline-0 p-1 px-2 w-1/2 border rounded'
                            onChange={(e) =>
                                setMaxPrice(
                                    Number(e.target.value) === 0
                                        ? 999999999
                                        : Number(e.target.value)
                                )
                            }
                            placeholder='Max Price'
                            type='number'
                        />
                    </div>
                </div>
                <hr className='text-gray-300 my-5' />
                {/* <div className=''>
                    <h3 className='block mb-5 font-bold text-2xl secondary_font text-primary'>
                        Filter By Brand
                    </h3>
                    <div className='flex justify-between items-center gap-3  pl-3'>
                        <select
                            onChange={(e) => handleBrand(e)}
                            className='outline-0 p-1 px-2 w-full border rounded'>
                            <option value=''>All Category</option>
                            {brandOptions.map((option) => (
                                <option value={option?.value}>
                                    {option?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div> */}
            </div>
            <div
                style={{ scrollbarWidth: "none" }}
                className='col-span-3 h-[calc(100vh-115px)] overflow-auto '>
                <Spin spinning={isFetching} tip='Loading...' size='large'>
                    <div className='grid grid-cols-3 mb-5 gap-5 gap-y-8'>
                        {bicycleData?.data &&
                            bicycleData?.data.map((bicycle: TProduct) => (
                                <div
                                    key={bicycle?._id}
                                    className='relative flex flex-col justify-between'>
                                    {bicycle?.tag && (
                                        <span className='absolute top-3 right-3 rounded font-semibold p-1 px-3 text-xs text-white bg-primary'>
                                            {bicycle?.tag}
                                        </span>
                                    )}
                                    <img
                                        className='w-full border border-muted h-52 object-cover rounded-2xl'
                                        src={bicycle?.image}
                                        alt={bicycle?.name}
                                    />

                                    <h3 className='my-2 font-semibold uppercase text-2xl'>
                                        {bicycle?.name}
                                    </h3>
                                    <div className='flex items-center justify-between'>
                                        <h4 className='text-xl'>
                                            Model:{" "}
                                            <span className='font-medium'>
                                                {bicycle?.model}
                                            </span>
                                        </h4>
                                        <h4 className='text-xl'>
                                            Category:{" "}
                                            <span className='font-medium'>
                                                {bicycle?.type}
                                            </span>
                                        </h4>
                                    </div>
                                    <div className='flex items-center justify-between mt-5'>
                                        <h4 className='text-xl'>
                                            Price:{" "}
                                            <span className='font-bold'>
                                                ${bicycle?.price}
                                            </span>
                                        </h4>
                                        <h4 className='text-xl'>
                                            Brand:{" "}
                                            <span className='font-medium'>
                                                {bicycle?.brand}
                                            </span>
                                        </h4>
                                    </div>
                                    <button className='button_primary w-full mt-5'>
                                        Buy Now
                                    </button>
                                </div>
                            ))}
                    </div>
                </Spin>
                <Pagination
                    className='flex justify-center'
                    onChange={(value) => setPage(value)}
                    total={bicycleData?.meta?.total}
                    pageSize={6}
                    current={page}
                />
            </div>
        </div>
    );
};

export default Products;
