import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { HeightsActions } from '../../heights/actions';
import { ErrorsService } from '../../shared/services/errors.service';
import { WeightsActions } from '../../weights/actions';
import { DashboardApiActions, DashboardGuardActions } from '../actions';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
export class DashboardEffects {
  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        DashboardGuardActions.loadDashboardGuard,
        HeightsActions.loadDashboard,
        WeightsActions.loadDashboard
      ),
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
