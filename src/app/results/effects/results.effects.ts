import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  ResultDetailPageActions,
  ResultExistsGuardActions,
  ResultsApiActions,
  ResultsGuardActions,
  ResultsPageActions,
} from '../actions';
import { ResultsFacadeService } from '../services/results-facade.service';
import { ResultsService } from '../services/results.service';

@Injectable()
export class ResultsEffects {
  createResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultDetailPageActions.createResult),
      mergeMap(({ result }) =>
        this.resultsService.create(result).pipe(
          mergeMap((resultApi) => [
            ResultsApiActions.createResultSuccess({ result: resultApi }),
            MessageApiActions.successMessage({
              message: 'Record successfully created.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  createResultSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ResultsApiActions.createResultSuccess),
        tap(({ result }) => {
          this.router
            .navigateByUrl('results', { skipLocationChange: true })
            .then(() => this.router.navigate(['results', result.id]));
        })
      ),
    { dispatch: false }
  );

  deleteResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultsPageActions.deleteResult),
      mergeMap(({ id }) =>
        this.resultsService.delete(id).pipe(
          mergeMap(() => [
            ResultsApiActions.deleteResultSuccess(),
            MessageApiActions.successMessage({
              message: 'Record successfully deleted.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  editResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultsPageActions.editResult),
      map(() => ResultsApiActions.loadExamsResults())
    )
  );

  loadResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ResultsGuardActions.loadResults,
        ResultsPageActions.changePageResults,
        ResultsPageActions.sortResults,
        ResultsApiActions.createResultSuccess,
        ResultsApiActions.deleteResultSuccess,
        ResultsApiActions.updateResultSuccess
      ),
      withLatestFrom(
        this.resultsFacadeService.pagination$,
        this.resultsFacadeService.sort$
      ),
      exhaustMap(([action, pagination, sort]) =>
        this.resultsService.getAll(pagination.currentPage, sort).pipe(
          map((resultResponse) =>
            ResultsApiActions.loadResultsSuccess({ resultResponse })
          ),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  loadResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultExistsGuardActions.loadResult),
      exhaustMap((action) =>
        this.resultsService.getOne(action.id).pipe(
          mergeMap((result) => [
            ResultsApiActions.loadResultSuccess({ result }),
            ResultsApiActions.loadExamsResults(),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  updateResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultDetailPageActions.updateResult),
      mergeMap(({ result }) =>
        this.resultsService.update(result).pipe(
          mergeMap(() => [
            ResultsApiActions.updateResultSuccess(),
            MessageApiActions.successMessage({
              message: 'Record successfully updated.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private errorService: ErrorsService,
    private resultsFacadeService: ResultsFacadeService,
    private resultsService: ResultsService,
    private router: Router
  ) {}
}
