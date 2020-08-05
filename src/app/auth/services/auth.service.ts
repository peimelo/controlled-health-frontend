import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Credentials, User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  getFromLocalStorage(key: string): string {
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

  changePassword(): Observable<any> {
    return this.http.delete(`${this.url}/password`);
  }

  private getRootUrl(): string {
    const protocol = window.location.protocol;
    const host = window.location.host;

    return `${protocol}//${host}`;
  }
}
