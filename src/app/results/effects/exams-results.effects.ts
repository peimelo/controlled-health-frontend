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
import { ErrorsService } from '../../shared/services';
import {
  ExamResultFormDialogActions,
  ExamsResultsActions,
  ExamsResultsApiActions,
  ResultDetailPageActions,
} from '../actions';
import { ExamResultFormDialogPageComponent } from '../containers/exam-result-form-dialog-page/exam-result-form-dialog-page.component';
import {
  ExamsResultsFacadeService,
  ExamsResultsService,
  ResultsFacadeService,
} from '../services';

@Injectable()
export class ExamsResultsEffects {
  dialogRef: any;

  addExamResult$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ResultDetailPageActions.addExamResult),
        tap(() => {
          this.dialogRef = this.dialog.open(ExamResultFormDialogPageComponent, {
            data: {},
            width: '800px',
          });
        })
      ),
    { dispatch: false }
  );

  createExamResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExamResultFormDialogActions.createExamResult),
      mergeMap(({ examResult, resultId }) =>
        this.examsResultsService.create(examResult, resultId).pipe(
          mergeMap(() => [
            ExamsResultsApiActions.createExamResultSuccess(),
            ExamsResultsActions.examResultFormDialogDismiss(),
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

  examResultFormDialogDismiss$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ExamsResultsActions.examResultFormDialogDismiss),
        tap(() => {
          this.dialogRef.close();
        })
      ),
    { dispatch: false }
  );

  loadExamsResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ResultDetailPageActions.loadExamsResults,
        ResultDetailPageActions.changePageResults,
        ResultDetailPageActions.sortResults,
        ExamsResultsApiActions.createExamResultSuccess,
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
    private dialog: MatDialog,
    private errorService: ErrorsService,
    private examsResultsFacadeService: ExamsResultsFacadeService,
    private resultsFacadeService: ResultsFacadeService,
    private examsResultsService: ExamsResultsService
  ) {}
}
