import { Height } from '../../core/models';
import { Pagination } from '../../shared/models';

export interface HeightResponse {
  meta: Pagination;
  heights: Height[];
}
