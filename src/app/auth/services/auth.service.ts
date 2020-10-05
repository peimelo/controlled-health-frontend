import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  CreateAccountRequest,
  Credentials,
  MessageResponse,
  PasswordCombination,
  UpdateAccountResponse,
  User,
  UserDataResponse,
} from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  getValueFromLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  // User account

  createAccount(account: CreateAccountRequest): Observable<string> {
    const { email, password, passwordConfirmation } = account;

    const data = {
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    return this.http
      .post<any>(this.url, data)
      .pipe(map(() => 'Your account has been successfully created.'));
  }

  updateAccount(name: string): Observable<UpdateAccountResponse> {
    return this.http
      .put<UserDataResponse>(this.url, { name })
      .pipe(
        map((resp) => ({
          ...resp,
          message: 'Your account has been successfully updated.',
        }))
      );
  }

  deleteAccount(): Observable<string> {
    return this.http.delete(this.url).pipe(
      tap(() => this.clearLocalStorage()),
      map(() => 'Your account has been successfully deleted.')
    );
  }

  // Session

  login(credentials: Credentials): Observable<User> {
    return this.http
      .post<UserDataResponse>(`${this.url}/sign_in`, credentials, {
        observe: 'response',
      })
      .pipe(
        tap((resp) => {
          localStorage.setItem(
            'access-token',
            resp.headers.get('access-token')
          );
          localStorage.setItem('client', resp.headers.get('client'));
          localStorage.setItem('uid', resp.headers.get('uid'));
        }),
        map((resp) => ({ ...resp.body.data }))
      );
  }

  logout(): Observable<any> {
    return this.http
      .delete(`${this.url}/sign_out`)
      .pipe(tap(() => this.clearLocalStorage()));
  }

  private clearLocalStorage(): void {
    localStorage.clear();
  }

  getUser(): Observable<User> {
    return this.http
      .get<UserDataResponse>(`${this.url}/validate_token`)
      .pipe(map((resp) => resp.data));
  }

  // Password

  forgotPassword(email: string): Observable<string> {
    const data = {
      email,
      redirect_url: `${this.getRootUrl()}/reset-password`,
    };

    return this.http
      .post<MessageResponse>(`${this.url}/password`, data)
      .pipe(map((resp) => resp.message));
  }

  private getRootUrl(): string {
    const protocol = window.location.protocol;
    const host = window.location.host;

    return `${protocol}//${host}`;
  }

  updatePassword(passwordCombination: PasswordCombination): Observable<string> {
    const {
      currentPassword,
      password,
      passwordConfirmation,
    } = passwordCombination;

    let data: any = {
      password,
      password_confirmation: passwordConfirmation,
    };

    if (currentPassword) {
      data = {
        ...data,
        current_password: currentPassword,
      };
    }

    return this.http
      .put<MessageResponse>(`${this.url}/password`, data)
      .pipe(map((resp) => resp.message));
  }

  // Confirmation

  resendConfirmation(email: string): Observable<string> {
    return this.http
      .post<MessageResponse>(`${this.url}/confirmation`, {
        email,
      })
      .pipe(map((resp) => resp.message));
  }
}
