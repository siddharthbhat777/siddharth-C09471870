export interface Pizza {
    _id: string;
    name: string;
    type: string;
    price: number;
    image: string;
    description: string;
    ingredients: string[];
    topping: string[];
    isAdded?: boolean;
}