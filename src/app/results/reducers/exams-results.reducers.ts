import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { AccountsApiActions } from '../../accounts/actions';
import { Pagination } from '../../shared/models';
import {
  ExamsResultsApiActions,
  ResultDetailPageActions,
  ResultsApiActions,
  ResultsPageActions,
} from '../actions';
import { ExamGraphic, ExamResult } from '../models';

export const examsResultsFeatureKey = 'examsResults';

export interface State extends EntityState<ExamResult> {
  pagination: Pagination;
  sort: Sort;
  examGraphics: ExamGraphic[];
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
  examGraphics: [],
});

export const reducer = createReducer(
  initialState,

  on(AccountsApiActions.loadAccountSuccess, (state, { account }) => ({
    ...initialState,
  })),

  on(ResultDetailPageActions.changePageResults, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(
    ExamsResultsApiActions.loadExamGraphicsSuccess,
    (state, { examGraphics }) => ({
      ...state,
      examGraphics,
    })
  ),

  on(
    ResultsApiActions.loadExamsResults,
    ResultsPageActions.addResult,
    (state) => ({
      ...initialState,
      examGraphics: [],
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

export const getExamGraphics = (state: State) => state.examGraphics;
export const getPagination = (state: State) => state.pagination;
export const getSort = (state: State) => state.sort;
