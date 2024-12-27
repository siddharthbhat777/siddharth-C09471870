import { Component, inject, signal } from '@angular/core';
import { PizzaComponent } from "./pizza/pizza.component";
import { CartService } from '../../cart/cart.service';
import { ErrorScreenComponent } from "../../shared/error-screen/error-screen.component";
import { ScreenLoaderComponent } from "../../shared/screen-loader/screen-loader.component";

@Component({
  selector: 'app-select-pizza',
  imports: [PizzaComponent, ErrorScreenComponent, ScreenLoaderComponent],
  templateUrl: './select-pizza.component.html',
  styleUrl: './select-pizza.component.css'
})
export class SelectPizzaComponent {
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