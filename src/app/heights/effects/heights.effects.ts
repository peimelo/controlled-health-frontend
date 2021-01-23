import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { MessageApiActions } from '../../core/actions';
import { ErrorsService } from '../../core/services/errors.service';
import {
  HeightsActions,
  HeightsApiActions,
  HeightsFormDialogActions,
  HeightsPageActions,
} from '../actions';
import { HeightFormDialogPageComponent } from '../containers/height-form-dialog-page/height-form-dialog-page.component';
import { HeightsFacadeService } from '../services/heights-facade.service';
import { HeightsService } from '../services/heights.service';

@Injectable()
export class HeightsEffects {
  dialogRef: any;

  addHeight$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HeightsPageActions.addHeight),
        tap(() => {
          this.dialogRef = this.dialog.open(HeightFormDialogPageComponent, {
            data: {},
          });
        })
      ),
    { dispatch: false }
  );

  createHeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeightsFormDialogActions.createHeight),
      mergeMap(({ height }) =>
        this.heightsService.create(height).pipe(
          mergeMap((response) => [
            HeightsApiActions.createHeightSuccess({ height: response }),
            HeightsActions.heightFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully created.',
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

  deleteHeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeightsPageActions.deleteHeight),
      withLatestFrom(this.heightsFacadeService.pagination$),
      mergeMap(([action, pagination]) =>
        this.heightsService.delete(action.id).pipe(
          mergeMap(() => [
            HeightsApiActions.deleteHeightSuccess({ id: action.id }),
            HeightsActions.reloadHeights({
              pageIndex: pagination.currentPage,
            }),
            MessageApiActions.successMessage({
              message: 'Record successfully deleted.',
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

  editHeight$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HeightsPageActions.editHeight),
        tap(({ height }) => {
          this.dialogRef = this.dialog.open(HeightFormDialogPageComponent, {
            data: { height },
          });
        })
      ),
    { dispatch: false }
  );

  loadHeights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HeightsActions.loadHeights,
        HeightsActions.reloadHeights,
        HeightsPageActions.changePageHeights
      ),
      exhaustMap(({ pageIndex }) =>
        this.heightsService.getAll(pageIndex).pipe(
          map((heightResponse) =>
            HeightsApiActions.loadHeightsSuccess({ heightResponse })
          ),
          catchError(() => of(HeightsApiActions.loadHeightsFailure()))
        )
      )
    )
  );

  updateHeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeightsFormDialogActions.updateHeight),
      withLatestFrom(this.heightsFacadeService.pagination$),
      mergeMap(([action, pagination]) =>
        this.heightsService.update(action.height).pipe(
          mergeMap((heightResponse) => [
            HeightsApiActions.updateHeightSuccess({
              update: { id: heightResponse.id, changes: heightResponse },
            }),
            HeightsActions.reloadHeights({
              pageIndex: pagination.currentPage,
            }),
            HeightsActions.heightFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully updated.',
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

  heightFormDialogDismiss$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HeightsActions.heightFormDialogDismiss),
        tap(() => {
          this.dialogRef.close();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private errorService: ErrorsService,
    private heightsFacadeService: HeightsFacadeService,
    private heightsService: HeightsService
  ) {}
}
