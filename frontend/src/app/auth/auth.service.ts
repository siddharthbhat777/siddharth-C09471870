import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse, User } from './user.model';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = signal<User | null>(null);
  private tokenExpirationTimer = signal<ReturnType<typeof setTimeout> | null>(null);
  showLoginDialog = signal(false);

  private http = inject(HttpClient);

  loginUser(email: string, password: string) {
    return this.http.put<LoginResponse>('http://localhost:8001/user/login', { email, password }).pipe(tap((resData) => {
      this.handleAuthentication(resData);
    }));
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
    const { accessToken, refreshToken } = JSON.parse(storedTokens) as LoginResponse;
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
    this.http.post<LoginResponse>('http://localhost:8001/user/refresh-token', { refreshToken }).pipe(
        tap((resData) => {
          this.handleAuthentication(resData);
        })
      ).subscribe({
        error: () => this.logout()
      });
  }

  logout() {
    this.userData.set(null);
    // this.router.navigate(['/auth']);
    // localStorage.clear();
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

  private handleAuthentication(resData: LoginResponse) {
    const decodedToken = this.decodeToken(resData.accessToken);
    this.userData.set(decodedToken);
    if (decodedToken?.exp) {
      const expirationDuration = decodedToken.exp * 1000 - Date.now();
      this.autoLogout(expirationDuration);
    }
    localStorage.setItem('tokens', JSON.stringify(resData));
  }
}
