import { Sort } from '@angular/material/sort';
import { createReducer, on } from '@ngrx/store';
import { AccountsActions } from '../../accounts/actions';
import { Pagination, Unit } from '../../core/models';
import { UnitsApiActions, UnitsPageActions } from '../actions';

export const unitsFeatureKey = 'units';

export interface State {
  list: Unit[];
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
    active: 'name',
    direction: 'asc',
  },
};

export const reducer = createReducer(
  initialState,

  on(AccountsActions.loadAccountFromPageSuccess, (state, { account }) => ({
    ...initialState,
  })),

  on(UnitsPageActions.changePageUnits, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(UnitsApiActions.loadUnitsSuccess, (state, { unitResponse }) => ({
    ...state,
    list: unitResponse.units,
    listLoaded: true,
    pagination: unitResponse.meta,
  })),

  on(UnitsPageActions.sortUnits, (state, { sort }) => ({
    ...state,
    sort: sort,
  }))
);

export const getList = (state: State) => state.list;
export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
export const getSort = (state: State) => state.sort;
