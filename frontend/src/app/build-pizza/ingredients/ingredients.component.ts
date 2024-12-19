import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { BuildService } from '../build.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-ingredients',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent implements OnInit {
  pizzaId = input.required<string>();
  ingredients = signal<Ingredient[]>([]);
  totalCost = signal<number>(0);
  selectedIngredients = signal<string[]>([]);

  private buildService = inject(BuildService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  private cartItems = this.cartService.sharableCartPizzas;

  ngOnInit(): void {
    const subscription = this.buildService.getIngredients().subscribe({
      next: (res) => this.ingredients.set(res),
      error: (error) => console.log(error)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  updateTotalCost(price: number, ingredientId: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    const currentTotal = this.totalCost();
    this.totalCost.set(isChecked ? currentTotal + price : currentTotal - price);
    const selected = this.selectedIngredients();
    if (isChecked) {
      this.selectedIngredients.set([...selected, ingredientId]);
    } else {
      this.selectedIngredients.set(selected.filter(id => id !== ingredientId));
    }
  }

  buildPizza() {
    const subscription = this.buildService.buildPizza(this.pizzaId(), this.selectedIngredients()).subscribe({
      error: (error) => console.log(error)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  isIngredentChecked(pizzaId: string, ingredientId: string): boolean {
    if (this.cartItems().length > 0) {
      return this.cartItems().some((item) =>
        item.pizzaId === pizzaId &&
        item.extraIngredients.some((ingredient) => ingredient._id.toString() === ingredientId)
      );
    }
    return false;
  }
}