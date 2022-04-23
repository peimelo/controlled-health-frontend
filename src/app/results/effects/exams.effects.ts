import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ExamsService } from '../../core/services/exams.service';
import { ErrorsService } from '../../shared/services/errors.service';
import { AllExamsExistsGuardActions, ExamsApiActions } from '../actions';

@Injectable()
export class ExamsEffects {
  dialogRef: any;

  loadExams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllExamsExistsGuardActions.loadAllExams),
      exhaustMap(() => {
        return this.examsService.getAllRecords().pipe(
          map((exams) =>
            ExamsApiActions.loadAllExamsSuccess({
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
