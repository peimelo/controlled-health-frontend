import { InjectionToken } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthActions } from '../auth/actions';
import * as fromSpinner from '../core/reducers/spinner.reducers';

export interface State {
  [fromSpinner.spinnerFeatureKey]: fromSpinner.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromSpinner.spinnerFeatureKey]: fromSpinner.reducer,
    router: fromRouter.routerReducer,
  }),
});

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

// clear state in logout
export function clearState(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return function (state: State | undefined, action: any): State {
    if (action.type === AuthActions.logout.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [clearState, logger]
  : [clearState];

/**
 * Spinner Reducers
 */
export const selectSpinnerState = createFeatureSelector<
  State,
  fromSpinner.State
>(fromSpinner.spinnerFeatureKey);

export const selectShowSpinner = createSelector(
  selectSpinnerState,
  fromSpinner.getShowSpinner
);
