import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    if (this.authService.sharableData()) {
      return true;
    }
    this.authService.showLoginDialog.set(true);
    return this.router.createUrlTree(['/']);
  }
}