import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DashboardApiActions, DashboardPageActions } from '../actions';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}

  @Effect()
  loadDashboard$ = this.actions$.pipe(
    ofType(DashboardPageActions.loadDashboard),
    switchMap((_) =>
      this.dashboardService.getAll().pipe(
        map((dashboard) =>
          DashboardApiActions.loadDashboardSuccess({ dashboard })
        ),
        catchError((error) => {
          return of(DashboardApiActions.loadDashboardFailure({ error }));
        })
      )
    )
  );
}
