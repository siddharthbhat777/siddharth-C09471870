import { Component, inject, signal } from '@angular/core';
import { CartService } from '../cart.service';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Address } from '../../auth/user.model';
import { Router } from '@angular/router';
import { HistoryService } from '../../history/history.service';
import { HistoryRequest } from '../../history/history.model';
import { ErrorAlertComponent } from "../../shared/error-alert/error-alert.component";

@Component({
  selector: 'app-billing',
  imports: [CurrencyPipe, ErrorAlertComponent],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private historyService = inject(HistoryService);
  private router = inject(Router);

  userData = this.authService.sharableData;
  addresses: Address[] = this.userData()?.addresses!;
  selectedAddress = signal<Address>(this.addresses[0]);
  cartItems = this.cartService.sharableCartPizzas;
  openAddressSelection = signal<boolean>(false);
  showErrorAlert = signal<boolean>(false);

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
    if (!!this.selectedAddress()) {
      const order: HistoryRequest = {
        userId: this.authService.sharableData()?._id!,
        address: this.selectedAddress(),
        cartItems: this.cartItems(),
        finalTotal: this.calculateTotal()
      };
      this.historyService.addOrder(order).subscribe({
        error: (error) => console.log(error),
        complete: () => {
          this.router.navigate(['order-successful']);
          this.cartService.clearCart();
        }
      });
    } else {
      this.showErrorAlert.set(true);
    }
  }

  onClose() {
    this.showErrorAlert.set(false);
  }
}