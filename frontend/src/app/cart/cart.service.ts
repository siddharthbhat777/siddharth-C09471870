import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Cart } from './cart.model';
import { AuthService } from '../auth/auth.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getCart() {
    return this.http.get<{ cartItems: Cart[] }>(`http://localhost:5004/cart/items/${this.authService.sharableData()?._id}`, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      map((res) => res.cartItems)
    );
  }
}
