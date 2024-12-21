export interface User {
    _id: string;
    firstname: string;
    lastname: string;
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

export interface Register {
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    password: string;
}