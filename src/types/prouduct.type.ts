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
