import { Component, input } from '@angular/core';
import { Cart } from '../../../cart/cart.model';
import { RouterLink } from '@angular/router';
import { Ingredient } from '../../ingredient.model';

@Component({
  selector: 'app-pizza',
  imports: [RouterLink],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent {
  cartItem = input.required<Cart>();

  formattedIngredient(ingredients: Ingredient[]): string[] {
    return ingredients.map((ingredient) => ingredient.tname);
  }

  isIngredientArray(ingredients: string[] | Ingredient[]): ingredients is Ingredient[] {
    return ingredients.length > 0 && (ingredients[0] as Ingredient).tname !== undefined;
  }

  getExtraIngredients(): string {
    const extraIngredients = this.cartItem().extraIngredients;
    if (extraIngredients.length === 0) {
      return 'No ingredients added';
    }
    return this.formattedIngredient(extraIngredients).join(', ');
  }
}