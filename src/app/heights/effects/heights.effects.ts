import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { MessageApiActions } from '../../core/actions';
import { ErrorsService } from '../../shared/services/errors.service';
import {
  HeightsActions,
  HeightsApiActions,
  HeightsFormDialogActions,
  HeightsGuardActions,
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
          mergeMap(() => [
            HeightsApiActions.createHeightSuccess(),
            HeightsActions.heightFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully created.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  deleteHeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeightsPageActions.deleteHeight),
      mergeMap((action) =>
        this.heightsService.delete(action.id).pipe(
          mergeMap(() => [
            HeightsApiActions.deleteHeightSuccess(),
            MessageApiActions.successMessage({
              message: 'Record successfully deleted.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
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

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HeightsApiActions.createHeightSuccess,
        HeightsApiActions.deleteHeightSuccess,
        HeightsApiActions.updateHeightSuccess
      ),
      map(() => HeightsActions.loadDashboard())
    )
  );

  loadHeights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HeightsGuardActions.loadHeights,
        HeightsPageActions.changePageHeights,
        HeightsPageActions.sortHeights,
        HeightsApiActions.createHeightSuccess,
        HeightsApiActions.deleteHeightSuccess,
        HeightsApiActions.updateHeightSuccess
      ),
      withLatestFrom(
        this.heightsFacadeService.pagination$,
        this.heightsFacadeService.sort$
      ),
      exhaustMap(([action, pagination, sort]) =>
        this.heightsService.getAll(pagination.currentPage, sort).pipe(
          map((heightResponse) =>
            HeightsApiActions.loadHeightsSuccess({ heightResponse })
          ),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  updateHeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeightsFormDialogActions.updateHeight),
      mergeMap((action) =>
        this.heightsService.update(action.height).pipe(
          mergeMap(() => [
            HeightsApiActions.updateHeightSuccess(),
            HeightsActions.heightFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully updated.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
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
