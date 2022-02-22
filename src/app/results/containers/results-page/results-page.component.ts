import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Pagination } from '../../../core/models';
import { LayoutFacadeService } from '../../../core/services';
import { Result } from '../../models';
import { ResultsFacadeService } from '../../services/results-facade.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsPageComponent {
  isHandsetPortrait$: Observable<boolean>;
  pagination$: Observable<Pagination>;
  sort$: Observable<Sort>;
  results$: Observable<Result[]>;

  constructor(
    private layoutFacadeService: LayoutFacadeService,
    private resultsFacadeService: ResultsFacadeService
  ) {
    this.isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
    this.pagination$ = this.resultsFacadeService.pagination$;
    this.sort$ = this.resultsFacadeService.sort$;
    this.results$ = this.resultsFacadeService.results$;
  }

  onAdd(): void {
    this.resultsFacadeService.add();
  }

  onChangePage(event: PageEvent): void {
    this.resultsFacadeService.changePage(event.pageIndex + 1);
  }

  onDelete(id: number): void {
    this.resultsFacadeService.delete(id);
  }

  onEdit(result: Result): void {
    this.resultsFacadeService.edit(result);
  }

  onSortEvent(sort: Sort) {
    this.resultsFacadeService.sort(sort);
  }
}
