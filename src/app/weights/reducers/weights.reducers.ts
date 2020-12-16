import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Pagination, Weight } from '../../shared/models';
import { WeightsApiActions } from '../actions';

export const weightsFeatureKey = 'weights';

export interface State extends EntityState<Weight> {
  listLoaded: boolean;
  pagination: Pagination | null;
}

export const adapter: EntityAdapter<Weight> = createEntityAdapter<Weight>({
  sortComparer: sortByDateDesc,
});

export function sortByDateDesc(a: Weight, b: Weight): number {
  return b.date.localeCompare(a.date);
}

export const initialState: State = adapter.getInitialState({
  listLoaded: false,
  pagination: null,
});

export const reducer = createReducer(
  initialState,

  on(WeightsApiActions.createWeightSuccess, (state, { weight }) =>
    adapter.addOne(weight, {
      ...state,
      pagination: {
        ...state.pagination,
        totalItems: state.pagination.totalItems + 1,
      },
    })
  ),

  on(WeightsApiActions.deleteWeightSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      pagination: {
        ...state.pagination,
        totalItems: state.pagination.totalItems - 1,
      },
    })
  ),

  on(WeightsApiActions.loadWeightsSuccess, (state, { weightResponse }) =>
    adapter.addMany(weightResponse.weights, {
      ...state,
      listLoaded: true,
      pagination: weightResponse.meta,
    })
  ),

  on(WeightsApiActions.updateWeightSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
    })
  )
);

export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
