import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBicycles: builder.query({
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
        createOrder: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["order"],
        }),
    }),
});
export const { useCreateOrderMutation } = orderApi;
