import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromExams from './exams.reducers';

export const examsFeatureKey = 'exams';

export interface ResultsState {
  [fromExams.examsFeatureKey]: fromExams.State;
}

export interface State extends fromRoot.State {
  [examsFeatureKey]: ResultsState;
}

export function reducers(state: ResultsState | undefined, action: Action) {
  return combineReducers({
    [fromExams.examsFeatureKey]: fromExams.reducer,
  })(state, action);
}

export const selectResultsState = createFeatureSelector<State, ResultsState>(
  examsFeatureKey
);

/**
 * Exams Reducers
 */
export const selectExamsEntitiesState = createSelector(
  selectResultsState,
  (state) => state.exams
);

export const selectPagination = createSelector(
  selectExamsEntitiesState,
  fromExams.getPagination
);

export const selectSelected = createSelector(
  selectExamsEntitiesState,
  fromExams.getSelected
);

export const selectSelectedLoaded = createSelector(
  selectExamsEntitiesState,
  fromExams.getSelectedLoaded
);

export const selectSort = createSelector(
  selectExamsEntitiesState,
  fromExams.getSort
);

export const selectList = createSelector(
  selectExamsEntitiesState,
  fromExams.getList
);

export const selectListLoaded = createSelector(
  selectExamsEntitiesState,
  fromExams.getListLoaded
);
