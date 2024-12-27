import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { map, Observable } from 'rxjs';
import { History, HistoryRequest } from './history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getHistory(): Observable<History[]> {
    return this.http.get<{ orders: History[] }>(`https://pizzeria-gateway.onrender.com/order/all-orders/${this.authService.sharableData()?._id}`, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      map((res) => res.orders)
    );
  }

  addOrder(order: HistoryRequest) {
    return this.http.post<{ order: History }>('https://pizzeria-gateway.onrender.com/order/add', order, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      map((res) => res.order)
    );
  }
}