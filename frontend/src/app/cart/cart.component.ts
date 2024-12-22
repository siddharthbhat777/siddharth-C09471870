import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { CartService } from './cart.service';
import { BillingComponent } from "./billing/billing.component";
import { ErrorScreenComponent } from "../shared/error-screen/error-screen.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, BillingComponent, ErrorScreenComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  cartItems = this.cartService.sharableCartPizzas;

  ngOnInit(): void {
      const subscription = this.cartService.getCart().subscribe({
        error: (error) => console.log(error)
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}