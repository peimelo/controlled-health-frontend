import { Account } from '.';
import { Pagination } from '../../core/models';

export interface AccountResponse {
  meta: Pagination;
  accounts: Account[];
}
