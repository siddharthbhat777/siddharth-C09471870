import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Cart } from './cart.model';
import { AuthService } from '../auth/auth.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartPizzas = signal<Cart[]>([]);
  sharableCartPizzas = this.cartPizzas.asReadonly();

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getCart(): Observable<any[]> {
    return this.http.get<{ cartItems: any[] }>(`https://pizzeria-cart.onrender.com/cart/items/${this.authService.sharableData()?._id}`, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      tap({
        next: (res) => {
          const formattedCart: Cart[] = res.cartItems.map((item) => ({
            quantity: item.quantity,
            pizzaId: item.pizzaId,
            name: item.pizzaData.name,
            type: item.pizzaData.type,
            price: item.pizzaData.price,
            image: item.pizzaData.image,
            description: item.pizzaData.description,
            ingredients: item.pizzaData.ingredients,
            extraIngredients: item.pizzaData.extraIngredients || [],
            topping: item.pizzaData.topping
          }));
          this.cartPizzas.set(formattedCart);
        }
      }),
      map((res) => res.cartItems)
    );
  }

  updateCartItem(pizzaId: string, operation: 'plus' | 'minus') {
    const previousCart = this.cartPizzas;
    const updatedCart = this.cartPizzas().map((item) => {
      if (item.pizzaId === pizzaId) {
        const newQuantity = operation === 'plus' ? item.quantity + 1 : item.quantity - 1;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : item.quantity
        };
      }
      return item;
    });
    this.cartPizzas.set(updatedCart);
    return this.http.put(`https://pizzeria-cart.onrender.com/cart/update-item/${this.authService.sharableData()?._id}/${pizzaId}`, {
      operation
    }, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      catchError((error) => {
        this.cartPizzas.set(previousCart());
        return throwError(() => new Error(error));
      })
    );
  }

  deleteCartItem(pizzaId: string) {
    const previousCart = this.cartPizzas;
    const updatedCart = this.cartPizzas().filter((item) => item.pizzaId !== pizzaId);
    this.cartPizzas.set(updatedCart);
    return this.http.delete(`https://pizzeria-cart.onrender.com/cart/remove-item/${this.authService.sharableData()?._id}/${pizzaId}`, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      catchError((error) => {
        this.cartPizzas.set(previousCart());
        return throwError(() => new Error(error));
      })
    );
  }

  clearCart() {
    this.cartPizzas.set([]);
  }
}