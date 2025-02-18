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
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
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
    // console.log(result);
    if (result?.error && result?.error?.status === 404) {
        toast.error(result?.error?.data?.message);
    }
    if (result?.error && result?.error?.status === 403) {
        console.log(result?.error?.data?.message);
        toast.error(result?.error?.data?.message);
    }
    if (result?.error && result?.error?.status === 401) {
        const response = await fetch(
            "http://localhost:5000/api/v1/auth/refresh-token",
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
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes: [],
});
