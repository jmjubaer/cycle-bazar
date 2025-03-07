import { TUser } from "./global.types";

export type TReview = {
    reviewer: TUser;
    product: TProduct;
    rating: number;
    comment: string;
    createdAt: Date;
};
export type TProduct = {
    key: any;
    _id: string;
    name: string;
    brand: string;
    model: string;
    image: string;
    price: number;
    tag?: string;
    type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric" | "Kids";
    description: string;
    reviews: TReview[];
    quantity: number;
    inStock: boolean;
    colors: string[];
};
