import { Component } from '@angular/core';
import { PizzaComponent } from "./pizza/pizza.component";

@Component({
  selector: 'app-order-pizza',
  imports: [PizzaComponent],
  templateUrl: './order-pizza.component.html',
  styleUrl: './order-pizza.component.css'
})
export class OrderPizzaComponent {

}
