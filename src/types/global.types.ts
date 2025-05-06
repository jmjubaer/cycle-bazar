import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TOrder } from "./order.type";
import { TProduct } from "./prouduct.type";

export type TErrorResponse = {
    data: {
        errorSources: any;
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};
type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
};
export type TResponse<T> = {
    data?: T;
    meta?: TMeta;
    error?: TErrorResponse;
    success?: boolean;
    message?: string;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
    name: string;
    value: boolean | React.Key;
};
export type TUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: "in-progress" | "blocked";
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    passwordChangedAt: Date;

    phone?: string;
    password: string;

    city: string;
    district: string;
    thana: string;
    postalCode: number;
    localAddress: string;
};

export type TActivity = {
    totalOrders: TOrder;
    totalProducts: TProduct;
    totalUsers: TUser;
};
