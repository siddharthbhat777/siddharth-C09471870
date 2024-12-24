import { Component, inject, OnInit, signal } from '@angular/core';
import { HistoryService } from './history.service';
import { History } from './history.model';
import { ErrorScreenComponent } from "../shared/error-screen/error-screen.component";
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Cart } from '../cart/cart.model';
import { ScreenLoaderComponent } from "../shared/screen-loader/screen-loader.component";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
  imports: [ErrorScreenComponent, DatePipe, CurrencyPipe, ScreenLoaderComponent]
})
export class HistoryComponent implements OnInit {
  isLoading = signal<boolean>(false);
  orders = signal<History[]>([]);

  private historyService = inject(HistoryService);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.historyService.getHistory().subscribe({
      next: (res) => this.orders.set(res),
      error: (error) => console.log(error),
      complete: () => {
        setTimeout(() => {
          this.isLoading.set(false);
        }, 500);
      }
    });
  }

  getItemList(items: Cart[]) {
    return items.map((item) => item.name);
  }
}