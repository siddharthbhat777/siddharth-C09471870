import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { ModalComponent } from "../shared/modal/modal.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  imports: [ModalComponent, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  showAuth = output();

  isLoginSelected = signal(true);
  isPasswordVisible = signal(false);
  email = signal('');
  password = signal('');

  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  loginUser(email: string, password: string) {
    const subscription = this.authService.loginUser(email, password).subscribe({
      next: resData => console.log(resData)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  setPasswordVisibility(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.isPasswordVisible.set(checkbox.checked);
  }
  
  selectSignUp() {
    this.isLoginSelected.set(false);
  }
  
  selectSignIn() {
    this.isLoginSelected.set(true);
  }

  closeAuth() {
    this.showAuth.emit();
  }

  logoutUser() {
    this.authService.logout();
  }
}
