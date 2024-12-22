import { Component, inject, signal } from '@angular/core';
import { CartService } from '../cart.service';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Address } from '../../auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  imports: [CurrencyPipe],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

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
}