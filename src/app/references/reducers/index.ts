import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromReferences from './references.reducers';

export const referencesFeatureKey = 'references';

export interface ReferencesState {
  [fromReferences.referencesFeatureKey]: fromReferences.State;
}

export interface State extends fromRoot.State {
  [referencesFeatureKey]: ReferencesState;
}

export function reducers(state: ReferencesState | undefined, action: Action) {
  return combineReducers({
    [fromReferences.referencesFeatureKey]: fromReferences.reducer,
  })(state, action);
}

export const selectReferencesState = createFeatureSelector<State, ReferencesState>(
  referencesFeatureKey
);

/**
 * References Reducers
 */
export const selectReferencesEntitiesState = createSelector(
  selectReferencesState,
  (state) => state.references
);

export const selectSort = createSelector(
  selectReferencesEntitiesState,
  fromReferences.getSort
);

export const selectPagination = createSelector(
  selectReferencesEntitiesState,
  fromReferences.getPagination
);

export const selectList = createSelector(
  selectReferencesEntitiesState,
  fromReferences.getList
);

export const selectListLoaded = createSelector(
  selectReferencesEntitiesState,
  fromReferences.getListLoaded
);
