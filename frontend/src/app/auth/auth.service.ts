import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse, Register, User } from './user.model';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData = signal<User | null>(null);
  sharableData = this.userData.asReadonly();
  private tokenExpirationTimer = signal<ReturnType<typeof setTimeout> | null>(null);
  showLoginDialog = signal(false);

  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  registerUser( formData: Register) {
    return this.http.post<{ user: any }>('http://localhost:8001/user/register', formData);
  }

  loginUser(email: string, password: string) {
    return this.http.put<TokenResponse>('http://localhost:8001/user/login', { email, password }).pipe(
      tap({
        next: (resData) => {
          this.handleAuthentication(resData);
        }
      })
    );
  }

  decodeToken(token: string): User | null {
    try {
      return jwtDecode<User>(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  autoLogin() {
    const storedTokens = localStorage.getItem('tokens');
    if (!storedTokens) {
      return;
    }
    const { accessToken, refreshToken } = JSON.parse(storedTokens) as TokenResponse;
    const decodedToken = this.decodeToken(accessToken);
    if (decodedToken?.exp) {
      const expirationDuration = decodedToken.exp * 1000 - Date.now();

      if (expirationDuration > 0) {
        this.userData.set(decodedToken);
        this.autoLogout(expirationDuration);
      } else {
        this.refreshToken(refreshToken);
      }
    } else {
      this.logout();
    }
  }

  refreshToken(refreshToken: string) {
    const subscription = this.http.post<TokenResponse>('http://localhost:8001/user/refresh-token', { refreshToken }).pipe(
      tap((resData) => {
        this.handleAuthentication(resData);
      })
    ).subscribe({
      error: () => this.logout()
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  logout() {
    this.userData.set(null);
    localStorage.removeItem('tokens');
    if (this.tokenExpirationTimer()) {
      clearTimeout(this.tokenExpirationTimer()!);
      this.tokenExpirationTimer.set(null);
    }
  }

  autoLogout(expirationDuration: number) {
    if (expirationDuration) {
      const currentTimer = this.tokenExpirationTimer();
      if (currentTimer) {
        clearTimeout(currentTimer);
      }
      const timerId = setTimeout(() => {
        this.logout();
      }, expirationDuration);
      this.tokenExpirationTimer.set(timerId);
    }
  }

  get token() {
    const storageData = localStorage.getItem('tokens');
    if (storageData) {
      const parsedData = JSON.parse(storageData);
      return parsedData.accessToken;
    }
    return this.logout();
  }

  private handleAuthentication(resData: TokenResponse) {
    const decodedToken = this.decodeToken(resData.accessToken);
    this.userData.set(decodedToken);
    if (decodedToken?.exp) {
      const expirationDuration = decodedToken.exp * 1000 - Date.now();
      this.autoLogout(expirationDuration);
    }
    localStorage.setItem('tokens', JSON.stringify(resData));
  }

  modifyProfile(resData: TokenResponse) {
    this.handleAuthentication(resData);
    this.autoLogin();
  }
}
