import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, LoginPageActions } from '../actions';

export const loginPageFeatureKey = 'loginPage';

export interface State {
  error: string[];
  pending: boolean;
}

export const initialState: State = {
  error: [],
  pending: false,
};

export const reducer = createReducer(
  initialState,

  on(LoginPageActions.login, (state) => ({
    ...state,
    error: [],
    pending: true,
  })),

  on(AuthApiActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  })),

  on(AuthApiActions.loginSuccess, (state) => ({
    ...state,
    error: [],
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
