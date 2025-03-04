import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
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
                    url: "/products",
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
        getMe: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        updateMyName: builder.mutation({
            query: (data) => ({
                url: "/user/update-name",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
    }),
});
export const { useUpdateMyNameMutation, useGetMeQuery } = userApi;
