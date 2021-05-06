import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromExamsResults from './exams-results.reducers';
import * as fromResults from './results.reducers';

export const resultsFeatureKey = 'results';

export interface ResultsState {
  [fromExamsResults.examsResultsFeatureKey]: fromExamsResults.State;
  [fromResults.resultsFeatureKey]: fromResults.State;
}

export interface State extends fromRoot.State {
  [resultsFeatureKey]: ResultsState;
}

export function reducers(state: ResultsState | undefined, action: Action) {
  return combineReducers({
    [fromExamsResults.examsResultsFeatureKey]: fromExamsResults.reducer,
    [fromResults.resultsFeatureKey]: fromResults.reducer,
  })(state, action);
}

export const selectResultsState = createFeatureSelector<State, ResultsState>(
  resultsFeatureKey
);

/**
 * Exams Results Reducers
 */
export const selectExamsResultsEntitiesState = createSelector(
  selectResultsState,
  (state) => state.examsResults
);

export const {
  selectIds: selectExamResultIds,
  selectEntities: selectExamResultEntities,
  selectAll: selectAllExamsResults,
  selectTotal: selectTotalExamsResults,
} = fromExamsResults.adapter.getSelectors(selectExamsResultsEntitiesState);

export const selectExamsResultsPagination = createSelector(
  selectExamsResultsEntitiesState,
  fromExamsResults.getPagination
);

/**
 * Results Reducers
 */
export const selectResultsEntitiesState = createSelector(
  selectResultsState,
  (state) => state.results
);

export const selectPagination = createSelector(
  selectResultsEntitiesState,
  fromResults.getPagination
);

export const selectSelected = createSelector(
  selectResultsEntitiesState,
  fromResults.getSelected
);

export const selectSelectedLoaded = createSelector(
  selectResultsEntitiesState,
  fromResults.getSelectedLoaded
);

export const selectSort = createSelector(
  selectResultsEntitiesState,
  fromResults.getSort
);

export const {
  selectIds: selectResultIds,
  selectEntities: selectResultEntities,
  selectAll: selectAllResults,
  selectTotal: selectTotalResults,
} = fromResults.adapter.getSelectors(selectResultsEntitiesState);
