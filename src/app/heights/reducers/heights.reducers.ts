import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Height, Pagination } from '../../shared/models';
import { HeightsApiActions } from '../actions';

export const heightsFeatureKey = 'heights';

export interface State extends EntityState<Height> {
  listLoaded: boolean;
  pagination: Pagination;
}

export const adapter: EntityAdapter<Height> = createEntityAdapter<Height>({
  sortComparer: sortByDateDesc,
});

export function sortByDateDesc(a: Height, b: Height): number {
  return b.date.localeCompare(a.date);
}

export const initialState: State = adapter.getInitialState({
  listLoaded: false,
  pagination: {
    currentPage: 0,
    itemsPerPage: 0,
    totalItems: 0,
  },
  entities: {},
  ids: [],
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
    adapter.addMany(heightResponse.heights, {
      ...state,
      listLoaded: true,
      pagination: heightResponse.meta,
    })
  ),

  on(HeightsApiActions.updateHeightSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
    })
  )
);

export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
