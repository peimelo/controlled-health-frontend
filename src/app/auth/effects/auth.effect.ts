import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IsLoadingService } from '@service-work/is-loading';
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
import * as fromComponents from '../componentes';
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
      exhaustMap(({ name }) =>
        this.authService.updateAccount(name).pipe(
          switchMap((resp) => [
            AuthApiActions.updateAccountSuccess({ user: resp.data }),
            MessageApiActions.successMessage({
              message: resp.message,
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
          catchError((error) => {
            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
        )
      )
    )
  );

  deleteAccountConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountPageActions.deleteAccountConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          fromComponents.DeleteAccountConfirmationComponent,
          undefined,
          boolean
        >(fromComponents.DeleteAccountConfirmationComponent);

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
      exhaustMap(({ credentials }) => {
        this.loadingService.add({ key: 'login' });

        return this.authService.login(credentials).pipe(
          map((user) => {
            this.loadingService.remove({ key: 'login' });

            return AuthApiActions.loginSuccess({
              user,
            });
          }),
          catchError((error) => {
            this.loadingService.remove({ key: 'login' });

            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
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
          catchError((error) => {
            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
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
      exhaustMap(({ passwordCombination }) =>
        this.authService.updatePassword(passwordCombination).pipe(
          switchMap((message) => [
            AuthApiActions.loginRedirect(),
            MessageApiActions.successMessage({
              message,
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
      exhaustMap(({ email }) =>
        this.authService.resendConfirmation(email).pipe(
          switchMap((message) => [
            AuthApiActions.loginRedirect(),
            MessageApiActions.successMessage({
              message,
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
    private dialog: MatDialog,
    private errorService: ErrorsService,
    private loadingService: IsLoadingService,
    private router: Router
  ) {}
}
