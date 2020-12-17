import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { MessageApiActions } from '../actions';
import { MessageComponent } from '../components/message/message.component';

@Injectable()
export class MessageEffects {
  errorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MessageApiActions.errorMessage),
        map((action) => action.message),
        tap((message) => this.openSnackbar(message, 'error'))
      ),
    { dispatch: false }
  );

  successMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MessageApiActions.successMessage),
        map((action) => action.message),
        tap((message) => this.openSnackbar(message, 'success'))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}

  private openSnackbar(message: string, type: string) {
    this.snackBar.openFromComponent(MessageComponent, {
      data: {
        message,
        type,
      },
      duration: 5000,
      horizontalPosition: 'center',
      panelClass: [`${type}-snackbar`],
      verticalPosition: 'top',
    });
  }
}
