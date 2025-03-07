import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
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
            providesTags: ["bicycle"],
        }),
        getBicycleById: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
            providesTags: ["bicycle"],
        }),
        updateBicycle: builder.mutation({
            query: ({ data, id }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["bicycle"],
        }),
        getRelatedBicycles: builder.query({
            query: (id) => ({
                url: `/products/related-product/${id}`,
                method: "GET",
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: "/create-review",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["bicycle"],
        }),
    }),
});
export const {
    useGetAllBicyclesQuery,
    useGetBicycleByIdQuery,
    useGetRelatedBicyclesQuery,
    useCreateReviewMutation,
    useUpdateBicycleMutation
} = productApi;
