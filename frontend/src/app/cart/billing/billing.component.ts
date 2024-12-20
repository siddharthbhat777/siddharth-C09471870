import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-billing',
  imports: [CurrencyPipe],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.sharableCartPizzas;

  calculateTotal() {
    return this.cartItems().reduce((accumulator: number, item: { price: number; quantity: number; }) => accumulator + (item.price * item.quantity), 0);
  }
}