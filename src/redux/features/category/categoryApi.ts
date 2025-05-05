import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/categories",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["category"],
        }),

        createCategory: builder.mutation({
            query: (data) => ({
                url: "/products",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["bicycle"],
        }),
        deleteBicycle: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["bicycle"],
        }),
        getRelatedBicycles: builder.query({
            query: (id) => ({
                url: `/products/related-product/${id}`,
                method: "GET",
            }),
        }),
        getAllReview: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/reviews",
                    method: "GET",
                    params,
                };
            },
        }),
    }),
});
export const {
    useGetAllCategoriesQuery,
    useCreateCategoryMutation,
    useGetRelatedBicyclesQuery,
    useDeleteBicycleMutation,
    useGetAllReviewQuery,
} = productApi;
