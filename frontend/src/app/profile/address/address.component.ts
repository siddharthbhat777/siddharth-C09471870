import { Component, DestroyRef, inject, input } from '@angular/core';
import { Address } from '../../auth/user.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-address',
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  address = input.required<Address>();

  private profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);

  onDeleteAddress(addressId: string) {
    const subscription = this.profileService.deleteAddress(addressId).subscribe({
      error: (error) => console.log(error)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}