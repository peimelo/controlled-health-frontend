import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { LayoutFacadeService } from '../../../shared/services';
import { Result } from '../../models';
import { ResultsFacadeService } from '../../services/results-facade.service';

@Component({
  selector: 'app-results-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results-page.component.html',
})
export class ResultsPageComponent {
  isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
  pagination$ = this.resultsFacadeService.pagination$;
  sort$ = this.resultsFacadeService.sort$;
  results$: Observable<Result[]>;

  constructor(
    private layoutFacadeService: LayoutFacadeService,
    private resultsFacadeService: ResultsFacadeService
  ) {
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
