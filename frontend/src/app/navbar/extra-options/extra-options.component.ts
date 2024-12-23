import { Component, inject, output, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-extra-options',
  templateUrl: './extra-options.component.html',
  styleUrl: './extra-options.component.css'
})
export class ExtraOptionsComponent {
  closeOptions = output();
  
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);

  userData = this.authService.sharableData;
  
  isLoggedIn = signal<boolean>(!!this.userData());

  onLogin() {
    this.authService.showLoginDialog.set(true);
    this.closeOptions.emit();
  }

  onLogout() {
    this.cartService.clearCart();
    this.authService.logout();
    this.closeOptions.emit();
    this.router.navigate(['/']);
  }

  closeOptionsClick() {
    this.closeOptions.emit();
  }

  onOptionSelection(route: string) {
    this.router.navigate([route]);
    this.closeOptions.emit();
  }
}