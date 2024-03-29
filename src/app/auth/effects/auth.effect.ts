import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { MessageApiActions, UserActions } from '../../core/actions';
import { ErrorsService } from '../../shared/services/errors.service';
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
import { DeleteAccountConfirmationComponent } from '../componentes';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateAccountPageActions.createAccount),
      exhaustMap(({ account }) =>
        this.authService.createAccount(account).pipe(
          switchMap((message) => [
            AuthApiActions.loginRedirect(),
            MessageApiActions.successMessage({
              message,
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  updateAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountPageActions.updateAccount),
      exhaustMap(({ user }) =>
        this.authService.updateAccount(user).pipe(
          switchMap((resp) => [
            AuthApiActions.updateAccountSuccess({ user: resp.data }),
            MessageApiActions.successMessage({
              message: resp.message,
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  updatePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountPageActions.updatePassword),
      exhaustMap(({ passwordCombination }) =>
        this.authService.updatePassword(passwordCombination).pipe(
          switchMap((message) => [
            MessageApiActions.successMessage({
              message,
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  deleteAccountConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountPageActions.deleteAccountConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          DeleteAccountConfirmationComponent,
          undefined,
          boolean
        >(DeleteAccountConfirmationComponent);

        return dialogRef.afterClosed();
      }),
      map((result) =>
        result
          ? AuthActions.deleteAccount()
          : AuthActions.deleteAccountConfirmationDismiss()
      )
    )
  );

  deleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteAccount),
      exhaustMap(() =>
        this.authService.deleteAccount().pipe(
          switchMap((message) => [
            AuthActions.logout(),
            MessageApiActions.successMessage({
              message,
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  showAccountConfirmationMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.showAccountConfirmationMessage),
      map(({ message }) =>
        MessageApiActions.successMessage({
          message,
        })
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((user) =>
            AuthApiActions.loginSuccess({
              user,
            })
          ),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(() => this.router.navigate(['/profiles']))
      ),
    { dispatch: false }
  );

  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          tap(() => localStorage.clear()),
          map(() => AuthApiActions.loginRedirect()),
          catchError(() => of(AuthApiActions.loginRedirect()))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      exhaustMap(() =>
        this.authService.getUser().pipe(
          map((user) =>
            AuthApiActions.loadUserSuccess({
              user,
            })
          ),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ForgotPasswordPageActions.forgotPassword),
      exhaustMap(({ email }) =>
        this.authService.forgotPassword(email).pipe(
          switchMap((message) => [
            AuthApiActions.loginRedirect(),
            MessageApiActions.successMessage({
              message,
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordPageActions.resetPassword),
      exhaustMap(({ passwordCombination }) =>
        this.authService.resetPassword(passwordCombination).pipe(
          switchMap((message) => [
            AuthApiActions.loginRedirect(),
            MessageApiActions.successMessage({
              message,
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  resendConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResendConfirmationPageActions.resendConfirmation),
      exhaustMap(({ email }) =>
        this.authService.resendConfirmation(email).pipe(
          switchMap((message) => [
            AuthApiActions.loginRedirect(),
            MessageApiActions.successMessage({
              message,
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
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
    private dialog: MatDialog,
    private errorService: ErrorsService,
    private router: Router
  ) {}
}
