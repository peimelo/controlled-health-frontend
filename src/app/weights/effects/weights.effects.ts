import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { WeightsApiActions, WeightsPageActions } from '../actions';
// import { SpinnerService } from '../../../core/services';
import * as fromWeights from '../reducers';
import { WeightsService } from '../services/weights.service';

@Injectable()
export class WeightsEffects {
  dialogRef: any;

  // createWeight$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(WeightsActions.createWeight),
  //     withLatestFrom(this.store.pipe(select(fromWeightsSelectors.getWeightsPagination))),
  //     mergeMap(([action, pagination]) =>
  //       this.weightsService.create(action.weight).pipe(
  //         switchMap(response => [
  //           WeightsActions.createWeightSuccess({ response }),
  //           WeightsActions.weightFormDialogDismiss(),
  //           WeightsActions.loadWeights({ pageIndex: pagination.currentPage })
  //         ]),
  //         catchError(err => of(
  //           WeightsActions.createWeightFailure({ error: err.error })
  //         ))
  //       )
  //     )
  //   )
  // );

  // deleteWeight$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(WeightsActions.deleteWeight),
  //     withLatestFrom(this.store.pipe(select(fromWeightsSelectors.getWeightsPagination))),
  //     mergeMap(([action, pagination]) =>
  //       this.weightsService.delete(action.id).pipe(
  //         map(() =>
  //           WeightsActions.loadWeights({ pageIndex: pagination.currentPage })
  //         ),
  //         catchError(error => of(
  //           WeightsActions.deleteWeightFailure({ error: error.message })
  //         ))
  //       )
  //     )
  //   )
  // );

  // loadWeights$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(WeightsPageActions.loadWeights),
  //     // map((action) => action.pageIndex),
  //     switchMap(()) =>
  //       this.weightsService.getAll(0).pipe(
  //         map((resp) => WeightsApiActions.loadWeightsSuccess({ user: true }))
  //       )
  //   )
  // );

  loadWeights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeightsPageActions.loadWeights),
      switchMap(({ pageIndex }) =>
        this.weightsService.getAll(pageIndex).pipe(
          map((weightResponse) =>
            WeightsApiActions.loadWeightsSuccess({ weightResponse })
          ),
          catchError(() => of(WeightsApiActions.loadWeightsFailure()))
        )
      )
    )
  );

  //   this.actions$.pipe(
  //     ofType(WeightsPageActions.loadWeights),
  //     // map((action) => action.pageIndex),
  //     exhaustMap(() =>
  //       this.weightsService.getAll(1).pipe(
  //         map((weightResponse) =>
  //           WeightsApiActions.loadWeightsSuccess({ user: weightResponse })
  //         ),
  //         catchError((error) =>
  //           of(WeightsApiActions.loadWeightsFailure({ user: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );

  // updateAccount$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AccountPageActions.updateAccount),
  //     map((action) => action.name),
  //     exhaustMap((name) =>
  //       this.authService.updateAccount(name).pipe(
  //         switchMap((resp) => [
  //           AuthApiActions.updateAccountSuccess({ user: resp.data }),
  //           MessageApiActions.successMessage({
  //             message: resp.message,
  //           }),
  //         ]),
  //         catchError((error) => {
  //           const message = this.errorService.getMessage(error);
  //           return of(MessageApiActions.errorMessage({ message }));
  //         })
  //       )
  //     )
  //   )
  // );

  // updateWeight$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(WeightsActions.updateWeight),
  //     withLatestFrom(this.store.pipe(select(fromWeightsSelectors.getWeightsPagination))),
  //     mergeMap(([action, pagination]) =>
  //       this.weightsService.update(action.weight).pipe(
  //         switchMap(response => [
  //           WeightsActions.updateWeightSuccess({ response }),
  //           WeightsActions.weightFormDialogDismiss(),
  //           WeightsActions.loadWeights({ pageIndex: pagination.currentPage })
  //         ]),
  //         catchError(err => of(
  //           WeightsActions.updateWeightFailure({ error: err.error })
  //         ))
  //       )
  //     )
  //   )
  // );

  // weightFormDialogDismiss$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(WeightsActions.weightFormDialogDismiss),
  //     tap(() => {
  //       this.dialogRef.close();
  //     })
  //   ),
  //   { dispatch: false }
  // );

  // weightFormDialogOpen$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(WeightsActions.weightFormDialogOpen),
  //     tap(({ weight }) => {
  //       this.dialogRef = this.dialog.open(
  //         WeightFormDialogPageComponent, {
  //           data: { weight }
  //         }
  //       );
  //     })
  //   ),
  //   { dispatch: false }
  // );

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    // private spinnerService: SpinnerService,
    private store: Store<fromWeights.State>,
    private weightsService: WeightsService
  ) {
    // this.spinnerService.showOrHide(fromWeightsSelectors.getWeightsLoading);
  }
}
