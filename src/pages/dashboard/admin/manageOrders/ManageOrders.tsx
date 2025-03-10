import { Pagination, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { TUser } from "../../../../types/global.types";
import {
    useDeleteOrderMutation,
    useGetAllOrdersQuery,
} from "../../../../redux/features/order/orderApi";
import { TOrder } from "../../../../types/order.type";
import ViewOrderDetails from "../../../shere/ViewOrderDetails";
import ChangeOrderStatus from "./ChangeOrderStatus";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
type TTableDataType = Pick<TUser, "name" | "email" | "role">;
const ManageOrders = () => {
    const [page, setPage] = useState(1);
    const [deleteOrder] = useDeleteOrderMutation();
    const { data: orderData, isFetching } = useGetAllOrdersQuery([
        { name: "page", value: page },
        { name: "limit", value: 10 },
        { name: "sort", value: "-createdAt" },
    ]);
    const tableData = orderData?.data?.map(
        ({
            _id,
            product,
            status,
            totalPrice,
            quantity,
            user,
            paymentStatus,
            deliveryInfo,
        }: TOrder) => ({
            key: _id,
            user,
            product,
            deliveryInfo,
            productName: product?.name,
            status,
            totalPrice: `$${totalPrice}`,
            quantity: `Qty -${quantity}`,
            paymentStatus,
            userName: user?.name,
        })
    );
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Product Name",
            render: (item) => {
                console.log(item);
                return (
                    <Link
                        className='text-black'
                        to={`/product/${item?.product?._id}`}>
                        {item?.product?.name}
                    </Link>
                );
            },
        },
        {
            title: "User Name",
            dataIndex: "userName",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
        },
        {
            title: "Total Price",
            dataIndex: `totalPrice`,
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Payment",
            dataIndex: "paymentStatus",
        },

        {
            title: "Action",
            key: "role",
            render: (item) => {
                return (
                    <div className='w-full text-center'>
                        <button
                            onClick={() => handleDeleteProduct(item.key)}
                            className=''>
                            <FaTrashCan className='text-xl cursor-pointer text-red-500' />
                        </button>
                    </div>
                );
            },
            width: "1%",
        },
        {
            title: "Action",
            key: "role",
            render: (item) => {
                return (
                    <div className='grid gap-1'>
                        <ViewOrderDetails item={item} type='' />
                        <ChangeOrderStatus item={item} />
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
                const result = await deleteOrder(id);
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
                Manage Orders
            </h2>

            <Table<TTableDataType>
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                pagination={false}
                className='border border-gray-300 rounded-lg mb-3'
            />
            <Pagination
                onChange={(value) => setPage(value)}
                total={orderData?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

export default ManageOrders;
