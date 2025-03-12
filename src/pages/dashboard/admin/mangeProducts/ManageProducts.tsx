import { Pagination, Table, TableColumnsType } from "antd";
import { useState } from "react";
import {
    useDeleteBicycleMutation,
    useGetAllBicyclesQuery,
} from "../../../../redux/features/product/productApi";
import { TProduct } from "../../../../types/prouduct.type";
import { Link } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";
import { IoSearchSharp } from "react-icons/io5";
import { LuCirclePlus } from "react-icons/lu";
import Swal from "sweetalert2";
type TTableDataType = Pick<
    TProduct,
    "image" | "name" | "model" | "type" | "brand" | "quantity"
>;
const ManageProducts = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteProduct] = useDeleteBicycleMutation();
    const { data: productsData, isFetching } = useGetAllBicyclesQuery([
        { name: "page", value: page },
        { name: "limit", value: 10 },
        { name: "sort", value: "-createdAt" },
        { name: "searchTerm", value: searchTerm },
    ]);
    const tableData = productsData?.data?.map(
        ({
            _id,
            image,
            name,
            brand,
            colors,
            model,
            price,
            quantity,
            type,
        }: TProduct) => ({
            key: _id,
            image,
            name,
            type,
            model,
            brand,
            colors,
            price,
            quantity,
        })
    );
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Product ",

            render: (item) => {
                return (
                    <div className='flex items-center gap-3'>
                        <img
                            className='w-20 h-20 rounded-md border border-gray-300'
                            src={item.image}
                            alt=''
                        />
                        <div className=''>
                            <Link
                                to={`/bicycle/${item.key}`}
                                className='text-lg font-medium'>
                                {item.name}
                            </Link>
                            <h3 className='text-lg font-medium'>
                                Model: {item.model}
                            </h3>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "Brand",
            dataIndex: "brand",
        },
        {
            title: "Category",
            dataIndex: "type",
        },
        {
            title: "In Stock",
            render: (item) => <p>{item.quantity} Pcs</p>,
        },
        {
            title: "Price",
            render: (item) => <p className='font-bold'>${item.price}</p>,
            // width: "1%"
        },
        {
            title: "Action",
            key: "role",
            render: (item) => {
                return (
                    <div className='grid gap-1'>
                        <button
                            onClick={() => handleDeleteProduct(item.key)}
                            className='whitespace-nowrap cursor-pointer bg-red-500 text-white rounded p-1 '>
                            Delete Product
                        </button>
                        <UpdateProduct item={item} />
                    </div>
                );
            },
            width: "1%",
        },
    ];
    const handleDeleteProduct = async (id: string) => {
        console.log(id);
        Swal.fire({
            title: "Do you want to delete this product?",
            // text: "Not can ",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await deleteProduct(id);
                console.log(result);
                if (result?.data?.success) {
                    Swal.fire("Deleted!", "", "success");
                }
            }
        });
    };
    return (
        <div>
            <h2 className='text-center text-4xl secondary_font my-5 font-semibold'>
                Manage Products
            </h2>
            <div className='flex justify-between my-5'>
                <div data-aos="fade-right" className='relative w-80 h-fit '>
                    <IoSearchSharp className='absolute top-1/2 right-2 text-xl text-gray-500 -translate-y-1/2' />
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type='text'
                        className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md'
                        placeholder='Search bicycle . . . .'
                    />
                </div>
                <Link data-aos="fade-left"
                    to={"/dashboard/create-product"}
                    className='button_primary flex items-center gap-2'>
                    <LuCirclePlus className='text-lg' />
                    Add Product
                </Link>
            </div>
            <Table<TTableDataType>
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                pagination={false}
                className='border border-gray-300 rounded-lg mb-3'
            />
            <Pagination
                onChange={(value) => setPage(value)}
                total={productsData?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

export default ManageProducts;
