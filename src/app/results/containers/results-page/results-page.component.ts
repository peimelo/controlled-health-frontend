import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { LayoutFacadeService } from '../../../core/services/layout-facade.service';
import { Result } from '../../models';
import { ResultsFacadeService } from '../../services/results-facade.service';

@Component({
  selector: 'app-results-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results-page.component.html',
})
export class ResultsPageComponent implements OnInit {
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

  ngOnInit(): void {
    this.resultsFacadeService.loadResults();
  }

  onAdd(): void {
    this.resultsFacadeService.addResult();
  }

  onChangePage(event: PageEvent): void {
    this.resultsFacadeService.changePageResults(event.pageIndex + 1);
  }

  onDelete(id: number): void {
    this.resultsFacadeService.deleteResult(id);
  }

  onEdit(result: Result): void {
    this.resultsFacadeService.editResult(result);
  }

  onSortEvent(sort: Sort) {
    this.resultsFacadeService.sortResults(sort);
  }
}
