import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAccounts from './accounts.reducers';

export const accountsFeatureKey = 'accounts';

export interface AccountsState {
  [fromAccounts.accountsFeatureKey]: fromAccounts.State;
}

export interface State extends fromRoot.State {
  [accountsFeatureKey]: AccountsState;
}

export function reducers(state: AccountsState | undefined, action: Action) {
  return combineReducers({
    [fromAccounts.accountsFeatureKey]: fromAccounts.reducer,
  })(state, action);
}

export const selectAccountsState = createFeatureSelector<State, AccountsState>(
  accountsFeatureKey
);

/**
 * Accounts Reducers
 */
export const selectAccountsEntitiesState = createSelector(
  selectAccountsState,
  (state) => state.accounts
);

export const {
  selectIds: selectAccountIds,
  selectEntities: selectAccountEntities,
  selectAll: selectAllAccounts,
  selectTotal: selectTotalAccounts,
} = fromAccounts.adapter.getSelectors(selectAccountsEntitiesState);

export const selectListLoaded = createSelector(
  selectAccountsEntitiesState,
  fromAccounts.getListLoaded
);

export const selectSelected = createSelector(
  selectAccountsEntitiesState,
  fromAccounts.getSelected
);

export const selectSelectedLoaded = createSelector(
  selectAccountsEntitiesState,
  fromAccounts.getSelectedLoaded
);
