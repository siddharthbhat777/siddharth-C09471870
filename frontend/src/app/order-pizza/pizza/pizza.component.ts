import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Pizza } from '../pizza.model';
import { PizzaService } from '../pizza.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-pizza',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent {
  pizza = input.required<Pizza>();

  private pizzaService = inject(PizzaService);
  private cartService = inject(CartService);

  onAddToCart(pizza: Pizza) {
    this.pizzaService.addToCart(pizza).subscribe({
      error: (error) => console.log(error),
      complete: () => {
        this.cartService.getCart().subscribe({
          error: (error) => console.log(error)
        });
      }
    });
  }
}