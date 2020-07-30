import { createReducer, on } from '@ngrx/store';
import { SpinnerActions } from '../actions';

export const spinnerFeatureKey = 'spinner';

export interface State {
  showSpinner: boolean;
}

export const initialState: State = {
  showSpinner: false,
};

export const reducer = createReducer(
  initialState,
  on(SpinnerActions.hideSpinner, (state) => ({
    ...state,
    showSpinner: false,
  })),
  on(SpinnerActions.showSpinner, (state) => ({
    showSpinner: true,
  }))
);

export const getShowSpinner = (state: State) => state.showSpinner;
