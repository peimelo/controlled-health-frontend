// import { Pagination } from '../../shared/models';
import { Weight } from '../../shared/models';

export interface WeightResponse {
  meta: Pagination;
  weights: Weight[];
}

export interface Pagination {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}
