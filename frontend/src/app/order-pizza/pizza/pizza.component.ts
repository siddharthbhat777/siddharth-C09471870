import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Pizza } from '../pizza.model';

@Component({
  selector: 'app-pizza',
  imports: [CurrencyPipe],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent {
  pizza = input.required<Pizza>();
}
