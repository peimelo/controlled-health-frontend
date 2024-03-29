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
import { ExamsService } from '../../core/services/exams.service';
import { ErrorsService } from '../../shared/services/errors.service';
import {
  ExamDetailPageActions,
  ExamExistsGuardActions,
  ExamsApiActions,
  ExamsGuardActions,
  ExamsPageActions,
} from '../actions';
import { ExamsFacadeService } from '../services/exams-facade.service';

@Injectable()
export class ExamsEffects {
  createExam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExamDetailPageActions.createExam),
      mergeMap(({ exam }) =>
        this.examsService.create(exam).pipe(
          mergeMap((examApi) => [
            ExamsApiActions.createExamSuccess({ exam: examApi }),
            MessageApiActions.successMessage({
              message: 'Record successfully created.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  createExamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ExamsApiActions.createExamSuccess),
        tap(({ exam }) => {
          this.router
            .navigateByUrl('exams', { skipLocationChange: true })
            .then(() => this.router.navigate(['exams', exam.id]));
        })
      ),
    { dispatch: false }
  );

  deleteExam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExamsPageActions.deleteExam),
      mergeMap(({ id }) =>
        this.examsService.delete(id).pipe(
          mergeMap(() => [
            ExamsApiActions.deleteExamSuccess(),
            MessageApiActions.successMessage({
              message: 'Record successfully deleted.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  // editExam$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ExamsPageActions.editExam),
  //     map(() => ExamsApiActions.loadExamsResults())
  //   )
  // );

  loadExams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ExamsGuardActions.loadExams,
        ExamsPageActions.changePageExams,
        ExamsPageActions.sortExams,
        ExamsApiActions.createExamSuccess,
        ExamsApiActions.deleteExamSuccess,
        ExamsApiActions.updateExamSuccess
      ),
      withLatestFrom(
        this.examsFacadeService.pagination$,
        this.examsFacadeService.sort$
      ),
      exhaustMap(([action, pagination, sort]) =>
        this.examsService.getAll(pagination.currentPage, sort).pipe(
          map((examResponse) =>
            ExamsApiActions.loadExamsSuccess({ examResponse })
          ),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  loadExam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExamExistsGuardActions.loadExam),
      exhaustMap((action) =>
        this.examsService.getOne(action.id).pipe(
          mergeMap((exam) => [
            ExamsApiActions.loadExamSuccess({ exam }),
            // ExamsApiActions.loadExamsResults(),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  updateExam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExamDetailPageActions.updateExam),
      mergeMap(({ exam }) =>
        this.examsService.update(exam).pipe(
          mergeMap(() => [
            ExamsApiActions.updateExamSuccess(),
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
    private examsFacadeService: ExamsFacadeService,
    private examsService: ExamsService,
    private router: Router
  ) {}
}
