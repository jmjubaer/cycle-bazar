import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (data) => ({
                url: "/users",
                method: "POST",
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),
        getMe: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
        }),
    }),
});
export const { useSignupMutation, useLoginMutation,useGetMeQuery } = authApi;
