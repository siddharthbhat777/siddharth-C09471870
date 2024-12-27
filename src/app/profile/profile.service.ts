import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Address, ProfileRequest, TokenResponse } from '../auth/user.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  editProfile(profileUpdate: ProfileRequest) {
    const previousUserProfile = localStorage.getItem('tokens');
    if (!previousUserProfile) {
      throw new Error('No user profile is available to revert to.');
    }
    return this.http.put<TokenResponse>(`https://pizzeria-gateway.onrender.com/profile/edit/${this.authService.sharableData()?._id}`, profileUpdate, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      tap({
        next: (res) => {
          this.authService.modifyProfile(res);
        },
        error: () => {
          this.authService.modifyProfile(JSON.parse(previousUserProfile));
        }
      })
    );
  }

  addAddress(address: Address) {
    const previousUserProfile = localStorage.getItem('tokens');
    if (!previousUserProfile) {
      throw new Error('No user profile is available to revert to.');
    }
    return this.http.put<TokenResponse>(`https://pizzeria-gateway.onrender.com/profile/add-address/${this.authService.sharableData()?._id}`, address, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      tap({
        next: (res) => {
          this.authService.modifyProfile(res);
        },
        error: () => {
          this.authService.modifyProfile(JSON.parse(previousUserProfile));
        }
      })
    );
  }

  deleteAddress(addressId: string) {
    const previousUserProfile = localStorage.getItem('tokens');
    if (!previousUserProfile) {
      throw new Error('No user profile is available to revert to.');
    }
    return this.http.put<TokenResponse>(`https://pizzeria-gateway.onrender.com/profile/delete-address/${this.authService.sharableData()?._id}/${addressId}`, null, {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      tap({
        next: (res) => {
          this.authService.modifyProfile(res);
        },
        error: () => {
          this.authService.modifyProfile(JSON.parse(previousUserProfile));
        }
      })
    );
  }
}