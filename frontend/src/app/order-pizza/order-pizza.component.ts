import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { PizzaComponent } from "./pizza/pizza.component";
import { PizzaService } from './pizza.service';
import { ErrorScreenComponent } from '../shared/error-screen/error-screen.component';
import { ScreenLoaderComponent } from "../shared/screen-loader/screen-loader.component";

@Component({
  selector: 'app-order-pizza',
  imports: [PizzaComponent, ErrorScreenComponent, ScreenLoaderComponent],
  templateUrl: './order-pizza.component.html',
  styleUrl: './order-pizza.component.css',
  providers: [PizzaService]
})
export class OrderPizzaComponent implements OnInit {
  isLoading = signal<boolean>(false);

  private pizzaService = inject(PizzaService);
  private destroyRef = inject(DestroyRef);

  pizzas = this.pizzaService.sharablePizzas;

  pizzaId = input<string | undefined>();

  ngOnInit(): void {
    this.isLoading.set(true);
    if (this.pizzaId()) {
      this.scrollToPizza(this.pizzaId()!);
    }
    const pizzaSubscription = this.pizzaService.pizzaData.subscribe({
      error: (error) => console.log(error),
      complete: () => {
        setTimeout(() => {
          this.isLoading.set(false);
        }, 500);
      }
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