import { Address } from "../auth/user.model";
import { Cart } from "../cart/cart.model";

export interface History {
    _id: string;
    userId: string;
    finalTotal: number;
    address: Address;
    cartItems: Cart[];
    createdAt: string;
}

export interface HistoryRequest {
    userId: string;
    finalTotal: number;
    address: Address;
    cartItems: Cart[];
}