import { Pagination, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { TUser } from "../../../types/global.types";
import {
    useChangeRoleMutation,
    useChangeStatusMutation,
    useGetAllUserQuery,
} from "../../../redux/features/user/userApi";
import { toast } from "sonner";
type TTableDataType = Pick<TUser, "name" | "email" | "role">;
const ManageUsers = () => {
    const [page, setPage] = useState(1);
    const { data: usersData, isFetching } = useGetAllUserQuery([
        { name: "page", value: page },
        { name: "limit", value: 10 },
        { name: "sort", value: "_id" },
    ]);
    const [changeUserRole] = useChangeRoleMutation();
    const [changeUserStatus] = useChangeStatusMutation();
    const tableData = usersData?.data?.map(
        ({ _id, name, email, status, role }: TUser) => ({
            key: _id,
            name,
            email,
            status,
            role,
        })
    );
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Status",
            dataIndex: "status",
        },

        {
            title: "Role",
            dataIndex: "role",
        },
        {
            title: "Action",
            key: "role",
            render: (item) => {
                return (
                    <div className='grid gap-1'>
                        <button
                            onClick={() =>
                                handleChangeRole(item.role, item.email)
                            }
                            className='whitespace-nowrap button_primary'>
                            {item?.role === "customer"
                                ? "Make Admin"
                                : "Remove Admin"}
                        </button>
                        <button
                            onClick={() =>
                                handleChangeStatus(
                                    item.role,
                                    item.status,
                                    item.email
                                )
                            }
                            className='whitespace-nowrap cursor-pointer bg-red-500 text-white rounded p-1'>
                            {item?.status === "blocked" ? "Unblock" : "Block"}
                        </button>
                    </div>
                );
            },
            width: "1%",
        },
    ];
    const handleChangeRole = async (role: string, email: string) => {
        const toastId = toast.loading("Role changing ....", { duration: 5000 });
        try {
            if (role === "supperAdmin") {
                toast.error("Super admin role can't able to change", {
                    duration: 2000,
                    id: toastId,
                });
            } else {
                const result = await changeUserRole({
                    role: role === "admin" ? "customer" : "admin",
                    email,
                });
                if (result?.data?.success) {
                    toast.success("Role change successful", {
                        id: toastId,
                    });
                }
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        }
    };
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
            />
            <Pagination
                onChange={(value) => setPage(value)}
                total={usersData?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

export default ManageUsers;
