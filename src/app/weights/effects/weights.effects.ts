import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { MessageApiActions } from 'src/app/core/actions';
import { ErrorsService } from '../../core/services/errors.service';
import { WeightsApiActions, WeightsPageActions } from '../actions';
import { WeightsFacadeService } from '../services/weights-facade.service';
import { WeightsService } from '../services/weights.service';

@Injectable()
export class WeightsEffects {
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

  constructor(
    private actions$: Actions,
    private errorService: ErrorsService,
    private weightsFacadeService: WeightsFacadeService,
    private weightsService: WeightsService
  ) {}
}
