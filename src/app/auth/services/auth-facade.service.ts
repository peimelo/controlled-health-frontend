import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AuthActions,
  ForgotPasswordPageActions,
  LoginPageActions,
  ResetPasswordPageActions,
} from '../actions';
import { Credentials, PasswordCombination } from '../models';
import * as fromAuth from '../reducers';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  forgotPasswordErrors$: Observable<string[]>;
  forgotPasswordPending$: Observable<boolean>;

  loggedIn$: Observable<boolean>;

  loginErrors$: Observable<string[]>;
  logingPending$: Observable<boolean>;

  user$: Observable<any>;

  constructor(private store: Store<fromAuth.State>) {
    this.forgotPasswordErrors$ = this.store.pipe(
      select(fromAuth.selectForgotPasswordPageError)
    );

    this.forgotPasswordPending$ = this.store.pipe(
      select(fromAuth.selectForgotPasswordPagePending)
    );

    this.loggedIn$ = this.store.pipe(select(fromAuth.selectLoggedIn));

    this.loginErrors$ = this.store.pipe(select(fromAuth.selectLoginPageError));

    this.logingPending$ = this.store.pipe(
      select(fromAuth.selectLoginPagePending)
    );

    this.user$ = this.store.pipe(select(fromAuth.selectUser));
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

  resetPassword(passwordCombination: PasswordCombination): void {
    this.store.dispatch(
      ResetPasswordPageActions.resetPassword({ passwordCombination })
    );
  }
}
