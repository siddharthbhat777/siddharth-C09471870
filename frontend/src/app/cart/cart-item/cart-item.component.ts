import { Component, input } from '@angular/core';
import { Cart } from '../cart.model';
import { Ingredient } from '../../build-pizza/ingredient.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
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