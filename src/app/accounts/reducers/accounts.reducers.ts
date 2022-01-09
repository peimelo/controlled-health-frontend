import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  AccountsApiActions,
  AccountsGuardActions,
  AccountsPageActions,
} from '../actions';
import { Account } from '../models';

export const accountsFeatureKey = 'accounts';

export interface State extends EntityState<Account> {
  listLoaded: boolean;
  selected: number | null;
}

export const adapter: EntityAdapter<Account> = createEntityAdapter<Account>({});

export const initialState: State = adapter.getInitialState({
  entities: {},
  ids: [],
  listLoaded: false,
  selected: null,
});

export const reducer = createReducer(
  initialState,

  on(
    AccountsGuardActions.loadAccount,
    AccountsPageActions.loadAccount,
    (state, { id }) => ({
      ...state,
      selected: id,
    })
  ),

  on(AccountsApiActions.loadAccountsSuccess, (state, { accountResponse }) =>
    adapter.setAll(accountResponse.accounts, {
      ...state,
      listLoaded: true,
    })
  )
);

export const getListLoaded = (state: State) => state.listLoaded;
export const getSelected = (state: State) => state.selected;
export const getSelectedLoaded = (state: State) => !!state.selected;
