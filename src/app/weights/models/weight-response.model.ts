import { Pagination, Weight } from '../../core/models';

export interface WeightResponse {
  meta: Pagination;
  weights: Weight[];
}
