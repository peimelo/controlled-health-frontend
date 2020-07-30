import { createReducer, on } from '@ngrx/store';
import { User } from '../../models';
import { AuthActions, AuthApiActions, LoginPageActions } from '../actions';

export interface State {
  errorMessages: string[];
  isLoading: boolean;
  loggedIn: boolean;
  user: User;
}

export const initialState: State = {
  errorMessages: [],
  isLoading: false,
  loggedIn: false,
  user: {
    email: '',
    name: '',
  },
};

export const reducer = createReducer(
  initialState,
  on(LoginPageActions.login, (state) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
  })),
  on(
    AuthApiActions.loginFailure,
    AuthApiActions.loadUserFailure,
    (state, { error }) => ({
      ...state,
      errorMessages: error,
      isLoading: false,
    })
  ),
  on(
    AuthApiActions.loginSuccess,
    AuthApiActions.loadUserSuccess,
    (state, { user }) => ({
      ...state,
      errorMessages: [],
      isLoading: false,
      loggedIn: true,
      user,
    })
  ),
  on(AuthActions.logout, () => initialState)
);

export const getErrorMessages = (state: State) => state.errorMessages;
export const getIsLoading = (state: State) => state.isLoading;
export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
