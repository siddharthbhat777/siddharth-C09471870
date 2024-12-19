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

  getExtraIngredients(): string {
    const extraIngredients = this.cartItem().extraIngredients;
    if (extraIngredients.length === 0) {
      return 'No ingredients added';
    }
    return this.formattedIngredient(extraIngredients).join(', ');
  }
}