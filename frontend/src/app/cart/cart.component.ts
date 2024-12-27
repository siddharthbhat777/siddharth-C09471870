import { Component, inject, OnInit, signal } from '@angular/core';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { CartService } from './cart.service';
import { BillingComponent } from "./billing/billing.component";
import { ErrorScreenComponent } from "../shared/error-screen/error-screen.component";
import { ScreenLoaderComponent } from "../shared/screen-loader/screen-loader.component";

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, BillingComponent, ErrorScreenComponent, ScreenLoaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  isLoading = signal<boolean>(false);

  private cartService = inject(CartService);

  cartItems = this.cartService.sharableCartPizzas;

  ngOnInit(): void {
    this.isLoading.set(true);
    this.cartService.getCart().subscribe({
      error: (error) => console.log(error),
      complete: () => {
        setTimeout(() => {
          this.isLoading.set(false);
        }, 500);
      }
    });
  }
}