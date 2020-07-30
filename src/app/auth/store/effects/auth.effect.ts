import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Credentials } from '../../models';
import { AuthService } from '../../services/auth.service';
import { AuthActions, AuthApiActions, LoginPageActions } from '../actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      map((action) => action.credentials),
      exhaustMap((auth: Credentials) =>
        this.authService.login(auth).pipe(
          map((resp) => {
            localStorage.setItem(
              'access-token',
              resp.headers.get('access-token')
            );
            localStorage.setItem('client', resp.headers.get('client'));
            localStorage.setItem('uid', resp.headers.get('uid'));

            return AuthApiActions.loginSuccess({
              user: resp.body['data'],
            });
          }),
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
          map(() => {
            localStorage.removeItem('access-token');
            localStorage.removeItem('client');
            localStorage.removeItem('uid');

            return AuthApiActions.loginRedirect();
          }),
          catchError(() => {
            localStorage.removeItem('access-token');
            localStorage.removeItem('client');
            localStorage.removeItem('uid');

            return of(AuthApiActions.loginRedirect());
          })
        )
      )
    )
  );
}
