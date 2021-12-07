import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { MessageApiActions } from '../../core/actions';
import { ErrorsService } from '../../shared/services/errors.service';
import {
  ResultDetailPageActions,
  ResultExistsGuardActions,
  ResultsActions,
  ResultsApiActions,
  ResultsFormDialogActions,
  ResultsGuardActions,
  ResultsPageActions,
} from '../actions';
import { ResultsFacadeService } from '../services/results-facade.service';
import { ResultsService } from '../services/results.service';

@Injectable()
export class ResultsEffects {
  dialogRef: any;

  createResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultsFormDialogActions.createResult),
      mergeMap(({ result }) =>
        this.resultsService.create(result).pipe(
          mergeMap(() => [
            ResultsApiActions.createResultSuccess(),
            ResultsActions.resultFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully created.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
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

  loadResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ResultsGuardActions.loadResults,
        ResultsPageActions.changePageResults,
        ResultsPageActions.sortResults,
        ResultsApiActions.createResultSuccess,
        ResultsApiActions.deleteResultSuccess
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
          map((result) => ResultsApiActions.loadResultSuccess({ result })),
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
    private dialog: MatDialog,
    private errorService: ErrorsService,
    private resultsFacadeService: ResultsFacadeService,
    private resultsService: ResultsService
  ) {}
}
