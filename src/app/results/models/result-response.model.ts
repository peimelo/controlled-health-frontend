import { Pagination } from '../../core/models';
import { Result } from './result.model';

export interface ResultResponse {
  meta: Pagination;
  results: Result[];
}
