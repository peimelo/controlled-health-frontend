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
import { MessageApiActions } from 'src/app/core/actions';
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

  createWeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeightsFormDialogActions.createWeight),
      mergeMap(({ weight }) =>
        this.weightsService.create(weight).pipe(
          mergeMap((response) => [
            WeightsApiActions.createWeightSuccess({ weight: response }),
            WeightsActions.weightFormDialogDismiss(),
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
            WeightsPageActions.loadWeights({
              pageIndex: pagination.currentPage,
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

  loadWeights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeightsPageActions.loadWeights),
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

  weightFormDialogOpen$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WeightsPageActions.weightFormDialogOpen),
        tap(({ weight }) => {
          this.dialogRef = this.dialog.open(WeightFormDialogPageComponent, {
            data: { weight },
          });
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
