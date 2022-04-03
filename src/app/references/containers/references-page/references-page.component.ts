import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Pagination, Reference } from '../../../core/models';
import { ReferencesFacadeService } from '../../services/references-facade.service';

@Component({
  selector: 'app-references-page',
  templateUrl: './references-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferencesPageComponent {
  references$: Observable<Reference[]>;
  pagination$: Observable<Pagination>;
  sort$: Observable<Sort>;

  constructor(private referencesFacadeService: ReferencesFacadeService) {
    this.references$ = this.referencesFacadeService.references$;
    this.pagination$ = this.referencesFacadeService.pagination$;
    this.sort$ = this.referencesFacadeService.sort$;
  }

  onAdd(): void {
    this.referencesFacadeService.add();
  }

  onChangePage(event: PageEvent): void {
    this.referencesFacadeService.changePage(event.pageIndex + 1);
  }

  onDelete(id: number): void {
    this.referencesFacadeService.delete(id);
  }

  onEdit(reference: Reference): void {
    this.referencesFacadeService.edit(reference);
  }

  onSortEvent(sort: Sort) {
    this.referencesFacadeService.sort(sort);
  }
}
