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
            WeightsApiActions.createWeightSuccess(),
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
      mergeMap(({ id }) =>
        this.weightsService.delete(id).pipe(
          mergeMap(() => [
            WeightsApiActions.deleteWeightSuccess(),
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
        WeightsPageActions.loadWeights,
        WeightsPageActions.changePageWeights,
        WeightsPageActions.sortWeights,
        WeightsApiActions.createWeightSuccess,
        WeightsApiActions.deleteWeightSuccess,
        WeightsApiActions.updateWeightSuccess
      ),
      withLatestFrom(
        this.weightsFacadeService.pagination$,
        this.weightsFacadeService.sort$
      ),
      exhaustMap(([action, pagination, sort]) =>
        this.weightsService.getAll(pagination.currentPage, sort).pipe(
          map((weightResponse) =>
            WeightsApiActions.loadWeightsSuccess({ weightResponse })
          ),
          catchError((error) => {
            const message = this.errorService.getMessage(error);
            return of(MessageApiActions.errorMessage({ message }));
          })
        )
      )
    )
  );

  updateWeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeightsFormDialogActions.updateWeight),
      mergeMap(({ weight }) =>
        this.weightsService.update(weight).pipe(
          mergeMap((weightResponse) => [
            WeightsApiActions.updateWeightSuccess(),
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
