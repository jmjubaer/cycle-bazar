import { Pagination, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { TUser } from "../../../types/global.types";
import { useChangeStatusMutation } from "../../../redux/features/user/userApi";
import { toast } from "sonner";
import { useGetAllOrdersQuery } from "../../../redux/features/order/orderApi";
import { TOrder } from "../../../types/order.type";
import ViewOrderDetails from "./ViewOrderDetails";
type TTableDataType = Pick<TUser, "name" | "email" | "role">;
const ManageOrders = () => {
    const [page, setPage] = useState(1);
    const { data: orderData, isFetching } = useGetAllOrdersQuery([
        { name: "page", value: page },
        { name: "limit", value: 10 },
        { name: "sort", value: "-createdAt" },
    ]);
    const [changeUserStatus] = useChangeStatusMutation();
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
                        <ViewOrderDetails item={item} />
                        <button
                            onClick={() =>
                                handleChangeStatus(
                                    item.role,
                                    item.status,
                                    item.email
                                )
                            }
                            className='whitespace-nowrap cursor-pointer bg-primary text-black rounded p-1'>
                            Change Status
                        </button>
                    </div>
                );
            },
            width: "1%",
        },
    ];

    const handleChangeStatus = async (
        role: string,
        status: string,
        email: string
    ) => {
        const toastId = toast.loading("Status changing ....", {
            duration: 5000,
        });
        try {
            if (role === "supperAdmin") {
                toast.error("Super admin status can't able to change", {
                    duration: 2000,
                    id: toastId,
                });
                return;
            }
            const result = await changeUserStatus({
                status: status === "blocked" ? "in-progress" : "blocked",
                email,
            });

            if (result?.data?.success) {
                toast.success("Status change successful", {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        }
    };
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
