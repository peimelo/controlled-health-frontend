import { Action, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromAuth from './auth.reducer';

export interface AuthState {
  status: fromAuth.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    status: fromAuth.reducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');
