import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAllUnits from './all-units.reducers';
import * as fromExams from './exams.reducers';

export const examsFeatureKey = 'exams';

export interface ResultsState {
  [fromAllUnits.allUnitsFeatureKey]: fromAllUnits.State;
  [fromExams.examsFeatureKey]: fromExams.State;
}

export interface State extends fromRoot.State {
  [examsFeatureKey]: ResultsState;
}

export function reducers(state: ResultsState | undefined, action: Action) {
  return combineReducers({
    [fromAllUnits.allUnitsFeatureKey]: fromAllUnits.reducer,
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

/**
 * Units Reducers
 */
export const selectUnitsEntitiesState = createSelector(
  selectResultsState,
  (state) => state.allUnits
);

export const selectUnits = createSelector(
  selectUnitsEntitiesState,
  fromAllUnits.getAllUnits
);

export const selectAllUnitsLoaded = createSelector(
  selectUnitsEntitiesState,
  fromAllUnits.getAllUnitsLoaded
);
