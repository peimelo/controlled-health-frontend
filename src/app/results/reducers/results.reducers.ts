import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Pagination } from '../../shared/models';
import { ResultsApiActions, ResultsPageActions } from '../actions';
import { Result } from '../models';

export const resultsFeatureKey = 'results';

export interface State extends EntityState<Result> {
  listLoaded: boolean;
  pagination: Pagination;
  selected: Result | null;
  sort: Sort;
}

export const adapter: EntityAdapter<Result> = createEntityAdapter<Result>({});

export const initialState: State = adapter.getInitialState({
  entities: {},
  ids: [],
  listLoaded: false,
  pagination: {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0,
  },
  selected: null,
  sort: <Sort>{
    active: 'date',
    direction: 'desc',
  },
});

export const reducer = createReducer(
  initialState,

  on(
    ResultsPageActions.editResult,
    ResultsApiActions.loadResultSuccess,
    (state, { result }) => ({
      ...state,
      selected: result,
    })
  ),

  on(ResultsPageActions.changePageResults, (state, { pageIndex }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: pageIndex,
    },
  })),

  on(ResultsApiActions.loadResultsSuccess, (state, { resultResponse }) =>
    adapter.setAll(resultResponse.results, {
      ...state,
      listLoaded: true,
      pagination: resultResponse.meta,
      selected: null,
    })
  ),

  on(ResultsPageActions.sortResults, (state, { sort }) => ({
    ...state,
    sort: sort,
  }))
);

export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
export const getSelected = (state: State) => state.selected;
export const getSelectedLoaded = (state: State) => !!state.selected;
export const getSort = (state: State) => state.sort;
