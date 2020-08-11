import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  CreateAccountRequest,
  Credentials,
  PasswordCombination,
  SuccessResponse,
  User,
} from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  getValueFromLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  createAccount(account: CreateAccountRequest): Observable<SuccessResponse> {
    const { email, password, passwordConfirmation } = account;

    const data = {
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    return this.http.post<SuccessResponse>(this.url, data);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(this.url).pipe(tap(() => this.clearLocalStorage()));
  }

  login(credentials: Credentials): Observable<HttpResponse<User>> {
    return this.http
      .post<User>(`${this.url}/sign_in`, credentials, {
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
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .delete(`${this.url}/sign_out`)
      .pipe(tap(() => this.clearLocalStorage()));
  }

  forgotPassword(email: string): Observable<SuccessResponse> {
    const data = {
      email,
      redirect_url: `${this.getRootUrl()}/reset-password`,
    };

    return this.http.post<SuccessResponse>(`${this.url}/password`, data);
  }

  resetPassword(
    passwordCombination: PasswordCombination
  ): Observable<SuccessResponse> {
    const { password, passwordConfirmation } = passwordCombination;

    const data = {
      password,
      password_confirmation: passwordConfirmation,
    };

    return this.http.put<SuccessResponse>(`${this.url}/password`, data);
  }

  resendConfirmation(email: string): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.url}/confirmation`, {
      email,
    });
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
  }

  private getRootUrl(): string {
    const protocol = window.location.protocol;
    const host = window.location.host;

    return `${protocol}//${host}`;
  }
}
