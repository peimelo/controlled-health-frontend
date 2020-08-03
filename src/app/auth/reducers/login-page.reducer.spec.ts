import { AuthApiActions, LoginPageActions } from '../actions';
import { Credentials, User } from '../models';
import * as fromLoginPage from '../reducers/login-page.reducer';
import { reducer } from '../reducers/login-page.reducer';

describe('LoginPageReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      (<any>expect(result)).toMatchSnapshot();
    });
  });

  describe('LOGIN', () => {
    it('should make pending to true', () => {
      const user = { email: 'test@email.com' } as Credentials;
      const createAction = LoginPageActions.login({ credentials: user });

      const result = reducer(fromLoginPage.initialState, createAction);

      (<any>expect(result)).toMatchSnapshot();
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should have no error and no pending state', () => {
      const user = { name: 'test' } as User;
      const createAction = AuthApiActions.loginSuccess({ user });

      const result = reducer(fromLoginPage.initialState, createAction);

      (<any>expect(result)).toMatchSnapshot();
    });
  });

  describe('LOGIN_FAILURE', () => {
    it('should have an error and no pending state', () => {
      const error = 'login failed';
      const createAction = AuthApiActions.loginFailure({ error });

      const result = reducer(fromLoginPage.initialState, createAction);

      (<any>expect(result)).toMatchSnapshot();
    });
  });
});
