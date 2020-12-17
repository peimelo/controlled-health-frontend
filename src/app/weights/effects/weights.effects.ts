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
  WeightsActions,
  WeightsApiActions,
  WeightsFormDialogActions,
  WeightsPageActions,
} from '../actions';
import { WeightFormDialogPageComponent } from '../containers/weight-form-dialog-page/weight-form-dialog-page.component';
import { WeightsFacadeService } from '../services/weights-facade.service';
import { WeightsService } from '../services/weights.service';

@Injectable()
export class WeightsEffects {
  dialogRef: any;

  addWeight$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WeightsPageActions.addWeight),
        tap(() => {
          this.dialogRef = this.dialog.open(WeightFormDialogPageComponent, {
            data: {},
          });
        })
      ),
    { dispatch: false }
  );

  createWeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeightsFormDialogActions.createWeight),
      mergeMap(({ weight }) =>
        this.weightsService.create(weight).pipe(
          mergeMap((response) => [
            WeightsApiActions.createWeightSuccess({ weight: response }),
            WeightsActions.weightFormDialogDismiss(),
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

  deleteWeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeightsPageActions.deleteWeight),
      withLatestFrom(this.weightsFacadeService.pagination$),
      mergeMap(([action, pagination]) =>
        this.weightsService.delete(action.id).pipe(
          mergeMap(() => [
            WeightsApiActions.deleteWeightSuccess({ id: action.id }),
            WeightsActions.reloadWeights({
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

  editWeight$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WeightsPageActions.editWeight),
        tap(({ weight }) => {
          this.dialogRef = this.dialog.open(WeightFormDialogPageComponent, {
            data: { weight },
          });
        })
      ),
    { dispatch: false }
  );

  loadWeights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        WeightsActions.loadWeights,
        WeightsActions.reloadWeights,
        WeightsPageActions.changePageWeights
      ),
      exhaustMap(({ pageIndex }) =>
        this.weightsService.getAll(pageIndex).pipe(
          map((weightResponse) =>
            WeightsApiActions.loadWeightsSuccess({ weightResponse })
          ),
          catchError(() => of(WeightsApiActions.loadWeightsFailure()))
        )
      )
    )
  );

  updateWeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeightsFormDialogActions.updateWeight),
      withLatestFrom(this.weightsFacadeService.pagination$),
      mergeMap(([action, pagination]) =>
        this.weightsService.update(action.weight).pipe(
          mergeMap((weightResponse) => [
            WeightsApiActions.updateWeightSuccess({
              update: { id: weightResponse.id, changes: weightResponse },
            }),
            WeightsActions.reloadWeights({
              pageIndex: pagination.currentPage,
            }),
            WeightsActions.weightFormDialogDismiss(),
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

  weightFormDialogDismiss$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WeightsActions.weightFormDialogDismiss),
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
    private weightsFacadeService: WeightsFacadeService,
    private weightsService: WeightsService
  ) {}
}
