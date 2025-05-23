import { Pagination, Table, TableColumnsType, TableProps } from "antd";
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
import AddOfferProducts from "./AddOfferProducts";
type TableRowSelection<T extends object = object> =
    TableProps<T>["rowSelection"];
type TTableDataType = Pick<
    TProduct,
    "image" | "name" | "model" | "category" | "brand" | "quantity"
>;
const ManageProducts = () => {
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
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
            category,
        }: TProduct) => ({
            key: _id,
            image,
            name,
            category,
            model,
            brand,
            colors,
            price,
            quantity,
        })
    );
    // Manage Product table data
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
            dataIndex: "category",
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
    // delete product functionality
    const handleDeleteProduct = async (id: string) => {
        Swal.fire({
            title: "Are you sure delete product?",
            // text: "Not can ",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await deleteProduct(id);
                if (result?.data?.success) {
                    Swal.fire("Deleted!", "", "success");
                }
            }
        });
    };
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedIds(newSelectedRowKeys);
    };
    console.log(selectedIds);
    const rowSelection: TableRowSelection<TTableDataType> = {
        selectedRowKeys: selectedIds,
        onChange: onSelectChange,
    };
    return (
        <div>
            <h2 className='text-center text-3xl xs:text-4xl secondary_font my-5 font-semibold'>
                Manage Products
            </h2>
            <div className='flex flex-wrap-reverse gap-4 justify-between my-5'>
                {/* Search Products field */}
                <div className='relative w-full xs:w-80 h-fit '>
                    <IoSearchSharp className='absolute top-1/2 right-2 text-xl text-gray-500 -translate-y-1/2' />
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type='text'
                        className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md'
                        placeholder='Search bicycle . . . .'
                    />
                </div>
                <div className='flex  items-center gap-5'>
                    <AddOfferProducts
                        setSelectedIds={setSelectedIds}
                        selectedIds={selectedIds}
                    />

                    <Link
                        to={"/dashboard/create-product"}
                        className='button_primary flex items-center gap-2'>
                        <LuCirclePlus className='text-lg' />
                        Add Product
                    </Link>
                </div>
            </div>
            {/* Manage product table  */}
            <div className='overflow-auto'>
                <Table<TTableDataType>
                    loading={isFetching}
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={tableData}
                    pagination={false}
                    className='border border-gray-300 min-w-[800px] rounded-lg mb-3'
                />
            </div>
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
