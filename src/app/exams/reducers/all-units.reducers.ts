import { createReducer, on } from '@ngrx/store';
import { AccountsActions } from '../../accounts/actions';
import { Unit } from '../../core/models';
import { AllUnitsApiActions } from '../actions';

export const allUnitsFeatureKey = 'allUnits';

export interface State {
  allUnits: ReadonlyArray<Unit>;
  allUnitsLoaded: boolean;
}

export const initialState: State = {
  allUnits: [],
  allUnitsLoaded: false,
};

export const reducer = createReducer(
  initialState,

  // TODO: verify
  on(AccountsActions.loadAccountFromPageSuccess, () => ({
    ...initialState,
  })),

  on(AllUnitsApiActions.loadAllUnitsSuccess, (state, { units }) => ({
    ...state,
    allUnits: units,
    allUnitsLoaded: true,
  }))
);

export const getAllUnits = (state: State) => state.allUnits;
export const getAllUnitsLoaded = (state: State) => state.allUnitsLoaded;
