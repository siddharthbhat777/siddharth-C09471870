import { Component, inject, OnInit, output, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extra-options',
  imports: [],
  templateUrl: './extra-options.component.html',
  styleUrl: './extra-options.component.css'
})
export class ExtraOptionsComponent implements OnInit {
  closeOptions = output();
  
  private authService = inject(AuthService);
  private router = inject(Router);
  
  isLoggedIn = signal<boolean>(!!this.authService.sharableData());

  ngOnInit(): void {
      
  }

  onLogin() {
    this.authService.showLoginDialog.set(true);
    this.closeOptions.emit();
  }

  onLogout() {
    this.authService.logout();
    this.closeOptions.emit();
    this.router.navigate(['/']);
  }

  closeOptionsClick() {
    this.closeOptions.emit();
  }
}