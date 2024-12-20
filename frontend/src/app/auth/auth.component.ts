import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { ModalComponent } from "../shared/modal/modal.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  imports: [ModalComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  showAuth = output();

  isLoginSelected = signal(true);
  isPasswordVisible = signal(false);

  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  loginSubmit() {
    const enteredEmail = this.loginForm.value.email;
    const enteredPassword = this.loginForm.value.password;
    console.log(enteredEmail, enteredPassword);
    if (this.loginForm.valid && enteredEmail && enteredPassword) {
      const subscription = this.authService.loginUser(enteredEmail, enteredPassword).subscribe({
        error: (error) => console.log(error),
        complete: () => this.loginForm.reset()
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    } else {
      console.error("Form is invalid. Errors:");
        
        const emailErrors = this.loginForm.get('email')?.errors;
        const passwordErrors = this.loginForm.get('password')?.errors;

        if (emailErrors) {
            console.log("Email Errors:", emailErrors);
            if (emailErrors['required']) {
                console.log("Email is required.");
            }
            if (emailErrors['email']) {
                console.log("Invalid email format.");
            }
        }

        if (passwordErrors) {
            console.log("Password Errors:", passwordErrors);
            if (passwordErrors['required']) {
                console.log("Password is required.");
            }
            if (passwordErrors['minlength']) {
                console.log(`Password must be at least ${passwordErrors['minlength'].requiredLength} characters.`);
            }
        }
    }
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
