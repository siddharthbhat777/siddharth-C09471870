import { Component, input } from '@angular/core';
import { Cart } from '../cart.model';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  cartItem = input.required<Cart>();
}