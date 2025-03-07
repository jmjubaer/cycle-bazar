import { TUser } from "./global.types";
import { TProduct } from "./prouduct.type";

export type TDeliveryInfo = {
    name: string;
    phoneNumber: string;
    localAddress: string;
    city: string;
    district: string;
    thana: string;
    postalCode: number;
};

export type TOrder = {
    _id: string;
    user: TUser;
    product: TProduct;
    quantity: number;
    totalPrice: number;
    deliveryInfo: TDeliveryInfo;
    transaction?: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
    paymentStatus: "pending" | "paid" | "cancelled";
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt: Date;
};
