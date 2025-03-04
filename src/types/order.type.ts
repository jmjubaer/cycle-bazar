import { TProduct } from "./prouduct.type";

export type TDeliveryAddress = {
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
    user: string;
    product: TProduct;
    quantity: number;
    totalPrice: number;
    deliveryAddress: TDeliveryAddress;
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
