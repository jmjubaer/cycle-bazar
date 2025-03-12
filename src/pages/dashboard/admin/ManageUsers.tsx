/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { TUser } from "../../../types/global.types";
import {
    useChangeRoleMutation,
    useChangeStatusMutation,
    useGetAllUserQuery,
} from "../../../redux/features/user/userApi";
import { toast } from "sonner";
import { IoSearchSharp } from "react-icons/io5";
type TTableDataType = Pick<TUser, "name" | "email" | "role">;
const ManageUsers = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const { data: usersData, isFetching } = useGetAllUserQuery([
        { name: "page", value: page },
        { name: "limit", value: 10 },
        { name: "sort", value: "_id" },
        { name: "searchTerm", value: searchTerm },
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
            <h2 className='text-center text-4xl secondary_font my-5 font-semibold'>
                Manage users
            </h2>
            <div data-aos="fade-right" className='relative w-80 h-fit my-5'>
                <IoSearchSharp className='absolute top-1/2 right-2 text-xl text-gray-500 -translate-y-1/2' />
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type='text'
                    className='outline-0 bg-gray-200 w-full px-5 p-2 rounded-md'
                    placeholder='Search by name or email...'
                />
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
                total={usersData?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

export default ManageUsers;
