import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { ModalComponent } from "../shared/modal/modal.component";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Register } from './user.model';
import { CartService } from '../cart/cart.service';

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
  private cartService = inject(CartService);
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
    if (this.loginForm.valid && enteredEmail && enteredPassword) {
      const authSubscription = this.authService.loginUser(enteredEmail, enteredPassword).subscribe({
        error: (error) => console.log(error),
        complete: () => {
          this.loginForm.reset();
          this.closeAuth();
          this.cartService.getCart().subscribe({
            error: (error) => console.log(error)
          });
        }
      });
      this.destroyRef.onDestroy(() => authSubscription.unsubscribe());
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

  registerForm = new FormGroup({
    firstname: new FormControl('', {
      validators: [Validators.required, this.onlyAlphabetsValidator()]
    }),
    lastname: new FormControl('', {
      validators: [Validators.required, this.onlyAlphabetsValidator()]
    }),
    age: new FormControl('', {
      validators: [Validators.required, this.onlyNumbersValidator()]
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    }, {
      validators: [this.equalValues('password', 'confirmPassword')]
    })
  });

  onlyAlphabetsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^[A-Za-z\s]+$/.test(value);
      return isValid ? null : { onlyAlphabets: true };
    };
  }

  onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^[0-9]+$/.test(value);
      return isValid ? null : { onlyNumbers: true };
    };
  }

  equalValues(controlName1: string, controlName2: string): ValidatorFn {
    return (control: AbstractControl) => {
      const val1 = control.get(controlName1)?.value;
      const val2 = control.get(controlName2)?.value;
      if (val1 === val2) {
        return null;
      }
      return { valuesNotEqual: true };
    };
  }

  registerSubmit() {
    const enteredFirstName = this.registerForm.value.firstname;
    const enteredLastName = this.registerForm.value.lastname;
    const enteredAge = this.registerForm.value.age;
    const enteredEmail = this.registerForm.value.email;
    const enteredPassword = this.registerForm.value.passwords?.password;
    if (this.registerForm.valid && enteredFirstName && enteredLastName && enteredAge && enteredEmail && enteredPassword) {
      const formData: Register = {
        firstname: enteredFirstName,
        lastname: enteredLastName,
        age: +enteredAge,
        email: enteredEmail,
        password: enteredPassword
      };
      const subscription = this.authService.registerUser(formData).subscribe({
        error: (error) => console.log(error),
        complete: () => {
          this.registerForm.reset();
          this.isLoginSelected.set(true);
        }
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    } else {
      console.error("Form is invalid. Errors:");

      const nameErrors = this.registerForm.get('name')?.errors;
      if (nameErrors) {
        console.log("Name Errors:", nameErrors);
        if (nameErrors['required']) {
          console.log("Name is required.");
        }
        if (nameErrors['onlyAlphabets']) {
          console.log("Name must contain only alphabets.");
        }
      }

      const ageErrors = this.registerForm.get('age')?.errors;
      if (ageErrors) {
        console.log("Age Errors:", ageErrors);
        if (ageErrors['required']) {
          console.log("Age is required.");
        }
        if (ageErrors['onlyNumbers']) {
          console.log("Age must contain only numbers.");
        }
      }

      const emailErrors = this.registerForm.get('email')?.errors;
      if (emailErrors) {
        console.log("Email Errors:", emailErrors);
        if (emailErrors['required']) {
          console.log("Email is required.");
        }
        if (emailErrors['email']) {
          console.log("Invalid email format.");
        }
      }

      const passwordsGroup = this.registerForm.get('passwords');
      const passwordErrors = passwordsGroup?.get('password')?.errors;
      const confirmPasswordErrors = passwordsGroup?.get('confirmPassword')?.errors;
      const passwordsGroupErrors = passwordsGroup?.errors;

      if (passwordErrors) {
        console.log("Password Errors:", passwordErrors);
        if (passwordErrors['required']) {
          console.log("Password is required.");
        }
        if (passwordErrors['minlength']) {
          console.log(`Password must be at least ${passwordErrors['minlength'].requiredLength} characters.`);
        }
      }

      if (confirmPasswordErrors) {
        console.log("Confirm Password Errors:", confirmPasswordErrors);
        if (confirmPasswordErrors['required']) {
          console.log("Confirm password is required.");
        }
        if (confirmPasswordErrors['minlength']) {
          console.log(`Confirm password must be at least ${confirmPasswordErrors['minlength'].requiredLength} characters.`);
        }
      }

      if (passwordsGroupErrors?.['valuesNotEqual']) {
        console.log("Passwords do not match.");
      }
    }
  }

  getErrorMessage(control: AbstractControl | null): string | null {
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    const errorMessages: { [key: string]: string } = {
      required: 'This field is required.',
      email: 'Invalid email format.',
      minlength: `Must be at least ${control.getError('minlength')?.requiredLength} characters.`,
      maxlength: `Must not exceed ${control.getError('maxlength')?.requiredLength} characters.`,
      onlyAlphabets: 'Only alphabets are allowed.',
      onlyNumbers: 'Only numbers are allowed.'
    };

    const firstErrorKey = Object.keys(control.errors)[0];
    return errorMessages[firstErrorKey] || 'Invalid input.';
  }

  setPasswordVisibility(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.isPasswordVisible.set(checkbox.checked);
  }

  closeAuth() {
    this.showAuth.emit();
  }

  logoutUser() {
    this.authService.logout();
  }
}