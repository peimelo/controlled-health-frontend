import { Sort } from '@angular/material/sort';
import { createReducer, on } from '@ngrx/store';
import { AccountsActions } from '../../accounts/actions';
import { Height, Pagination } from '../../core/models';
import { HeightsApiActions, HeightsPageActions } from '../actions';

export const heightsFeatureKey = 'heights';

export interface State {
  list: Height[];
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

  on(HeightsPageActions.changePageHeights, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(HeightsApiActions.loadHeightsSuccess, (state, { heightResponse }) => ({
    ...state,
    list: heightResponse.heights,
    listLoaded: true,
    pagination: heightResponse.meta,
  })),

  on(HeightsPageActions.sortHeights, (state, { sort }) => ({
    ...state,
    sort: sort,
  }))
);

export const getList = (state: State) => state.list;
export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
export const getSort = (state: State) => state.sort;
