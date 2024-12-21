export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    age: number;
    email: string;
    phone?: string;
    iat?: number;
    exp?: number;
    addresses?: Address[]
}

export interface TokenResponse {
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

export interface Address {
    _id?: string;
    title: string;
    receiverName: string;
    receiverPhone: string;
    addressLine: string;
    pincode: number;
    city: string;
    state: string
};

export interface ProfileRequest {
    firstname: string;
    lastname: string;
    age: number;
    phone: string;
};