import { Sort } from '@angular/material/sort';
import { createReducer, on } from '@ngrx/store';
import { AccountsActions } from '../../accounts/actions';
import { Pagination } from '../../core/models';
import {
  ExamsResultsApiActions,
  ResultDetailPageActions,
  ResultsApiActions,
  ResultsPageActions,
} from '../actions';
import { ExamGraphic, ExamResult } from '../models';

export const examsResultsFeatureKey = 'examsResults';

export interface State {
  examGraphics: ExamGraphic[];
  list: ExamResult[];
  pagination: Pagination;
  sort: Sort;
}

export const initialState: State = {
  examGraphics: [],
  list: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0,
  },
  sort: <Sort>{
    active: 'exams.name',
    direction: 'asc',
  },
};

export const reducer = createReducer(
  initialState,

  on(AccountsActions.loadAccountFromPageSuccess, (state, { account }) => ({
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
    (state, { examResultResponse }) => ({
      ...state,
      list: examResultResponse.exam_results,
      pagination: examResultResponse.meta,
    })
  ),

  on(ResultDetailPageActions.sortResults, (state, { sort }) => ({
    ...state,
    sort: sort,
  }))
);

export const getExamGraphics = (state: State) => state.examGraphics;
export const getList = (state: State) => state.list;
export const getPagination = (state: State) => state.pagination;
export const getSort = (state: State) => state.sort;
