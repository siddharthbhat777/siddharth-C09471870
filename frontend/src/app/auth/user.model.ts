export interface User {
    _id: string;
    name: string;
    age: number;
    email: string;
    phone?: number;
    iat?: number;
    exp?: number;
    addresses?: {
        title: string;
        receiverName: string;
        receiverPhone: string;
        addressLine: string;
        pincode: number;
        city: string;
        state: string
    }[]
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}