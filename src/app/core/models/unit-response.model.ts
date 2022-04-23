import { Pagination, Unit } from '../../core/models';

export interface UnitResponse {
  meta: Pagination;
  units: Unit[];
}
