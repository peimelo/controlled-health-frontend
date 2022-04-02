import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from './auth.reducer';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State, AuthState>(
  authFeatureKey
);

/**
 * Auth Reducers
 */
export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state) => state.status
);

export const selectUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);

export const selectLoggedIn = createSelector(selectUser, (user) => !!user);

export const selectIsAdmin = createSelector(
  selectUser,
  (user) => !!user && user.admin
);
