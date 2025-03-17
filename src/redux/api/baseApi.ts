/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BaseQueryApi,
    BaseQueryFn,
    createApi,
    DefinitionType,
    FetchArgs,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { TErrorResponse } from "../../types/global.types";
type TResponse = {
    data?: any;
    error?: TErrorResponse;
    success?: boolean;
    message?: string;
};
const baseQuery = fetchBaseQuery({
    // TODO: change base url
    baseUrl: "https://bi-cycle-store-app.vercel.app/api/",
    credentials: "include",
    // Add token in header
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("Authorization", `${token}`);
        }
        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    let result = (await baseQuery(args, api, extraOptions)) as TResponse;
    // Show common error message by toast
    if (result?.error && result?.error?.status === 400) {
        toast.error(result?.error?.data?.errorSources[0]?.message);
    }
    if (result?.error && result?.error?.status === 404) {
        toast.error(result?.error?.data?.message);
    }

    if (result?.error && result?.error?.status === 403) {
        toast.error(result?.error?.data?.message);
    }
    // Create new access token when access token is expired
    if (result?.error && result?.error?.status === 401) {
        const response = await fetch(
            "https://bi-cycle-store-app.vercel.app/api/auth/refresh-token",
            {
                method: "POST",
                credentials: "include", // Ensure cookies are sent
            }
        );
        const data = await response.json();
        if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(setUser({ user, token: data?.data?.accessToken }));
            result = (await baseQuery(args, api, extraOptions)) as TResponse;
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "usersApi",
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
    tagTypes: ["review", "bicycle", "order", "user", "users"],
});
