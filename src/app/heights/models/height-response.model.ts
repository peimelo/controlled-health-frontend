import { Height, Pagination } from '../../core/models';

export interface HeightResponse {
  meta: Pagination;
  heights: Height[];
}
