import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ErrorsService } from '../../shared/services/errors.service';
import { AllExamsExistsGuardActions, ExamsApiActions } from '../actions';
import { ExamsService } from '../services';

@Injectable()
export class ExamsEffects {
  dialogRef: any;

  loadExams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllExamsExistsGuardActions.loadAllExams),
      exhaustMap(() => {
        return this.examsService.getAll().pipe(
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
