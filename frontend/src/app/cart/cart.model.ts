import { Ingredient } from "../build-pizza/ingredient.model";

export interface Cart {
    quantity: number;
    pizzaId: string;
    name: string;
    image: string;
    description: string;
    ingredients: string[];
    extraIngredients: string[] | Ingredient[];
    topping: string[];
}