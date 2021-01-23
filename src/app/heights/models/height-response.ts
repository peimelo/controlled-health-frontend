import { Height, Pagination } from '../../shared/models';

export interface HeightResponse {
  meta: Pagination;
  heights: Height[];
}
