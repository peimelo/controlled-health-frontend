import { createReducer, on } from '@ngrx/store';
import { LayoutActions } from '../actions';

export const layoutFeatureKey = 'layout';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false,
};

export const reducer = createReducer(
  initialState,
  on(LayoutActions.closeSidenav, (state) => ({ ...state, showSidenav: false })),
  on(LayoutActions.openSidenav, (state) => ({ ...state, showSidenav: true }))
);

export const selectShowSidenav = (state: State) => state.showSidenav;
