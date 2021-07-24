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
  WeightsActions,
  WeightsApiActions,
  WeightsFormDialogActions,
  WeightsGuardActions,
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
          mergeMap(() => [
            WeightsApiActions.createWeightSuccess(),
            WeightsActions.weightFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully created.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
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
          catchError((error) => this.errorService.showError(error))
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
        WeightsGuardActions.loadWeights,
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
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  updateWeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeightsFormDialogActions.updateWeight),
      mergeMap(({ weight }) =>
        this.weightsService.update(weight).pipe(
          mergeMap(() => [
            WeightsApiActions.updateWeightSuccess(),
            WeightsActions.weightFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully updated.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
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
