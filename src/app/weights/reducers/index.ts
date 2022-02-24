import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromWeights from './weights.reducers';

export const weightsFeatureKey = 'weights';

export interface WeightsState {
  [fromWeights.weightsFeatureKey]: fromWeights.State;
}

export interface State extends fromRoot.State {
  [weightsFeatureKey]: WeightsState;
}

export function reducers(state: WeightsState | undefined, action: Action) {
  return combineReducers({
    [fromWeights.weightsFeatureKey]: fromWeights.reducer,
  })(state, action);
}

export const selectWeightsState = createFeatureSelector<State, WeightsState>(
  weightsFeatureKey
);

/**
 * Weights Reducers
 */
export const selectWeightsEntitiesState = createSelector(
  selectWeightsState,
  (state) => state.weights
);

export const selectPagination = createSelector(
  selectWeightsEntitiesState,
  fromWeights.getPagination
);

export const selectSort = createSelector(
  selectWeightsEntitiesState,
  fromWeights.getSort
);

export const selectList = createSelector(
  selectWeightsEntitiesState,
  fromWeights.getList
);

export const selectListLoaded = createSelector(
  selectWeightsEntitiesState,
  fromWeights.getListLoaded
);
