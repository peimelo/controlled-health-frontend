import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UnitsService } from '../../core/services/units.service';
import { ErrorsService } from '../../shared/services/errors.service';
import { AllUnitsApiActions, AllUnitsExistGuardActions } from '../actions';

@Injectable()
export class AllUnitsEffects {
  loadAllUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllUnitsExistGuardActions.loadAllUnits),
      exhaustMap(() => {
        return this.unitsService.getAllRecords().pipe(
          map((units) =>
            AllUnitsApiActions.loadAllUnitsSuccess({
              units,
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
    private unitsService: UnitsService
  ) {}
}
