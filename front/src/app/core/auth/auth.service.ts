import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AuthResponse, User } from './interface';
import { AuthUtils } from './auth.utils';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _authenticated = signal<boolean>(false);
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  authenticated = computed(() => this._authenticated());
  user = computed<User | null>(() => this._user());
  token = computed(() => this._token()
  );

  signIn(email: string): Observable<AuthResponse> {
    if (this._authenticated()) {
      return throwError(() => new Error('User is already logged in.'));
    }

    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, { email }).pipe(
      tap(resp => this.handleAuthSuccess(resp))
    );
  }

  register(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/users`, { email }).pipe(
          tap(resp => this.handleAuthSuccess(resp))
        );
  };

  check(): Observable<boolean> {
      if (this._authenticated()) return of(true);

      const token = this._token();

      if (!token || AuthUtils.isTokenExpired(token)) {
        this.logout();
        return of(false);
      }

      return this.http.post<AuthResponse>(`${API_URL}/auth/loginWithToken`, {}).pipe(
        tap(response => {
          this._user.set(response.user);
          this._authenticated.set(true);
        }),
        map(() => true),
        catchError(() => {
          this.logout();
          return of(false);
        })
      );
    }

    logout() {
      this._authenticated.set(false);
      this._user.set(null);
      this._token.set(null);
      localStorage.removeItem('token');
    }

    private handleAuthSuccess({ token, user }: AuthResponse) {
      this._user.set(user);
      this._token.set(token);
      this._authenticated.set(true);
      localStorage.setItem('token', token);
    }


}
