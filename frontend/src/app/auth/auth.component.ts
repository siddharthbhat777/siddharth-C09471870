import { Component, output, signal } from '@angular/core';
import { ModalComponent } from "../shared/modal/modal.component";

@Component({
  selector: 'app-auth',
  imports: [ModalComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  showAuth = output();
  isLoginSelected = signal(true);
  isPasswordVisible = signal(false);

  setPasswordVisibility() {
    this.isPasswordVisible.set(!this.isPasswordVisible());
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
}
