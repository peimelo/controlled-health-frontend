import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Height, Pagination } from '../../shared/models';
import { HeightsApiActions, HeightsPageActions } from '../actions';

export const heightsFeatureKey = 'heights';

export interface State extends EntityState<Height> {
  listLoaded: boolean;
  pagination: Pagination;
  sort: Sort;
}

export const adapter: EntityAdapter<Height> = createEntityAdapter<Height>({});

export const initialState: State = adapter.getInitialState({
  entities: {},
  ids: [],
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
});

export const reducer = createReducer(
  initialState,

  on(HeightsApiActions.createHeightSuccess, (state, { height }) =>
    adapter.addOne(height, {
      ...state,
      pagination: {
        ...state.pagination,
        totalItems: state.pagination.totalItems + 1,
      },
    })
  ),

  on(HeightsApiActions.deleteHeightSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      pagination: {
        ...state.pagination,
        totalItems: state.pagination.totalItems - 1,
      },
    })
  ),

  on(HeightsApiActions.loadHeightsSuccess, (state, { heightResponse }) =>
    adapter.setAll(heightResponse.heights, {
      ...state,
      listLoaded: true,
      pagination: heightResponse.meta,
    })
  ),

  on(HeightsPageActions.sortHeights, (state, { sort }) => ({
    ...state,
    sort: sort,
  })),

  on(HeightsApiActions.updateHeightSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
    })
  )
);

export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
export const getSort = (state: State) => state.sort;
