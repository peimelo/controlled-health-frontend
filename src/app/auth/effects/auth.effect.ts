import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { MessageApiActions, UserActions } from '../../core/actions';
import { ErrorsService } from '../../core/services/errors.service';
import {
  AccountPageActions,
  AuthActions,
  AuthApiActions,
  CreateAccountPageActions,
  ForgotPasswordPageActions,
  LoginPageActions,
  ResendConfirmationPageActions,
  ResetPasswordPageActions,
} from '../actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  );

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateAccountPageActions.createAccount),
      map((action) => action.account),
      exhaustMap((account) =>
        this.authService.createAccount(account).pipe(
          switchMap(() => [
            AuthApiActions.loginRedirect(),
            MessageApiActions.successMessage({
              message: 'Your account has been successfully created.',
            }),
          ]),
          catchError((error) => {
            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
        )
      )
    )
  );

  updateAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountPageActions.updateAccount),
      map((action) => action.name),
      exhaustMap((name) =>
        this.authService.updateAccount(name).pipe(
          switchMap(() => [
            AuthApiActions.updateAccountSuccess({ name }),
            MessageApiActions.successMessage({
              message: 'Your account has been successfully updated.',
            }),
          ]),
          catchError((error) => {
            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
        )
      )
    )
  );

  deleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountPageActions.deleteAccount),
      exhaustMap(() =>
        this.authService.deleteAccount().pipe(
          switchMap(() => [
            AuthActions.logout(),
            MessageApiActions.successMessage({
              message: 'Your account has been successfully deleted.',
            }),
          ]),
          catchError((error) => {
            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
        )
      )
    )
  );

  showAccountConfirmationMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.showAccountConfirmationMessage),
      map(() =>
        MessageApiActions.successMessage({
          message: 'Your account has been successfully confirmed.',
        })
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      map((action) => action.credentials),
      exhaustMap((credentials) =>
        this.authService.login(credentials).pipe(
          map((resp) =>
            AuthApiActions.loginSuccess({
              user: resp.body['data'],
            })
          ),
          catchError((error) => {
            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthApiActions.loginRedirect()),
          catchError(() => of(AuthApiActions.loginRedirect()))
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ForgotPasswordPageActions.forgotPassword),
      map((action) => action.email),
      exhaustMap((email) =>
        this.authService.forgotPassword(email).pipe(
          switchMap((successResponse) => [
            AuthApiActions.loginRedirect(),
            MessageApiActions.successMessage({
              message: successResponse.message,
            }),
          ]),
          catchError((error) => {
            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordPageActions.resetPassword),
      map((action) => action.passwordCombination),
      exhaustMap((passwordCombination) =>
        this.authService.resetPassword(passwordCombination).pipe(
          switchMap((successResponse) => [
            AuthApiActions.loginRedirect(),
            MessageApiActions.successMessage({
              message: successResponse.message,
            }),
          ]),
          catchError((error) => {
            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
        )
      )
    )
  );

  resendConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResendConfirmationPageActions.resendConfirmation),
      map((action) => action.email),
      exhaustMap((email) =>
        this.authService.resendConfirmation(email).pipe(
          switchMap((successResponse) => [
            AuthApiActions.loginRedirect(),
            MessageApiActions.successMessage({
              message: successResponse.message,
            }),
          ]),
          catchError((error) => {
            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
        )
      )
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginRedirect),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private errorService: ErrorsService,
    private router: Router
  ) {}
}
