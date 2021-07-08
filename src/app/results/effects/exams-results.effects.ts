import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators';
import { ErrorsService } from '../../shared/services/errors.service';
import {
  ExamsResultsApiActions,
  ResultDetailPageActions, ResultsApiActions,
  ResultsPageActions
} from '../actions';
import { ExamsResultsFacadeService } from '../services';
import { ExamsResultsService } from '../services/exams-results.service';
import { ResultsFacadeService } from '../services/results-facade.service';
import { MessageApiActions } from '../../core/actions';

@Injectable()
export class ExamsResultsEffects {
  dialogRef: any;

  deleteResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultDetailPageActions.deleteExamResult),
      mergeMap(({ id, resultId }) =>
        this.examsResultsService.delete(id, resultId).pipe(
          mergeMap(() => [
            ExamsResultsApiActions.deleteExamResultSuccess(),
            MessageApiActions.successMessage({
              message: 'Record successfully deleted.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  loadExamsResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ResultDetailPageActions.loadExamsResults,
        ResultDetailPageActions.changePageResults,
        ResultDetailPageActions.sortResults,
        ExamsResultsApiActions.deleteExamResultSuccess
      ),
      withLatestFrom(
        this.resultsFacadeService.selected$,
        this.examsResultsFacadeService.pagination$,
        this.examsResultsFacadeService.sort$
      ),
      exhaustMap(([action, selected, pagination, sort]) => {
        const id = !!selected ? selected.id : 0;

        return this.examsResultsService
          .getAll(id, pagination.currentPage, sort)
          .pipe(
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
    private examsResultsFacadeService: ExamsResultsFacadeService,
    private resultsFacadeService: ResultsFacadeService,
    private examsResultsService: ExamsResultsService
  ) {}
}
