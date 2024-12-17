import { Component, inject, OnInit, signal } from '@angular/core';
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
  showAuth = signal(true);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  closeAuth() {
    this.showAuth.set(false);
  }
}
