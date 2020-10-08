import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromDashboard from './dashboard.reducers';

export const dashboardFeatureKey = 'dashboard';

export interface DashboardState {
  [fromDashboard.statusFeatureKey]: fromDashboard.State;
}

export interface State extends fromRoot.State {
  [dashboardFeatureKey]: DashboardState;
}

export function reducers(state: DashboardState | undefined, action: Action) {
  return combineReducers({
    [fromDashboard.statusFeatureKey]: fromDashboard.reducer,
  })(state, action);
}

export const selectDashboardState = createFeatureSelector<
  State,
  DashboardState
>(dashboardFeatureKey);

/**
 * Dashboard Reducers
 */
export const selectDashboardStatusState = createSelector(
  selectDashboardState,
  (state) => state.status
);

export const selectList = createSelector(
  selectDashboardStatusState,
  fromDashboard.getList
);
