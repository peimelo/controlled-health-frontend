import { Sort } from '@angular/material/sort';
import { createReducer, on } from '@ngrx/store';
import { Pagination, Reference } from '../../core/models';
import { ReferencesApiActions, ReferencesPageActions } from '../actions';

export const referencesFeatureKey = 'references';

export interface State {
  list: Reference[];
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

  on(ReferencesPageActions.changePageReferences, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(
    ReferencesApiActions.loadReferencesSuccess,
    (state, { referenceResponse }) => ({
      ...state,
      list: referenceResponse.references,
      listLoaded: true,
      pagination: referenceResponse.meta,
    })
  ),

  on(ReferencesPageActions.sortReferences, (state, { sort }) => ({
    ...state,
    sort: sort,
  }))
);

export const getList = (state: State) => state.list;
export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
export const getSort = (state: State) => state.sort;
