import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromUnits from './units.reducers';

export const unitsFeatureKey = 'units';

export interface UnitsState {
  [fromUnits.unitsFeatureKey]: fromUnits.State;
}

export interface State extends fromRoot.State {
  [unitsFeatureKey]: UnitsState;
}

export function reducers(state: UnitsState | undefined, action: Action) {
  return combineReducers({
    [fromUnits.unitsFeatureKey]: fromUnits.reducer,
  })(state, action);
}

export const selectUnitsState = createFeatureSelector<State, UnitsState>(
  unitsFeatureKey
);

/**
 * Units Reducers
 */
export const selectUnitsEntitiesState = createSelector(
  selectUnitsState,
  (state) => state.units
);

export const selectSort = createSelector(
  selectUnitsEntitiesState,
  fromUnits.getSort
);

export const selectPagination = createSelector(
  selectUnitsEntitiesState,
  fromUnits.getPagination
);

export const selectList = createSelector(
  selectUnitsEntitiesState,
  fromUnits.getList
);

export const selectListLoaded = createSelector(
  selectUnitsEntitiesState,
  fromUnits.getListLoaded
);
