import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showAuth = signal(false);
  private authService = inject(AuthService);

  constructor() {
    effect(() => {
      this.showAuth.set(this.authService.showLoginDialog());
    });
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  closeAuth() {
    this.showAuth.set(false);
    this.authService.showLoginDialog.set(false);
  }
}
