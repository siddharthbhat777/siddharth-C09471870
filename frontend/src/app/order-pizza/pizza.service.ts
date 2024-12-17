import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Pizza } from './pizza.model';
import { map, Observable } from 'rxjs';

@Injectable()
export class PizzaService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  get pizzaData(): Observable<Pizza[]> {
    return this.http.get<{ pizzas: Pizza[] }>('http://localhost:8001/pizza/all-pizzas', {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      map((res) => res.pizzas)
    );
  }
}
