import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFlashSale: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/flashSale",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["flashSale"],
        }),
        createFlashSale: builder.mutation({
            query: (data) => ({
                url: "/flashSale",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["bicycle"],
        }),
        getBicycleById: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
            providesTags: ["bicycle"],
        }),
        updateFlashSale: builder.mutation({
            query: ({ data, id }) => ({
                url: `/flashSale/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["flashSale"],
        }),

        deleteFlashSaleProduct: builder.mutation({
            query: (id) => ({
                url: `/flashSale/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["flashSale"],
        }),
    }),
});
export const {
    useGetAllFlashSaleQuery,
    useGetBicycleByIdQuery,
    useCreateFlashSaleMutation,
    useDeleteFlashSaleProductMutation,
    useUpdateFlashSaleMutation,
} = productApi;
