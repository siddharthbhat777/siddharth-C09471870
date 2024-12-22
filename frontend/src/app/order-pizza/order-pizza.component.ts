import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { PizzaComponent } from "./pizza/pizza.component";
import { PizzaService } from './pizza.service';
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
  private pizzaService = inject(PizzaService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  pizzas = this.pizzaService.sharablePizzas;

  pizzaId = input<string | undefined>();

  ngOnInit(): void {
    if (this.pizzaId()) {
      this.scrollToPizza(this.pizzaId()!);
    }
    const cartSubscription = this.cartService.getCart().subscribe({
      error: (error) => console.log(error)
    });
    this.destroyRef.onDestroy(() => cartSubscription.unsubscribe());
    const pizzaSubscription = this.pizzaService.pizzaData.subscribe({
      error: (error) => console.log(error)
    });
    this.destroyRef.onDestroy(() => pizzaSubscription.unsubscribe());
  }

  scrollToPizza(pizzaId: string): void {
    setTimeout(() => {
      const pizzaTargetElement = document.getElementById(pizzaId);
      const pizzaElement = document.getElementById(`pizza-${pizzaId}`);
      if (pizzaTargetElement && pizzaElement) {
        pizzaTargetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => pizzaElement.classList.add('scale-effect'), 500);
        setTimeout(() => pizzaElement.classList.remove('scale-effect'), 1000);
      }
    }, 500);
  }
}