import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DashboardPageActions } from '../actions';
import { Dashboard } from '../models';
import * as fromDashboard from '../reducers';

@Injectable()
export class DashboardFacadeService {
  dashboard$: Observable<Dashboard>;

  constructor(private store: Store<fromDashboard.State>) {
    this.dashboard$ = this.store.pipe(select(fromDashboard.selectDashboard));
  }

  loadDashboard(): void {
    this.store.dispatch(DashboardPageActions.loadDashboard());
  }
}
