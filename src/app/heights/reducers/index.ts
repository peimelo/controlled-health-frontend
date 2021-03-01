import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromHeights from './heights.reducers';

export const heightsFeatureKey = 'heights';

export interface HeightsState {
  [fromHeights.heightsFeatureKey]: fromHeights.State;
}

export interface State extends fromRoot.State {
  [heightsFeatureKey]: HeightsState;
}

export function reducers(state: HeightsState | undefined, action: Action) {
  return combineReducers({
    [fromHeights.heightsFeatureKey]: fromHeights.reducer,
  })(state, action);
}

export const selectHeightsState = createFeatureSelector<State, HeightsState>(
  heightsFeatureKey
);

/**
 * Heights Reducers
 */
export const selectHeightsEntitiesState = createSelector(
  selectHeightsState,
  (state) => state.heights
);

export const selectSort = createSelector(
  selectHeightsEntitiesState,
  fromHeights.getSort
);

export const selectPagination = createSelector(
  selectHeightsEntitiesState,
  fromHeights.getPagination
);

export const {
  selectIds: selectHeightIds,
  selectEntities: selectHeightEntities,
  selectAll: selectAllHeights,
  selectTotal: selectTotalHeights,
} = fromHeights.adapter.getSelectors(selectHeightsEntitiesState);
