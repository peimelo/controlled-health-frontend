import { Account } from '.';
import { Pagination } from '../../shared/models';

export interface AccountResponse {
  meta: Pagination;
  accounts: Account[];
}
