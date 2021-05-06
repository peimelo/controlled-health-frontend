import { Component, OnInit } from '@angular/core';
import { ExamsResultsFacadeService } from '../../services/exams-results-facade.service';
import { ResultsFacadeService } from '../../services/results-facade.service';

@Component({
  selector: 'app-result-detail-page',
  templateUrl: './result-detail-page.component.html',
  styleUrls: ['./result-detail-page.component.scss'],
})
export class ResultDetailPageComponent implements OnInit {
  result$ = this.resultsFacadeService.selected$;
  examsResults$ = this.examsResultsFacadeService.examsResults$;
  pagination$ = this.examsResultsFacadeService.pagination$;

  constructor(
    private examsResultsFacadeService: ExamsResultsFacadeService,
    private resultsFacadeService: ResultsFacadeService
  ) {}

  ngOnInit(): void {
    this.examsResultsFacadeService.loadExamsResults();
  }
}
