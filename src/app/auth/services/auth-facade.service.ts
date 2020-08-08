import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AuthActions,
  CreateAccountPageActions,
  ForgotPasswordPageActions,
  LoginPageActions,
  ResendConfirmationPageActions,
  ResetPasswordPageActions,
} from '../actions';
import {
  CreateAccountRequest,
  Credentials,
  PasswordCombination,
} from '../models';
import * as fromAuth from '../reducers';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  loggedIn$: Observable<boolean>;
  user$: Observable<any>;

  constructor(private store: Store<fromAuth.State>) {
    this.loggedIn$ = this.store.pipe(select(fromAuth.selectLoggedIn));

    this.user$ = this.store.pipe(select(fromAuth.selectUser));
  }

  createAccount(account: CreateAccountRequest): void {
    this.store.dispatch(CreateAccountPageActions.createAccount({ account }));
  }

  login(credentials: Credentials): void {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  forgotPassword(email: string): void {
    this.store.dispatch(ForgotPasswordPageActions.forgotPassword({ email }));
  }

  resendConfirmation(email: string): void {
    this.store.dispatch(
      ResendConfirmationPageActions.resendConfirmation({ email })
    );
  }

  resetPassword(passwordCombination: PasswordCombination): void {
    this.store.dispatch(
      ResetPasswordPageActions.resetPassword({ passwordCombination })
    );
  }

  showConfirmationAccountMessage(): void {
    this.store.dispatch(LoginPageActions.showAccountConfirmationMessage());
  }
}
