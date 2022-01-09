import { Weight } from '../../core/models';
import { Pagination } from '../../shared/models';

export interface WeightResponse {
  meta: Pagination;
  weights: Weight[];
}
