import { Sort } from '@angular/material/sort';
import { createReducer, on } from '@ngrx/store';
import { Exam, Pagination } from '../../core/models';
import { ExamsApiActions, ExamsPageActions } from '../actions';

export const examsFeatureKey = 'exams';

export interface State {
  list: Exam[];
  listLoaded: boolean;
  pagination: Pagination;
  selected: Exam | null;
  sort: Sort;
}

export const initialState: State = {
  list: [],
  listLoaded: false,
  pagination: {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0,
  },
  selected: null,
  sort: <Sort>{
    active: 'name',
    direction: 'asc',
  },
};

export const reducer = createReducer(
  initialState,

  on(ExamsPageActions.addExam, (state) => ({
    ...state,
    selected: null,
  })),

  on(
    ExamsApiActions.createExamSuccess,
    ExamsPageActions.editExam,
    ExamsApiActions.loadExamSuccess,
    (state, { exam }) => ({
      ...state,
      selected: exam,
    })
  ),

  on(ExamsPageActions.changePageExams, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(ExamsApiActions.loadExamsSuccess, (state, { examResponse }) => ({
    ...state,
    list: examResponse.exams,
    listLoaded: true,
    pagination: examResponse.meta,
  })),

  on(ExamsPageActions.sortExams, (state, { sort }) => ({
    ...state,
    sort: sort,
  }))
);

export const getList = (state: State) => state.list;
export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
export const getSelected = (state: State) => state.selected;
export const getSelectedLoaded = (state: State) => !!state.selected;
export const getSort = (state: State) => state.sort;
