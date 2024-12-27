import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ExtraOptionsComponent } from "./extra-options/extra-options.component";
import { CartService } from '../cart/cart.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ExtraOptionsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  toggleExtraOptions = signal<boolean>(false);
  isMobile = signal<boolean>(window.innerWidth <= 768);
  showMenuOptions = signal<boolean>(false);

  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  cartData = this.cartService.sharableCartPizzas;

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      error: (error) => console.log(error)
    });
  }

  closeOptions() {
    this.toggleExtraOptions.set(false);
  }

  toggleMenuOptions() {
    this.showMenuOptions.set(!this.showMenuOptions());
  }

  goToPage(path: string) {
    this.showMenuOptions.set(false);
    this.router.navigate([path]);
  }

  onLogout() {
    this.cartService.clearCart();
    this.authService.logout();
    this.showMenuOptions.set(false);
    this.router.navigate(['/']);
  }
}