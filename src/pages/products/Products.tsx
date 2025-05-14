import { Pagination, Spin } from "antd";
import { useGetAllBicyclesQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types/prouduct.type";
import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../shere/ProductCard";
import { Layout } from "antd";

const { Sider } = Layout;

const Products = () => {
    const [param] = useSearchParams();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
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
        { name: "limit", value: 12 },
        { name: "sort", value: "_id" },
        { name: "searchTerm", value: searchTerm },
        { name: "minPrice", value: minPrice },
        { name: "maxPrice", value: maxPrice },
        ...(category ? [{ name: "category", value: category }] : []),
        // ...brand,
        ...availability,
    ]);
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
    useEffect(() => {
        if (param.get("category")) {
            setCategory(param.get("category")!);
        }
    }, [param]);
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [category, page, searchTerm, availability, minPrice, maxPrice, param]);
    return (
        <div className='container '>
            <Layout>
                {/* Filter and search section */}
                <Sider
                    width={250}
                    theme='light'
                    className='pt-5'
                    breakpoint='lg'
                    collapsedWidth='0'>
                    {/* Filter and search section */}
                    <div
                        style={{ scrollbarWidth: "none" }}
                        className=' sticky h-[calc(100vh-95px)] overflow-auto top-0 left-0 border-r border-gray-300 text-base p-3'>
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
                                    <FaTag className='text-sm ' /> All
                                    Categories
                                </li>
                                <li
                                    className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                        category === "Mountain"
                                            ? "text-primary/70"
                                            : ""
                                    }`}
                                    onClick={() => setCategory("Mountain")}
                                    value=''>
                                    {" "}
                                    <FaTag className='text-sm ' /> Mountain
                                </li>
                                <li
                                    className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                        category === "Road"
                                            ? "text-primary/70"
                                            : ""
                                    }`}
                                    onClick={() => setCategory("Road")}
                                    value=''>
                                    {" "}
                                    <FaTag className='text-sm ' /> Road Cycle
                                </li>
                                <li
                                    className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                        category === "Hybrid"
                                            ? "text-primary/70"
                                            : ""
                                    }`}
                                    onClick={() => setCategory("Hybrid")}
                                    value=''>
                                    {" "}
                                    <FaTag className='text-sm ' />
                                    Hybrid Cycle
                                </li>
                                <li
                                    className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                        category === "BMX"
                                            ? "text-primary/70"
                                            : ""
                                    }`}
                                    onClick={() => setCategory("BMX")}
                                    value=''>
                                    {" "}
                                    <FaTag className='text-sm ' /> BMX Cycle
                                </li>
                                <li
                                    className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                        category === "Electric"
                                            ? "text-primary/70"
                                            : ""
                                    }`}
                                    onClick={() => setCategory("Electric")}
                                    value=''>
                                    {" "}
                                    <FaTag className='text-sm ' /> Electric
                                </li>
                                <li
                                    className={`flex items-center cursor-pointer gap-2 font-medium my-4 ${
                                        category === "Kids"
                                            ? "text-primary/70"
                                            : ""
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
                                <label
                                    className='cursor-pointer'
                                    htmlFor='available'>
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
                                <label
                                    className='cursor-pointer'
                                    htmlFor='outOfStock'>
                                    Out of Stock
                                </label>
                            </div>
                        </div>
                        <hr className='text-gray-300 mb-5' />
                        <div className=''>
                            <h3 className='block mb-5 font-bold text-2xl secondary_font text-primary'>
                                Price Range
                            </h3>
                            <div className='flex justify-between items-center gap-2  pl-3'>
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
                    </div>
                </Sider>
                {/* Product section */}
                <Layout>
                    <div
                        ref={contentRef}
                        style={{ scrollbarWidth: "none" }}
                        className=' h-[calc(100vh-75px)] overflow-auto  lg:p-3 pr-0'>
                        <Spin
                            spinning={isFetching}
                            tip='Loading...'
                            size='large'>
                            {/* Product section */}
                            <div className='grid xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-5 gap-3 '>
                                {bicycleData?.data.length > 0 ? (
                                    bicycleData?.data.map(
                                        (bicycle: TProduct) => (
                                            <ProductCard
                                                key={bicycle._id}
                                                bicycle={bicycle}></ProductCard>
                                        )
                                    )
                                ) : (
                                    <div className='text-gray-400 text-2xl text-center col-span-3 my-10'>
                                        There has no available bicycle
                                    </div>
                                )}
                            </div>
                        </Spin>
                        <Pagination
                            className='flex justify-center'
                            onChange={(value) => setPage(value)}
                            total={bicycleData?.meta?.total}
                            pageSize={12}
                            current={page}
                        />
                    </div>
                </Layout>
            </Layout>
        </div>
    );
};

export default Products;
