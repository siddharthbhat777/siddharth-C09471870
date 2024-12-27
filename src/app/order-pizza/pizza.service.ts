import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Pizza } from './pizza.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Injectable()
export class PizzaService {
  private pizzas = signal<Pizza[]>([]);
  sharablePizzas = this.pizzas.asReadonly();

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  getPizzaData(): Observable<Pizza[]> {
    return this.http.get<{ pizzas: Pizza[] }>('https://pizzeria-order-pizza.onrender.com/pizza/all-pizzas', {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      tap({
        next: (res) => {
          const cartItems = this.cartService.sharableCartPizzas;
          const cartIds = cartItems().map((item) => item.pizzaId.toString());
          const alteredPizzas = res.pizzas.map((pizza) => {
            if (cartIds.includes(pizza._id.toString())) {
              return { ...pizza, isAdded: true };
            }
            return { ...pizza, isAdded: false };
          });
          this.pizzas.set(alteredPizzas);
        }
      }),
      map((res) => res.pizzas)
    );
  }

  addToCart(pizza: Pizza) {
    const previousPizzas = this.pizzas;
    this.pizzas.update((pizzas) =>
      pizzas.map((pizzaItem) => (pizzaItem._id === pizza._id ? { ...pizzaItem, isAdded: true } : pizzaItem))
    );
    return this.http.put(`https://pizzeria-order-pizza.onrender.com/pizza/add-to-cart/${this.authService.sharableData()?._id}/${pizza._id}`, null, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      catchError((error) => {
        this.pizzas.set(previousPizzas());
        return throwError(() => new Error(error));
      })
    );
  }
}