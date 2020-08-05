import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, ForgotPasswordPageActions } from '../actions';

export const forgotPasswordPageFeatureKey = 'forgotPasswordPage';

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

  on(ForgotPasswordPageActions.forgotPassword, (state) => ({
    ...state,
    error: [],
    pending: true,
  })),

  on(AuthApiActions.forgotPasswordFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  })),

  on(AuthApiActions.forgotPasswordSuccess, (state) => ({
    ...state,
    error: [],
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
