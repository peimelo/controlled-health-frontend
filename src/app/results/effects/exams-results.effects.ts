import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { ErrorsService } from '../../shared/services/errors.service';
import { ExamsResultsApiActions, ResultDetailPageActions } from '../actions';
import { ExamsResultsService } from '../services/exams-results.service';
import { ResultsFacadeService } from '../services/results-facade.service';

@Injectable()
export class ExamsResultsEffects {
  dialogRef: any;

  loadExamsResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultDetailPageActions.loadExamsResults),
      withLatestFrom(this.resultsFacadeService.selected$),
      exhaustMap(([action, selected]) => {
        const id = !!selected ? selected.id : 0;

        return this.examsResultsService.getAll(id).pipe(
          map((examResultResponse) =>
            ExamsResultsApiActions.loadExamsResultsSuccess({
              examResultResponse,
            })
          ),
          catchError((error) => this.errorService.showError(error))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private errorService: ErrorsService,
    private resultsFacadeService: ResultsFacadeService,
    private examsResultsService: ExamsResultsService
  ) {}
}
