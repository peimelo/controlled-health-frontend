import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DashboardPageActions } from '../actions';
import { Club } from '../models';
import * as fromDashboard from '../reducers';

@Injectable()
export class DashboardFacadeService {
  dashboard$: Observable<Club[]>;

  constructor(private store: Store<fromDashboard.State>) {
    this.dashboard$ = this.store.pipe(select(fromDashboard.selectList));
  }

  loadDashboard(): void {
    this.store.dispatch(DashboardPageActions.loadDashboard());
  }
}
