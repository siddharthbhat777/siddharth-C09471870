import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { RouterOutlet } from '@angular/router';
import { ErrorScreenComponent } from "../shared/error-screen/error-screen.component";

@Component({
  selector: 'app-build-pizza',
  imports: [RouterOutlet, ErrorScreenComponent],
  templateUrl: './build-pizza.component.html',
  styleUrl: './build-pizza.component.css'
})
export class BuildPizzaComponent implements OnInit {
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