import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Credentials, PasswordCombination, User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  getKeyFromLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  login(auth: Credentials): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.url}/sign_in`, auth, {
      observe: 'response',
    });
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.url}/sign_out`);
  }

  forgotPassword(email: string): Observable<any> {
    const data = {
      email,
      redirect_url: `${this.getRootUrl()}/reset-password`,
    };

    return this.http.post<any>(`${this.url}/password`, data);
  }

  resetPassword(passwordCombination: PasswordCombination): Observable<any> {
    const { password, passwordConfirmation } = passwordCombination;

    const data = {
      password,
      password_confirmation: passwordConfirmation,
    };

    return this.http.put(`${this.url}/password`, data);
  }

  private getRootUrl(): string {
    const protocol = window.location.protocol;
    const host = window.location.host;

    return `${protocol}//${host}`;
  }
}
