import { Component, DestroyRef, inject } from '@angular/core';
import { PizzaComponent } from "./pizza/pizza.component";
import { CartService } from '../../cart/cart.service';
import { ErrorScreenComponent } from "../../shared/error-screen/error-screen.component";

@Component({
  selector: 'app-select-pizza',
  imports: [PizzaComponent, ErrorScreenComponent],
  templateUrl: './select-pizza.component.html',
  styleUrl: './select-pizza.component.css'
})
export class SelectPizzaComponent {
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