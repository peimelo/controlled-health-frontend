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
  ExamsApiActions,
  ExamsGuardActions,
  ExamsPageActions,
} from '../actions';
import { ExamsFacadeService } from '../services/exams-facade.service';
import { ExamsService } from '../services/exams.service';

@Injectable()
export class ExamsEffects {
  // createResult$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ResultDetailPageActions.createResult),
  //     mergeMap(({ result }) =>
  //       this.examsService.create(result).pipe(
  //         mergeMap((resultApi) => [
  //           ResultsApiActions.createResultSuccess({ result: resultApi }),
  //           MessageApiActions.successMessage({
  //             message: 'Record successfully created.',
  //           }),
  //         ]),
  //         catchError((error) => this.errorService.showError(error))
  //       )
  //     )
  //   )
  // );

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

  // editResult$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ExamsPageActions.editExam),
  //     map(() => ExamsApiActions.load())
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

  // loadResult$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ExamExistsGuardActions.loadExam),
  //     exhaustMap((action) =>
  //       this.examsService.getOne(action.id).pipe(
  //         mergeMap((result) => [
  //           ExamsApiActions.loadExamSuccess({ result }),
  //           ExamsApiActions.loadExamsResults(),
  //         ]),
  //         catchError((error) => this.errorService.showError(error))
  //       )
  //     )
  //   )
  // );

  // updateResult$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ResultDetailPageActions.updateResult),
  //     mergeMap(({ result }) =>
  //       this.examsService.update(result).pipe(
  //         mergeMap(() => [
  //           ResultsApiActions.updateResultSuccess(),
  //           MessageApiActions.successMessage({
  //             message: 'Record successfully updated.',
  //           }),
  //         ]),
  //         catchError((error) => this.errorService.showError(error))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private errorService: ErrorsService,
    private examsFacadeService: ExamsFacadeService,
    private examsService: ExamsService,
    private router: Router
  ) {}
}
