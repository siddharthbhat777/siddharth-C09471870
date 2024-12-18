import { Component, input } from '@angular/core';
import { Cart } from '../../../cart/cart.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pizza',
  imports: [RouterLink],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent {
  cartItem = input.required<Cart>();
}
