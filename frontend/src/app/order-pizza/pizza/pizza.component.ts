import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, DestroyRef, inject, input } from '@angular/core';
import { Pizza } from '../pizza.model';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-pizza',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent {
  pizza = input.required<Pizza>();
  
  private pizzaService = inject(PizzaService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    console.log(this.pizza());
  }

  onAddToCart(pizza: Pizza) {
    const subscription = this.pizzaService.addToCart(pizza).subscribe({
      next: (cart) => console.log(cart),
      error: (error) => {
        console.log(error);
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
