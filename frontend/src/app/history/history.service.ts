import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { map, Observable } from 'rxjs';
import { History } from './history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getHistory(): Observable<History[]> {
    return this.http.get<{ orders: History[] }>('http://localhost:8001/order/all-orders', {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      map((res) => res.orders)
    );
  }

  addOrder(order: History) {
    return this.http.post<{ order: History }>('http://localhost:8001/order/add', order, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      map((res) => res.order)
    );
  }
}