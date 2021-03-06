import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Pagination, Weight } from '../../shared/models';
import { WeightsApiActions, WeightsPageActions } from '../actions';

export const weightsFeatureKey = 'weights';

export interface State extends EntityState<Weight> {
  pagination: Pagination;
  sort: Sort;
}

export const adapter: EntityAdapter<Weight> = createEntityAdapter<Weight>({});

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

  on(WeightsPageActions.changePageWeights, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(WeightsApiActions.loadWeightsSuccess, (state, { weightResponse }) =>
    adapter.setAll(weightResponse.weights, {
      ...state,
      pagination: weightResponse.meta,
    })
  ),

  on(WeightsPageActions.sortWeights, (state, { sort }) => ({
    ...state,
    sort: sort,
  }))
);

export const getPagination = (state: State) => state.pagination;
export const getSort = (state: State) => state.sort;
