import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private authService = inject(AuthService);

  userData = this.authService.sharableData;

  detailsForm = new FormGroup({
    firstname: new FormControl(this.userData()?.firstname || '', {
      validators: [Validators.required, this.onlyAlphabetsValidator()]
    }),
    lastname: new FormControl(this.userData()?.lastname || '', {
      validators: [Validators.required, this.onlyAlphabetsValidator()]
    }),
    age: new FormControl(this.userData()?.age || '', {
      validators: [Validators.required, this.onlyNumbersValidator()]
    }),
    phone: new FormControl(this.userData()?.phone || '', {
      validators: [Validators.required, this.phoneNumberValidator()]
    }),
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

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^[0-9]{10}$/.test(value);
      return isValid ? null : { phoneNumber: true };
    };
  }

  detailsSubmit() { }

  getErrorMessage(control: AbstractControl | null): string | null {
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    const errorMessages: { [key: string]: string } = {
      required: 'This field is required.',
      email: 'Invalid email format.',
      onlyAlphabets: 'Only alphabets are allowed.',
      onlyNumbers: 'Only numbers are allowed.',
      phoneNumber: 'Invalid phone number.'
    };

    const firstErrorKey = Object.keys(control.errors)[0];
    return errorMessages[firstErrorKey] || 'Invalid input.';
  }
}