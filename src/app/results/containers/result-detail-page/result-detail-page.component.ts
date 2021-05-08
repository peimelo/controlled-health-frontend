import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { LayoutFacadeService } from '../../../core/services/layout-facade.service';
import { ExamsResultsFacadeService } from '../../services/exams-results-facade.service';
import { ResultsFacadeService } from '../../services/results-facade.service';

@Component({
  selector: 'app-result-detail-page',
  templateUrl: './result-detail-page.component.html',
  styleUrls: ['./result-detail-page.component.scss'],
})
export class ResultDetailPageComponent implements OnInit {
  isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
  examsResults$ = this.examsResultsFacadeService.examsResults$;
  pagination$ = this.examsResultsFacadeService.pagination$;
  result$ = this.resultsFacadeService.selected$;
  sort$ = this.examsResultsFacadeService.sort$;

  constructor(
    private layoutFacadeService: LayoutFacadeService,
    private examsResultsFacadeService: ExamsResultsFacadeService,
    private resultsFacadeService: ResultsFacadeService
  ) {}

  ngOnInit(): void {
    this.examsResultsFacadeService.loadExamsResults();
  }

  onChangePage(event: PageEvent): void {
    this.examsResultsFacadeService.changePageResults(event.pageIndex + 1);
  }

  onSortEvent(sort: Sort) {
    this.examsResultsFacadeService.sortResults(sort);
  }
}
