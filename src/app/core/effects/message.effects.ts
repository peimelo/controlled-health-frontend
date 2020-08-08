import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { MessageApiActions } from '../actions';

@Injectable()
export class MessageEffects {
  errorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MessageApiActions.errorMessage),
        map((action) => action.message),
        tap((message) => {
          this.snackBar.open(message, 'Error', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
        })
      ),
    { dispatch: false }
  );

  successMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MessageApiActions.successMessage),
        map((action) => action.message),
        tap((message) => {
          this.snackBar.open(message, 'Success', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
}
