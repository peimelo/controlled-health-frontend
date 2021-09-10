import { Sort } from '@angular/material/sort';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Exam } from '../../results/models';
import { Pagination } from '../../shared/models';
import { ExamsApiActions } from '../actions';

export const examsFeatureKey = 'exams';

export interface State extends EntityState<Exam> {
  allExams: Exam[];
  allExamsLoaded: boolean;
  listLoaded: boolean;
  pagination: Pagination;
  selected: Exam | null;
  sort: Sort;
}

export const adapter: EntityAdapter<Exam> = createEntityAdapter<Exam>({});

export const initialState: State = adapter.getInitialState({
  allExams: [],
  allExamsLoaded: false,
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
    active: 'name',
    direction: 'asc',
  },
});

export const reducer = createReducer(
  initialState,

  on(ExamsApiActions.loadAllExamsSuccess, (state, { exams }) => ({
    ...state,
    allExams: exams,
    allExamsLoaded: true,
  }))
);

export const getAllExams = (state: State) => state.allExams;
export const getAllExamsLoaded = (state: State) => state.allExamsLoaded;
export const getListLoaded = (state: State) => state.listLoaded;
export const getPagination = (state: State) => state.pagination;
export const getSelected = (state: State) => state.selected;
export const getSelectedLoaded = (state: State) => !!state.selected;
export const getSort = (state: State) => state.sort;
