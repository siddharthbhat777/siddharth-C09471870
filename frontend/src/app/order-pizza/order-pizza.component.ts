import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PizzaComponent } from "./pizza/pizza.component";
import { PizzaService } from './pizza.service';
import { Pizza } from './pizza.model';
import { ErrorScreenComponent } from '../shared/error-screen/error-screen.component';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-order-pizza',
  imports: [PizzaComponent, ErrorScreenComponent, FooterComponent],
  templateUrl: './order-pizza.component.html',
  styleUrl: './order-pizza.component.css',
  providers: [PizzaService]
})
export class OrderPizzaComponent implements OnInit {
  pizzas = signal<Pizza[]>([]);

  private pizzaService = inject(PizzaService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.pizzaService.pizzaData.subscribe({
      next: (pizzas: Pizza[]) => {
        console.log(pizzas);
        this.pizzas.update(() => pizzas);
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}