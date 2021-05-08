import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { ErrorsService } from '../../shared/services/errors.service';
import { ExamsResultsApiActions, ResultDetailPageActions } from '../actions';
import { ExamsResultsFacadeService } from '../services';
import { ExamsResultsService } from '../services/exams-results.service';
import { ResultsFacadeService } from '../services/results-facade.service';

@Injectable()
export class ExamsResultsEffects {
  dialogRef: any;

  loadExamsResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ResultDetailPageActions.loadExamsResults,
        ResultDetailPageActions.changePageResults,
        ResultDetailPageActions.sortResults
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
