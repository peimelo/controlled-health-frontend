import { Pagination, Reference } from '../../core/models';

export interface ReferenceResponse {
  meta: Pagination;
  references: Reference[];
}
