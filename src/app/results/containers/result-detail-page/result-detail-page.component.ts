import { Component } from '@angular/core';
import { ResultsFacadeService } from '../../services/results-facade.service';

@Component({
  selector: 'app-result-detail-page',
  templateUrl: './result-detail-page.component.html',
  styleUrls: ['./result-detail-page.component.scss'],
})
export class ResultDetailPageComponent {
  result$ = this.resultsFacadeService.selected$;

  constructor(private resultsFacadeService: ResultsFacadeService) {}
}
