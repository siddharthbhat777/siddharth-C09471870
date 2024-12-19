import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Cart } from './cart.model';
import { AuthService } from '../auth/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartPizzas = signal<Cart[]>([]);
  sharableCartPizzas = this.cartPizzas.asReadonly();
  
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getCart(): Observable<any[]> {
    return this.http.get<{ cartItems: any[] }>(`http://localhost:5004/cart/items/${this.authService.sharableData()?._id}`, {
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
    return this.http.put(`http://localhost:8001/cart/update-item/${this.authService.sharableData()?._id}/${pizzaId}`, {
      operation
    }, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    });
  }
  
  deleteCartItem(pizzaId: string) {
    return this.http.delete(`http://localhost:8001/cart/remove-item/${this.authService.sharableData()?._id}/${pizzaId}`, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    });
  }
}
