import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExtraOptionsComponent } from "./extra-options/extra-options.component";
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ExtraOptionsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  toggleExtraOptions = signal<boolean>(false);

  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  cartData = this.cartService.sharableCartPizzas;

  ngOnInit(): void {
    const subscription = this.cartService.getCart().subscribe({
      error: (error) => console.log(error)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  closeOptions() {
    this.toggleExtraOptions.set(false);
  }
}