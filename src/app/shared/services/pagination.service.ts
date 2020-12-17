import { Injectable } from '@angular/core';
import { Pagination } from '../../shared/models';

@Injectable()
export class PaginationService {
  initialRange(pagination: Pagination): number {
    if (!pagination) {
      return 0;
    }

    const initialRange = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return initialRange;
  }

  finalRange(pagination: Pagination): number {
    if (!pagination) {
      return 0;
    }

    const finalRange = pagination.currentPage * pagination.itemsPerPage;

    if (finalRange > pagination.totalItems) {
      return pagination.totalItems;
    }

    return finalRange;
  }
}
