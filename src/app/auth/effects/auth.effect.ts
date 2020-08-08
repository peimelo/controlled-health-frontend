import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { MessageApiActions, UserActions } from '../../core/actions';
import { ErrorsService } from '../../core/services/errors.service';
import {
  AuthActions,
  AuthApiActions,
  ForgotPasswordPageActions,
  LoginPageActions,
  ResendConfirmationPageActions,
  ResetPasswordPageActions,
} from '../actions';
import { Credentials, SuccessResponse } from '../models';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      map((action) => action.credentials),
      exhaustMap((credentials: Credentials) =>
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
          switchMap((successResponse: SuccessResponse) => [
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
          switchMap((successResponse: SuccessResponse) => [
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
          switchMap((successResponse: SuccessResponse) => [
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
