import { createReducer, on } from '@ngrx/store';
import { AccountsActions } from '../../accounts/actions';
import { Exam } from '../../core/models';
import { ExamsApiActions } from '../actions';

export const examsFeatureKey = 'exams';

export interface State {
  allExams: ReadonlyArray<Exam>;
  allExamsLoaded: boolean;
}

export const initialState: State = {
  allExams: [],
  allExamsLoaded: false,
};

export const reducer = createReducer(
  initialState,

  // TODO: verify
  on(AccountsActions.loadAccountFromPageSuccess, () => ({
    ...initialState,
  })),

  on(ExamsApiActions.loadAllExamsSuccess, (state, { exams }) => ({
    ...state,
    allExams: exams,
    allExamsLoaded: true,
  }))
);

export const getAllExams = (state: State) => state.allExams;
export const getAllExamsLoaded = (state: State) => state.allExamsLoaded;
