import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Weight } from '../../shared/models';
import { WeightsApiActions } from '../actions';
import { Pagination } from '../models';

export const weightsFeatureKey = 'weights';

export interface State extends EntityState<Weight> {
  selectedWeightId: string | null;
  listLoaded: boolean;
  pagination: Pagination | null;
}

export const adapter: EntityAdapter<Weight> = createEntityAdapter<Weight>({
  selectId: (weight: Weight) => weight.id,
  sortComparer: sortByDateDesc,
});

export function sortByDateDesc(a: Weight, b: Weight): number {
  return b.date.localeCompare(a.date);
}

export const initialState: State = adapter.getInitialState({
  selectedWeightId: null,
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

export const selectId = (state: State) => state.selectedWeightId;
export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
