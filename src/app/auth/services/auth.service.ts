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

@Injectable()
export class AuthService {
  private url = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

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

  updateAccount(user: User): Observable<UpdateAccountResponse> {
    return this.http
      .put<UserDataResponse>(this.url, {
        date_of_birth: user.date_of_birth,
        email: user.email,
        gender: user.gender,
        name: user.name,
      })
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
      .post<UserDataResponse>(`${this.url}/sign_in`, credentials)
      .pipe(map((resp) => resp.data));
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
    };

    return this.http
      .post<MessageResponse>(`${this.url}/password`, data)
      .pipe(map((resp) => resp.message));
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
      .put<MessageResponse>(this.url, data)
      .pipe(map(() => 'Your password has been successfully updated.'));
  }

  resetPassword(passwordCombination: PasswordCombination): Observable<string> {
    const { password, passwordConfirmation } = passwordCombination;

    let data: any = {
      password,
      password_confirmation: passwordConfirmation,
    };

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
