import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthStatusState = createSelector(
  fromFeature.selectAuthState,
  (state: fromFeature.AuthState) => state.status
);

export const getErrorMessages = createSelector(
  selectAuthStatusState,
  fromAuth.getErrorMessages
);

export const getIsLoading = createSelector(
  selectAuthStatusState,
  fromAuth.getIsLoading
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);

export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
