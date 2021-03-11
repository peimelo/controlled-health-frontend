import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ErrorsService } from '../../shared/services/errors.service';
import { DashboardApiActions, DashboardPageActions } from '../actions';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
export class DashboardEffects {
  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardPageActions.loadDashboard),
      exhaustMap(() =>
        this.dashboardService.getAll().pipe(
          map((dashboard) =>
            DashboardApiActions.loadDashboardSuccess({ dashboard })
          ),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private errorService: ErrorsService
  ) {}
}
