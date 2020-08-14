import { createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions } from '../actions';
import { User } from '../models';

export const statusFeatureKey = 'status';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,

  on(
    AuthApiActions.loadUserSuccess,
    AuthApiActions.loginSuccess,
    AuthApiActions.updateAccountSuccess,
    (state, { user }) => ({
      ...state,
      user,
    })
  ),

  on(AuthActions.logout, AuthActions.deleteAccount, () => initialState)
);

export const getUser = (state: State) => state.user;
