import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/orders",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["order"],
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: "/my-orders",
                method: "GET",
            }),
            providesTags: ["order"],
        }),
        createOrder: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["order"],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["order"],
        }),
        verifyPayment: builder.query({
            query: (order_id) => ({
                url: "/orders/verify-payment",
                params: { order_id },
                method: "GET",
            }),
        }),
        changeOrderStatus: builder.mutation({
            query: ({ status, id }) => ({
                url: `/orders/change-status/${id}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["order"],
        }),
        getTotalRevenue: builder.query({
            query: () => ({
                url: "/orders/revenue",
                method: "GET",
            }),
            providesTags: ["order"],
        }),
    }),
});
export const {
    useGetAllOrdersQuery,
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useVerifyPaymentQuery,
    useChangeOrderStatusMutation,
    useDeleteOrderMutation,
    useGetTotalRevenueQuery
} = orderApi;
