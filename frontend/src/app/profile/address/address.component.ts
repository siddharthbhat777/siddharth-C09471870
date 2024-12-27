import { Component, inject, input } from '@angular/core';
import { Address } from '../../auth/user.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  address = input.required<Address>();

  private profileService = inject(ProfileService);

  onDeleteAddress(addressId: string) {
    this.profileService.deleteAddress(addressId).subscribe({
      error: (error) => console.log(error)
    });
  }
}