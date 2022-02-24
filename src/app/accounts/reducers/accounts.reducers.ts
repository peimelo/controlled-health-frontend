import { createReducer, on } from '@ngrx/store';
import { AccountsActions, AccountsApiActions } from '../actions';
import { Account } from '../models';

export const accountsFeatureKey = 'accounts';

export interface State {
  list: Account[];
  listLoaded: boolean;
  selected: Account | null;
}

export const initialState: State = {
  list: [],
  listLoaded: false,
  selected: null,
};

export const reducer = createReducer(
  initialState,

  on(
    AccountsActions.loadAccountFromPageSuccess,
    AccountsActions.loadAccountFromUpdateSuccess,
    AccountsApiActions.loadAccountSuccess,
    (state, { account }) => ({
      ...state,
      selected: account,
    })
  ),

  on(AccountsApiActions.loadAccountsSuccess, (state, { accountResponse }) => ({
    ...state,
    list: accountResponse.accounts,
    listLoaded: true,
  }))
);

export const getList = (state: State) => state.list;
export const getListLoaded = (state: State) => state.listLoaded;
export const getSelected = (state: State) => state.selected;
export const getSelectedLoaded = (state: State) => !!state.selected;
