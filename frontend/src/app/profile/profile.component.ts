import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Address, ProfileRequest } from '../auth/user.model';
import { AddressComponent } from "./address/address.component";
import { ErrorScreenComponent } from "../shared/error-screen/error-screen.component";

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, AddressComponent, ErrorScreenComponent],
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
  private profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);

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
  
  detailsSubmit() {
    const enteredFirstname = this.detailsForm.value.firstname;
    const enteredLastname = this.detailsForm.value.lastname;
    const enteredAge = this.detailsForm.value.age;
    const enteredPhone = this.detailsForm.value.phone;
    if (enteredFirstname && enteredLastname && enteredAge && enteredPhone) {
      const editData: ProfileRequest = {
        firstname: enteredFirstname,
        lastname: enteredLastname,
        age: +enteredAge,
        phone: enteredPhone
      }
      const subscription = this.profileService.editProfile(editData).subscribe({
        error: (error) => console.log(error),
        complete: () => this.setEditableState(false)
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
  
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
      validators: [Validators.required, Validators.pattern(/^\d{6}$/)]
    }),
    addressCity: new FormControl('', {
      validators: [Validators.required, this.onlyAlphabetsValidator()]
    }),
    addressState: new FormControl('', {
      validators: [Validators.required, this.onlyAlphabetsValidator()]
    })
  });
  
  addressSubmit() {
    const enteredTitle = this.addressForm.value.addressTitle;
    const enteredReceiverName = this.addressForm.value.addressReceiverName;
    const enteredReceiverPhone = this.addressForm.value.addressReceiverPhone;
    const enteredAddressLine = this.addressForm.value.addressLine;
    const enteredPincode = this.addressForm.value.addressPincode;
    const enteredCity = this.addressForm.value.addressCity;
    const enteredState = this.addressForm.value.addressState;
    if (enteredTitle && enteredReceiverName && enteredReceiverPhone && enteredAddressLine && enteredPincode && enteredCity && enteredState) {
      const address: Address = {
        title: enteredTitle,
        receiverName: enteredReceiverName,
        receiverPhone: enteredReceiverPhone,
        addressLine: enteredAddressLine,
        pincode: +enteredPincode,
        city: enteredCity,
        state: enteredState
      }
      const subscription = this.profileService.addAddress(address).subscribe({
        error: (error) => console.log(error),
        complete: () => this.openAddAddress.set(false)
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
  
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