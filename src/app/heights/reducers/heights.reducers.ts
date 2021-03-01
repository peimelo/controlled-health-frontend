import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Height, Pagination } from '../../shared/models';
import { HeightsApiActions, HeightsPageActions } from '../actions';

export const heightsFeatureKey = 'heights';

export interface State extends EntityState<Height> {
  pagination: Pagination;
  sort: Sort;
}

export const adapter: EntityAdapter<Height> = createEntityAdapter<Height>({});

export const initialState: State = adapter.getInitialState({
  entities: {},
  ids: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0,
  },
  sort: <Sort>{
    active: 'date',
    direction: 'desc',
  },
});

export const reducer = createReducer(
  initialState,

  on(HeightsPageActions.changePageHeights, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(HeightsApiActions.loadHeightsSuccess, (state, { heightResponse }) =>
    adapter.setAll(heightResponse.heights, {
      ...state,
      pagination: heightResponse.meta,
    })
  ),

  on(HeightsPageActions.sortHeights, (state, { sort }) => ({
    ...state,
    sort: sort,
  }))
);

export const getPagination = (state: State) => state.pagination;
export const getSort = (state: State) => state.sort;
