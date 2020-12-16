import { Pagination, Weight } from '../../shared/models';

export interface WeightResponse {
  meta: Pagination;
  weights: Weight[];
}
