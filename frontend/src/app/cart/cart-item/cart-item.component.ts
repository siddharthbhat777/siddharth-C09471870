import { Component, DestroyRef, inject, input } from '@angular/core';
import { Cart } from '../cart.model';
import { Ingredient } from '../../build-pizza/ingredient.model';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  cartItem = input.required<Cart>();

  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

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

  updateCartItem(pizzaId: string, operation: 'plus' | 'minus') {
    if (this.cartItem().quantity < 2 && operation === 'minus') {
      this.deleteCartItem(pizzaId);
    } else {
      const subscription = this.cartService.updateCartItem(pizzaId, operation).subscribe({
        error: (error) => console.log(error)
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }

  deleteCartItem(pizzaId: string) {
    const subscription = this.cartService.deleteCartItem(pizzaId).subscribe({
      error: (error) => console.log(error)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}