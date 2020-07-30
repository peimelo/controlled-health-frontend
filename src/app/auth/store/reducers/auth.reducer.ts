import { createReducer, on } from '@ngrx/store';
import { User } from '../../models';
import { AuthActions, AuthApiActions } from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,

  on(AuthApiActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
  })),

  on(AuthActions.logout, () => initialState)
);

export const getUser = (state: State) => state.user;
