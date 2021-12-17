import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Pagination } from '../../shared/models';
import {
  ExamsResultsApiActions,
  ResultDetailPageActions,
  ResultsApiActions,
  ResultsPageActions,
} from '../actions';
import { ExamResult } from '../models';

export const examsResultsFeatureKey = 'examsResults';

export interface State extends EntityState<ExamResult> {
  pagination: Pagination;
  sort: Sort;
}

export const adapter: EntityAdapter<ExamResult> =
  createEntityAdapter<ExamResult>({});

export const initialState: State = adapter.getInitialState({
  entities: {},
  ids: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0,
  },
  sort: <Sort>{
    active: 'exams.name',
    direction: 'asc',
  },
});

export const reducer = createReducer(
  initialState,

  on(ResultDetailPageActions.changePageResults, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(
    ResultsApiActions.loadExamsResults,
    ResultsPageActions.addResult,
    (state) => ({
      ...initialState,
      sort: state.sort,
    })
  ),

  on(
    ExamsResultsApiActions.loadExamsResultsSuccess,
    (state, { examResultResponse }) =>
      adapter.setAll(examResultResponse.exam_results, {
        ...state,
        pagination: examResultResponse.meta,
      })
  ),

  on(ResultDetailPageActions.sortResults, (state, { sort }) => ({
    ...state,
    sort: sort,
  }))
);

export const getPagination = (state: State) => state.pagination;
export const getSort = (state: State) => state.sort;
