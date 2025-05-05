import { Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TOfferProduct } from "../../../../types/prouduct.type";
import { Link } from "react-router-dom";
import { LuCirclePlus } from "react-icons/lu";
import Swal from "sweetalert2";
import UpdateOffer from "./UpdateOffer";
import {
    useDeleteFlashSaleProductMutation,
    useGetAllFlashSaleQuery,
} from "../../../../redux/features/offerProducts/offerApi";
type TableRowSelection<T extends object = object> =
    TableProps<T>["rowSelection"];
type TTableDataType = Pick<TOfferProduct, "product" | "discountPercentage">;
const ManageOfferProducts = () => {
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
    const [sortby, setSortby] = useState("-createdAt");
    const [deleteProduct] = useDeleteFlashSaleProductMutation();
    const { data: flashSaleData, isFetching } = useGetAllFlashSaleQuery([
        { name: "page", value: page },
        { name: "limit", value: 10 },
        { name: "sort", value: sortby },
    ]);
    const tableData = flashSaleData?.data?.map(
        ({ _id, product, discountPercentage }: TOfferProduct) => ({
            key: _id,
            product,
            discountPercentage,
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
                            src={item?.product?.image}
                            alt=''
                        />
                        <div className=''>
                            <Link
                                to={`/bicycle/${item.key}`}
                                className='text-lg font-medium'>
                                {item.product?.name}
                            </Link>
                            <h3 className='text-lg font-medium'>
                                Model: {item.product?.model}
                            </h3>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "Category",
            render: (item) => <p>{item.product.category}</p>,
        },
        {
            title: "In Stock",
            render: (item) => <p>{item.product.quantity} Pcs</p>,
        },
        {
            title: "Offer Price",
            render: (item) => (
                <div className='flex items-center gap-2'>
                    <p className='font-bold'>
                        $
                        {item.product?.price -
                            item.product?.price *
                                (item.discountPercentage / 100)}
                    </p>{" "}
                    /
                    <p className='font-bold text-gray-400 line-through'>
                        ${item.product?.price}
                    </p>
                </div>
            ),
            // width: "1%"
        },
        {
            title: "Discount",
            render: (item) => (
                <p className=' font-bold text-xl'>{item.discountPercentage}%</p>
            ),
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
                        <UpdateOffer item={item} />
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
                Manage Offer Products
            </h2>
            <div className='flex flex-wrap-reverse gap-4 justify-between my-5'>
                {/* Search Products field */}
                <div className='relative w-full xs:w-80 h-fit '>
                    <select
                        onChange={(e) => setSortby(e.target.value)}
                        className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md text-lg font-medium'>
                        <option value='-createdAt'>
                            Sort By Offer Percentage
                        </option>
                        <option value='discountPercentage'>
                            Low To High Offer
                        </option>
                        <option value='-discountPercentage'>
                            High To Low Offer
                        </option>
                    </select>
                </div>
                <Link
                    to={"/dashboard/manage-products"}
                    className='button_primary flex items-center gap-2'>
                    <LuCirclePlus className='text-lg' />
                    Add Offer Product
                </Link>
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
                total={flashSaleData?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

export default ManageOfferProducts;
