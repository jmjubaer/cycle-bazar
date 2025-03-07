import { Pagination, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { useGetAllBicyclesQuery } from "../../../../redux/features/product/productApi";
import { TProduct } from "../../../../types/prouduct.type";
import { Link } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";
type TTableDataType = Pick<
    TProduct,
    "image" | "name" | "model" | "type" | "brand" | "quantity"
>;
const ManageProducts = () => {
    const [page, setPage] = useState(1);
    const { data: productsData, isFetching } = useGetAllBicyclesQuery([
        { name: "page", value: page },
        { name: "limit", value: 10 },
        { name: "sort", value: "-createdAt" },
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
                            <h3 className='text-lg font-medium'>{item.name}</h3>
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
                        <Link
                            to={`/bicycle/${item.key}`}
                            // onClick={() =>
                            //     handleChangeRole(item.role, item.email)
                            // }
                            className='whitespace-nowrap button_primary'>
                            View Product
                        </Link>
                        <UpdateProduct item={item} />
                    </div>
                );
            },
            width: "1%",
        },
    ];

    return (
        <div>
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
