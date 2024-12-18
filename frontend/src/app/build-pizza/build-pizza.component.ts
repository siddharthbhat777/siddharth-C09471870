import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-build-pizza',
  imports: [],
  templateUrl: './build-pizza.component.html',
  styleUrl: './build-pizza.component.css'
})
export class BuildPizzaComponent implements OnInit {
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  cartItems = this.cartService.sharableCartPizzaIds;

  ngOnInit(): void {
      const subscription = this.cartService.getCart().subscribe({
        error: (error) => console.log(error)
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}