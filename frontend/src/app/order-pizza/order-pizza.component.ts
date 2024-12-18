import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PizzaComponent } from "./pizza/pizza.component";
import { PizzaService } from './pizza.service';
import { Pizza } from './pizza.model';
import { ErrorScreenComponent } from '../shared/error-screen/error-screen.component';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-order-pizza',
  imports: [PizzaComponent, ErrorScreenComponent],
  templateUrl: './order-pizza.component.html',
  styleUrl: './order-pizza.component.css',
  providers: [PizzaService]
})
export class OrderPizzaComponent implements OnInit {
  pizzas = signal<(Pizza & { isAdded: boolean })[]>([]);

  private pizzaService = inject(PizzaService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const cartSubscription = this.cartService.getCart().subscribe({
      next: (cartItems) => {
        const cartPizzaIds = cartItems.map((item) => item.pizzaId.toString());
        const pizzaSubscription = this.pizzaService.pizzaData.subscribe({
          next: (pizzas: Pizza[]) => {
            const pizzasWithAddedStatus = pizzas.map((pizza) => ({
              ...pizza,
              isAdded: cartPizzaIds.includes(pizza._id.toString()),
            }));
            this.pizzas.set(pizzasWithAddedStatus);
          },
          error: (error) => {
            console.log(error);
          }
        });
        this.destroyRef.onDestroy(() => pizzaSubscription.unsubscribe());
      }
    });
    this.destroyRef.onDestroy(() => cartSubscription.unsubscribe());
  }
}