import { TUser } from "./global.types";

export type TReview = {
    _id: string;
    reviewer: TUser;
    product: TProduct;
    rating: number;
    comment: string;
    createdAt: Date;
};
export type TProduct = {
    key: string;
    _id: string;
    name: string;
    brand: string;
    model: string;
    price: number;
    type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric" | "Kids";
    tag?: string;
    quantity: number;

    image: string;
    description: string;
    reviews: TReview[];
    inStock: boolean;
    colors: string[];
};
