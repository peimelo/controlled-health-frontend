import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAllExams from './all-exams.reducers';
import * as fromExamsResults from './exams-results.reducers';
import * as fromResults from './results.reducers';

export const resultsFeatureKey = 'results';

export interface ResultsState {
  [fromAllExams.allExamsFeatureKey]: fromAllExams.State;
  [fromExamsResults.examsResultsFeatureKey]: fromExamsResults.State;
  [fromResults.resultsFeatureKey]: fromResults.State;
}

export interface State extends fromRoot.State {
  [resultsFeatureKey]: ResultsState;
}

export function reducers(state: ResultsState | undefined, action: Action) {
  return combineReducers({
    [fromAllExams.allExamsFeatureKey]: fromAllExams.reducer,
    [fromExamsResults.examsResultsFeatureKey]: fromExamsResults.reducer,
    [fromResults.resultsFeatureKey]: fromResults.reducer,
  })(state, action);
}

export const selectResultsState = createFeatureSelector<State, ResultsState>(
  resultsFeatureKey
);

/**
 * Exams Reducers
 */
export const selectExamsEntitiesState = createSelector(
  selectResultsState,
  (state) => state.allExams
);

export const selectExams = createSelector(
  selectExamsEntitiesState,
  fromAllExams.getAllExams
);

export const selectAllExamsLoaded = createSelector(
  selectExamsEntitiesState,
  fromAllExams.getAllExamsLoaded
);

/**
 * Exams Results Reducers
 */
export const selectExamsResultsEntitiesState = createSelector(
  selectResultsState,
  (state) => state.examsResults
);

export const selectExamGraphics = createSelector(
  selectExamsResultsEntitiesState,
  fromExamsResults.getExamGraphics
);

export const selectExamsResultsList = createSelector(
  selectExamsResultsEntitiesState,
  fromExamsResults.getList
);

export const selectExamsResultsPagination = createSelector(
  selectExamsResultsEntitiesState,
  fromExamsResults.getPagination
);

export const selectExamsResultsSort = createSelector(
  selectExamsResultsEntitiesState,
  fromExamsResults.getSort
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

export const selectList = createSelector(
  selectResultsEntitiesState,
  fromResults.getList
);

export const selectListLoaded = createSelector(
  selectResultsEntitiesState,
  fromResults.getListLoaded
);
