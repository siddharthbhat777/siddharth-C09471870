import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CartService } from '../cart.service';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Address } from '../../auth/user.model';
import { Router } from '@angular/router';
import { HistoryService } from '../../history/history.service';
import { HistoryRequest } from '../../history/history.model';

@Component({
  selector: 'app-billing',
  imports: [CurrencyPipe],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private historyService = inject(HistoryService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  userData = this.authService.sharableData;
  addresses: Address[] = this.userData()?.addresses!;
  selectedAddress = signal<Address>(this.addresses[0]);
  cartItems = this.cartService.sharableCartPizzas;
  openAddressSelection = signal<boolean>(false);

  calculateTotal() {
    return this.cartItems().reduce((accumulator: number, item: { price: number; quantity: number; }) => accumulator + (item.price * item.quantity), 0);
  }

  onOpenAddressSelection() {
    if (this.addresses.length > 0) {
      this.openAddressSelection.set(!this.openAddressSelection());
    } else {
      this.router.navigate(['profile']);
    }
  }

  onAddressSelection(address: Address) {
    this.selectedAddress.set(address);
    this.openAddressSelection.set(false);
  }

  onPlaceOrder() {
    const order: HistoryRequest = {
      userId: this.authService.sharableData()?._id!,
      address: this.selectedAddress(),
      cartItems: this.cartItems(),
      finalTotal: this.calculateTotal()
    };
    const subscription = this.historyService.addOrder(order).subscribe({
      error: (error) => console.log(error),
      complete: () => {
        this.router.navigate(['order-successful']);
        this.cartService.clearCart();
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}