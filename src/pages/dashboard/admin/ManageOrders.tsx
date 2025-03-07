import { Pagination, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { TUser } from "../../../types/global.types";
import { useGetAllOrdersQuery } from "../../../redux/features/order/orderApi";
import { TOrder } from "../../../types/order.type";
import ViewOrderDetails from "../../shere/ViewOrderDetails";
import ChangeOrderStatus from "./ChangeOrderStatus";
type TTableDataType = Pick<TUser, "name" | "email" | "role">;
const ManageOrders = () => {
    const [page, setPage] = useState(1);
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
            dataIndex: "productName",
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
            title: "Payment Status",
            dataIndex: "paymentStatus",
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
                total={orderData?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

export default ManageOrders;
