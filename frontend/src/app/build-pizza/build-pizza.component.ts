import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BuildService } from './build.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-build-pizza',
  imports: [RouterOutlet],
  templateUrl: './build-pizza.component.html',
  styleUrl: './build-pizza.component.css',
  providers: [BuildService]
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