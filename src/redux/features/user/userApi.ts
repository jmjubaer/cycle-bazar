import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/users",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["users"],
        }),

        getMyOrders: builder.query({
            query: () => ({
                url: "/my-orders",
                method: "GET",
            }),
            providesTags: ["order"],
        }),

        getMe: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["user"],
        }),
        updateMyName: builder.mutation({
            query: (data) => ({
                url: "/user/update-name",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        changeRole: builder.mutation({
            query: ({ role, email }) => ({
                url: `users/change-role/${email}`,
                method: "POST",
                body: { role },
            }),
            invalidatesTags: ["users"],
        }),
        changeStatus: builder.mutation({
            query: ({ status, email }) => ({
                url: `users/change-status/${email}`,
                method: "POST",
                body: { status },
            }),
            invalidatesTags: ["users"],
        }),
        getActivitySummery: builder.query({
            query: () => ({
                url: "/activity-summary",
                method: "GET",
            }),
        }),
       
    }),
});
export const {
    useUpdateMyNameMutation,
    useGetMeQuery,
    useGetAllUserQuery,
    useChangeRoleMutation,
    useChangeStatusMutation,
    useGetActivitySummeryQuery,
} = userApi;
