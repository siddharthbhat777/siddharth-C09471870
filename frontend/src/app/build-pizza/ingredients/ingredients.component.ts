import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { BuildService } from '../build.service';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { ErrorScreenComponent } from "../../shared/error-screen/error-screen.component";

@Component({
  selector: 'app-ingredients',
  imports: [CurrencyPipe, RouterLink, ErrorScreenComponent],
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
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  cartItems = this.cartService.sharableCartPizzas;

  ngOnInit(): void {
    const buildSubscription = this.buildService.getIngredients().subscribe({
      next: (res) => {
        this.ingredients.set(res);
        const cartItems = this.cartItems();
        if (cartItems.length > 0) {
          const currentPizza = cartItems.find(item => item.pizzaId === this.pizzaId());
          if (currentPizza) {
            const selectedIngredientIds = currentPizza.extraIngredients.map(ingredient => ingredient._id.toString());
            this.selectedIngredients.set(selectedIngredientIds);
            const totalCost = selectedIngredientIds.reduce((sum, id) => {
              const ingredient = res.find(ingredient => ingredient._id.toString() === id);
              return ingredient ? sum + ingredient.price : sum;
            }, 0);
            this.totalCost.set(totalCost);
          }
        }
      },
      error: (error) => console.log(error)
    });
    this.destroyRef.onDestroy(() => buildSubscription.unsubscribe());
    const cartSubscription = this.cartService.getCart().subscribe({
      error: (error) => console.log(error)
    });
    this.destroyRef.onDestroy(() => cartSubscription.unsubscribe());
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
      error: (error) => console.log(error),
      complete: () => this.router.navigate(['build-pizza/select-pizza'])
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  isIngredientChecked(pizzaId: string, ingredientId: string): boolean {
    if (this.cartItems().length > 0) {
      return this.cartItems().some((item) =>
        item.pizzaId === pizzaId &&
        item.extraIngredients.some((ingredient) => ingredient._id.toString() === ingredientId)
      );
    }
    return false;
  }
}