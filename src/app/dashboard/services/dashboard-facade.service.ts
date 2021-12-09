import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DashboardGuardActions } from '../actions';
import { Dashboard } from '../models';
import * as fromDashboard from '../reducers';

@Injectable()
export class DashboardFacadeService {
  dashboard$: Observable<Dashboard>;
  selectLoaded$: Observable<boolean>;

  constructor(private store: Store<fromDashboard.State>) {
    this.dashboard$ = this.store.pipe(select(fromDashboard.selectDashboard));
    this.selectLoaded$ = this.store.pipe(select(fromDashboard.selectLoaded));
  }

  load(): void {
    this.store.dispatch(DashboardGuardActions.loadDashboardGuard());
  }
}
