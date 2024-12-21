import { Component, input } from '@angular/core';
import { Address } from '../../auth/user.model';

@Component({
  selector: 'app-address',
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  address = input.required<Address>();
}