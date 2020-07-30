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
import * as fromLayout from '../core/reducers/layout.reducers';
import * as fromSpinner from '../core/reducers/spinner.reducers';

export interface State {
  [fromLayout.layoutFeatureKey]: fromLayout.State;
  [fromSpinner.spinnerFeatureKey]: fromSpinner.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
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

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

/**
 * Layout Reducers
 */
export const selectLayoutState = createFeatureSelector<State, fromLayout.State>(
  fromLayout.layoutFeatureKey
);

export const selectShowSidenav = createSelector(
  selectLayoutState,
  fromLayout.selectShowSidenav
);

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
