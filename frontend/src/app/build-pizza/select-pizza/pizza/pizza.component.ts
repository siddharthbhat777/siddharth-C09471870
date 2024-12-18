import { Component, input } from '@angular/core';
import { Cart } from '../../../cart/cart.model';

@Component({
  selector: 'app-pizza',
  imports: [],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent {
  cartItem = input.required<Cart>();
}
