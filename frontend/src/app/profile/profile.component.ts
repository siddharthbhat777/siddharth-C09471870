import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  host: {
    class: 'control',
    'window:resize': '$event'
  }
})
export class ProfileComponent implements OnInit {
  isEditable = signal<boolean>(false);
  openAddAddress = signal<boolean>(false);
  screenWidth = signal<number>(0);

  private authService = inject(AuthService);

  userData = this.authService.sharableData;

  ngOnInit(): void {
    this.screenWidth.set(window.innerWidth);
    this.toggleFormControls(this.isEditable());
  }

  toggleFormControls(isEditable: boolean) {
    if (isEditable) {
      this.detailsForm.enable();
    } else {
      this.detailsForm.disable();
    }
  }

  setEditableState(editable: boolean) {
    this.isEditable.set(editable);
    this.toggleFormControls(editable);
    if (!editable) {
      this.detailsForm.reset({
        firstname: this.userData()?.firstname,
        lastname: this.userData()?.lastname,
        age: this.userData()?.age,
        phone: this.userData()?.phone,
      });
    }
  }

  setAddAddressState(state: boolean) {
    this.openAddAddress.set(state);
  }

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
    })
  });
  
  detailsSubmit() { }
  
  addressForm = new FormGroup({
    addressTitle: new FormControl('', {
      validators: [Validators.required]
    }),
    addressReceiverName: new FormControl('', {
      validators: [Validators.required, this.onlyAlphabetsValidator()]
    }),
    addressReceiverPhone: new FormControl('', {
      validators: [Validators.required, this.phoneNumberValidator()]
    }),
    addressLine: new FormControl('', {
      validators: [Validators.required]
    }),
    addressPincode: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    addressCity: new FormControl('', {
      validators: [Validators.required, this.onlyAlphabetsValidator()]
    }),
    addressState: new FormControl('', {
      validators: [Validators.required, this.onlyAlphabetsValidator()]
    })
  });
  
  addressSubmit() { }
  
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