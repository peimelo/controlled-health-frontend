import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { UserActions } from '../../core/actions';
import {
  AuthActions,
  AuthApiActions,
  ForgotPasswordPageActions,
  LoginPageActions,
  ResetPasswordPageActions,
} from '../actions';
import { Credentials } from '../models';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
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
            let messages = [error.message];

            if (error && error.error && error.error.errors) {
              messages = error.error.errors;
            }

            return of(AuthApiActions.loginFailure({ error: messages }));
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

  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ForgotPasswordPageActions.forgotPassword),
      map((action) => action.email),
      exhaustMap((email) =>
        this.authService.forgotPassword(email).pipe(
          map(() => AuthApiActions.loginRedirect()),
          catchError((error) => {
            let messages = [error.message];

            if (error && error.error && error.error.errors) {
              messages = error.error.errors;
            }

            return of(
              AuthApiActions.forgotPasswordFailure({ error: messages })
            );
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
          map(() => AuthApiActions.loginRedirect()),
          catchError((error) => {
            let messages = [error.message];

            if (error && error.error && error.error.errors) {
              messages = error.error.errors;
            }

            return of(
              AuthApiActions.forgotPasswordFailure({ error: messages })
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
