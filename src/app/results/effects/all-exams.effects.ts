import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ExamsService } from '../../core/services/exams.service';
import { ErrorsService } from '../../shared/services/errors.service';
import { AllExamsApiActions, AllExamsExistGuardActions } from '../actions';

@Injectable()
export class AllExamsEffects {
  loadAllExams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllExamsExistGuardActions.loadAllExams),
      exhaustMap(() => {
        return this.examsService.getAllRecords().pipe(
          map((exams) =>
            AllExamsApiActions.loadAllExamsSuccess({
              exams,
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
    private examsService: ExamsService
  ) {}
}
