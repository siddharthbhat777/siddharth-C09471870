import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';
import { map, Observable } from 'rxjs';
import { Cart } from '../cart/cart.model';

@Injectable()
export class BuildService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<{ ingredients: Ingredient[] }>('http://localhost:8001/build/ingredients', {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      map((res) => res.ingredients)
    );
  }

  buildPizza(pizzaId: string, ingredients: string[]): Observable<Cart[]> {
    return this.http.put<{ cart: Cart[] }>(`http://localhost:8001/build/customize/${this.authService.sharableData()?._id}/${pizzaId}`, {
      ingredients
    }, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      map((res) => res.cart)
    );
  }
}