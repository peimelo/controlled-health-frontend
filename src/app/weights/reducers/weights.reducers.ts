import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { WeightsApiActions } from '../actions';
import { Pagination, Weight } from '../models';

export const weightsFeatureKey = 'weights';

export interface State extends EntityState<Weight> {
  selectedWeightId: string | null;
  listLoaded: boolean;
  pagination: Pagination | null;
}

export const adapter: EntityAdapter<Weight> = createEntityAdapter<Weight>({
  selectId: (weight: Weight) => weight.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedWeightId: null,
  listLoaded: false,
  pagination: null,
});

export const reducer = createReducer(
  initialState,
  on(WeightsApiActions.loadWeightsSuccess, (state, { weightResponse }) =>
    adapter.addMany(weightResponse.weights, {
      ...state,
      listLoaded: true,
      pagination: weightResponse.meta,
    })
  )
);

export const selectId = (state: State) => state.selectedWeightId;
export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
