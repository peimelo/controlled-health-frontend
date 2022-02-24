import { Sort } from '@angular/material/sort';
import { createReducer, on } from '@ngrx/store';
import { AccountsActions } from '../../accounts/actions';
import { Pagination, Weight } from '../../core/models';
import { WeightsApiActions, WeightsPageActions } from '../actions';

export const weightsFeatureKey = 'weights';

export interface State {
  list: Weight[];
  listLoaded: boolean;
  pagination: Pagination;
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
  sort: <Sort>{
    active: 'date',
    direction: 'desc',
  },
};

export const reducer = createReducer(
  initialState,

  on(AccountsActions.loadAccountFromPageSuccess, (state, { account }) => ({
    ...initialState,
  })),

  on(WeightsPageActions.changePageWeights, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(WeightsApiActions.loadWeightsSuccess, (state, { weightResponse }) => ({
    ...state,
    list: weightResponse.weights,
    listLoaded: true,
    pagination: weightResponse.meta,
  })),

  on(WeightsPageActions.sortWeights, (state, { sort }) => ({
    ...state,
    sort: sort,
  }))
);

export const getList = (state: State) => state.list;
export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
export const getSort = (state: State) => state.sort;
