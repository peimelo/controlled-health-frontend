import { Sort } from '@angular/material/sort';
import { createReducer, on } from '@ngrx/store';
import { AccountsActions } from '../../accounts/actions';
import { Pagination } from '../../core/models';
import { ResultsApiActions, ResultsPageActions } from '../actions';
import { Result } from '../models';

export const resultsFeatureKey = 'results';

export interface State {
  list: Result[];
  listLoaded: boolean;
  pagination: Pagination;
  selected: Result | null;
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
    active: 'date',
    direction: 'desc',
  },
};

export const reducer = createReducer(
  initialState,

  on(AccountsActions.loadAccountFromPageSuccess, () => ({
    ...initialState,
  })),

  on(ResultsPageActions.addResult, (state) => ({
    ...state,
    selected: null,
  })),

  on(
    ResultsApiActions.createResultSuccess,
    ResultsPageActions.editResult,
    ResultsApiActions.loadResultSuccess,
    (state, { result }) => ({
      ...state,
      selected: result,
    })
  ),

  on(ResultsPageActions.changePageResults, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(ResultsApiActions.loadResultsSuccess, (state, { resultResponse }) => ({
    ...state,
    list: resultResponse.results,
    listLoaded: true,
    pagination: resultResponse.meta,
  })),

  on(ResultsPageActions.sortResults, (state, { sort }) => ({
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
